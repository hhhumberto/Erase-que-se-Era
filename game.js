/* ============================================================
   ÉRASE QUE SE ERA — Motor de juego
   Depende de: data.js  (ERAS, INVESTIGATIONS, PORTALS, ERA_ORDER)

   ARQUITECTURA
   ─────────────────────────────────────────────────────────────
   InvestigationState   Estado completo de una partida.
                        Tronco y ramas usan la misma clase.

   session              Sesión global: era actual, instancias main y branch.

   album                Estado del panel álbum (sidebar expandido).

   unlockedCards        Set persistido: "eraKey:val" o "branchId:val"
   ============================================================ */


// ═══════════════════════════════════════════════════════════════
// CLASE: InvestigationState
// ═══════════════════════════════════════════════════════════════

class InvestigationState {
    constructor(def, domRefs, callbacks) {
        this.def       = def;
        this.data      = def.data;
        this.dom       = domRefs;
        this.cb        = callbacks;
        this.winTile   = def.winTile ?? Math.max(...Object.keys(def.data).map(Number));
        this.board     = Array(16).fill(null);
        this.score     = 0;
        this.discovered = [];
        this._moving   = false;
    }

    hasDiscovered(val)  { return this.discovered.includes(val); }

    discover(val) {
        if (this.hasDiscovered(val)) return false;
        this.discovered.push(val);
        this.discovered.sort((a, b) => a - b);
        return true;
    }

    get isComplete() { return this.discovered.includes(this.winTile); }

    reset() {
        this.board.forEach(t => { if (t?.element) t.element.remove(); });
        this.dom.gridContainer.innerHTML = '';
        this.board     = Array(16).fill(null);
        this.score     = 0;
        this.discovered = [];
        this._moving   = false;
        this.dom.scoreEl.textContent = '0';
        this.dom.infoPanel.innerHTML =
            `<div style="opacity:.5;text-align:center;">Usa las flechas para jugar…</div>`;
        this._initProgressBar();
    }

    _initProgressBar() {
        this.dom.progressBar.innerHTML = '';
        Object.keys(this.data).map(Number).sort((a, b) => a - b).forEach(k => {
            const slot = document.createElement('div');
            slot.className = this.dom.slotClass;
            slot.id        = this.dom.slotPrefix + k;
            slot.innerHTML = '?';
            this.dom.progressBar.appendChild(slot);
        });
    }

    updateProgressBar() {
        this.discovered.forEach(val => {
            const slot = document.getElementById(this.dom.slotPrefix + val);
            if (!slot || slot.classList.contains('filled')) return;
            const d = this.data[val];
            slot.classList.add('filled');
            slot.innerHTML = `<img src="${d.img}" onerror="this.style.display='none'">
                              <div class="slot-name">${d.n}</div>`;
        });
    }

    updateInfoPanel(val) {
        const d     = this.data[val];
        const color = this.def.color;
        this.dom.infoPanel.innerHTML = `
            <div class="evolution-card" style="border:2px solid ${color};">
                <img src="${d.img}" class="evo-icon-large" onerror="this.style.opacity='0'">
                <div style="font-size:1.8rem;font-weight:bold;color:${color};margin-bottom:5px;">${d.n}</div>
                <div style="font-size:1.05rem;line-height:1.4;color:#555;">${d.d}</div>
            </div>`;
    }

    addTile() {
        const empty = this.board.map((v, i) => v === null ? i : null).filter(i => i !== null);
        if (!empty.length) return;
        const pos = empty[Math.floor(Math.random() * empty.length)];
        const val = Math.random() < 0.9 ? 2 : 4;
        this.board[pos] = _createTile(val, pos, this);
        if (this.discovered.length === 0 && val === 2) this.cb.onDiscover(2, this);
        setTimeout(() => {
            if (!this._moving && !this.board.includes(null) && _boardIsBlocked(this.board))
                this.cb.onGameOver(this);
        }, 300);
    }

    move(dir) {
        const isVert = dir === 'UP'    || dir === 'DOWN';
        const isRev  = dir === 'RIGHT' || dir === 'DOWN';
        let   moved  = false;
        this._moving = true;

        for (let i = 0; i < 4; i++) {
            const line = [];
            for (let j = 0; j < 4; j++) line.push(isVert ? j * 4 + i : i * 4 + j);
            if (isRev) line.reverse();

            for (let j = 1; j < 4; j++) {
                if (!this.board[line[j]]) continue;
                let k = j - 1;
                while (k >= 0) {
                    const a = line[k], b = line[k + 1];
                    if (!this.board[a]) {
                        this.board[a] = this.board[b]; this.board[b] = null;
                        this.board[a].pos = a; _updateTilePos(this.board[a]);
                        moved = true;
                    } else if (this.board[a].val === this.board[b].val && !this.board[a].merged) {
                        const dead = this.board[b];
                        const nv   = this.board[a].val * 2;
                        this.board[a].val = nv; this.board[a].merged = true;
                        this.score += nv;
                        dead.pos = a; _updateTilePos(dead);
                        const el = this.board[a].element, snap = this;
                        setTimeout(() => {
                            dead.element.remove();
                            el.innerHTML = _tileImgHTML(snap.data[nv].img);
                            el.setAttribute('data-value', nv);
                            const img = el.querySelector('img[data-src]');
                            if (img) img.src = img.dataset.src;
                            if (!snap.hasDiscovered(nv)) snap.cb.onDiscover(nv, snap);
                            else if (nv === snap.winTile) snap.cb.onWin(snap);
                        }, 150);
                        this.board[b] = null; moved = true; break;
                    } else break;
                    k--;
                }
            }
        }

        if (moved) {
            this.board.forEach(t => t && (t.merged = false));
            this.dom.scoreEl.textContent = this.score;
            setTimeout(() => { this._moving = false; this.addTile(); }, 180);
        } else {
            this._moving = false;
        }
    }
}


// ═══════════════════════════════════════════════════════════════
// FUNCIONES PURAS DEL MOTOR
// ═══════════════════════════════════════════════════════════════

function _createTile(val, pos, state) {
    const el = document.createElement('div');
    el.className = 'tile';
    el.setAttribute('data-value', val);
    el.innerHTML = _tileImgHTML(state.data[val].img);
    const tile = { val, pos, element: el, merged: false };
    state.dom.gridContainer.appendChild(el);
    _updateTilePos(tile);
    const img = el.querySelector('img[data-src]');
    if (img) img.src = img.dataset.src;
    return tile;
}

function _tileImgHTML(src) {
    return `<span class="tile-placeholder">?</span>
            <img src="" data-src="${src}"
                 style="opacity:0;position:relative;z-index:2;"
                 onload="this.style.opacity='1'; const ph=this.parentElement.querySelector('.tile-placeholder'); if(ph) ph.style.opacity='0';"
                 onerror="this.style.opacity='0';">`;
}

let _cachedTileStep = null;
function _tileStep() {
    if (_cachedTileStep !== null) return _cachedTileStep;
    const style = getComputedStyle(document.documentElement);
    const size  = parseInt(style.getPropertyValue('--tile-size'), 10) || 138;
    const gap   = parseInt(style.getPropertyValue('--tile-gap'),  10) || 18;
    _cachedTileStep = size + gap;
    return _cachedTileStep;
}
window.addEventListener('resize', () => { _cachedTileStep = null; });

function _updateTilePos(tile) {
    const step = _tileStep();
    tile.element.style.transform =
        `translate(${(tile.pos % 4) * step}px, ${Math.floor(tile.pos / 4) * step}px)`;
}

function _boardIsBlocked(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = board[i * 4 + j];
            if (!cell) return false;
            const v = cell.val;
            if (j < 3 && board[i * 4 + j + 1]?.val === v) return false;
            if (i < 3 && board[(i + 1) * 4 + j]?.val === v) return false;
        }
    }
    return true;
}


// ═══════════════════════════════════════════════════════════════
// PERSISTENCIA — solo qué cartas están desbloqueadas
// Clave: "coleccionId:val"  ej: "astronomica:8", "anfibios:32"
// ═══════════════════════════════════════════════════════════════

const SAVE_KEY = 'erase_v3';
let unlockedCards = new Set();   // Set<string>

function _cardKey(collectionId, val) { return `${collectionId}:${val}`; }

function unlockCard(collectionId, val) {
    const k = _cardKey(collectionId, val);
    if (unlockedCards.has(k)) return false;
    unlockedCards.add(k);
    saveProgress();
    albumRefreshCard(collectionId, val);   // actualizar álbum si está abierto
    return true;
}

function isCardUnlocked(collectionId, val) {
    return unlockedCards.has(_cardKey(collectionId, val));
}

function saveProgress() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify([...unlockedCards])); }
    catch (e) {}
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) unlockedCards = new Set(JSON.parse(raw));
    } catch (e) { unlockedCards = new Set(); }
}

function resetProgress() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    unlockedCards = new Set();
    // Añadir regalos iniciales
    _giveInitialGifts();
    albumRebuild();
}

// Carta de regalo inicial: BigBang (val=2 de era astronomica)
function _giveInitialGifts() {
    unlockCard('astronomica', 2);
}


// ═══════════════════════════════════════════════════════════════
// SESIÓN
// ═══════════════════════════════════════════════════════════════

const session = {
    eraIdx : 0,
    main   : null,
    branch : null,
};

const activeState = () => session.branch ?? session.main;


// ═══════════════════════════════════════════════════════════════
// CALLBACKS Y DOM REFS
// ═══════════════════════════════════════════════════════════════

function makeCallbacks({ collectionId, onWin, onGameOverId }) {
    return {
        onDiscover(val, state) {
            state.discover(val);
            state.updateProgressBar();
            state.updateInfoPanel(val);
            unlockCard(collectionId, val);
            showTheatre(val, state);
        },
        onWin,
        onGameOver(state) {
            document.getElementById(onGameOverId).classList.add('active');
        },
    };
}

function _eraCollectionId() { return ERA_ORDER[session.eraIdx]; }

const MAIN_DOM = () => ({
    gridContainer : document.getElementById('grid-container'),
    progressBar   : document.getElementById('progress-bar'),
    scoreEl       : document.getElementById('score'),
    infoPanel     : document.getElementById('card-display'),
    slotPrefix    : 'slot-',
    slotClass     : 'progress-slot',
});

const BRANCH_DOM = () => ({
    gridContainer : document.getElementById('m-grid-container'),
    progressBar   : document.getElementById('m-progress-bar'),
    scoreEl       : document.getElementById('m-score'),
    infoPanel     : document.getElementById('m-card-display'),
    slotPrefix    : 'm-slot-',
    slotClass     : 'progress-slot subgame-slot',
});

function _eraAsDef(eraKey) {
    const era = ERAS[eraKey];
    return {
        id         : eraKey,
        data       : era.data,
        color      : 'var(--title-color)',
        panelTitle : era.panelTitle,
        isMain     : true,
    };
}


// ═══════════════════════════════════════════════════════════════
// ARRANQUE
// ═══════════════════════════════════════════════════════════════

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    loadProgress();
    if (unlockedCards.size === 0) _giveInitialGifts();
    _bootEra(0);
    albumRebuild();
}

function _bootEra(idx) {
    session.eraIdx = idx;
    const eraKey   = ERA_ORDER[idx];
    const era      = ERAS[eraKey];

    document.body.className                            = 'era-' + eraKey;
    document.getElementById('era-display').textContent = era.title;
    document.getElementById('panel-title').textContent = era.panelTitle;
    document.getElementById('panel-title').style.color = 'var(--title-color)';

    if (session.branch) {
        document.getElementById('investigacion-overlay').classList.remove('active');
        session.branch = null;
    }

    const collId = eraKey;
    session.main = new InvestigationState(
        _eraAsDef(eraKey),
        MAIN_DOM(),
        makeCallbacks({
            collectionId : collId,
            onWin        : () => setTimeout(() => onEraWin(idx), 1000),
            onGameOverId : 'game-over-overlay',
        })
    );
    session.main.reset();
    _launchEra();
}

function _launchEra() {
    const pos = Math.floor(Math.random() * 16);
    session.main.board[pos] = _createTile(2, pos, session.main);
    session.main.cb.onDiscover(2, session.main);
}

function onEraWin(idx) {
    // Mostrar overlay de victoria con botón para siguiente era
    const eraKey  = ERA_ORDER[idx];
    const nextIdx = idx + 1;
    const hasNext = nextIdx < ERA_ORDER.length;

    document.getElementById('overlay-title').textContent =
        `¡${ERAS[eraKey].title} completada!`;
    document.getElementById('overlay-text').textContent =
        hasNext ? `Prepárate para la siguiente era.` : `¡Has completado todas las eras!`;

    const nextBtn = document.getElementById('era-overlay-next-btn');
    nextBtn.style.display = hasNext ? 'inline-block' : 'none';
    nextBtn.onclick = () => nextEra();

    document.getElementById('era-overlay-close-btn').style.display = 'inline-block';
    document.getElementById('era-overlay').classList.add('active');
}

function nextEra() {
    document.getElementById('era-overlay').classList.remove('active');
    const nextIdx = session.eraIdx + 1;
    if (nextIdx < ERA_ORDER.length) _bootEra(nextIdx);
}

function restartEra() {
    document.getElementById('game-over-overlay').classList.remove('active');
    _bootEra(session.eraIdx);
}

function closeEraOverlay() {
    document.getElementById('era-overlay').classList.remove('active');
    // Abrir álbum mostrando la era recién completada
    _openAlbumOnEra(session.eraIdx);
}


// ═══════════════════════════════════════════════════════════════
// RAMAS (investigaciones)
// ═══════════════════════════════════════════════════════════════

function openBranch(type) {
    const inv = INVESTIGATIONS[type];
    document.getElementById('subgame-container').style.setProperty('--subgame-color', inv.color);
    document.getElementById('investigacion-title').textContent    = inv.title;
    document.getElementById('m-panel-title').textContent          = inv.panelTitle;
    document.getElementById('subgame-complete-title').style.color = inv.color;
    document.getElementById('subgame-complete-desc').textContent  = inv.completeDesc ?? '';

    if (session.branch) session.branch.reset();

    session.branch = new InvestigationState(
        { ...inv, id: type },
        BRANCH_DOM(),
        makeCallbacks({
            collectionId : type,
            onWin        : () => setTimeout(showBranchComplete, 1000),
            onGameOverId : 'subgame-game-over-overlay',
        })
    );
    session.branch.reset();
    document.getElementById('investigacion-overlay').classList.add('active');
    session.branch.addTile();
    session.branch.addTile();
}

function openInvestigacion(type) { openBranch(type); }

function closeInvestigacion() {
    session.branch = null;
    document.getElementById('investigacion-overlay').classList.remove('active');
}

function restartSubgame() {
    document.getElementById('subgame-game-over-overlay').classList.remove('active');
    session.branch.reset();
    session.branch.addTile();
    session.branch.addTile();
}

function showBranchComplete() {
    document.getElementById('subgame-complete-overlay').classList.add('active');
}

function closeSubgameComplete() {
    document.getElementById('subgame-complete-overlay').classList.remove('active');
    const completedBranchId = session.branch?.def?.id ?? null;
    closeInvestigacion();
    // Abrir álbum mostrando la rama recién completada
    if (completedBranchId) _openAlbumOnBranch(completedBranchId);
}


// ═══════════════════════════════════════════════════════════════
// TEATRO (tarjeta de descubrimiento)
// ═══════════════════════════════════════════════════════════════

function showTheatre(val, state) {
    const d = state.data[val];
    document.getElementById('theatre-img').src           = d.img;
    document.getElementById('theatre-title').textContent = d.n;
    document.getElementById('theatre-desc').textContent  = d.d  ?? '';
    document.getElementById('theatre-ext').textContent   = d.ext ?? '';
    const adapDiv = document.getElementById('theatre-adaptation');
    adapDiv.style.display = d.adap ? 'block' : 'none';
    if (d.adap) adapDiv.textContent = d.adap;
    document.getElementById('theatre-overlay').classList.add('active');
    theatre.state = state;
    theatre.val   = val;
}

const theatre = { state: null, val: null };

function closeTheatre() {
    document.getElementById('theatre-overlay').classList.remove('active');
    theatre.state = null;
    theatre.val   = null;
}


// ═══════════════════════════════════════════════════════════════
// ÁLBUM DE CROMOS
// Estado: qué era/rama está abierta, si hay subtira desplegada
// ═══════════════════════════════════════════════════════════════

const album = {
    openEraIdx  : null,   // índice de ERA desplegada (o null)
    openBranches: [],     // stack de branchIds abiertos, profundidad arbitraria
};

// ── Construcción del sidebar ──────────────────────────────────

function albumRebuild() {
    const col = document.getElementById('era-progress-column');
    col.innerHTML = '<div style="font-size:.8rem;font-weight:bold;opacity:.8;letter-spacing:2px;margin-bottom:8px;">ERAS</div>';

    ERA_ORDER.forEach((eraKey, i) => {
        const era   = ERAS[eraKey];
        const vals  = Object.keys(era.data).map(Number).sort((a,b) => a-b);
        // La caratula muestra la imagen de la primera carta si está desbloqueada
        const hasAny = vals.some(v => isCardUnlocked(eraKey, v));
        const coverVal = vals[0];
        const coverImg = era.data[coverVal].img;

        const slot = document.createElement('div');
        slot.className = 'era-slot' + (hasAny ? ' completed' : '');
        slot.id        = `era-sidebar-${i}`;
        slot.title     = era.title;
        slot.onclick   = () => albumToggleEra(i);

        if (hasAny) {
            slot.className = 'era-slot completed';
            slot.innerHTML = `<img src="${coverImg}" style="background:white;" onerror="this.style.display='none'">
                              <div style="font-weight:bold;font-size:.8rem;">${era.title}</div>`;
        } else {
            slot.className = 'era-slot era-blank';
            slot.innerHTML = `<div class="era-slot__img-blank"></div>
                              <div style="font-weight:bold;font-size:.8rem;color:#aaa;">${era.title}</div>`;
        }

        col.appendChild(slot);
    });
}

// Actualizar una carta en el álbum si está abierto
function albumRefreshCard(collectionId, val) {
    // Refrescar sidebar si la colección es una era
    const eraIdx = ERA_ORDER.indexOf(collectionId);
    if (eraIdx !== -1) albumRebuild();

    // Refrescar cromo en la tira abierta
    const card = document.querySelector(`.album-card[data-collection="${collectionId}"][data-val="${val}"]`);
    if (!card) return;
    const data = _collectionData(collectionId);
    if (!data) return;
    const d = data[val];
    card.classList.remove('album-card--blank');
    card.classList.add('album-card--unlocked');
    card.innerHTML = _albumCardInner(collectionId, val, d, true);
}

// ── Desplegar / cerrar era ────────────────────────────────────

function albumToggleEra(idx) {
    const panel = document.getElementById('album-panel');
    if (album.openEraIdx === idx) {
        album.openEraIdx   = null;
        album.openBranches = [];
        panel.innerHTML    = '';
        panel.classList.remove('active');
        document.getElementById('top-section').classList.remove('album-open');
        return;
    }
    album.openEraIdx   = idx;
    album.openBranches = [];
    panel.classList.add('active');
    document.getElementById('top-section').classList.add('album-open');
    _albumRenderPanel();
}

function _albumSectionHTML(collectionId, label, color, data, vals) {
    return `<div class="album-section" data-collection-id="${collectionId}">
        <div class="album-strip-label" style="color:${color};">${label}</div>
        <div class="album-strip">
            ${vals.slice(0, 9).map(v => _albumCardHTML(collectionId, v, data[v])).join('')}
        </div>
    </div>`;
}

function _albumRenderPanel() {
    const panel  = document.getElementById('album-panel');
    const eraKey = ERA_ORDER[album.openEraIdx];
    const era    = ERAS[eraKey];
    const vals   = Object.keys(era.data).map(Number).sort((a,b) => a-b);

    panel.innerHTML = '';

    // Sección de era
    const eraSection = document.createElement('div');
    eraSection.className = 'album-section';
    eraSection.setAttribute('data-collection-id', eraKey);
    eraSection.innerHTML = `
        <div class="album-strip-label" style="color:var(--title-color);">${era.title}</div>
        <div class="album-strip">
            ${vals.slice(0, 9).map(v => _albumCardHTML(eraKey, v, era.data[v])).join('')}
        </div>`;
    panel.appendChild(eraSection);

    // Secciones de ramas abiertas — profundidad arbitraria
    for (const branchId of album.openBranches) {
        panel.appendChild(_albumMakeBranchSection(branchId));
    }
}

function _albumMakeBranchSection(branchId) {
    const inv     = INVESTIGATIONS[branchId];
    const vals    = Object.keys(inv.data).map(Number).sort((a,b) => a-b);
    const section = document.createElement('div');
    section.className = 'album-section';
    section.setAttribute('data-collection-id', branchId);
    section.innerHTML = `
        <div class="album-strip-label" style="color:${inv.color};">↳ ${inv.title}</div>
        <div class="album-strip">
            ${vals.slice(0, 9).map(v => _albumCardHTML(branchId, v, inv.data[v])).join('')}
        </div>`;
    return section;
}

function _albumCardHTML(collectionId, val, d) {
    const unlocked = isCardUnlocked(collectionId, val);
    const cls      = 'album-card ' + (unlocked ? 'album-card--unlocked' : 'album-card--blank');

    // ¿Tiene portales a ramas desde esta carta?
    const portals      = _portalsForCard(collectionId, val);
    const subindexHTML = portals.map(targetId => {
        const inv    = INVESTIGATIONS[targetId];
        const active = album.openBranches.includes(targetId) ? ' album-subindex--active' : '';
        return `<div class="album-subindex${active}" 
                     style="border-color:${inv.color};"
                     onclick="event.stopPropagation(); albumToggleBranch('${targetId}', '${collectionId}');"
                     title="${inv.title}">
                    <span>${inv.panelTitle}</span>
                </div>`;
    }).join('');

    return `<div class="album-card-wrapper">
                <div class="${cls}" 
                     data-collection="${collectionId}" 
                     data-val="${val}"
                     onclick="albumCardClick('${collectionId}', ${val})">
                    ${_albumCardInner(collectionId, val, d, unlocked)}
                </div>
                ${subindexHTML ? `<div class="album-subindexes">${subindexHTML}</div>` : ''}
            </div>`;
}

function _albumCardInner(collectionId, val, d, unlocked) {
    if (!unlocked) {
        return `<div class="album-card__img-blank"></div>
                <div class="album-card__name" style="color:#ccc;">${d.n}</div>
                <div class="album-card__not-found">no conseguida</div>`;
    }
    // La imagen arranca con fondo blanco explícito para evitar residuos durante la carga
    return `<img src="${d.img}"
                 style="background:white;"
                 onerror="this.style.display='none'">
            <div class="album-card__name">${d.n}</div>`;
}

// Portales que salen de una carta concreta
function _portalsForCard(collectionId, val) {
    const eraIdx = ERA_ORDER.indexOf(collectionId);
    if (eraIdx !== -1) {
        // Carta de era: buscar en PORTALS[eraKey]
        return PORTALS[collectionId]?.[val] ?? [];
    }
    // Carta de rama: buscar en PORTALS.__subgame__[collectionId]
    return PORTALS.__subgame__?.[collectionId]?.[val] ?? [];
}

function _collectionData(collectionId) {
    const eraIdx = ERA_ORDER.indexOf(collectionId);
    if (eraIdx !== -1) return ERAS[collectionId].data;
    return INVESTIGATIONS[collectionId]?.data ?? null;
}

// ── Toggle de subtiras ────────────────────────────────────────

function albumToggleBranch(branchId, parentCollectionId) {
    const panel    = document.getElementById('album-panel');
    const existing = album.openBranches.indexOf(branchId);

    if (existing !== -1) {
        // Ya está abierta: cerrar esta y todas las que vienen después
        album.openBranches = album.openBranches.slice(0, existing);
    } else {
        // Nueva: truncar desde el padre hacia adelante y añadir esta
        const parentIdx = album.openBranches.indexOf(parentCollectionId);
        if (parentIdx !== -1) {
            // Cerrar cualquier rama que colgaba del mismo padre
            album.openBranches = album.openBranches.slice(0, parentIdx + 1);
        }
        album.openBranches.push(branchId);
    }

    _albumRenderPanel();

    void panel.offsetHeight;   // forzar reflow
    panel.scrollTop = panel.scrollHeight;
}

// ── Click en una carta ────────────────────────────────────────

function albumCardClick(collectionId, val) {
    // Determinar si es era o rama
    const eraIdx      = ERA_ORDER.indexOf(collectionId);
    const isEra       = eraIdx !== -1;
    const data        = _collectionData(collectionId);
    const vals        = Object.keys(data).map(Number).sort((a,b) => a-b);
    const cardIdx     = vals.indexOf(val);
    const unlocked    = isCardUnlocked(collectionId, val);

    // Mostrar modal de opciones
    _showCardModal({ collectionId, val, isEra, eraIdx, cardIdx, vals, data, unlocked });
}

// ── Modal de carta ────────────────────────────────────────────

function _showCardModal({ collectionId, val, isEra, eraIdx, cardIdx, vals, data, unlocked }) {
    const modal   = document.getElementById('card-modal-overlay');
    const d       = data[val];
    const color   = isEra
        ? 'var(--title-color)'
        : (INVESTIGATIONS[collectionId]?.color ?? '#aaa');

    document.getElementById('card-modal-img').src             = unlocked ? d.img : '';
    document.getElementById('card-modal-title').textContent   = unlocked ? d.n   : '???';
    document.getElementById('card-modal-title').style.color   = color;
    document.getElementById('card-modal-desc').textContent    = unlocked ? (d.d ?? '') : '';
    document.getElementById('card-modal-status').textContent  = unlocked ? '✓ Conseguida' : '✗ Aún no conseguida';
    document.getElementById('card-modal-status').style.color  = unlocked ? '#2ecc71' : '#e74c3c';

    // Botón Teatro: solo si desbloqueada
    const theatreBtn = document.getElementById('card-modal-theatre-btn');
    theatreBtn.style.display = unlocked ? 'block' : 'none';
    theatreBtn.onclick = () => {
        closeCardModal();
        _openTheatreAlbum(collectionId, cardIdx, vals, data);
    };

    // Botón Jugar
    const playBtn = document.getElementById('card-modal-play-btn');
    playBtn.onclick = () => {
        closeCardModal();
        albumClose();
        if (isEra) {
            _bootEra(eraIdx);
        } else {
            openBranch(collectionId);
        }
    };

    modal.style.display = 'flex';
}

function closeCardModal() {
    document.getElementById('card-modal-overlay').style.display = 'none';
}

// Teatro navegable desde el álbum (incluye cartas en blanco)
function _openTheatreAlbum(collectionId, startIdx, vals, data) {
    _theatreAlbum = { collectionId, vals, data, idx: startIdx };
    _renderTheatreAlbum();
    document.getElementById('theatre-overlay').classList.add('active');
}

let _theatreAlbum = null;

function _renderTheatreAlbum() {
    if (!_theatreAlbum) return;
    const { collectionId, vals, data, idx } = _theatreAlbum;
    const val      = vals[idx];
    const unlocked = isCardUnlocked(collectionId, val);
    const d        = data[val];
    const scroll   = document.querySelector('#theatre-overlay .card-content-scroll');

    if (unlocked) {
        // Carta conseguida — formato normal
        const img = document.getElementById('theatre-img');
        img.style.display = 'block';
        img.style.background = 'white';
        img.src = d.img;

        const blankDiv = document.getElementById('theatre-img-blank');
        if (blankDiv) blankDiv.remove();

        document.getElementById('theatre-title').textContent = d.n;
        document.getElementById('theatre-title').className   = '';
        document.getElementById('theatre-desc').textContent  = d.d  ?? '';
        document.getElementById('theatre-desc').className    = 'card-subtitle';
        document.getElementById('theatre-ext').textContent   = d.ext ?? '';
        document.getElementById('theatre-ext').className     = 'card-scientific-text';

        const notFound = document.getElementById('theatre-not-found');
        if (notFound) notFound.remove();

        const adapDiv = document.getElementById('theatre-adaptation');
        adapDiv.style.display = d.adap ? 'block' : 'none';
        if (d.adap) adapDiv.textContent = d.adap;
    } else {
        // Carta no conseguida — formato en blanco
        const img = document.getElementById('theatre-img');
        img.style.display = 'none';
        img.src = '';

        // Insertar/reutilizar rectángulo gris
        let blankDiv = document.getElementById('theatre-img-blank');
        if (!blankDiv) {
            blankDiv = document.createElement('div');
            blankDiv.id        = 'theatre-img-blank';
            blankDiv.className = 'theatre-img-blank';
            img.parentNode.insertBefore(blankDiv, img.nextSibling);
        }

        document.getElementById('theatre-title').textContent = d.n;
        document.getElementById('theatre-title').className   = 'theatre-title--blank';
        document.getElementById('theatre-desc').textContent  = '';
        document.getElementById('theatre-desc').className    = '';
        document.getElementById('theatre-ext').textContent   = '';
        document.getElementById('theatre-ext').className     = '';
        document.getElementById('theatre-adaptation').style.display = 'none';

        // Texto "no conseguida"
        let notFound = document.getElementById('theatre-not-found');
        if (!notFound) {
            notFound = document.createElement('p');
            notFound.id        = 'theatre-not-found';
            notFound.className = 'theatre-not-found';
            notFound.textContent = 'Carta no conseguida aún';
            blankDiv.insertAdjacentElement('afterend', notFound);
        }
    }

    if (scroll) scroll.scrollTop = 0;

    // Nav buttons
    document.getElementById('theatre-nav-left').style.visibility  = idx > 0              ? 'visible' : 'hidden';
    document.getElementById('theatre-nav-right').style.visibility = idx < vals.length - 1 ? 'visible' : 'hidden';
}

function theatreAlbumNav(dir) {
    if (!_theatreAlbum) return;
    _theatreAlbum.idx = Math.max(0, Math.min(_theatreAlbum.vals.length - 1, _theatreAlbum.idx + dir));
    _renderTheatreAlbum();
}

function closeTheatre() {
    document.getElementById('theatre-overlay').classList.remove('active');
    theatre.state = null;
    theatre.val   = null;
    _theatreAlbum = null;
}

// ── Cerrar álbum ──────────────────────────────────────────────

function albumClose() {
    album.openEraIdx   = null;
    album.openBranches = [];
    const panel = document.getElementById('album-panel');
    panel.innerHTML = '';
    panel.classList.remove('active');
    document.getElementById('top-section').classList.remove('album-open');
}

// Abrir álbum directamente en una era (por índice)
function _openAlbumOnEra(idx) {
    album.openEraIdx   = idx;
    album.openBranches = [];
    const panel = document.getElementById('album-panel');
    panel.classList.add('active');
    document.getElementById('top-section').classList.add('album-open');
    _albumRenderPanel();
}

// Abrir álbum en la era que contiene la rama y desplegar esa rama
function _openAlbumOnBranch(branchId) {
    const { eraIdx, parentBranchIds } = _resolveBranchOrigin(branchId);
    album.openEraIdx   = eraIdx;
    // Reconstruir la cadena de ramas hasta la completada
    album.openBranches = [...parentBranchIds, branchId];
    const panel = document.getElementById('album-panel');
    panel.classList.add('active');
    document.getElementById('top-section').classList.add('album-open');
    _albumRenderPanel();
    void panel.offsetHeight;
    panel.scrollTop = panel.scrollHeight;
}


// ═══════════════════════════════════════════════════════════════
// INPUTS
// ═══════════════════════════════════════════════════════════════

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (document.getElementById('theatre-overlay').classList.contains('active')) { closeTheatre(); return; }
        if (document.getElementById('card-modal-overlay').style.display === 'flex')  { closeCardModal(); return; }
        if (album.openEraIdx !== null) { albumClose(); return; }
    }

    // Teatro: teclas de navegación
    if (_theatreAlbum && document.getElementById('theatre-overlay').classList.contains('active')) {
        if (e.key === 'ArrowLeft')  { theatreAlbumNav(-1); return; }
        if (e.key === 'ArrowRight') { theatreAlbumNav(1);  return; }
        if (e.key === ' ' || e.key === 'Enter') { closeTheatre(); return; }
    }

    // Teatro de descubrimiento (durante el juego)
    if (theatre.state && document.getElementById('theatre-overlay').classList.contains('active')) {
        closeTheatre(); return;
    }

    if (album.openEraIdx !== null) return;   // álbum abierto → no mover fichas

    const DIR = { ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT',
                  w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT' };
    if (DIR[e.key]) { e.preventDefault(); activeState()?.move(DIR[e.key]); }
});


// ═══════════════════════════════════════════════════════════════
// PANEL DE DESARROLLO
// ═══════════════════════════════════════════════════════════════

function _resolveBranchOrigin(branchId) {
    for (const [eKey, portals] of Object.entries(PORTALS)) {
        if (eKey === '__subgame__') continue;
        for (const targets of Object.values(portals)) {
            if (targets.includes(branchId)) return { eraIdx: ERA_ORDER.indexOf(eKey), parentBranchIds: [] };
        }
    }
    if (PORTALS.__subgame__) {
        for (const [parentId, portals] of Object.entries(PORTALS.__subgame__)) {
            for (const targets of Object.values(portals)) {
                if (targets.includes(branchId)) {
                    const origin = _resolveBranchOrigin(parentId);
                    return { eraIdx: origin.eraIdx, parentBranchIds: [...origin.parentBranchIds, parentId] };
                }
            }
        }
    }
    return { eraIdx: 0, parentBranchIds: [] };
}

function startSubGameDirectly() {
    const sel = document.getElementById('dev-subgame-select').value;
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.getElementById('era-options-overlay').style.display = 'none';
    document.getElementById('start-screen').style.display        = 'none';
    albumClose();
    session.branch = null;

    const eraIdx = ERA_ORDER.indexOf(sel);
    if (eraIdx !== -1) { _bootEra(eraIdx); return; }

    if (INVESTIGATIONS[sel]) {
        const { eraIdx: ei, parentBranchIds } = _resolveBranchOrigin(sel);
        parentBranchIds.forEach(id => {
            Object.keys(INVESTIGATIONS[id].data).map(Number).forEach(v => unlockCard(id, v));
        });
        _bootEra(ei);
        openBranch(sel);
        return;
    }

    if (sel.startsWith('end-sub-')) {
        const type = sel.replace('end-sub-', '');
        const inv  = INVESTIGATIONS[type];
        if (!inv) return;
        const { eraIdx: ei, parentBranchIds } = _resolveBranchOrigin(type);
        parentBranchIds.forEach(id => {
            Object.keys(INVESTIGATIONS[id].data).map(Number).forEach(v => unlockCard(id, v));
        });
        Object.keys(inv.data).map(Number).forEach(v => unlockCard(type, v));
        _bootEra(ei);
        openBranch(type);
        session.branch.discovered = Object.keys(inv.data).map(Number).sort((a,b) => a-b);
        session.branch.updateProgressBar();
        setTimeout(showBranchComplete, 150);
        return;
    }

    if (sel.startsWith('end-')) {
        const key = sel.replace('end-', '');
        const idx = ERA_ORDER.indexOf(key);
        if (idx === -1) return;
        Object.keys(ERAS[key].data).map(Number).forEach(v => unlockCard(key, v));
        _bootEra(idx);
        session.main.discovered = Object.keys(ERAS[key].data).map(Number).sort((a,b) => a-b);
        session.main.updateProgressBar();
        onEraWin(idx);
    }
}

/* ============================================================
   ÉRASE QUE SE ERA — Motor de juego
   Pasos 3-4-5: condicionales → datos / estado unificado / árbol

   Depende de: data.js  (ERAS, INVESTIGATIONS, PORTALS, ERA_ORDER)

   ARQUITECTURA
   ─────────────────────────────────────────────────────────────
   InvestigationState   Estado completo de una partida.
                        Tronco y ramas usan la misma clase,
                        sin ningún flag "isBranch" en el motor.

   session              Sesión global: era actual, instancias
                        main y branch.

   ui                   Estado de la capa de presentación:
                        theatre, catálogo, overlays pendientes.

   Callbacks            Contrato entre el motor y la UI.
                        makeCallbacks(cfg) devuelve el juego de
                        funciones correcto según la configuración,
                        sin if/else de tipo en el motor.

   ÁRBOL EVOLUTIVO EN DATOS  (data.js, no aquí)
   ─────────────────────────────────────────────────────────────
   ERAS          → tronco principal (historia lineal)
   INVESTIGATIONS → ramas (pueden apuntar a sub-ramas via PORTALS)
   PORTALS        → tabla de activación  nodo→[ramas]
                    Añadir una rama nueva = 1 entrada en cada tabla.
                    Cero cambios en este archivo.
   ============================================================ */


// ═══════════════════════════════════════════════════════════════
// CLASE: InvestigationState
// Una instancia = una partida completa (tronco O rama).
// El motor no distingue entre los dos casos.
// ═══════════════════════════════════════════════════════════════

class InvestigationState {
    /**
     * @param {object} def         Descriptor de contenido (de INVESTIGATIONS o _eraAsDef).
     *   def.id          string    Identificador único  ('vida', 'anfibios', …)
     *   def.data        object    Mapa val→ficha  { 2:{n,img,d,…}, 4:…, … }
     *   def.color       string    Color temático CSS
     *   def.winTile     number?   Valor de victoria (por defecto: máximo de def.data)
     *   def.panelTitle  string    Título del panel lateral
     *   def.completeMsg string?   Mensaje al completar (solo ramas)
     *   def.isMain      bool?     true = tronco; omitido/false = rama
     *
     * @param {object} domRefs     Referencias a elementos del DOM
     *   .gridContainer  .progressBar  .scoreEl  .infoPanel
     *   .slotPrefix     .slotClass
     *
     * @param {object} callbacks
     *   .onDiscover(val, state)
     *   .onWin(state)
     *   .onGameOver(state)
     */
    constructor(def, domRefs, callbacks) {
        this.def       = def;
        this.data      = def.data;
        this.dom       = domRefs;
        this.cb        = callbacks;

        // winTile: explícito en def, o el mayor valor presente en data
        this.winTile   = def.winTile ?? Math.max(...Object.keys(def.data).map(Number));

        this.board      = Array(16).fill(null);
        this.score      = 0;
        this.discovered = [];   // valores descubiertos, en orden
    }

    // ── Descubrimientos ───────────────────────────────────────

    hasDiscovered(val)  { return this.discovered.includes(val); }

    discover(val) {
        if (this.hasDiscovered(val)) return false;
        this.discovered.push(val);
        this.discovered.sort((a, b) => a - b);
        return true;
    }

    get isComplete() { return this.discovered.includes(this.winTile); }

    // ── Init / Reset ──────────────────────────────────────────

    reset() {
        this.board.forEach(t => { if (t?.element) t.element.remove(); });
        this.dom.gridContainer.innerHTML = '';
        this.board      = Array(16).fill(null);
        this.score      = 0;
        this.discovered = [];
        this.dom.scoreEl.textContent = '0';
        this.dom.infoPanel.innerHTML =
            `<div style="opacity:.5;text-align:center;">${
                this.def.isMain ? 'Usa las flechas para jugar…' : 'Explora la ramificación…'
            }</div>`;
        this._initProgressBar();
    }

    // ── Barra de progreso ─────────────────────────────────────

    _initProgressBar() {
        this.dom.progressBar.innerHTML = '';
        Object.keys(this.data)
            .map(Number)
            .sort((a, b) => a - b)
            .forEach(k => {
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

        // Al completar todos los tiles, los slots abren el catálogo
        if (this.isComplete) {
            const snap     = [...this.discovered];
            const snapData = { ...this.data };
            snap.forEach((val, idx) => {
                const slot = document.getElementById(this.dom.slotPrefix + val);
                if (slot) {
                    slot.style.cursor = 'pointer';
                    slot.title        = 'Ver ficha';
                    slot.onclick      = () => openCatalogWithData(idx, snap, snapData);
                }
            });
        }
    }

    // ── Panel lateral ─────────────────────────────────────────

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

    // ── Motor de fichas ───────────────────────────────────────

    addTile() {
        const empty = this.board
            .map((v, i) => v === null ? i : null)
            .filter(i => i !== null);
        if (!empty.length) return;

        const pos = empty[Math.floor(Math.random() * empty.length)];
        const val = Math.random() < 0.9 ? 2 : 4;
        this.board[pos] = _createTile(val, pos, this);

        // Primera ficha colocada = primer descubrimiento
        if (this.discovered.length === 0 && val === 2) {
            this.cb.onDiscover(2, this);
        }

        setTimeout(() => {
            if (!this.board.includes(null) && _boardIsBlocked(this.board)) {
                this.cb.onGameOver(this);
            }
        }, 300);
    }

    // ── Motor de movimiento ───────────────────────────────────

    move(dir) {
        const isVert = dir === 'UP'    || dir === 'DOWN';
        const isRev  = dir === 'RIGHT' || dir === 'DOWN';
        let   moved  = false;

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
                        // deslizar
                        this.board[a]   = this.board[b];
                        this.board[b]   = null;
                        this.board[a].pos = a;
                        _updateTilePos(this.board[a]);
                        moved = true;

                    } else if (this.board[a].val === this.board[b].val && !this.board[a].merged) {
                        // fusionar
                        const dead = this.board[b];
                        const nv   = this.board[a].val * 2;
                        this.board[a].val    = nv;
                        this.board[a].merged = true;
                        this.score          += nv;

                        dead.pos = a;
                        _updateTilePos(dead);

                        const el    = this.board[a].element;
                        const snap  = this;   // captura para el closure

                        setTimeout(() => {
                            dead.element.remove();
                            el.innerHTML = _tileImgHTML(snap.data[nv].img);
                            el.setAttribute('data-value', nv);
                            // Lanzar carga de imagen ahora que el elemento está en el DOM
                            const img = el.querySelector('img[data-src]');
                            if (img) img.src = img.dataset.src;

                            if (!snap.hasDiscovered(nv)) snap.cb.onDiscover(nv, snap);
                            else if (nv === snap.winTile) snap.cb.onWin(snap);
                        }, 150);

                        this.board[b] = null;
                        moved = true;
                        break;

                    } else break;
                    k--;
                }
            }
        }

        if (moved) {
            this.board.forEach(t => t && (t.merged = false));
            this.dom.scoreEl.textContent = this.score;
            setTimeout(() => this.addTile(), 180);
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
    // Disparar carga de imagen ahora que el elemento está en el DOM
    const img = el.querySelector('img[data-src]');
    if (img) img.src = img.dataset.src;
    return tile;
}

// Devuelve el HTML de la imagen de una ficha.
// Muestra un '?' mientras la imagen no está cargada, sin residuos de la anterior.
function _tileImgHTML(src) {
    // La imagen empieza invisible con src vacío para evitar residuos.
    // El span '?' actúa de placeholder hasta que onload lo elimina.
    return `<span class="tile-placeholder">?</span>
            <img src="" data-src="${src}"
                 style="opacity:0;position:relative;z-index:2;"
                 onload="this.style.opacity='1'; const ph=this.parentElement.querySelector('.tile-placeholder'); if(ph) ph.style.opacity='0';"
                 onerror="this.style.opacity='0';">`;
}

function _updateTilePos(tile) {
    tile.element.style.transform =
        `translate(${(tile.pos % 4) * 156}px, ${Math.floor(tile.pos / 4) * 156}px)`;
}

function _boardIsBlocked(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const v = board[i * 4 + j].val;
            if (j < 3 && board[i * 4 + j + 1]?.val === v) return false;
            if (i < 3 && board[(i + 1) * 4 + j]?.val === v) return false;
        }
    }
    return true;
}


// ═══════════════════════════════════════════════════════════════
// SESIÓN  (estado de nivel superior)
// ═══════════════════════════════════════════════════════════════

const session = {
    eraIdx           : 0,      // índice de la era que se está jugando
    maxEraIdx        : 0,      // máximo índice alcanzado (para el sidebar)
    main             : null,   // InvestigationState del tronco activo
    branch           : null,   // InvestigationState de la rama activa (o null)
    completedBranches: new Set(), // ids de ramas superadas en esta sesión
};

// La instancia que recibe los inputs en cada momento
const activeState = () => session.branch ?? session.main;


// ═══════════════════════════════════════════════════════════════
// ESTADO DE UI
// ═══════════════════════════════════════════════════════════════

const uiState = {
    theatreOpen      : false,
    pendingEndEra    : false,
    pendingBranchEnd : false,
    catalogIdx       : 0,
    catalogSnap      : null,   // {discovered, data, branchId} snapshot activo
    catalogIsBranch  : false,
    catalogStack     : [],     // pila de snapshots para navegar rama→sub-rama (atrás)
};


// ═══════════════════════════════════════════════════════════════
// FÁBRICA DE CALLBACKS
// Recibe una configuración mínima; el motor no decide nada.
// ═══════════════════════════════════════════════════════════════

function makeCallbacks({ onWin, onGameOverId }) {
    return {
        onDiscover(val, state) {
            state.discover(val);
            state.updateProgressBar();
            state.updateInfoPanel(val);
            showTheatre(val, state);
        },
        onWin,
        onGameOver(state) {
            document.getElementById(onGameOverId).classList.add('active');
        },
    };
}

const MAIN_CALLBACKS = makeCallbacks({
    onWin       : ()  => setTimeout(triggerEraEnd, 1000),
    onGameOverId: 'game-over-overlay',
});

const BRANCH_CALLBACKS = makeCallbacks({
    onWin       : ()  => setTimeout(showBranchComplete, 1000),
    onGameOverId: 'subgame-game-over-overlay',
});


// ═══════════════════════════════════════════════════════════════
// DESCRIPTORES DOM
// ═══════════════════════════════════════════════════════════════

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


// ═══════════════════════════════════════════════════════════════
// ENVOLTURA DE ERA  (adapta ERAS a la misma interfaz que INVESTIGATIONS)
// ═══════════════════════════════════════════════════════════════

function _eraAsDef(eraKey) {
    const era = ERAS[eraKey];
    return {
        id         : eraKey,
        data       : era.data,
        color      : 'var(--title-color)',
        panelTitle : era.panelTitle,
        isMain     : true,
        // winTile se infiere automáticamente del máximo de data
    };
}


// ═══════════════════════════════════════════════════════════════
// ARRANQUE Y NAVEGACIÓN DE ERAS
// ═══════════════════════════════════════════════════════════════

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    // maxEraIdx=0 significa "ninguna completada, era 0 disponible para empezar"
    session.maxEraIdx = 0;
    _bootEra(0);
}

function _bootEra(idx) {
    session.eraIdx = idx;
    const eraKey   = ERA_ORDER[idx];
    const era      = ERAS[eraKey];

    document.body.className                             = 'era-' + eraKey;
    document.getElementById('era-display').textContent  = era.title;
    document.getElementById('panel-title').textContent  = era.panelTitle;
    document.getElementById('panel-title').style.color  = 'var(--title-color)';

    // Limpiar rama anterior si la hubiera
    if (session.branch) {
        document.getElementById('investigacion-overlay').classList.remove('active');
        session.branch = null;
    }

    session.main = new InvestigationState(_eraAsDef(eraKey), MAIN_DOM(), MAIN_CALLBACKS);
    session.main.reset();

    rebuildEraSidebar();
    // El tablero arranca vacío: el jugador confirma desde el sidebar para lanzar la primera ficha
}

// Llamado cuando el jugador acepta comenzar una era desde el modal de confirmación
function launchEra() {
    closeEraConfirm();
    // Primera ficha siempre es el elemento 2 de esta era
    const pos = Math.floor(Math.random() * 16);
    session.main.board[pos] = _createTile(2, pos, session.main);
    session.main.cb.onDiscover(2, session.main);
}

function nextEra() {
    // Marcar la era actual como completada en el sidebar
    const key  = ERA_ORDER[session.eraIdx];
    const slot = document.getElementById(`era-slot-${session.eraIdx}`);
    if (slot) {
        const cap      = session.eraIdx;
        slot.className = 'era-slot completed';
        slot.innerHTML = `<img src="${ERAS[key].data[2].img}" onerror="this.style.display='none'">
                          <div style="font-weight:bold;">${ERAS[key].title}</div>`;
        slot.title     = 'Volver a jugar esta Era';
        slot.onclick   = () => confirmReplayEra(cap);
    }

    document.getElementById('era-overlay').classList.remove('active');

    const nextIdx = session.eraIdx + 1;

    // La era actual queda marcada como completada
    session.maxEraIdx = nextIdx;   // = número de eras completadas

    if (nextIdx >= ERA_ORDER.length) {
        // No hay más eras
        rebuildEraSidebar();
        return;
    }

    // Preparar la siguiente (tablero vacío): el jugador decide cuándo pinchar
    _bootEra(nextIdx);
}

function restartEra()        { document.getElementById('game-over-overlay').classList.remove('active'); _bootEra(session.eraIdx); }
function replayEra(idx)      { closeEraOptions(); _bootEra(idx); }


// ═══════════════════════════════════════════════════════════════
// FIN DE ERA  — resumen + portales leídos de PORTALS
// ═══════════════════════════════════════════════════════════════

function triggerEraEnd() {
    const eraKey     = ERA_ORDER[session.eraIdx];
    const eraPortals = PORTALS[eraKey] ?? {};

    document.getElementById('overlay-text').textContent = 'Has completado la ' + ERAS[eraKey].title;

    document.getElementById('sequence-container').innerHTML =
        _buildSequenceHTML(session.main.discovered, session.main.data, eraPortals, {
            overlayToClose : 'era-overlay',
            cardClick      : (idx) => `openCatalog(${idx}, false)`,
        });

    document.getElementById('era-overlay').classList.add('active');
}


// ═══════════════════════════════════════════════════════════════
// RAMAS (investigaciones)
// ═══════════════════════════════════════════════════════════════

function openBranch(type) {
    // Compatibilidad: puede llamarse openInvestigacion desde el HTML antiguo
    const inv = INVESTIGATIONS[type];

    document.getElementById('subgame-container').style.setProperty('--subgame-color', inv.color);
    document.getElementById('investigacion-title').textContent    = inv.title;
    document.getElementById('m-panel-title').textContent          = inv.panelTitle;
    document.getElementById('subgame-complete-title').style.color = inv.color;
    document.getElementById('subgame-complete-desc').textContent  = inv.completeDesc;

    session.branch = new InvestigationState(inv, BRANCH_DOM(), BRANCH_CALLBACKS);
    session.branch.reset();

    document.getElementById('investigacion-overlay').classList.add('active');
    session.branch.addTile();
    session.branch.addTile();
}

function openInvestigacion(type) { openBranch(type); }   // alias HTML

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
    const state      = session.branch;
    const subPortals = PORTALS.__subgame__?.[state.def.id] ?? {};

    document.getElementById('m-sequence-container').innerHTML =
        _buildSequenceHTML(state.discovered, state.data, subPortals, {
            overlayToClose : 'subgame-complete-overlay',
            cardClick      : (idx) => `openCatalog(${idx}, true)`,
        });

    document.getElementById('subgame-complete-overlay').classList.add('active');
}

function closeSubgameComplete() {
    // Registrar la rama como superada antes de cerrar
    if (session.branch) session.completedBranches.add(session.branch.def.id);
    document.getElementById('subgame-complete-overlay').classList.remove('active');
    closeInvestigacion();
}


// ═══════════════════════════════════════════════════════════════
// CONSTRUCTOR DE HTML DE SECUENCIA (portales + tarjetas)
// Función pura: recibe datos, devuelve string HTML.
// Usada tanto en triggerEraEnd como en showBranchComplete.
// ═══════════════════════════════════════════════════════════════

function _buildSequenceHTML(discovered, data, portals, { overlayToClose, cardClick }) {
    return discovered.map((val, idx) => {
        const d       = data[val];
        const targets = portals[val] ?? [];

        const gatewayHTML = targets.map(targetId => {
            const inv = INVESTIGATIONS[targetId];
            return `<div class="subgame-gateway-above"
                         style="border-color:${inv.color};color:${inv.color};"
                         onclick="event.stopPropagation();
                                  document.getElementById('${overlayToClose}').classList.remove('active');
                                  openBranch('${targetId}');">
                        <span style="color:white;">INVESTIGAR</span>
                        <span>${inv.panelTitle}</span>
                    </div>`;
        }).join('');

        return `<div class="sequence-card-wrapper">
                    <div class="gateway-placeholder">${gatewayHTML}</div>
                    <div class="sequence-card" onclick="${cardClick(idx)}">
                        <img src="${d.img}" onerror="this.style.display='none'">
                        <div class="card-title">${d.n}</div>
                    </div>
                </div>`;
    }).join('');
}


// ═══════════════════════════════════════════════════════════════
// THEATRE
// ═══════════════════════════════════════════════════════════════

function showTheatre(val, state) {
    uiState.theatreOpen = true;
    const d   = state.data[val];
    const img = document.getElementById('theatre-img');

    // Limpiar imagen anterior antes de cargar la nueva: evita residuos visuales
    img.style.opacity = '0';
    img.src           = '';
    img.onload  = () => { img.style.opacity = '1'; };
    img.onerror = () => { img.style.opacity = '0'; };
    // Asignar después del vaciado para que el navegador lo trate como carga nueva
    requestAnimationFrame(() => { img.src = d.img; });

    document.getElementById('theatre-title').textContent = d.n;
    document.getElementById('theatre-desc').textContent  = d.d;
    document.getElementById('theatre-ext').textContent   = d.ext ?? '';

    const adapDiv = document.getElementById('theatre-adaptation');
    adapDiv.style.display = d.adap ? 'block' : 'none';
    if (d.adap) adapDiv.textContent = d.adap;

    document.getElementById('theatre-overlay').classList.add('active');

    if (val === state.winTile) {
        if (state === session.branch) uiState.pendingBranchEnd = true;
        else                          uiState.pendingEndEra    = true;
    }
}

function closeTheatre() {
    document.getElementById('theatre-overlay').classList.remove('active');
    uiState.theatreOpen = false;
    if (uiState.pendingEndEra)    { uiState.pendingEndEra    = false; setTimeout(triggerEraEnd,     300); }
    if (uiState.pendingBranchEnd) { uiState.pendingBranchEnd = false; setTimeout(showBranchComplete, 300); }
}


// ═══════════════════════════════════════════════════════════════
// CATÁLOGO
// ═══════════════════════════════════════════════════════════════

function openCatalog(idx, isBranch = false) {
    uiState.catalogIsBranch = isBranch;
    uiState.catalogSnap     = null;
    uiState.catalogIdx      = idx;
    _renderCatalog();
    document.getElementById('catalog-overlay').classList.add('active');
}

function openCatalogWithData(idx, snapDiscovered, snapData) {
    uiState.catalogSnap     = { discovered: snapDiscovered, data: snapData };
    uiState.catalogIsBranch = false;
    uiState.catalogIdx      = idx;
    _renderCatalog();
    document.getElementById('catalog-overlay').classList.add('active');
}

function closeCatalog() {
    document.getElementById('catalog-overlay').classList.remove('active');
    uiState.catalogSnap  = null;
    uiState.catalogStack = [];
}

function changeCatalog(dir) { uiState.catalogIdx += dir; _renderCatalog(); }

function _renderCatalog() {
    // Fuente de datos: snapshot > branch > main
    const src = uiState.catalogSnap
        ?? (uiState.catalogIsBranch
            ? { discovered: session.branch.discovered, data: session.branch.data }
            : { discovered: session.main.discovered,   data: session.main.data });

    const val = src.discovered[uiState.catalogIdx];
    const d   = src.data[val];

    // Limpiar imagen antes de asignar (evita residuo visual)
    const catImg = document.getElementById('catalog-img');
    catImg.style.opacity = '0';
    catImg.src = '';
    catImg.onload  = () => { catImg.style.opacity = '1'; };
    catImg.onerror = () => { catImg.style.opacity = '0'; };
    requestAnimationFrame(() => { catImg.src = d.img; });

    document.getElementById('catalog-title').textContent = d.n;
    document.getElementById('catalog-desc').textContent  = d.d;
    document.getElementById('catalog-ext').textContent   = d.ext ?? '';

    const adapDiv = document.getElementById('catalog-adaptation');
    adapDiv.style.display = d.adap ? 'block' : 'none';
    if (d.adap) adapDiv.textContent = d.adap;

    document.getElementById('cat-btn-left').style.visibility  =
        uiState.catalogIdx === 0                          ? 'hidden' : 'visible';
    document.getElementById('cat-btn-right').style.visibility =
        uiState.catalogIdx === src.discovered.length - 1 ? 'hidden' : 'visible';

    // Portales a ramas superadas asociadas a esta carta
    _renderCatalogBranchPortals(src.branchId ?? null, val);

    // Botón "atrás" si hay pila de navegación
    const backBtn = document.getElementById('cat-btn-back');
    if (backBtn) backBtn.style.display = uiState.catalogStack.length > 0 ? 'block' : 'none';
}

// Muestra (o limpia) los botones de portal a ramas superadas desde el catálogo
function _renderCatalogBranchPortals(contextBranchId, val) {
    const container = document.getElementById('catalog-branch-portals');
    if (!container) return;
    container.innerHTML = '';

    // Determinar qué tabla de portales aplica:
    // Si estamos viendo el catálogo de una rama, mirar PORTALS.__subgame__[branchId]
    // Si estamos viendo el catálogo de una era, mirar PORTALS[eraKey]
    let portals = {};
    if (contextBranchId) {
        portals = PORTALS.__subgame__?.[contextBranchId] ?? {};
    } else {
        const eraKey = ERA_ORDER[session.eraIdx];
        portals = PORTALS[eraKey] ?? {};
    }

    const targets = portals[val] ?? [];
    targets.forEach(branchId => {
        if (!session.completedBranches.has(branchId)) return;
        const inv = INVESTIGATIONS[branchId];
        const btn = document.createElement('div');
        btn.className = 'catalog-branch-portal';
        btn.style.cssText = `border-color:${inv.color};color:${inv.color};`;
        btn.innerHTML = `<span style="font-size:.7rem;opacity:.8;">📖 VER GALERÍA</span>
                         <span style="font-weight:bold;">${inv.panelTitle}</span>`;
        btn.onclick = () => _openBranchCatalog(branchId);
        container.appendChild(btn);
    });
}

// Abre el catálogo de solo lectura de una rama superada, apilando el estado actual
function _openBranchCatalog(branchId) {
    const inv  = INVESTIGATIONS[branchId];
    const disc = Object.keys(inv.data).map(Number).sort((a, b) => a - b);

    // Apilar el estado actual para poder volver
    uiState.catalogStack.push({
        snap     : uiState.catalogSnap,
        idx      : uiState.catalogIdx,
        isBranch : uiState.catalogIsBranch,
    });

    uiState.catalogSnap     = { discovered: disc, data: inv.data, branchId };
    uiState.catalogIsBranch = false;
    uiState.catalogIdx      = 0;
    _renderCatalog();
}

// Vuelve al catálogo anterior (desapila)
function _catalogGoBack() {
    if (!uiState.catalogStack.length) return;
    const prev = uiState.catalogStack.pop();
    uiState.catalogSnap     = prev.snap;
    uiState.catalogIdx      = prev.idx;
    uiState.catalogIsBranch = prev.isBranch;
    _renderCatalog();
}


// ═══════════════════════════════════════════════════════════════
// SIDEBAR DE ERAS
// ═══════════════════════════════════════════════════════════════

function rebuildEraSidebar() {
    const col = document.getElementById('era-progress-column');
    col.innerHTML =
        '<div style="font-size:.8rem;font-weight:bold;opacity:.8;letter-spacing:2px;">HISTORIA</div>';

    // session.maxEraIdx = número de eras COMPLETADAS
    // Estado de cada slot i:
    //   i < maxEraIdx          → COMPLETADA  (miniatura clicable)
    //   i === maxEraIdx        → DISPONIBLE  (? pulsante, clicable para empezar)
    //   i === maxEraIdx + 1... → BLOQUEADA   (? apagado)

    const slots = Math.max(ERA_ORDER.length, 5);
    for (let i = 0; i < slots; i++) {
        const slot = document.createElement('div');
        slot.id    = `era-slot-${i}`;

        if (i >= ERA_ORDER.length) {
            // Slot de relleno visual (más allá de las eras existentes)
            slot.className = 'era-slot era-slot-locked';
            slot.innerHTML = '?';

        } else if (i < session.maxEraIdx) {
            // COMPLETADA
            const key      = ERA_ORDER[i];
            slot.className = 'era-slot completed';
            slot.innerHTML = `<img src="${ERAS[key].data[2].img}" onerror="this.style.display='none'">
                              <div style="font-weight:bold;">${ERAS[key].title}</div>`;
            slot.title     = 'Volver a jugar esta Era';
            const cap      = i;
            slot.onclick   = () => confirmReplayEra(cap);

        } else if (i === session.maxEraIdx) {
            // DISPONIBLE: miniatura clicable para iniciar
            const key      = ERA_ORDER[i];
            slot.className = 'era-slot completed era-slot-available';
            slot.innerHTML = `<img src="${ERAS[key].data[2].img}" onerror="this.style.display='none'">
                              <div style="font-weight:bold;">${ERAS[key].title}</div>`;
            slot.title     = 'Comenzar ' + ERAS[key].title;
            const cap      = i;
            slot.onclick   = () => confirmStartEra(cap);

        } else {
            // BLOQUEADA
            slot.className = 'era-slot era-slot-locked';
            slot.innerHTML = '?';
        }

        col.appendChild(slot);
    }
}

function initEraSidebar() { rebuildEraSidebar(); }   // alias de compatibilidad

// Modal de confirmación para iniciar una era nueva
function confirmStartEra(idx) {
    const era = ERAS[ERA_ORDER[idx]];
    document.getElementById('era-confirm-title').textContent = '¿Comenzar ' + era.title + '?';
    document.getElementById('era-confirm-btn').onclick = () => {
        // Si la era no es la actual, arrancarla primero
        if (session.eraIdx !== idx) _bootEra(idx);
        launchEra();
    };
    document.getElementById('era-confirm-overlay').style.display = 'flex';
}

function closeEraConfirm() {
    document.getElementById('era-confirm-overlay').style.display = 'none';
}

function confirmReplayEra(idx) {
    if (idx >= session.maxEraIdx) return;   // solo eras completadas
    const era = ERAS[ERA_ORDER[idx]];
    document.getElementById('era-options-title').textContent = era.title;
    document.getElementById('era-options-img').src           = era.data[2].img;
    document.getElementById('era-opt-gallery').onclick = () => { closeEraOptions(); reviewEraGallery(idx); };
    document.getElementById('era-opt-replay').onclick  = () => { closeEraOptions(); replayEra(idx); };
    document.getElementById('era-options-overlay').style.display = 'flex';
}

function closeEraOptions()  { document.getElementById('era-options-overlay').style.display = 'none'; }

function reviewEraGallery(idx) {
    const eraData = ERAS[ERA_ORDER[idx]].data;
    const allVals = Object.keys(eraData).map(Number).sort((a, b) => a - b);
    openCatalogWithData(0, allVals, eraData);
}


// ═══════════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════════

function _anyModalOpen() {
    return uiState.theatreOpen
        || ['catalog-overlay','game-over-overlay','subgame-game-over-overlay',
            'subgame-complete-overlay','era-overlay']
           .some(id => document.getElementById(id).classList.contains('active'));
}

window.addEventListener('keydown', e => {
    const catalogOpen = document.getElementById('catalog-overlay').classList.contains('active');

    if (_anyModalOpen()) {
        if (catalogOpen) {
            const src = uiState.catalogSnap
                ?? (uiState.catalogIsBranch
                    ? { discovered: session.branch?.discovered ?? [] }
                    : { discovered: session.main?.discovered   ?? [] });
            const len = src.discovered.length;
            if (e.key === 'ArrowLeft'  && uiState.catalogIdx > 0)       changeCatalog(-1);
            if (e.key === 'ArrowRight' && uiState.catalogIdx < len - 1)  changeCatalog(1);
            if (e.key === 'Escape') closeCatalog();
        } else if (uiState.theatreOpen) {
            closeTheatre();
        }
        return;
    }

    const DIR = { ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT',
                  w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT' };
    if (DIR[e.key]) { e.preventDefault(); activeState()?.move(DIR[e.key]); }
});


// ═══════════════════════════════════════════════════════════════
// PANEL DE DESARROLLO  (saltar a cualquier estado del árbol)
// ═══════════════════════════════════════════════════════════════

function startSubGameDirectly() {
    const sel = document.getElementById('dev-subgame-select').value;

    // ── Reset global de UI ──────────────────────────────────────
    if (document.activeElement) document.activeElement.blur();
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.getElementById('era-options-overlay').style.display  = 'none';
    document.getElementById('era-confirm-overlay').style.display  = 'none';
    document.getElementById('start-screen').style.display         = 'none';
    uiState.theatreOpen = uiState.pendingEndEra = uiState.pendingBranchEnd = false;
    session.branch = null;

    // ── CASO 1: Era del tronco ──────────────────────────────────
    const eraIdx = ERA_ORDER.indexOf(sel);
    if (eraIdx !== -1) {
        session.maxEraIdx = eraIdx;   // eras anteriores "ya completadas"
        _bootEra(eraIdx);
        // Lanzar sin modal ni theatre del primer tile
        const pos = Math.floor(Math.random() * 16);
        session.main.board[pos] = _createTile(2, pos, session.main);
        session.main.discover(2);
        session.main.updateProgressBar();
        session.main.updateInfoPanel(2);
        return;
    }

    // ── CASO 2: Rama de investigación ───────────────────────────
    if (INVESTIGATIONS[sel]) {
        // Buscar en qué era vive este portal para marcarla como completada
        let eraForBranch = 0;
        for (const [eKey, portals] of Object.entries(PORTALS)) {
            if (eKey === '__subgame__') continue;
            if (Object.values(portals).some(arr => arr.includes(sel))) {
                eraForBranch = ERA_ORDER.indexOf(eKey);
                break;
            }
        }
        // Si no está en PORTALS de era (es sub-rama), buscar en __subgame__
        if (eraForBranch === 0 && PORTALS.__subgame__) {
            for (const parentBranch of Object.values(PORTALS.__subgame__)) {
                if (Object.values(parentBranch).some(arr => arr.includes(sel))) {
                    // Es sub-rama: buscar la era de la rama padre
                    for (const [eKey, portals] of Object.entries(PORTALS)) {
                        if (eKey === '__subgame__') continue;
                        const parentId = Object.keys(PORTALS.__subgame__).find(k => PORTALS.__subgame__[k] === parentBranch);
                        if (parentId && Object.values(portals).some(arr => arr.includes(parentId))) {
                            eraForBranch = ERA_ORDER.indexOf(eKey);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        session.maxEraIdx = eraForBranch + 1;
        _bootEra(eraForBranch);
        // Lanzar tronco sin theatre
        const pos = Math.floor(Math.random() * 16);
        session.main.board[pos] = _createTile(2, pos, session.main);
        session.main.discover(2);
        session.main.updateProgressBar();
        session.main.updateInfoPanel(2);
        openBranch(sel);
        return;
    }

    // ── CASO 3: Final de una rama ───────────────────────────────
    if (sel.startsWith('end-sub-')) {
        const type    = sel.replace('end-sub-', '');
        const inv     = INVESTIGATIONS[type];
        if (!inv) return;
        // Buscar en qué era aparece este portal para arrancar el tronco correcto
        let eraForBranch = 0;
        for (const [eKey, portals] of Object.entries(PORTALS)) {
            if (eKey === '__subgame__') continue;
            if (Object.values(portals).some(arr => arr.includes(type))) {
                eraForBranch = ERA_ORDER.indexOf(eKey);
                break;
            }
        }
        // La era que contiene el portal debe aparecer como completada
        session.maxEraIdx = eraForBranch + 1;
        _bootEra(eraForBranch);
        openBranch(type);
        session.branch.discovered = Object.keys(inv.data).map(Number).sort((a,b) => a - b);
        session.branch.updateProgressBar();
        session.completedBranches.add(type);
        setTimeout(showBranchComplete, 150);
        return;
    }

    // ── CASO 4: Final de una era del tronco ────────────────────
    if (sel.startsWith('end-')) {
        const key = sel.replace('end-', '');
        const idx = ERA_ORDER.indexOf(key);
        if (idx === -1) return;
        session.maxEraIdx = idx;
        _bootEra(idx);
        session.main.discovered = Object.keys(ERAS[ERA_ORDER[idx]].data).map(Number).sort((a,b) => a - b);
        session.main.updateProgressBar();
        triggerEraEnd();
    }
}


// ═══════════════════════════════════════════════════════════════
// PRECARGA DE ASSETS
// ═══════════════════════════════════════════════════════════════

const assetsToPreload = [
    /* Poblar con rutas de imagen cuando estén disponibles */
];

(function preloadAssets() {
    const load = () => assetsToPreload.forEach(src => { const img = new Image(); img.src = src; });
    'requestIdleCallback' in window ? requestIdleCallback(load) : setTimeout(load, 2000);
})();

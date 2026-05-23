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
        this._moving    = false; // true mientras hay animaciones en vuelo
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
        this._moving    = false;
        this.dom.scoreEl.textContent = '0';
        this.dom.infoPanel.innerHTML =
            `<div style="opacity:.5;text-align:center;">${
                this.def.isMain ? 'Pincha una ERA de la columna para jugar o explorar' : 'Explora la ramificación…'
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
            if (!this._moving && !this.board.includes(null) && _boardIsBlocked(this.board)) {
                this.cb.onGameOver(this);
            }
        }, 300);
    }

    // ── Motor de movimiento ───────────────────────────────────

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

// Paso en píxeles entre celdas, derivado de las variables CSS para mantenerse
// sincronizado si se cambia --tile-size o --tile-gap.
// Se calcula una vez al arrancar y se recalcula si cambia el tamaño de ventana.
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
            if (!cell) return false;   // celda vacía → hay espacio, no bloqueado
            const v = cell.val;
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
    main             : null,   // InvestigationState del tronco activo
    branch           : null,   // InvestigationState de la rama activa (o null)
    completedEras    : {},     // { 'astronomica': [2,4,8,...], ... }
    completedBranches: {},     // { 'anfibios': [2,4,8,...], ... }
};

// Helpers de acceso uniforme
const hasCompletedBranch = id => id in session.completedBranches;
const hasCompletedEra    = id => id in session.completedEras;

// La instancia que recibe los inputs en cada momento
const activeState = () => session.branch ?? session.main;


// ═══════════════════════════════════════════════════════════════
// ESTADO DE UI
// ═══════════════════════════════════════════════════════════════

const uiState = {
    theatreOpen          : false,
    pendingEndEra        : false,
    pendingBranchEnd     : false,
    catalogIdx           : 0,
    catalogSnap          : null,   // {discovered, data, branchId} snapshot activo
    catalogIsBranch      : false,
    catalogStack         : [],     // pila de snapshots para navegar rama→sub-rama (atrás)
    eraReviewSnap        : null,   // snapshot de la era que se está revisando (o null)
    branchReviewSnap     : null,   // snapshot de la rama que se está revisando (o null)
    eraOverlayWasOpen    : false,  // true si el catálogo se abrió desde era-overlay en revisión
    pendingOverlayRestore: null,   // id del overlay a restaurar al cerrar el catálogo (o null)
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
// PERSISTENCIA DE PROGRESO  (localStorage)
// Solo se guarda lo que permite acceder a galerías ya superadas:
//   · maxEraIdx        → eras completadas
//   · completedBranches → ramas completadas
// El estado de la partida de cartas NO se guarda.
// ═══════════════════════════════════════════════════════════════

const SAVE_KEY = 'erase_progress_v2';

function saveProgress() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
            completedEras    : session.completedEras,
            completedBranches: session.completedBranches,
        }));
    } catch (e) { /* localStorage no disponible — ignorar */ }
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (saved.completedEras && typeof saved.completedEras === 'object') {
            Object.entries(saved.completedEras).forEach(([id, disc]) => {
                if (ERAS[id] && Array.isArray(disc)) session.completedEras[id] = disc;
            });
        }
        if (saved.completedBranches && typeof saved.completedBranches === 'object') {
            Object.entries(saved.completedBranches).forEach(([id, disc]) => {
                if (INVESTIGATIONS[id] && Array.isArray(disc)) session.completedBranches[id] = disc;
            });
        }
    } catch (e) { /* datos corruptos — empezar limpio */ }
}

function resetProgress() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    session.completedEras     = {};
    session.completedBranches = {};
}

// ═══════════════════════════════════════════════════════════════
// ARRANQUE Y NAVEGACIÓN DE ERAS
// ═══════════════════════════════════════════════════════════════

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    loadProgress();
    _bootEra(0);
    _launchEra();
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

// Al hacer clic en un slot de era, arranca directamente sin confirmación
function _launchEra() {
    const pos = Math.floor(Math.random() * 16);
    session.main.board[pos] = _createTile(2, pos, session.main);
    session.main.cb.onDiscover(2, session.main);
}

function nextEra() {
    document.getElementById('era-overlay').classList.remove('active');

    // Guardar fichas descubiertas de la era completada
    session.completedEras[ERA_ORDER[session.eraIdx]] = [...session.main.discovered];
    saveProgress();

    const nextIdx = session.eraIdx + 1;
    if (nextIdx >= ERA_ORDER.length) {
        rebuildEraSidebar();
        return;
    }
    _bootEra(nextIdx);
    _launchEra();
}

function restartEra()   { document.getElementById('game-over-overlay').classList.remove('active'); _bootEra(session.eraIdx); _launchEra(); }
function replayEra(idx) { _bootEra(idx); _launchEra(); }


// ═══════════════════════════════════════════════════════════════
// FIN DE ERA  — resumen + portales leídos de PORTALS
// ═══════════════════════════════════════════════════════════════

function triggerEraEnd(reviewIdx = null) {
    // Si reviewIdx es null usamos la era activa; si no, mostramos la era indicada (solo lectura)
    const idx        = reviewIdx ?? session.eraIdx;
    const eraKey     = ERA_ORDER[idx];
    const eraPortals = PORTALS[eraKey] ?? {};

    const isReview   = reviewIdx !== null;
    // En revisión: usar los discovered guardados si existen, si no todas las fichas
    const discovered = isReview
        ? (session.completedEras[eraKey]
            ?? Object.keys(ERAS[eraKey].data).map(Number).sort((a, b) => a - b))
        : session.main.discovered;
    const data       = ERAS[eraKey].data;

    const titleEl = document.getElementById('overlay-text');
    titleEl.textContent = isReview
        ? 'Galería: ' + ERAS[eraKey].title
        : 'Has completado la ' + ERAS[eraKey].title;

    // En modo revisión, el botón "Siguiente Era" no tiene sentido: lo ocultamos
    // y mostramos el botón "Cerrar galería" en su lugar.
    const nextBtn  = document.getElementById('era-overlay-next-btn');
    const closeBtn = document.getElementById('era-overlay-close-btn');
    if (nextBtn)  nextBtn.style.display  = isReview ? 'none'         : 'inline-block';
    if (closeBtn) closeBtn.style.display = isReview ? 'inline-block' : 'none';

    // En modo revisión guardamos el snapshot para que el catálogo sepa qué datos mostrar
    if (isReview) {
        uiState.eraReviewSnap = { discovered, data, eraKey };
    } else {
        uiState.eraReviewSnap = null;
    }

    document.getElementById('sequence-container').innerHTML =
        _buildSequenceHTML(discovered, data, eraPortals, {
            overlayToClose : 'era-overlay',
            cardClick      : isReview
                ? (idx) => `openCatalogFromEraReview(${idx})`
                : (idx) => `openCatalog(${idx}, false)`,
            openBranch     : isReview
                ? (targetId) => `openBranchFromEraReview('${targetId}')`
                : (targetId) => `openBranch('${targetId}')`,
        });

    document.getElementById('era-overlay').classList.add('active');
}

// Abre el catálogo usando el snapshot de la era en revisión
function openCatalogFromEraReview(idx) {
    if (!uiState.eraReviewSnap) return;
    const { discovered, data, eraKey } = uiState.eraReviewSnap;
    uiState.catalogSnap     = { discovered, data, branchId: null, eraKey };
    uiState.catalogIsBranch = false;
    uiState.catalogStack    = [];
    uiState.catalogIdx      = idx;
    // Ocultar era-overlay para que el catálogo no quede tapado
    // (se restaura al cerrar el catálogo)
    uiState.eraOverlayWasOpen = true;
    document.getElementById('era-overlay').classList.remove('active');
    _renderCatalog();
    document.getElementById('catalog-overlay').classList.add('active');
}

// Abre el catálogo desde la pantalla de victoria de una rama en revisión
function openCatalogFromBranchReview(idx, branchId) {
    const snap = uiState.branchReviewSnap;
    if (!snap) return;
    uiState.catalogSnap     = { discovered: snap.discovered, data: snap.data, branchId: snap.branchId };
    uiState.catalogIsBranch = false;
    uiState.catalogStack    = [];
    uiState.catalogIdx      = idx;
    // El subgame-complete-overlay se restaura al cerrar el catálogo
    uiState.pendingOverlayRestore = 'subgame-complete-overlay';
    document.getElementById('subgame-complete-overlay').classList.remove('active');
    _renderCatalog();
    document.getElementById('catalog-overlay').classList.add('active');
}

// Abre una rama desde el era-overlay en modo revisión.
// Activa eraOverlayWasOpen para que al cerrar la investigación se pueda
// restaurar el era-overlay correctamente si el usuario lo necesita.
function openBranchFromEraReview(type) {
    uiState.eraOverlayWasOpen = true;
    document.getElementById('era-overlay').classList.remove('active');
    openBranch(type);
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
    // Si la investigación se abrió desde el era-overlay en modo revisión, restaurarlo
    if (uiState.eraOverlayWasOpen) {
        uiState.eraOverlayWasOpen = false;
        document.getElementById('era-overlay').classList.add('active');
    }
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
    if (session.branch) {
        session.completedBranches[session.branch.def.id] = [...session.branch.discovered];
        saveProgress();
    }
    document.getElementById('subgame-complete-overlay').classList.remove('active');
    closeInvestigacion();
}


// ═══════════════════════════════════════════════════════════════
// CONSTRUCTOR DE HTML DE SECUENCIA (portales + tarjetas)
// Función pura: recibe datos, devuelve string HTML.
// Usada tanto en triggerEraEnd como en showBranchComplete.
// ═══════════════════════════════════════════════════════════════

function _buildSequenceHTML(discovered, data, portals, { overlayToClose, cardClick, openBranch: openBranchFn }) {
    // Si no se pasa openBranchFn, usar el comportamiento por defecto
    const branchCall = openBranchFn ?? ((id) => `openBranch('${id}')`);

    return discovered.map((val, idx) => {
        const d       = data[val];
        const targets = portals[val] ?? [];

        const gatewayHTML = targets.map(targetId => {
            const inv       = INVESTIGATIONS[targetId];
            const completed = hasCompletedBranch(targetId);
            const label     = completed ? inv.panelTitle : inv.panelTitle;

            return `<div class="subgame-gateway-above"
                         style="border-color:${inv.color};color:${inv.color};"
                         onclick="event.stopPropagation();
                                  confirmBranchAction('${overlayToClose}','${targetId}');">
                        <span style="color:white;">${completed ? '📖' : '🔬'} INVESTIGAR</span>
                        <span>${label}</span>
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
    // Restaurar el overlay de origen si procede
    if (uiState.eraOverlayWasOpen) {
        uiState.eraOverlayWasOpen = false;
        document.getElementById('era-overlay').classList.add('active');
    } else if (uiState.pendingOverlayRestore) {
        document.getElementById(uiState.pendingOverlayRestore).classList.add('active');
        uiState.pendingOverlayRestore = null;
    }
}

function changeCatalog(dir) { uiState.catalogIdx += dir; _renderCatalog(); }

function _renderCatalog() {
    // Fuente de datos: snapshot > branch > main
    let src;
    if (uiState.catalogSnap) {
        src = uiState.catalogSnap;
    } else if (uiState.catalogIsBranch && session.branch) {
        // Catálogo en vivo de una rama: incluir branchId para que los portales sean correctos
        src = {
            discovered : session.branch.discovered,
            data       : session.branch.data,
            branchId   : session.branch.def.id,
        };
    } else {
        src = {
            discovered : session.main.discovered,
            data       : session.main.data,
            branchId   : null,
            eraKey     : ERA_ORDER[session.eraIdx],
        };
    }

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

    // Botón "atrás" si hay pila de navegación o overlay de origen pendiente
    const backBtn = document.getElementById('cat-btn-back');
    if (backBtn) backBtn.style.display =
        (uiState.catalogStack.length > 0 || uiState.eraOverlayWasOpen || uiState.pendingOverlayRestore)
            ? 'block' : 'none';
}

// Muestra (o limpia) los botones de portal a ramas superadas desde el catálogo
function _renderCatalogBranchPortals(contextBranchId, val) {
    const container = document.getElementById('catalog-branch-portals');
    if (!container) return;
    container.innerHTML = '';

    // Determinar qué tabla de portales aplica:
    // Si estamos viendo el catálogo de una rama, mirar PORTALS.__subgame__[branchId]
    // Si estamos viendo el catálogo de una era, mirar PORTALS[eraKey]
    // El eraKey puede venir del snapshot de revisión o de la era activa
    let portals = {};
    if (contextBranchId) {
        portals = PORTALS.__subgame__?.[contextBranchId] ?? {};
    } else {
        const eraKey = uiState.catalogSnap?.eraKey ?? ERA_ORDER[session.eraIdx];
        portals = PORTALS[eraKey] ?? {};
    }

    const targets = portals[val] ?? [];
    targets.forEach(branchId => {
        if (!hasCompletedBranch(branchId)) return;
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
    // Usar los discovered guardados si existen; si no, mostrar todas las fichas
    const disc = session.completedBranches[branchId]
        ?? Object.keys(inv.data).map(Number).sort((a, b) => a - b);

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

// Versión llamada desde los botones "VER GALERÍA" dentro de los overlays de fin de era/rama.
// Oculta el overlay de origen y abre el catálogo con el botón "atrás" activo.
function _openBranchCatalogFromOverlay(overlayToClose, branchId) {
    const inv  = INVESTIGATIONS[branchId];
    const disc = session.completedBranches[branchId]
        ?? Object.keys(inv.data).map(Number).sort((a, b) => a - b);

    document.getElementById(overlayToClose).classList.remove('active');

    // Guardar el overlay de origen para restaurarlo al cerrar el catálogo
    if (overlayToClose === 'era-overlay') {
        uiState.eraOverlayWasOpen     = true;
        uiState.pendingOverlayRestore = null;   // era-overlay tiene su propio mecanismo
    } else {
        uiState.pendingOverlayRestore = overlayToClose;
    }

    uiState.catalogSnap     = { discovered: disc, data: inv.data, branchId };
    uiState.catalogIsBranch = false;
    uiState.catalogStack    = [];
    uiState.catalogIdx      = 0;
    _renderCatalog();
    document.getElementById('catalog-overlay').classList.add('active');
}

// Vuelve al catálogo anterior (desapila), o al overlay de origen si no hay pila
function _catalogGoBack() {
    if (uiState.catalogStack.length) {
        const prev = uiState.catalogStack.pop();
        uiState.catalogSnap     = prev.snap;
        uiState.catalogIdx      = prev.idx;
        uiState.catalogIsBranch = prev.isBranch;
        _renderCatalog();
        return;
    }
    // Pila vacía: cerrar catálogo y restaurar overlay de origen
    closeCatalog();
}


// ═══════════════════════════════════════════════════════════════
// SIDEBAR DE ERAS
// ═══════════════════════════════════════════════════════════════

function rebuildEraSidebar() {
    const col = document.getElementById('era-progress-column');
    col.innerHTML =
        '<div style="font-size:.8rem;font-weight:bold;opacity:.8;letter-spacing:2px;">HISTORIA</div>';

    ERA_ORDER.forEach((key, i) => {
        const era  = ERAS[key];
        const slot = document.createElement('div');
        slot.id        = `era-slot-${i}`;
        slot.className = 'era-slot completed';
        slot.innerHTML = `<img src="${era.data[2].img}" onerror="this.style.display='none'">
                          <div style="font-weight:bold;">${era.title}</div>`;
        slot.title   = era.title;
        slot.onclick = () => openEraOptions(i);
        col.appendChild(slot);
    });
}

function initEraSidebar() { rebuildEraSidebar(); }

// Abre el modal de opciones de era — siempre accesible
function openEraOptions(idx) {
    const era       = ERAS[ERA_ORDER[idx]];
    const completed = ERA_ORDER[idx] in session.completedEras;

    document.getElementById('era-options-title').textContent = era.title;
    document.getElementById('era-options-img').src           = era.data[2].img;

    const galleryBtn = document.getElementById('era-opt-gallery');
    galleryBtn.style.display = completed ? 'block' : 'none';
    galleryBtn.onclick = () => { closeEraOptions(); reviewEraGallery(idx); };

    document.getElementById('era-opt-replay').onclick = () => { closeEraOptions(); replayEra(idx); };
    document.getElementById('era-options-overlay').style.display = 'flex';
}

function closeEraOptions() { document.getElementById('era-options-overlay').style.display = 'none'; }

function reviewEraGallery(idx) { triggerEraEnd(idx); }

// Cierra el era-overlay cuando se está en modo revisión (botón "Cerrar galería")
function closeEraOverlay() {
    document.getElementById('era-overlay').classList.remove('active');
    uiState.eraReviewSnap     = null;
    uiState.eraOverlayWasOpen = false;
}

// ── Modal de opciones de investigación ───────────────────────

// overlayToClose: el overlay desde el que se pulsa el gateway
// branchId: id de la investigación
function confirmBranchAction(overlayToClose, branchId) {
    const inv       = INVESTIGATIONS[branchId];
    const completed = hasCompletedBranch(branchId);
    const box       = document.getElementById('branch-options-box');
    const img       = document.getElementById('branch-options-img');
    const title     = document.getElementById('branch-options-title');
    const subtitle  = document.getElementById('branch-options-subtitle');
    const galleryBtn= document.getElementById('branch-opt-gallery');
    const replayBtn = document.getElementById('branch-opt-replay');

    // Estilo dinámico según la rama
    box.style.borderColor   = inv.color;
    title.style.color       = inv.color;
    title.textContent       = inv.title;
    img.src                 = inv.data[2]?.img ?? '';
    subtitle.textContent    = completed
        ? '¿Qué quieres hacer con esta investigación?'
        : 'Esta investigación aún no ha sido completada.';

    galleryBtn.style.display = completed ? 'block' : 'none';
    galleryBtn.onclick = () => {
        closeBranchOptions();
        reviewBranchGallery(overlayToClose, branchId);
    };

    replayBtn.onclick = () => {
        closeBranchOptions();
        document.getElementById(overlayToClose).classList.remove('active');
        // Usar openBranchFromEraReview si venimos del era-overlay en revisión
        if (overlayToClose === 'era-overlay' && uiState.eraReviewSnap) {
            openBranchFromEraReview(branchId);
        } else {
            openBranch(branchId);
        }
    };

    document.getElementById('branch-options-overlay').style.display = 'flex';
}

function closeBranchOptions() {
    document.getElementById('branch-options-overlay').style.display = 'none';
}

// Abre la pantalla de victoria de una investigación en modo revisión (solo lectura)
function reviewBranchGallery(originOverlay, branchId) {
    const inv  = INVESTIGATIONS[branchId];
    const disc = session.completedBranches[branchId]
        ?? Object.keys(inv.data).map(Number).sort((a, b) => a - b);
    const subPortals = PORTALS.__subgame__?.[branchId] ?? {};

    // Ocultar el overlay de origen y marcarlo para restaurar al cerrar
    document.getElementById(originOverlay).classList.remove('active');
    if (originOverlay === 'era-overlay') {
        uiState.eraOverlayWasOpen = true;
    } else {
        uiState.pendingOverlayRestore = originOverlay;
    }

    // Reconstruir la pantalla de victoria de la rama con los datos guardados
    document.getElementById('subgame-complete-title').style.color = inv.color;
    document.getElementById('subgame-complete-title').textContent  = '¡INVESTIGACIÓN COMPLETADA!';
    document.getElementById('subgame-complete-desc').textContent   = inv.completeDesc;
    document.getElementById('m-sequence-container').innerHTML =
        _buildSequenceHTML(disc, inv.data, subPortals, {
            overlayToClose : 'subgame-complete-overlay',
            cardClick      : (idx) => `openCatalogFromBranchReview(${idx},'${branchId}')`,
        });

    // Guardar snapshot de la rama en revisión
    uiState.branchReviewSnap = { discovered: disc, data: inv.data, branchId };

    // Cambiar el botón "Volver" para que restaure el overlay de origen
    const closeBtn = document.getElementById('subgame-complete-close-btn');
    if (closeBtn) {
        closeBtn.textContent = '← Volver';
        closeBtn.onclick = () => {
            document.getElementById('subgame-complete-overlay').classList.remove('active');
            uiState.branchReviewSnap = null;
            // Restaurar overlay de origen
            if (uiState.eraOverlayWasOpen) {
                uiState.eraOverlayWasOpen = false;
                document.getElementById('era-overlay').classList.add('active');
            } else if (uiState.pendingOverlayRestore) {
                document.getElementById(uiState.pendingOverlayRestore).classList.add('active');
                uiState.pendingOverlayRestore = null;
            }
        };
    }

    document.getElementById('subgame-complete-overlay').classList.add('active');
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
            const disc = uiState.catalogSnap?.discovered
                ?? (uiState.catalogIsBranch ? session.branch?.discovered : session.main?.discovered)
                ?? [];
            const len = disc.length;
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


// Dado un id de rama, devuelve { eraIdx, parentBranchIds[] }
// buscando recursivamente en PORTALS
function _resolveBranchOrigin(branchId) {
    // Buscar en portales de era (rama primaria)
    for (const [eKey, portals] of Object.entries(PORTALS)) {
        if (eKey === '__subgame__') continue;
        for (const targets of Object.values(portals)) {
            if (targets.includes(branchId)) {
                return { eraIdx: ERA_ORDER.indexOf(eKey), parentBranchIds: [] };
            }
        }
    }
    // Buscar en __subgame__ (sub-rama)
    if (PORTALS.__subgame__) {
        for (const [parentId, portals] of Object.entries(PORTALS.__subgame__)) {
            for (const targets of Object.values(portals)) {
                if (targets.includes(branchId)) {
                    // Resolver recursivamente el padre
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

    // ── Reset global de UI ──────────────────────────────────────
    if (document.activeElement) document.activeElement.blur();
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.getElementById('era-options-overlay').style.display  = 'none';
    document.getElementById('start-screen').style.display         = 'none';
    uiState.theatreOpen = uiState.pendingEndEra = uiState.pendingBranchEnd = false;
    session.branch = null;

    // ── CASO 1: Era del tronco ──────────────────────────────────
    const eraIdx = ERA_ORDER.indexOf(sel);
    if (eraIdx !== -1) {
        _bootEra(eraIdx);
        const pos = Math.floor(Math.random() * 16);
        session.main.board[pos] = _createTile(2, pos, session.main);
        session.main.discover(2);
        session.main.updateProgressBar();
        session.main.updateInfoPanel(2);
        return;
    }

    // ── CASO 2: Rama de investigación (abre la rama lista para jugar) ──
    if (INVESTIGATIONS[sel]) {
        const { eraIdx: eraForBranch, parentBranchIds } = _resolveBranchOrigin(sel);
        parentBranchIds.forEach(id => { session.completedBranches[id] = Object.keys(INVESTIGATIONS[id].data).map(Number).sort((a,b)=>a-b); });
        _bootEra(eraForBranch);
        const pos = Math.floor(Math.random() * 16);
        session.main.board[pos] = _createTile(2, pos, session.main);
        session.main.discover(2);
        session.main.updateProgressBar();
        session.main.updateInfoPanel(2);
        openBranch(sel);
        return;
    }

    // ── CASO 3: Final de una rama (muestra pantalla de completado) ──
    if (sel.startsWith('end-sub-')) {
        const type = sel.replace('end-sub-', '');
        const inv  = INVESTIGATIONS[type];
        if (!inv) return;
        const { eraIdx: eraForBranch, parentBranchIds } = _resolveBranchOrigin(type);
        parentBranchIds.forEach(id => { session.completedBranches[id] = Object.keys(INVESTIGATIONS[id].data).map(Number).sort((a,b)=>a-b); });
        session.completedBranches[type] = Object.keys(INVESTIGATIONS[type].data).map(Number).sort((a,b)=>a-b);
        _bootEra(eraForBranch);
        openBranch(type);
        session.branch.discovered = Object.keys(inv.data).map(Number).sort((a,b) => a - b);
        session.branch.updateProgressBar();
        setTimeout(showBranchComplete, 150);
        return;
    }

    // ── CASO 4: Final de una era del tronco ────────────────────
    if (sel.startsWith('end-')) {
        const key = sel.replace('end-', '');
        const idx = ERA_ORDER.indexOf(key);
        if (idx === -1) return;
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

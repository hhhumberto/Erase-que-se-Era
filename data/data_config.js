/* ============================================================
   ÉRASE QUE SE ERA — CONFIGURACIÓN GLOBAL
   Este archivo debe cargarse PRIMERO.
   Inicializa los contenedores ERAS e INVESTIGATIONS vacíos,
   y declara PORTALS y ERA_ORDER.
   Cada archivo data_*.js rellena estos contenedores.
   ============================================================ */

// Contenedores globales (los archivos de era los rellenan)
const ERAS          = {};
const INVESTIGATIONS = {};

// ─────────────────────────────────────────────
// MAPA DE PORTALES
// ─────────────────────────────────────────────

const PORTALS = {
    // Portales en las ERAs
    astronomica: {
        2:   ['misterios_del_cosmos'],
        32:  ['vida_muerte_supernova'],
        128: ['nace_un_planeta']
    },
    vida: {
        2:   ['pioneros'],
        4:   ['pluricelulares'],
        8:   ['blandos_por_dentro'],
        32:  ['anfibios'],
        64:  ['lineas_reptilianas'],
        512: ['monitos']
    },
    homo: {
        128: ['primeros_artistas'],
        256: ['cultivos_civilizadores']
    },
    mundos_antiguos: {                 
        128: ['republica_roma']
    },
    era_digital: {
        8: ['cerebros_portatiles']
    },
    era_industrial: {
        512: ['quisimos_volar']
    },

    // Portales en las INVESTIGACIONes
    __subgame__: {
        anfibios: {
            512: ['ranitas']
        },
        pioneros: {
            32: ['flora']
        },
        flora: {
            512: ['suelo_a_bosque']
        },
        pluricelulares: {
            16:  ['gelatinosas_y_picantes'],
            256: ['planos_y_peligrosos']
        },
        ranitas: {
            512: ['ranitas_dardo']
        },
        nace_un_planeta: {
            256: ['piel_con_historia']
        },
        lineas_reptilianas: {
            8:  ['lagartos_variados'],
            16: ['evolucion_deslizante']
        },
        republica_roma: {
            2: ['republica_mapas'] ,
            64: ['vida_graco']
        },
        blandos_por_dentro: {
            16: ['con_pies_y_cabeza'] 
        },
        quisimos_volar: {
            512: ['y_volamos']
        },
    
    }
};

// Orden canónico de las eras del tronco
const ERA_ORDER = [
    'astronomica',
    'vida',
    'homo',
    'mundos_antiguos',
    'mundo_medieval',
    'era_ciencia',
    'era_industrial',
    'era_espacial',
    'era_digital'
];

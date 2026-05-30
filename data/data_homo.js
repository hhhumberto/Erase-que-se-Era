/* ============================================================
   ÉRASE QUE SE ERA — ERA HOMO
   Contiene: era "homo" + ramas que la tienen como ancestro:
     · primeros_artistas      (portal en homo[128])
     · cultivos_civilizadores (portal en homo[256])
   ============================================================ */

// ── ERA PRINCIPAL ─────────────────────────────────────────────

ERAS.homo = {
    title: "ERA HOMO", panelTitle: "ANTROPOLOGÍA",
    data: {
        2:   { n: "Primate",      img: "img/512_mono.png",        d: "El ancestro desciende a la sabana.",        ext: "Los hominoideos del Mioceno experimentaron enormes presiones selectivas por la fragmentación forestal y el cambio climático en África, lo que forzó a ciertas poblaciones a aventurarse y forrajear en las emergentes y peligrosas sabanas." },
        4:   { n: "Bipedación",   img: "img/4_afarensis.png",     d: "Caminar erguido libera las manos.",         ext: "La adopción de la locomoción bípeda habitual supuso una drástica reestructuración pélvica y la recolocación del foramen magnum. Esto maximizó la eficiencia energética de la marcha y dejó los brazos libres para transportar cargas y crías." },
        8:   { n: "Herramientas", img: "img/8_piedra.png",        d: "Tecnología para transformar el entorno.",   ext: "Homínidos como el 'Homo habilis' perfeccionaron la talla lítica sistemática (industry olduvayense). El uso deliberado de lascas afiladas permitió carroñear, cortar carne y extraer tuétano, aportando densas calorías indispensables para el cerebro." },
        16:  { n: "El Fuego",     img: "img/16_fuego.png",        d: "Calor, protección y cocina.",               ext: "El control del fuego, evidenciado desde el 'Homo erectus', revolucionó nuestra fisiología. La cocción predigería los alimentos, maximizando la absorción de nutrientes, reduciendo el tamaño del intestino y permitiendo desviar energía vital al cráneo." },
        32:  { n: "Simbolismo",   img: "img/32_tumba.png",        d: "El rito funerario y el respeto.",           ext: "La presencia de enterramientos intencionados (como en yacimientos de Neandertales y primeros Sapiens) constata el nacimiento del pensamiento abstracto. Supone una autoconciencia profunda sobre la vida, la muerte y el vínculo afectivo del clan." },
        64:  { n: "El Éxodo",     img: "img/64_expansion.png",    d: "Colonizando cada rincón del planeta.",      ext: "Dotados de gran versatilidad adaptativa y cooperación verbal, el 'Homo sapiens' protagonizó oleadas migratorias fuera de África. Logró habitar tundras glaciares, desiertos tórridos y navegó hasta remotas islas del Pacífico." },
        128: { n: "Arte",         img: "img/128_pintura.png",     d: "Nuestras primeras historias plasmadas.",    ext: "La Revolución Cognitiva del Paleolítico Superior floreció en forma de arte rupestre y figurillas mobiliares. Es el testimonio indiscutible de un cerebro capaz de codificar símbolos, mantener un lenguaje estructurado y formular mitos colectivos." },
        256: { n: "Agricultura",  img: "img/256_agricultura.png", d: "Dominio de los ciclos de la tierra.",       ext: "En los albores del Holoceno, la Revolución Neolítica cambió el paradigma nómada cazador-recolector. La domesticación selectiva de cereales y ungulados sentó las bases para el sedentarismo, la acumulación de excedentes y la división del trabajo." },
        512: { n: "Civilización", img: "img/512_egipto.png",      d: "Nacen las ciudades y la Historia.",         ext: "El gran éxito agrícola y demográfico propició la creación de complejas sociedades estratificadas en los grandes valles fluviales. Para administrar excedentes e impuestos se inventó la escritura, marcando la frontera técnica entre Prehistoria e Historia." }
    }
};

// ── RAMAS ─────────────────────────────────────────────────────

INVESTIGATIONS.primeros_artistas = {
    id: 'primeros_artistas',
    title: "PRIMEROS ARTISTAS",
    panelTitle: "ARTE PREHISTÓRICO",
    color: '#e67e22',
    completeDesc: "Has admirado la bóveda de Altamira y completado la evolución del primer arte.",
    data: {
        2:   { n: 'Cerdo de Sulawesi',         img: 'img/2_artepri.png',   d: 'Una de las pinturas figurativas más antiguas.',              adap: 'Uso temprano de pigmentos ocres para representar la fauna local, evidenciando una profunda necesidad de plasmar el entorno.' },
        4:   { n: 'Hombre-León de Hohlenstein',img: 'img/4_artepri.png',   d: 'Escultura zoomorfa en marfil de mamut.',                     adap: 'Primeras muestras de imaginación y pensamiento mítico, fusionando características humanas y animales en una sola figura tridimensional.' },
        8:   { n: 'Leones de Chauvet',         img: 'img/8_artepri.png',   d: 'Escenas dinámicas de depredadores.',                         adap: 'Uso magistral del relieve natural de la roca y el sombreado difuminado para dar sensación de movimiento y profundidad a las manadas.' },
        16:  { n: 'Venus de Willendorf',        img: 'img/16_artepri.png',  d: 'Estatuilla femenina de formas exageradas.',                  adap: 'Símbolo portátil de fertilidad o abundancia tallado en caliza oolítica, reflejando los primeros cánones estéticos o religiosos universales.' },
        32:  { n: 'Venus de Brassempouy',       img: 'img/32_artepri.png',  d: 'El primer rostro humano detallado.',                         adap: 'Talla minuciosa en marfil que destaca por la representación esquemática del peinado o tocado, omitiendo los rasgos faciales individualizados.' },
        64:  { n: "Bisontes de d'Audoubert",    img: 'img/64_artepri.png',  d: 'Relieves modelados en arcilla cruda.',                       adap: 'Dominio de la técnica de modelado tridimensional en el interior profundo y oscuro de las cavernas, probablemente con fines rituales.' },
        128: { n: 'Bóvidos de Lascaux',         img: 'img/128_artepri.png', d: 'La Capilla Sixtina de la prehistoria.',                      adap: 'Uso incipiente de andamiajes de madera y técnicas de pulverización de pigmentos para crear composiciones monumentales en los altos techos.' },
        256: { n: 'Pinturas de Tassili',        img: 'img/256_artepri.png', d: 'Arte rupestre en el corazón del Sahara.',                    adap: 'Registro visual de un antiguo Sahara verde, mostrando escenas sociales complejas de pastoreo, caza y danzas rituales al aire libre.' },
        512: { n: 'Bisontes de Altamira',       img: 'img/512_artepri.png', d: 'El cénit del arte parietal policromado.',                    adap: 'Aprovechamiento genial de las protuberancias naturales de la cueva para dotar de un realismo y volumen tridimensional inigualable a las bestias.' }
    }
};

INVESTIGATIONS.cultivos_civilizadores = {
    id: 'cultivos_civilizadores',
    title: "CULTIVOS CIVILIZADORES",
    panelTitle: "REVOLUCIÓN AGRÍCOLA",
    color: '#f39c12',
    completeDesc: "Has domesticado la flora del planeta, cimentando el nacimiento de los grandes imperios.",
    data: {
        2:   { n: 'Trigo',    img: 'img/2_cultivo.png',   d: 'Base del Creciente Fértil.',          adap: 'Junto con la cebada permitió el surgimiento de Mesopotamia y la agricultura del Mediterráneo. Su alto rendimiento y almacenaje lo convierten en un motor clásico de urbanización.' },
        4:   { n: 'Cebada',   img: 'img/4_cultivo.png',   d: 'Resistente a la sequía.',             adap: 'Complemento del trigo en el mismo núcleo. Más resistente a suelos marginales y climas secos, fue fundamental para la expansión agrícola temprana hacia zonas menos fértiles.' },
        8:   { n: 'Arroz',    img: 'img/8_cultivo.png',   d: 'Sustento del valle del Yangtsé.',      adap: 'Base de la civilización en China. Su altísima productividad por hectárea permitió densidades de población muy superiores a otros sistemas agrícolas tempranos.' },
        16:  { n: 'Mijo',     img: 'img/16_cultivo.png',  d: 'Cultivo del norte neolítico chino.',   adap: 'Dominante de la cuenca del río Amarillo. Menos productivo que el arroz pero muy resistente a sequías, lo que estabilizó a las sociedades agrícolas tempranas.' },
        32:  { n: 'Maíz',     img: 'img/32_cultivo.png',  d: 'Eje civilizatorio de Mesoamérica.',    adap: 'Su asombrosa domesticación transformó sociedades de cazadores-recolectores en complejas culturas urbanas como los Olmecas y los Mayas.' },
        64:  { n: 'Frijol',   img: 'img/64_cultivo.png',  d: 'Complemento proteico fundamental.',    adap: 'Clave en Mesoamérica por su complementariedad nutricional con el maíz (aminoácidos esenciales). Sin esta combinación, la base demográfica habría sido inestable.' },
        128: { n: 'Calabaza', img: 'img/128_cultivo.png', d: 'El tercer pilar mesoamericano.',       adap: 'Completando la llamada "Milpa" junto al maíz y el frijol. Importante por su facilidad de almacenamiento y gran aporte calórico secundario.' },
        256: { n: 'Papa',     img: 'img/256_cultivo.png', d: 'El tesoro de los Andes Centrales.',    adap: 'Base de las sociedades andinas. Su increíble capacidad de cultivo en altura permitió la expansión de civilizaciones como la Inca en ecosistemas extremos.' },
        512: { n: 'Sorgo',    img: 'img/512_cultivo.png', d: 'Motor agrícola de África Occidental.', adap: 'Junto al mijo africano, estos cereales fueron esenciales para formar redes agrícolas estables en el clima semiárido, base de imperios como Ghana y Malí.' }
    }
};

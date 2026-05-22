/* ============================================================
   ÉRASE QUE SE ERA — Datasets evolutivos
   Árbol de contenidos: ERAS (tronco) + ramas de INVESTIGACIÓN

   Estructura prevista a futuro:
   ─ ERAS              → historia troncal (astronomica → vida → homo → ...)
   ─ INVESTIGATIONS    → ramas primarias colgadas de nodos del tronco
     └─ cada rama puede apuntar a sub-ramas (campo "branches")

   Por ahora se mantiene fiel al original para que el motor
   no necesite cambios en este paso.
   ============================================================ */

// ─────────────────────────────────────────────
// TRONCO PRINCIPAL
// ─────────────────────────────────────────────

const ERAS = {
    astronomica: {
        title: "ERA ASTRO", panelTitle: "EL COSMOS",
        data: {
            2:   { n: "Big Bang",        img: "img/2_bigbang.png",   d: "El origen del tiempo y el espacio.",        ext: "La singularidad inicial se expandió rápidamente hace unos 13.800 millones de años, creando el espacio-tiempo y liberando una cantidad inimaginable de energía que, al enfriarse, permitió la formación de las primeras partículas fundamentales." },
            4:   { n: "Núcleos",         img: "img/4_nucleos.png",   d: "Primeros protones y neutrones estables.",   ext: "A medida que el universo primitivo se enfrió, los quarks se combinaron mediante la fuerza nuclear fuerte para formar hadrones, dando lugar a los primeros protones y neutrones estables en un proceso conocido como bariogénesis." },
            8:   { n: "Átomos",          img: "img/8_atomos.png",    d: "Nace el hidrógeno primordial.",             ext: "Unos 380,000 años después del Big Bang, la temperatura descendió lo suficiente para que los electrones libres quedaran atrapados en las órbitas de los núcleos, formando los primeros átomos de hidrógeno y helio (recombinación)." },
            16:  { n: "Estrellas",       img: "img/16_estrellas.png",d: "Se encienden los hornos nucleares.",        ext: "Las fluctuaciones de densidad en las gigantescas nubes de gas primordial provocaron un colapso gravitatorio. El incremento extremo de presión y temperatura en sus núcleos logró encender por primera vez la fusión nuclear estable." },
            32:  { n: "Supernova",       img: "img/32_supernova.png",d: "Forja de los elementos pesados.",           ext: "Las estrellas masivas, al agotar su combustible, colapsan bajo su gravedad y rebotan en una explosión titánica. La intensa energía y el flujo de neutrones sintetizan elementos más pesados que el hierro, esparciéndolos por el vacío." },
            64:  { n: "Nebulosa",        img: "img/64_nebulosa.png", d: "Polvo estelar listo para crear mundos.",    ext: "Los restos enriquecidos por las supernovas forman gigantescas nubes interestelares de gas y polvo cósmico. Estas nebulosas actúan como cunas estelares, proporcionando los materiales pesados necesarios para forjar sistemas planetarios rocosos." },
            128: { n: "Tierra Primitiva",img: "img/128_tierra.png",  d: "Un mundo rocoso, volcánico y estéril.",    ext: "La acreción de materia alrededor del Sol recién nacido formó un protoplaneta incandescente. La diferenciación planetaria hundió el hierro al núcleo, dejando un manto silicatado y una corteza primitiva bajo constante actividad magmática." },
            256: { n: "Asteroides",      img: "img/256_lluvia.png",  d: "Aporte de agua y material prebiótico.",    ext: "Durante el Bombardeo Intenso Tardío (hace ~4.000 Ma), multitud de cometas y condritas ricas en compuestos volátiles impactaron la Tierra, depositando enormes cantidades de agua líquida y compuestos orgánicos simples esenciales." },
            512: { n: "Bacteria",        img: "img/2_bacteria.png",  d: "¡La materia inerte se vuelve viva!",       ext: "A través de procesos de evolución química (abiogénesis) en los océanos primordiales, las moléculas orgánicas formaron polímeros autorreplicantes encapsulados en membranas lipídicas, dando origen a los primeros organismos procariotas." }
        }
    },
    vida: {
        title: "ERA VIDA", panelTitle: "EVOLUCIÓN",
        data: {
            2:   { n: "Unicelular",  img: "img/2_bacteria.png",    d: "Célula capaz de replicarse.",             ext: "Organismos procariontes primigenios sin núcleo definido. Desarrollaron el metabolismo anaeróbico y, más tarde, la fotosíntesis en forma de cianobacterias, provocando el evento de la Gran Oxidación que transformó la atmósfera." },
            4:   { n: "Pluricelular",img: "img/4_coral.png",       d: "Origen de la pluricelularidad.",          ext: "La simbiosis y especialización celular dio paso a la vida pluricelular. Los cnidarios y pólipos primitivos comenzaron a secretar esqueletos calcáreos, construyendo complejos arrecifes y nuevos habitaras oceánicos." },
            8:   { n: "Invertebrado",img: "img/8_invertebrado.png",d: "Cuerpos blandos, primeros cazadores.",    ext: "La explosión del Cámbrico impulsó una radiación adaptativa sin precedentes. Surgieron diversos filos con simetría bilateral, sistemas nerviosos primitivos y, en muchos casos, exoesqueletos o conchas para la defensa y movilidad." },
            16:  { n: "Pez",         img: "img/16_pez.png",        d: "Aparición de la columna vertebral.",      ext: "La innovación evolutiva del eje espinal interno (notocorda y vértebras cartilaginosas u óseas) aportó a los primeros cordados una estructura rígida pero flexible. Pronto desarrollaron mandíbulas, convirtiéndose en depredadores dominantes." },
            32:  { n: "Anfibio",     img: "img/32_rana.png",       d: "La conquista de la tierra firme.",        ext: "Los sarcopterigios (peces de aletas lobuladas) adaptaron progresivamente sus aletas en extremidades musculosas para sortear aguas someras. Desarrollaron pulmones rudimentarios, permitiéndoles colonizar las húmedas orillas terrestres." },
            64:  { n: "Reptil",      img: "img/64_iguana.png",     d: "Independencia total del agua.",           ext: "La gran ventaja de los amniotas fue el desarrollo de un huevo provisto de varias membranas protectoras y cáscara semipermeable. Esto, unido a una piel queratinizada y escamosa, les permitió prosperar en climas muy secos." },
            128: { n: "Mamífero",    img: "img/128_raton.png",     d: "Sangre caliente y cuidado parental.",     ext: "Derivados de antiguos sinápsidos, desarrollaron endotermia (sangre caliente), un recubrimiento capilar aislante y glándulas mamarias. Este metabolismo alto y cuidado exhaustivo de crías garantizó su supervivencia en diversos nichos." },
            256: { n: "Arborícola",  img: "img/256_ardilla.png",   d: "Adaptación a los bosques y visión 3D.",   ext: "Algunos pequeños mamíferos adaptaron su morfología al exigente entorno arbóreo post-Mesozoico. Desarrollaron extremidades con pulgares prensiles, rotación amplia de hombros y una aguda visión estereoscópica frontal." },
            512: { n: "Primate",     img: "img/512_mono.png",      d: "Cerebro avanzado y manos hábiles.",       ext: "La vida en tres dimensiones y la dieta variada favoreció un clado con mayor encefalización. La neocorteza cerebral se expandió, posibilitando una estructura social compleja, la percepción sutil del entorno y la habilidad prensil fina." }
        }
    },
    homo: {
        title: "ERA HOMO", panelTitle: "ANTROPOLOGÍA",
        data: {
            2:   { n: "Primate",      img: "img/512_mono.png",       d: "El ancestro desciende a la sabana.",        ext: "Los hominoideos del Mioceno experimentaron enormes presiones selectivas por la fragmentación forestal y el cambio climático en África, lo que forzó a ciertas poblaciones a aventurarse y forrajear en las emergentes y peligrosas sabanas." },
            4:   { n: "Bipedación",   img: "img/4_afarensis.png",    d: "Caminar erguido libera las manos.",         ext: "La adopción de la locomoción bípeda habitual supuso una drástica reestructuración pélvica y la recolocación del foramen magnum. Esto maximizó la eficiencia energética de la marcha y dejó los brazos libres para transportar cargas y crías." },
            8:   { n: "Herramientas", img: "img/8_piedra.png",       d: "Tecnología para transformar el entorno.",   ext: "Homínidos como el 'Homo habilis' perfeccionaron la talla lítica sistemática (industry olduvayense). El uso deliberado de lascas afiladas permitió carroñear, cortar carne y extraer tuétano, aportando densas calorías indispensables para el cerebro." },
            16:  { n: "El Fuego",     img: "img/16_fuego.png",       d: "Calor, protección y cocina.",               ext: "El control del fuego, evidenciado desde el 'Homo erectus', revolucionó nuestra fisiología. La cocción predigería los alimentos, maximizando la absorción de nutrientes, reduciendo el tamaño del intestino y permitiendo desviar energía vital al cráneo." },
            32:  { n: "Simbolismo",   img: "img/32_tumba.png",       d: "El rito funerario y el respeto.",            ext: "La presencia de enterramientos intencionados (como en yacimientos de Neandertales y primeros Sapiens) constata el nacimiento del pensamiento abstracto. Supone una autoconciencia profunda sobre la vida, la muerte y el vínculo afectivo del clan." },
            64:  { n: "El Éxodo",     img: "img/64_expansion.png",   d: "Colonizando cada rincón del planeta.",       ext: "Dotados de gran versatilidad adaptativa y cooperación verbal, el 'Homo sapiens' protagonizó oleadas migratorias fuera de África. Logró habitar tundras glaciares, desiertos tórridos y navegó hasta remotas islas del Pacífico." },
            128: { n: "Arte",         img: "img/128_pintura.png",    d: "Nuestras primeras historias plasmadas.",    ext: "La Revolución Cognitiva del Paleolítico Superior floreció en forma de arte rupestre y figurillas mobiliares. Es el testimonio indiscutible de un cerebro capaz de codificar símbolos, mantener un lenguaje estructurado y formular mitos colectivos." },
            256: { n: "Agricultura",  img: "img/256_agricultura.png",d: "Dominio de los ciclos de la tierra.",        ext: "En los albores del Holoceno, la Revolución Neolítica cambió el paradigma nómada cazador-recolector. La domesticación selectiva de cereales y ungulados sentó las bases para el sedentarismo, la acumulación de excedentes y la división del trabajo." },
            512: { n: "Civilización", img: "img/512_egipto.png",     d: "Nacen las ciudades y la Historia.",          ext: "El gran éxito agrícola y demográfico propició la creación de complejas sociedades estratificadas en los grandes valles fluviales. Para administrar excedentes e impuestos se inventó la escritura, marcando la frontera técnica entre Prehistoria e Historia." }
        }
    }
};

// ─────────────────────────────────────────────
// RAMAS DE INVESTIGACIÓN (ramas primarias)
//
// Estructura por rama:
//   id       : clave única usada como activeSubgameType
//   title    : texto del encabezado en el overlay
//   panelTitle: subtítulo del panel lateral
//   color    : color temático (CSS hex)
//   completeDesc: texto al finalizar la investigación
//   branches : [] → sub-ramas que se desbloquean al completar
//              (campo de futuro; vacío por ahora)
//   data     : fichas 2→512 igual que en ERAS
// ─────────────────────────────────────────────

const INVESTIGATIONS = {

    pioneros: {
        id: 'pioneros',
        title: "INVESTIGACIÓN: PIONEROS",
        panelTitle: "MICROCOSMOS",
        color: '#e84393',
        completeDesc: "Has alcanzado a los Coanoflagelados y completado la ramificación.",
        branches: ['flora'], 
        data: {
            2:   { n: 'LUCA',             img: 'img/2_luca.png',             d: 'El último ancestro común universal.',          adap: 'Organismo procariota primitivo adaptado a las fuentes hidrotermales oceánicas ricas en minerales.' },
            4:   { n: 'Cianobacterias',   img: 'img/4_cloroplastos.png',     d: 'Los motores de la fotosíntesis oxigénica.',    adap: 'Bacterias pioneras libres que provocaron la Gran Oxidación y revolucionaron la atmósfera mucho antes de convertirse en orgánulos vegetales.' },
            8:   { n: 'Mitocondrias',     img: 'img/8_mitocondrias.png',     d: 'Centrales de energía.',                        adap: 'Bacterias aeróbicas absorbidas que proporcionan enormes cantidades de energía (ATP) a su célula huésped.' },
            16:  { n: 'Célula Eucariota', img: 'img/16_eucariota.png',       d: 'Complejidad con núcleo definido.',             adap: 'Compartimentación de orgánulos y un núcleo membranal que protege el material genético estructurado.' },
            32:  { n: 'Algas Unicelulares',img:'img/32_algas.png',           d: 'Fitoplancton primigenio.',                     adap: 'Dominio de la fotosíntesis en flotación libre para colonizar la inmensa zona fótica del océano.' },
            64:  { n: 'Hongos Unicelulares',img:'img/64_hongos.png',         d: 'Levaduras primitivas.',                        adap: 'Nutrición osmótrofa (absorción de nutrientes) y altísima resistencia a condiciones ambientales adversas.' },
            128: { n: 'Amebas',           img: 'img/128_amebas.png',         d: 'Cazadores microscópicos.',                     adap: 'Locomoción mediante pseudópodos y fagocitosis extrema para engullir bacterias y otras células enteras.' },
            256: { n: 'Radiolarios',      img: 'img/256_radiolarios.png',    d: 'Arquitectos de cristal oceánicos.',            adap: 'Secreción de intrincados exoesqueletos de sílice y uso de finos pseudópodos para atrapar plancton.' },
            512: { n: 'Coanoflagelados',  img: 'img/512_coanoflagelados.png',d: 'El puente hacia los animales.',               adap: 'Células con un collar de microvellosidades y un flagelo central para filtrar bacterias, capaces de formar colonias temporales.' }
        }
    },

    monitos: {
        id: 'monitos',
        title: "INVESTIGACIÓN: MONITOS",
        panelTitle: "PRIMATES",
        color: '#2ecc71',
        completeDesc: "Has alcanzado al Chimpancé y completado la ramificación.",
        branches: [],
        data: {
            2:   { n: 'Lémur',         img: 'img/2_lemur.png',        d: 'Primates de Madagascar.',         adap: 'Desarrollaron garras de aseo y una "peineta dental" inferior, adaptaciones clave para la higiene y el forrajeo en los densos bosques de Madagascar.' },
            4:   { n: 'Tarsero',       img: 'img/4_tarsero.png',      d: 'Pequeños de ojos enormes.',       adap: 'Sus ojos, más grandes que su cerebro, son adaptaciones nocturnas perfectas. Sus huesos tarsales alargados permiten saltos explosivos para cazar insectos.' },
            8:   { n: 'Mono Araña',    img: 'img/8_mono_arana.png',   d: 'Ágiles habitantes del dosel.',    adap: 'Poseen una cola prensil increíblemente sensible, que actúa como una "quinta mano", permitiéndoles colgarse y braquiar mientras buscan frutas.' },
            16:  { n: 'Mandril',       img: 'img/16_mandril.png',     d: 'Famosos por su colorido.',        adap: 'Fuerte coloración facial azul y roja, adaptación para la comunicación visual y selección sexual en el denso y oscuro sotobosque de las selvas africanas.' },
            32:  { n: 'Mono Narigudo', img: 'img/32_mono_narigudo.png',d: 'Endémicos de Borneo.',           adap: 'La gran nariz pendulosa de los machos, una adaptación única Resultante de la selección sexual, actúa como una caja de resonancia amplificando sus vocalizaciones.' },
            64:  { n: 'Gibón',         img: 'img/64_gibon.png',       d: 'Maestros del balanceo.',          adap: 'Maestros absolutos de la braquiación. Sus brazos son mucho más largos que sus piernas y poseen hombros muy flexibles para "volar" entre ramas.' },
            128: { n: 'Orangután',     img: 'img/128_orangutan.png',  d: 'Simios sabios de Asia.',          adap: 'Adaptación a la vida solitaria y arbórea. Desarrollaron dedos largos y curvos en manos y pies, y pies prensiles casi idénticos a las manos para un agarre total.' },
            256: { n: 'Gorila',        img: 'img/256_gorila.png',     d: 'Los más poderosos.',              adap: 'Adaptación al gigantismo terrestre. Desarrollaron la locomoción de "caminar sobre los nudillos" y grandes mandíbulas para procesar vegetación fibrosa.' },
            512: { n: 'Chimpancé',     img: 'img/512_chimpance.png',  d: 'Nuestros parientes más cercanos.',adap: 'Poseen pulgares oponibles bien desarrollados y pies prensiles, otorgándoles una destreza manual excepcional para la fabricación de herramientas simples.' }
        }
    },

    anfibios: {
        id: 'anfibios',
        title: "INVESTIGACIÓN: ANFIBIOS",
        panelTitle: "ANFIBIOS",
        color: '#00cec9',
        completeDesc: "Has alcanzado a la Rana y completado la ramificación.",
        branches: ['ranitas'],   // sub-rama que se desbloquea en val 512
        data: {
            2:   { n: 'Proteo',              img: 'img/2_proteo.png',            d: 'Cazador ciego de las cavernas (Proteus anguinus).',              adap: 'Pérdida de visión y pigmentación. Branquias externas permanentes (neotenia) para vivir siempre bajo el agua en la oscuridad total.' },
            4:   { n: 'Cecilia',             img: 'img/4_cecilia.png',           d: 'Anfibio sin patas que vive bajo tierra (Caecilia thomsoni).',    adap: 'Cuerpo fusiforme y cráneo osificado para excavar. Sentido del olfato y tacto hiperdesarrollados para compensar su ceguera.' },
            8:   { n: 'Sirena Mayor',        img: 'img/8_sirena.png',            d: 'Cuerpo de anguila y patas delanteras (Siren lacertina).',        adap: 'Pérdida de las extremidades posteriores para nadar eficientemente entre la densa vegetación de los pantanos.' },
            16:  { n: 'Salamandra Gigante',  img: 'img/16_salamandra_gigante.png',d: 'El anfibio más grande del mundo (Andrias davidianus).',         adap: 'Piel muy arrugada que aumenta enormemente la superficie para absorber oxígeno directamente de las frías aguas de ríos de montaña.' },
            32:  { n: 'Salamandra Común',    img: 'img/32_salamandra.png',       d: 'Marcados colores de advertencia (Salamandra salamandra).',       adap: 'Coloración aposemática (amarillo y negro) que advierte a los depredadores de las glándulas venenosas de su piel.' },
            64:  { n: 'Tritón Rojo',         img: 'img/64_triton_rojo.png',      d: 'Fase terrestre juvenil tóxica (Notophthalmus viridescens).',     adap: 'Fase de "eft" terrestre con piel rugosa y toxinas potentes, antes de volver al agua y adoptar su forma adulta lisa y verde.' },
            128: { n: 'Tritón Común',        img: 'img/128_triton.png',          d: 'Acuáticos en época de celo (Lissotriton vulgaris).',             adap: 'Los machos desarrollan una gran cresta dorsal y colores llamativos en primavera para el cortejo subacuático.' },
            256: { n: 'Ajolote',             img: 'img/256_ajolote.png',         d: 'El eterno Peter Pan (Ambystoma mexicanum).',                     adap: 'Neotenia extrema: alcanza la madurez sexual manteniendo sus branquias y aspecto de larva acuática durante toda su vida.' },
            512: { n: 'Rana Arborícola',     img: 'img/512_rana_arborea.png',    d: 'Acróbata saltadora (Hyla arborea).',                            adap: 'Patas traseras musculosas para saltos enormes y discos adhesivos en los dedos para trepar vegetación lisa.' }
        }
    },

    ranitas: {
        id: 'ranitas',
        title: "INVESTIGACIÓN: RANITAS",
        panelTitle: "RANAS EXTRAORDINARIAS",
        color: '#0984e3',
        completeDesc: "Has alcanzado a la Rana Dardo y completado la ramificación.",
        branches: [],
        data: {
            2:   { n: 'Rana de Darwin', img: 'img/2_rana_darwin.png',  d: 'Rhinoderma darwinii.',         adap: 'El macho incuba los renacuajos dentro de su saco vocal hasta que se desarrollan completamente.' },
            4:   { n: 'Rana Cornuda',   img: 'img/4_rana_cornuda.png', d: 'Ceratophrys ornata, el escuerzo.', adap: 'Boca enorme y apetito voraz; se camufla en la hojarasca esperando emboscar a sus presas.' },
            8:   { n: 'Rana Musgosa',   img: 'img/8_rana_musgosa.png', d: 'Theloderma corticale.',        adap: 'Piel con intrincados tubérculos y colores que imitan perfectamente el musgo y los líquenes de las rocas.' },
            16:  { n: 'Mantella Dorada',img: 'img/16_mantella.png',    d: 'Mantella aurantiaca.',         adap: 'Coloración aposemática muy intensa que advierte de las toxinas alcaloides obtenidas de su dieta.' },
            32:  { n: 'Rana Lluvia',    img: 'img/32_rana_lluvia.png', d: 'Breviceps adspersus.',         adap: 'Excelente excavadora de cuerpo esférico que sobrevive en hábitats secos permaneciendo bajo tierra hasta que llueve.' },
            64:  { n: 'Rana Voladora',  img: 'img/64_rana_voladora.png',d: 'Rhacophorus nigropalmatus.', adap: 'Membranas interdigitales enormes que funcionan como paracaídas para planear y saltar entre los árboles.' },
            128: { n: 'Rana Morada',    img: 'img/128_rana_morada.png',d: 'Nasikabatrachus sahyadrensis.',adap: 'Cuerpo globoso y hocico puntiagudo adaptados a la vida fosorial profunda; solo emerge para reproducirse.' },
            256: { n: 'Pipa de Surinam',img: 'img/256_pipa.png',       d: 'Pipa pipa.',                  adap: 'Las hembras incuban los huevos incrustados en la piel de su espalda plana, de donde emergen crías completamente formadas.' },
            512: { n: 'Rana Dardo Azul',img: 'img/512_rana_dardo.png', d: 'Dendrobates tinctorius.',     adap: 'Secreta potentes toxinas lipofílicas a través de la piel, derivadas de su dieta especializada de hormigas tropicales.' }
        }
    },

    pluricelulares: {
        id: 'pluricelulares',
        title: "INVESTIGACIÓN: PLURICELULARES",
        panelTitle: "EVOLUCIÓN MULTICELULAR",
        color: '#9b59b6',
        completeDesc: "Has alcanzado a los Equinodermos y completado la ramificación.",
        branches: [],
        data: {
            2:   { n: 'Placozoos',    img: 'img/2_placozoo.png',    d: 'Trichoplax.',             adap: 'El animal multicelular más simple conocido, compuesto por muy pocos tipos celulares.' },
            4:   { n: 'Ctenóforas',   img: 'img/4_ctenoforo.png',   d: 'Medusas peine.',          adap: 'Depredadores marinos primitivos que nadan rítmicamente mediante hileras de cilios.' },
            8:   { n: 'Poríferos',    img: 'img/8_esponja.png',     d: 'Esponjas marinas.',       adap: 'Animales sésiles sin verdaderos tejidos que filtran agua constantemente para alimentarse.' },
            16:  { n: 'Medusas',      img: 'img/16_medusa.png',     d: 'Cnidarios pelágicos.',    adap: 'Forma de vida libre con simetría radial y células urticantes especializadas.' },
            32:  { n: 'Corales',      img: 'img/32_coral.png',      d: 'Pólipos coloniales.',     adap: 'Constructores de grandes arrecifes gracias a la secreción de su esqueleto calcáreo protector.' },
            64:  { n: 'Anémonas',     img: 'img/64_anemona.png',    d: 'Pólipos solitarios.',     adap: 'Depredadores bentónicos anclados al sustrato con potentes tentáculos urticantes.' },
            128: { n: 'Hidras',       img: 'img/128_hidra.png',     d: 'Cnidarios de agua dulce.',adap: 'Notable capacidad de regeneración celular, siendo biológicamente inmortales.' },
            256: { n: 'Platelmintos', img: 'img/256_platelminto.png',d: 'Gusanos planos.',        adap: 'Desarrollan por primera vez la simetría bilateral y un sistema nervioso centralizado.' },
            512: { n: 'Equinodermos', img: 'img/512_equinodermo.png',d: 'Estrellas y erizos.',    adap: 'Evolucionan hacia una simetría pentarradial y desarrollan un sistema vascular acuífero único.' }
        }
    },

    flora: {
        id: 'flora',
        title: "INVESTIGACIÓN: REINO VEGETAL",
        panelTitle: "FLORA TERRESTRE",
        color: '#27ae60', // Un tono verde bosque
        completeDesc: "Has formado un ecosistema completo y completado la ramificación vegetal.",
        branches: ['suelo_a_bosque'],
        data: {
            2:   { n: 'Algas Unicelulares', img: 'img/2_algas.png',           d: 'El origen de la fotosíntesis eucariota.',            adap: 'Células flotantes que desarrollaron cloroplastos para aprovechar la energía solar en los océanos primigenios.' },
            4:   { n: 'Algas Verdes',       img: 'img/4_algas_verdes.png',    d: 'Agrupación y multicelularidad.',                     adap: 'Clorofitas que comenzaron a formar filamentos y colonias en aguas someras, precursoras directas de las plantas terrestres.' },
            8:   { n: 'Líquenes',           img: 'img/8_liquenes.png',        d: 'La conquista de la roca desnuda.',                   adap: 'Asociación simbiótica extrema entre un hongo y un alga. Capaces de disolver la roca mineral y crear el primer sustrato de suelo.' },
            16:  { n: 'Musgos',             img: 'img/16_musgos.png',         d: 'Los primeros anfibios vegetales (Briófitas).',       adap: 'Plantas no vasculares que lograron anclarse a la tierra húmeda, aunque aún dependen del agua directa para la reproducción de sus esporas.' },
            32:  { n: 'Helechos',           img: 'img/32_helechos.png',       d: 'Desarrollo de las "venas" (Pteridófitas).',          adap: 'Innovación clave: el tejido vascular (xilema y floema) y la lignina. Les permitió desafiar la gravedad y formar los primeros bosques gigantes primitivos.' },
            64:  { n: 'Semilla Desnuda',    img: 'img/64_gimnospermas.png',   d: 'Independencia del agua (Gimnospermas).',             adap: 'La invención de la semilla protegió al embrión de la desecación, permitiendo a las coníferas colonizar climas fríos y áridos.' },
            128: { n: 'Planta con Flor',    img: 'img/128_angiospermas.png',  d: 'Seducción visual y olfativa (Angiospermas).',        adap: 'Evolución conjunta con los insectos. Las flores actúan como reclamos publicitarios para garantizar una polinización cruzada altamente eficiente.' },
            256: { n: 'Planta con Fruto',   img: 'img/256_frutos.png',        d: 'Recompensas para el transporte.',                    adap: 'El ovario de la flor madura y se vuelve carnoso o nutritivo, sobornando a los animales terrestres y aves para que dispersen sus semillas a grandes distancias.' },
            512: { n: 'Bosque Maduro',      img: 'img/512_bosque.png',        d: 'El ecosistema clímax.',                              adap: 'Compleja red de coexistencia donde algas, musgos, helechos y árboles con frutos conviven, conectados subterráneamente por redes micorrícicas.' }
        }
    },
    suelo_a_bosque: {
        id: 'suelo_a_bosque',
        title: "INVESTIGACIÓN: DE SUELO A BOSQUE",
        panelTitle: "SUCESIÓN ECOLÓGICA",
        color: '#795548', // Marrón tierra
        completeDesc: "Has alcanzado el estado de Bosque Clímax, el equilibrio perfecto del ecosistema.",
        branches: [],
        data: {
            2:   { n: 'Roca Desnuda',       img: 'img/2_suelo.png',   d: 'Mineral expuesto sin vida.',              adap: 'Entorno de estrés máximo donde solo los organismos más resistentes pueden iniciar la colonización física.' },
            4:   { n: 'Líquenes',           img: 'img/4_suelo.png',   d: 'Los pioneros químicos.',                  adap: 'Simbiosis que secreta ácidos para meteorizar la roca, liberando minerales y creando las primeras trazas orgánicas.' },
            8:   { n: 'Musgos',             img: 'img/8_suelo.png',   d: 'Alfombras de humedad.',                   adap: 'Estructuras simples que atrapan polvo y agua, engrosando la capa de suelo y fragmentando mecánicamente la roca.' },
            16:  { n: 'Hierbas Anuales',    img: 'img/16_suelo.png',  d: 'Colonizadores veloces.',                  adap: 'Plantas de ciclo corto que producen grandes cantidades de semillas y biomasa, enriqueciendo rápidamente el suelo con humus.' },
            32:  { n: 'Gramíneas',          img: 'img/32_suelo.png',  d: 'Suelo estabilizado.',                     adap: 'Raíces densas que evitan la erosión y mejoran la estructura del suelo, permitiendo la retención de nutrientes a largo plazo.' },
            64:  { n: 'Matorrales',         img: 'img/64_suelo.png',  d: 'Sombra y refugio.',                       adap: 'Plantas leñosas que transforman el microclima, atrayendo fauna que actúa como vector para semillas de árboles.' },
            128: { n: 'Árboles Pioneros',   img: 'img/128_suelo.png', d: 'Conquistadores de luz.',                  adap: 'Crecimiento rápido en exposición solar plena, creando la primera bóveda forestal que protege a las especies de sombra.' },
            256: { n: 'Bosque Mixto',       img: 'img/256_suelo.png', d: 'Transición a la madurez.',                adap: 'Suelo profundo y maduro con gran biodiversidad; las especies de crecimiento lento comienzan a superar a las pioneras.' },
            512: { n: 'Bosque Clímax',      img: 'img/512_suelo.png', d: 'El equilibrio dinámico.',                 adap: 'Ecosistema estable y autosuficiente donde la sustitución de especies se detiene en favor de una comunidad resiliente.' }
        }
},


};

// ─────────────────────────────────────────────
// MAPA DE PORTALES
//
// Define qué investigaciones se desbloquean
// en cada nodo (era + valor de ficha).
// El motor leerá esta tabla en lugar de
// tener if/else hardcodeados.
//
// Formato:
//   PORTALS[eraId][tileValue] = ['investigationId', ...]
//   PORTALS['__subgame__'][investigationId][tileValue] = ['investigationId', ...]
// ─────────────────────────────────────────────

const PORTALS = {
    // Portales en la pantalla de fin de ERA VIDA
    vida: {
        2:   ['pioneros'],
        4:   ['pluricelulares'],
        32:  ['anfibios'],
        512: ['monitos']
    },
    // Portales en la pantalla de fin de una INVESTIGACIÓN
    __subgame__: {
        anfibios: {
            512: ['ranitas']
        },

        pioneros: {
            32: ['flora'] // <--- El nuevo portal que se abre al llegar a 32 en pioneros
        },

    flora: {
            512: ['suelo_a_bosque'] // <--- El portal que se abre al llegar a 512 en flora
        }
    }
};

// Orden canónico de las eras del tronco
const ERA_ORDER = ['astronomica', 'vida', 'homo'];

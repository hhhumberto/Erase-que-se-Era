/* ============================================================
   ÉRASE QUE SE ERA — Datasets evolutivos
   Árbol de contenidos: ERAS (tronco) + ramas de INVESTIGACIÓN

   Estructura prevista a futuro:
   ─ ERAS              → historia troncal (astronomica → vida → homo → ...)
   ─ INVESTIGATIONS    → ramas primarias colgadas de nodos del tronco

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
            256: { n: "Sopa prebiótica", img: "img/256_sopa.png",    d: "Caldo primordial rico en compuestos orgánicos.", ext: "En los océanos primitivos, la combinación de agua líquida, moléculas orgánicas simples aportadas por impactos de meteoritos y energía (rayos ultravioleta, actividad volcánica) dio lugar a un 'caldo' complejo. En esta sopa prebiótica comenzaron a formarse los polímeros y las primeras estructuras autorreplicantes." },
            512: { n: "Bacteria",        img: "img/2_bacteria.png",  d: "¡La materia inerte se vuelve viva!",       ext: "A través de procesos de evolución química (abiogénesis) en los océanos primordiales, las moléculas orgánicas formaron polímeros autorreplicantes encapsulados en membranas lipídicas, dando origen a los primeros organismos procariotas." }
        }
    },
    vida: {
        title: "ERA VIDA", panelTitle: "EVOLUCIÓN",
        data: {
            2:   { n: "Unicelular",  img: "img/2_bacteria.png",    d: "Célula capaz de replicarse.",             ext: "Organismos procariontes primigenios sin núcleo definido. Desarrollaron el metabolismo anaeróbico y, más tarde, la fotosíntesis en forma de cianobacterias, provocando el evento de la Gran Oxidación que transformó la atmósfera." },
            4:   { n: "Pluricelular",img: "img/4_coral.png",       d: "Origen de la pluricelularidad.",          ext: "La simbiosis y especialización celular dio paso a la vida pluricelular. Los cnidarios y pólipos primitivos comenzaron a secretar esqueletos calcáreos, construyendo complejos arrecifes y nuevos hábitats oceánicos." },
            8:   { n: "Invertebrado",img: "img/8_invertebrado.png",d: "Cuerpos blandos, primeros cazadores.",    ext: "La explosión del Cámbrico impulsó una radiación adaptativa sin precedentes. Surgieron diversos filos con simetría bilateral, sistemas nerviosos primitivos y, en muchos casos, exoesqueletos o conchas para la defense y movilidad." },
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
    },
    mundos_antiguos: {
        title: "ERA MUNDOS ANTIGUOS", panelTitle: "CIVILIZACIONES",
        data: {
            2:   { n: "Mesopotamia",      img: "img/2_antiguo.png",   d: "La cuna de la civilización entre dos ríos.",             ext: "En las fértiles llanuras del Tigris y el Éufrates nacieron las primeras ciudades-estado sumerias. Aquí se inventó la escritura cuneiforme, la rueda y las primeras leyes escritas, marcando el inicio de la historia humana registrada." },
            4:   { n: "Egipto",           img: "img/4_antiguo.png",        d: "El don del Nilo y los faraones divinos.",                ext: "Una cultura monumental que prosperó durante milenios. Construyeron pirámides colosales, desarrollaron los jeroglíficos y mantuvieron una compleja religión centrada en la vida después de la muerte." },
            8:   { n: "Babilonia",        img: "img/8_antiguo.png",     d: "La joya cultural y científica de la antigüedad.",        ext: "Famosa por sus jardines colgantes y su imponente Puerta de Ishtar. Bajo reyes como Hammurabi, Babilonia se convirtió en un centro de astronomía, matemáticas y codificación legal sin precedentes." },
            16:  { n: "Pueblos del Mar",  img: "img/16_antiguo.png",  d: "El misterioso colapso de la Edad de Bronce.",            ext: "Una serie de sequías, terremotos y violentas invasiones de los enigmáticos 'Pueblos del Mar' desestabilizaron el Mediterráneo oriental, provocando la caída súbita de grandes imperios como el hitita y el micénico." },
            32:  { n: "Atenas",           img: "img/32_antiguo.png",       d: "El nacimiento de la democracia y la filosofía.",         ext: "El faro cultural de la Antigua Grecia. Atenas sentó las bases del pensamiento occidental a través de la filosofía de Sócrates, Platón y Aristóteles, el teatro trágico y el primer sistema de gobierno democrático." },
            64:  { n: "Alejandro Magno",  img: "img/64_antiguo.png",    d: "La conquista del mundo conocido.",                       ext: "Partiendo de Macedonia, este joven rey lideró un ejército invencible que derrocó al Imperio Persa y extendió la cultura helenística desde Grecia hasta el río Indo en un tiempo récord." },
            128: { n: "Cartago contra Roma",img: "img/128_antiguo.png",d: "El choque de titanes por el Mediterráneo.",              ext: "Tres brutales Guerras Púnicas enfrentaron a la República Romana contra el imperio marítimo de Cartago. A pesar de las hazañas de Aníbal, Roma triunfó, aniquiló a su rival y aseguró su hegemonía." },
            256: { n: "Imperio Romano",   img: "img/256_antiguo.png",        d: "Todas las carreteras conducen a Roma.",                  ext: "Una superpotencia militar y de ingeniería que unificó Europa, el norte de África y Oriente Próximo. Su legado en arquitectura, derecho, idioma y tácticas militares perdura hasta la actualidad." },
            512: { n: "Caída de Roma",    img: "img/512_antiguo.png",  d: "El ocaso del Imperio de Occidente.",                     ext: "Debilitado por crisis económicas, división interna y la presión constante de migraciones germánicas, el Imperio Romano de Occidente finalmente sucumbió en el año 476 d.C., dando paso a la Edad Media." }
        }
    },
};

// ─────────────────────────────────────────────
// RAMAS DE INVESTIGACIÓN (ramas primarias)
// ─────────────────────────────────────────────

const INVESTIGATIONS = {

    pioneros: {
        id: 'pioneros',
        title: "INVESTIGACIÓN: PIONEROS",
        panelTitle: "MICROCOSMOS",
        color: '#e84393',
        completeDesc: "Has alcanzado a los Coanoflagelados y completado la ramificación.", 
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

    lineas_reptilianas: {
        id: 'lineas_reptilianas',
        title: "INVESTIGACIÓN: LÍNEAS REPTILIANAS",
        panelTitle: "EVOLUCIÓN REPTILIANA",
        color: '#27ae60', // Verde reptil/escama
        completeDesc: "Has explorado la diversificación de los saurópsidos, desde los linajes basales hasta los amos del cielo y de la tierra.",
        data: {
            2:   { n: 'Pararreptiles', img: 'img/2_reptiliano.png', d: 'Primeros reptiles basales.',                        adap: 'Formas primitivas que divergieron temprano en la evolución de los amniotas, experimentando con las primeras armaduras óseas antes de extinguirse sin descendencia moderna.' },
            4:   { n: 'Tortugas',      img: 'img/4_reptiliano.png',      d: 'El éxito del caparazón.',                           adap: 'Anápsidos o diápsidos modificados que desarrollaron una coraza ósea protectora única fusionada con sus costillas, un diseño tan perfecto que ha sobrevivido cientos de millones de años.' },
            8:   { n: 'Lagartos',      img: 'img/8_reptiliano.png',      d: 'Maestros de la adaptación.',                        adap: 'Escamosos ágiles que colonizaron casi todos los ecosistemas del planeta, desarrollando una enorme diversidad de tamaños, camuflajes y sorprendentes estrategias de supervivencia.' },
            16:  { n: 'Serpientes',    img: 'img/16_reptiliano.png',   d: 'Especialización sin extremidades.',                 adap: 'Evolucionaron a partir de lagartos antiguos, perdiendo las patas y desarrollando mandíbulas altamente flexibles junto con eficaces tácticas de caza constrictora o venenosa.' },
            32:  { n: 'Tuátaras',      img: 'img/32_reptiliano.png',     d: 'Auténticos fósiles vivientes.',                     adap: 'Endémicas de Nueva Zelanda, son las únicas supervivientes del antiguo orden Sphenodontia. Poseen un misterioso "tercer ojo" fotorreceptor bajo la piel de la cabeza.' },
            64:  { n: 'Pterosaurios',  img: 'img/64_reptiliano.png', d: 'Los reyes del cielo mesozoico.',                     adap: 'Los primeros vertebrados en desarrollar el vuelo activo. Sus espectaculares alas estaban formadas por una membrana muscular estirada desde un alargado cuarto dedo de la mano.' },
            128: { n: 'Cocodrilos',    img: 'img/128_reptiliano.png',  d: 'Depredadores semiacuáticos perfectos.',              adap: 'Arcoosaurios especializados que alcanzaron un diseño anatómico tan letal y eficiente que ha permanecido prácticamente inalterado desde la era de los dinosaurios.' },
            256: { n: 'Dinosaurios',  img: 'img/256_reptiliano.png', d: 'Los amos del Mesozoico.',                           adap: 'Dominaron la Tierra durante más de 130 millones de años gracias a su postura erecta y metabolismo eficiente, diversificándose en colosos herbívoros y letales carnívoros.' },
            512: { n: 'Aves',          img: 'img/512_reptiliano.png',        d: 'Dinosaurios con plumas.',                           adap: 'Los únicos dinosaurios terópodos que sobrevivieron a la gran extinción masiva, transformando sus escamas y plumas en herramientas de vuelo para conquistar los cielos modernos.' }
        }
    },

    lagartos_variados: {
        id: 'lagartos_variados',
        title: "INVESTIGACIÓN: LAGARTOS VARIADOS",
        panelTitle: "DIVERSIDAD DE LAGARTOS",
        color: '#f39c12', // Un tono naranja/dorado escamoso
        completeDesc: "Has descubierto la asombrosa diversidad de formas y adaptaciones de los lagartos.",
        data: {
            2:   { n: 'Iguana verde',            img: 'img/2_lagartitos.png',          d: 'Iguana iguana.',               adap: 'Herbívoro estrictamente arborícola con una cresta dorsal prominente y una larga cola que usa como látigo para defenderse.' },
            4:   { n: 'Dragón de Komodo',        img: 'img/4_lagartitos.png',          d: 'Varanus komodoensis.',         adap: 'El lagarto más grande del mundo. Caza grandes presas gracias a su letal combinación de fuerza, tamaño y glándulas de veneno.' },
            8:   { n: 'Camaleón del Yemen',      img: 'img/8_lagartitos.png',        d: 'Chamaeleo calyptratus.',       adap: 'Posee ojos de movimiento independiente, lengua proyectable y la capacidad de cambiar de color para comunicarse y termorregularse.' },
            16:  { n: 'Geco tokay',              img: 'img/16_lagartitos.png',           d: 'Gekko gecko.',                 adap: 'Sus dedos están provistos de almohadillas con millones de setas microscópicas que crean fuerzas de van der Waals para trepar cualquier superficie.' },
            32:  { n: 'Lagarto volador',         img: 'img/32_lagartitos.png',          d: 'Draco volans.',                adap: 'Sus costillas alargadas sostienen una membrana de piel (patagio) que despliega para planear hábilmente entre los árboles de la selva.' },
            64:  { n: 'Lagarto de lengua azul',  img: 'img/64_lagartitos.png',        d: 'Tiliqua scincoides.',          adap: 'Desarrolló una llamativa y ancha lengua azul que muestra repentinamente junto con un fuerte siseo para disuadir a posibles atacantes.' },
            128: { n: 'Lución',                  img: 'img/128_lagartitos.png',        d: 'Anguis fragilis.',             adap: 'Lagarto ápodo (sin patas) adaptado a la vida subterránea que retiene la capacidad de autotomía: puede desprender su cola para escapar.' },
            256: { n: 'Monstruo de Gila',        img: 'img/256_lagartitos.png',          d: 'Heloderma suspectum.',         adap: 'Uno de los pocos lagartos venenosos. Almacena grandes reservas de grasa en su gruesa cola para sobrevivir a los duros meses de sequía en el desierto.' },
            512: { n: 'Lagarto verde europeo',   img: 'img/512_lagartitos.png', d: 'Lacerta viridis.',             adap: 'Los machos lucen una brillante coloración esmeralda con garganta azul en celo. Es un cazador terrestre extremadamente ágil entre los matorrales.' }
        }
    },

    evolucion_deslizante: {
        id: 'evolucion_deslizante',
        title: "INVESTIGACIÓN: EVOLUCIÓN DESLIZANTE",
        panelTitle: "RADIACIÓN DE LAS SERPIENTES",
        color: '#27ae60', // Un tono verde serpentino
        completeDesc: "Has trazado el camino evolutivo de los ofidios, desde los vestigios de sus patas hasta los sistemas venenosos más complejos.",
        data: {
            2:   { n: 'Culebra ciega',           img: 'img/2_deslizante.png',      d: 'Typhlops schlegelii.',      adap: 'Serpiente fosorial primitiva con ojos vestigiales, evidencia del origen subterráneo de las serpientes.' },
            4:   { n: 'Serpiente tubería',       img: 'img/4_deslizante.png',    d: 'Cylindrophis ruffus.',      adap: 'Conserva vestigios de pelvis y fémur, un rastro directo de sus ancestros con patas.' },
            8:   { n: 'Serpiente arco iris',     img: 'img/8_deslizante.png',   d: 'Xenopeltis unicolor.',      adap: 'Eslabón intermedio con escamas iridiscentes que conectan linajes primitivos y modernos.' },
            16:  { n: 'Anaconda verde',          img: 'img/16_deslizante.png',  d: 'Eunectes murinus.',         adap: 'El reptil más pesado del mundo; conserva espuelas cloacales como patas traseras rudimentarias.' },
            32:  { n: 'Pitón reticulada',        img: 'img/32_deslizante.png',     d: 'Malayopython reticulatus.', adap: 'La serpiente más larga del mundo, capaz de alcanzar longitudes de hasta 8 metros.' },
            64:  { n: 'Serpiente rey',           img: 'img/64_deslizante.png',       d: 'Lampropeltis californiae.', adap: 'Representa la radiación colúbrida, la familia más diversa con cerca de 1800 especies.' },
            128: { n: 'Serpiente marina',        img: 'img/128_deslizante.png',   d: 'Hydrophis platurus.',       adap: 'La única serpiente verdaderamente pelágica del mundo, adaptada a vivir en mar abierto.' },
            256: { n: 'Cobra real',              img: 'img/256_deslizante.png',    d: 'Ophiophagus hannah.',       adap: 'La serpiente venenosa más larga; destaca por construir nidos y proteger activamente sus huevos.' },
            512: { n: 'Cascabel diamantada',     img: 'img/512_deslizante.png', d: 'Crotalus atrox.',          adap: 'Posee colmillos abatibles y fosetas termorreceptoras, el sistema de caza más sofisticado del mundo ofidio.' }
        }
    },

    monitos: {
        id: 'monitos',
        title: "INVESTIGACIÓN: MONITOS",
        panelTitle: "PRIMATES",
        color: '#2ecc71',
        completeDesc: "Has alcanzado al Chimpancé y completado la ramificación.",
        data: {
            2:   { n: 'Lémur',         img: 'img/2_lemur.png',        d: 'Primates de Madagascar.',         adap: 'Desarrollaron garras de aseo y una "peineta dental" inferior, adaptaciones clave para la higiene y el forrajeo en los densos bosques de Madagascar.' },
            4:   { n: 'Tarsero',       img: 'img/4_tarsero.png',      d: 'Pequeños de ojos enormes.',       adap: 'Sus ojos, más grandes que su cerebro, son adaptaciones nocturnas perfectas. Sus huesos tarsales alargados permiten saltos explosivos para cazar insectos.' },
            8:   { n: 'Mono Araña',    img: 'img/8_mono_arana.png',   d: 'Ágiles habitantes del dosel.',    adap: 'Poseen una cola prensil increíblemente sensible, que actúa como una "quinta mano", permitiéndoles colgarse y braquiar mientras buscan frutas.' },
            16:  { n: 'Mandril',       img: 'img/16_mandril.png',     d: 'Famosos por su colorido.',        adap: 'Fuerte coloración facial azul y roja, adaptación para la comunicación visual y selección sexual en el denso y oscuro sotobosque de las selvas africanas.' },
            32:  { n: 'Mono Narigudo', img: 'img/32_mono_narigudo.png',d: 'Endémicos de Borneo.',           adap: 'La gran nariz pendulosa de los machos, una adaptación única resultante de la selección sexual, actúa como una caja de resonancia amplificando sus vocalizaciones.' },
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
        completeDesc: "Has alcanzado a la Rana y completado la ranificación.",   // sub-rama que se desbloquea en val 512
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
        completeDesc: "Has alcanzado a la Rana Dardo y completado la ranificación.",
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
    ranitas_dardo: {
        id: 'ranitas_dardo',
        title: "INVESTIGACIÓN: RANITAS DARDO",
        panelTitle: "DENDROBATIDAE",
        color: '#7fff00', // Verde neón/lima
        completeDesc: "Has descubierto los morphos más raros y completado a las Ranitas Dardo.",
        data: {
            2:   { n: 'Phyllobates vittatus', img: 'img/2_dardo.png',   d: 'Rana de franjas de oro.',                adap: 'Desarrolló franjas aposemáticas brillantes para advertir de sus alcaloides en el suelo de Costa Rica.' },
            4:   { n: 'D. leucomelas (Bolívar)', img: 'img/4_dardo.png',   d: 'Morpho de bandas anchas.',             adap: 'Adaptación cromática extrema para maximizar el contraste visual en la penumbra del sotobosque.' },
            8:   { n: 'Oophaga sylvatica',    img: 'img/8_dardo.png',   d: 'El pequeño diablo.',                    adap: 'Especialización en cuidado parental donde la hembra provee huevos tróficos cargados de nutrientes y defensas.' },
            16:  { n: 'D. auratus (Mint)',    img: 'img/16_dardo.png',  d: 'Morpho verde menta.',                  adap: 'Variación de coloración disruptiva que ofrece un equilibrio entre advertencia y camuflaje en helechos claros.' },
            32:  { n: 'Ranitomeya summersi',  img: 'img/32_dardo.png',  d: 'Joya naranja y negra.',                adap: 'Cuerpo miniaturizado para habitar exclusivamente en las axilas de bromelias y pequeñas fitotelmata.' },
            64:  { n: 'Epipedobates tricolor',img: 'img/64_dardo.png',  d: 'Fuente de epibatidina.',                adap: 'Producción de alcaloides analgésicos únicos que han revolucionado el estudio de la medicina farmacológica.' },
            128: { n: 'Oophaga lehmanni',     img: 'img/128_dardo.png', d: 'Morpho de bandas rojas.',              adap: 'Especie en peligro crítico con una dieta altamente especializada que le permite secretar toxinas pumiliotoxinas.' },
            256: { n: 'Oophaga histrionica',  img: 'img/256_dardo.png', d: 'Rana arlequín del Chocó.',             adap: 'Sintetiza histrionicotoxinas únicas en su tipo y presenta un polimorfismo extremo con innumerables variaciones de color y patrón.' },
            512: { n: 'Oophaga pumilio',      img: 'img/512_dardo.png', d: 'Rana dardo fresa (Blue Jeans).',       adap: 'Lleva el cuidado parental al límite: la madre memoriza dónde escondió cada renacuajo en las bromelias y regresa a alimentarlos con huevos no fecundados.' }
        }
    },

    nace_un_planeta: {
        id: 'nace_un_planeta',
        title: "INVESTIGACIÓN: NACE UN PLANETA",
        panelTitle: "FORMACIÓN TERRESTRE",
        color: '#ff9f43',
        completeDesc: "Has presenciado la formación de la Tierra y la deriva de sus continentes.",
        data: {
            2:   { n: 'Polvo y hielo',       img: 'img/2_planeta.png',   d: 'Nebulosa solar.',          adap: 'Agregación inicial de partículas de polvo y hielos volátiles en el disco protoplanetario.' },
            4:   { n: 'Planetesimales',      img: 'img/4_planeta.png',   d: 'Embriones planetarios.',   adap: 'Colisiones a baja velocidad que comienzan a formar cuerpos rocosos de gran tamaño.' },
            8:   { n: 'Océanos de magma',    img: 'img/8_planeta.png',   d: 'Tierra incandescente.',    adap: 'La energía de las colisiones mantiene la superficie fundida, permitiendo la diferenciación del núcleo.' },
            16:  { n: 'Impacto con Theia',   img: 'img/16_planeta.png',  d: 'La gran colisión.',        adap: 'El impacto de un protoplaneta del tamaño de Marte que reconfigura la estructura terrestre.' },
            32:  { n: 'Formación de la Luna',img: 'img/32_planeta.png',  d: 'El satélite nace.',        adap: 'Los escombros del impacto de Theia orbitan y se aglutinan para formar nuestra Luna.' },
            64:  { n: 'Enfriamiento',        img: 'img/64_planeta.png',  d: 'Corteza primitiva.',      adap: 'La emisión de calor al espacio permite la formación de una corteza basáltica estable.' },
            128: { n: 'Bombardeo asteroides',img: 'img/128_planeta.png', d: 'Aporte de agua.',          adap: 'El Bombardeo Intenso Tardío trae los compuestos volátiles necesarios para los futuros océanos.' },
            256: { n: 'Pangea',              img: 'img/256_planeta.png', d: 'Primer supercontinente.',  adap: 'La tectónica de placas une las masas continentales en un único bloque colosal.' },
            512: { n: 'Continentes actuales',img: 'img/512_planeta.png', d: 'Deriva continental.',     adap: 'La fragmentación de Pangea y la configuración actual de la geografía terrestre.' }
        }
    },
    
    primeros_artistas: {
        id: 'primeros_artistas',
        title: "INVESTIGACIÓN: PRIMEROS ARTISTAS",
        panelTitle: "ARTE PREHISTÓRICO",
        color: '#e67e22', // Un tono ocre/arcilla
        completeDesc: "Has admirado la bóveda de Altamira y completado la evolución del primer arte.",
        data: {
            2:   { n: 'Cerdo de Sulawesi',       img: 'img/2_artepri.png',     d: 'Una de las pinturas figurativas más antiguas.',              adap: 'Uso temprano de pigmentos ocres para representar la fauna local, evidenciando una profunda necesidad de plasmar el entorno.' },
            4:   { n: 'Hombre-León de Hohlenstein',     img: 'img/4_artepri.png',  d: 'Escultura zoomorfa en marfil de mamut.',                     adap: 'Primeras muestras de imaginación y pensamiento mítico, fusionando características humanas y animales en una sola figura tridimensional.' },
            8:   { n: 'Leones de Chauvet',       img: 'img/8_artepri.png',      d: 'Escenas dinámicas de depredadores.',                         adap: 'Uso magistral del relieve natural de la roca y el sombreado difuminado para dar sensación de movimiento y profundidad a las manadas.' },
            16:  { n: 'Venus de Willendorf',     img: 'img/16_artepri.png',  d: 'Estatuilla femenina de formas exageradas.',                  adap: 'Símbolo portátil de fertilidad o abundancia tallado en caliza oolítica, reflejando los primeros cánones estéticos o religiosos universales.' },
            32:  { n: 'Venus de Brassempouy',    img: 'img/32_artepri.png', d: 'El primer rostro humano detallado.',                         adap: 'Talla minuciosa en marfil que destaca por la representación esquemática del peinado o tocado, omitiendo los rasgos faciales individualizados.' },
            64:  { n: 'Bisontes de d\'Audoubert',img: 'img/64_artepri.png',  d: 'Relieves modelados en arcilla cruda.',                       adap: 'Dominio de la técnica de modelado tridimensional en el interior profundo y oscuro de las cavernas, probablemente con fines rituales.' },
            128: { n: 'Bóvidos de Lascaux',      img: 'img/128_artepri.png',    d: 'La Capilla Sixtina de la prehistoria.',                      adap: 'Uso incipiente de andamiajes de madera y técnicas de pulverización de pigmentos para crear composiciones monumentales en los altos techos.' },
            256: { n: 'Pinturas de Tassili',     img: 'img/256_artepri.png',    d: 'Arte rupestre en el corazón del Sahara.',                    adap: 'Registro visual de un antiguo Sahara verde, mostrando escenas sociales complejas de pastoreo, caza y danzas rituales al aire libre.' },
            512: { n: 'Bisontes de Altamira',    img: 'img/512_artepri.png',   d: 'El cénit del arte parietal policromado.',                    adap: 'Aprovechamiento genial de las protuberancias naturales de la cueva para dotar de un realismo y volumen tridimensional inigualable a las bestias.' }
        }
    },

    piel_con_historia: {
        id: 'piel_con_historia',
        title: "INVESTIGACIÓN: PIEL CON HISTORIA",
        panelTitle: "CORTEZA TERRESTRE",
        color: '#d35400', // Un tono arcilla/magma profundo
        completeDesc: "Has sobrevivido a la furia de Toba y completado la evolución geológica moderna.",
        data: {
            2:   { n: 'Pangea Máximo',               img: 'img/2_piel.png',   d: 'El apogeo del supercontinente.',                    adap: 'Todas las masas terrestres unidas en un único bloque colosal, rodeado por el inmenso océano Panthalassa, provocando un clima interior extremadamente árido.' },
            4:   { n: 'Formación del Atlántico',     img: 'img/4_piel.png',   d: 'La grieta que separó mundos.',                      adap: 'Pangea comienza a fracturarse. El magma asciende creando nueva corteza oceánica y abriendo un estrecho mar entre América y África/Europa.' },
            8:   { n: 'Rotura de Gondwana',          img: 'img/8_piel.png',   d: 'El sur se fragmenta.',                              adap: 'El supercontinente meridional se divide, separando Sudamérica, África, Antártida, India y Australia, aislando sus floras y faunas para siempre.' },
            16:  { n: 'Impacto de Chicxulub',        img: 'img/16_piel.png',  d: 'El fin de una era.',                                adap: 'Un asteroide de unos 10 km golpea la península de Yucatán, provocando megatsunamis, un invierno global y la extinción masiva que borró a los dinosaurios no avianos.' },
            32:  { n: 'Formación del Himalaya',      img: 'img/32_piel.png',  d: 'El techo del mundo se eleva.',                      adap: 'La placa Indostánica choca a gran velocidad contra Eurasia. La corteza se pliega y se eleva drásticamente, creando la cordillera más imponente de la Tierra.' },
            64:  { n: 'Grandes glaciaciones',        img: 'img/64_piel.png',  d: 'El avance inexorable del hielo.',                   adap: 'Ciclos de enfriamiento global provocan que masivas capas de hielo cubran gran parte de los hemisferios, esculpiendo profundos valles y alterando el nivel del mar.' },
            128: { n: 'Desecación del Mediterráneo', img: 'img/128_piel.png', d: 'La crisis salina del Messiniense.',                 adap: 'El estrecho de Gibraltar se cierra temporalmente. El mar Mediterráneo se evapora casi por completo, dejando un gigantesco desierto de sal a kilómetros de profundidad.' },
            256: { n: 'Soldadura de Panamá',         img: 'img/256_piel.png', d: 'El puente de las Américas.',                        adap: 'El istmo volcánico emerge, uniendo Norte y Sudamérica. Esto permite el Gran Intercambio Biótico y cambia las corrientes oceánicas globales.' },
            512: { n: 'Súper Volcán de Toba',        img: 'img/512_piel.png', d: 'El gran cuello de botella.',                        adap: 'Una colosal erupción en Sumatra provoca un severo invierno volcánico. Se postula que redujo drásticamente la población humana global, moldeando nuestra genética.' }
        }
    },
 
    cultivos_civilizadores: {
        id: 'cultivos_civilizadores',
        title: "INVESTIGACIÓN: CULTIVOS CIVILIZADORES",
        panelTitle: "REVOLUCIÓN AGRÍCOLA",
        color: '#f39c12', // Color dorado/trigo
        completeDesc: "Has domesticado la flora del planeta, cimentando el nacimiento de los grandes imperios.",
        data: {
            2:   { n: 'Trigo',    img: 'img/2_cultivo.png',    d: 'Base del Creciente Fértil.',                        adap: 'Junto con la cebada permitió el surgimiento de Mesopotamia y la agricultura del Mediterráneo. Su alto rendimiento y almacenaje lo convierten en un motor clásico de urbanización.' },
            4:   { n: 'Cebada',   img: 'img/4_cultivo.png',   d: 'Resistente a la sequía.',                           adap: 'Complemento del trigo en el mismo núcleo. Más resistente a suelos marginales y climas secos, fue fundamental para la expansión agrícola temprana hacia zonas menos fértiles.' },
            8:   { n: 'Arroz',    img: 'img/8_cultivo.png',    d: 'Sustento del valle del Yangtsé.',                   adap: 'Base de la civilización en China. Su altísima productividad por hectárea permitió densidades de población muy superiores a otros sistemas agrícolas tempranos.' },
            16:  { n: 'Mijo',     img: 'img/16_cultivo.png',    d: 'Cultivo del norte neolítico chino.',                adap: 'Dominante de la cuenca del río Amarillo. Menos productivo que el arroz pero muy resistente a sequías, lo que estabilizó a las sociedades agrícolas tempranas.' },
            32:  { n: 'Maíz',     img: 'img/32_cultivo.png',    d: 'Eje civilizatorio de Mesoamérica.',                 adap: 'Su asombrosa domesticación transformó sociedades de cazadores-recolectores en complejas culturas urbanas como los Olmecas y los Mayas.' },
            64:  { n: 'Frijol',   img: 'img/64_cultivo.png',  d: 'Complemento proteico fundamental.',                 adap: 'Clave en Mesoamérica por su complementariedad nutricional con el maíz (aminoácidos esenciales). Sin esta combinación, la base demográfica habría sido inestable.' },
            128: { n: 'Calabaza', img: 'img/128_cultivo.png',d: 'El tercer pilar mesoamericano.',                   adap: 'Completando la llamada "Milpa" junto al maíz y el frijol. Importante por su facilidad de almacenamiento y gran aporte calórico secundario.' },
            256: { n: 'Papa',     img: 'img/256_cultivo.png',   d: 'El tesoro de los Andes Centrales.',                 adap: 'Base de las sociedades andinas. Su increíble capacidad de cultivo en altura permitió la expansión de civilizaciones como la Inca en ecosistemas extremos.' },
            512: { n: 'Sorgo',    img: 'img/512_cultivo.png',  d: 'Motor agrícola de África Occidental.',              adap: 'Junto al mijo africano, estos cereales fueron esenciales para formar redes agrícolas estables en el clima semiárido, base de imperios como Ghana y Malí.' }
        }
    },

};

// ─────────────────────────────────────────────
// MAPA DE PORTALES
// ─────────────────────────────────────────────

const PORTALS = {
    // Portales en las ERAs
    astronomica: {
        128: ['nace_un_planeta'] // <--- Aquí se activa al llegar a Tierra Primitiva
    },

    vida: {
        2:   ['pioneros'],
        4:   ['pluricelulares'],
        32:  ['anfibios'],
        64:  ['lineas_reptilianas'],
        512: ['monitos']
    },

    homo: {
        128: ['primeros_artistas'],    // <--- El portal hacia el arte prehistórico
        256: ['cultivos_civilizadores'] // <--- NUEVO PORTAL: Se abre al descubrir la Agricultura
    },
    // Portales en las INVESTIGACIÓNes
    __subgame__: {
        anfibios: {
            512: ['ranitas']
        },
        pioneros: {
            32: ['flora'] // <--- El nuevo portal que se abre al llegar a 32 en pioneros
        },
        flora: {
            512: ['suelo_a_bosque'] // <--- El portal que se abre al llegar a 512 en flora
        },
        ranitas: {
            512: ['ranitas_dardo'] // <--- Se abre al completar la rama de ranitas original
        },
        nace_un_planeta: {
            256: ['piel_con_historia'] // <--- Se abre al llegar a Pangea en la rama Nace un Planeta
        },
        lineas_reptilianas: {
            8: ['lagartos_variados'],
            16: ['evolucion_deslizante'] // <--- El portal hacia las serpientes
        }
};

// Orden canónico de las eras del tronco
const ERA_ORDER = ['astronomica', 'vida', 'homo', 'mundos_antiguos'];
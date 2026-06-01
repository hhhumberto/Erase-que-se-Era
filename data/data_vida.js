/* ============================================================
   ÉRASE QUE SE ERA — ERA VIDA
   Contiene: era "vida" + ramas que la tienen como ancestro:
     · pioneros           (portal en vida[2])
         └─ flora             (portal en pioneros[32])
             └─ suelo_a_bosque (portal en flora[512])
     · pluricelulares     (portal en vida[4])
         ├─ gelatinosas_y_picantes (portal en pluricelulares[16])
         └─ planos_y_peligrosos    (portal en pluricelulares[256])
     · blandos_por_dentro (portal en vida[8])
     · anfibios           (portal en vida[32])
         └─ ranitas           (portal en anfibios[512])
             └─ ranitas_dardo  (portal en ranitas[512])
     · lineas_reptilianas (portal en vida[64])
         ├─ lagartos_variados    (portal en lineas_reptilianas[8])
         └─ evolucion_deslizante (portal en lineas_reptilianas[16])
     · monitos            (portal en vida[512])
   ============================================================ */

// ── ERA PRINCIPAL ─────────────────────────────────────────────

ERAS.vida = {
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
};

// ── RAMAS ─────────────────────────────────────────────────────

INVESTIGATIONS.pioneros = {
    id: 'pioneros',
    title: "PIONEROS",
    panelTitle: "MICROCOSMOS",
    color: '#e84393',
    completeDesc: "Has alcanzado a los Coanoflagelados y completado la ramificación.",
    data: {
        2:   { n: 'LUCA',              img: 'img/2_luca.png',              d: 'El último ancestro común universal.',          adap: 'Organismo procariota primitivo adaptado a las fuentes hidrotermales oceánicas ricas en minerales.' },
        4:   { n: 'Cianobacterias',    img: 'img/4_cloroplastos.png',      d: 'Los motores de la fotosíntesis oxigénica.',    adap: 'Bacterias pioneras libres que provocaron la Gran Oxidación y revolucionaron la atmósfera mucho antes de convertirse en orgánulos vegetales.' },
        8:   { n: 'Mitocondrias',      img: 'img/8_mitocondrias.png',      d: 'Centrales de energía.',                        adap: 'Bacterias aeróbicas absorbidas que proporcionan enormes cantidades de energía (ATP) a su célula huésped.' },
        16:  { n: 'Célula Eucariota',  img: 'img/16_eucariota.png',        d: 'Complejidad con núcleo definido.',             adap: 'Compartimentación de orgánulos y un núcleo membranal que protege el material genético estructurado.' },
        32:  { n: 'Algas Unicelulares',img: 'img/32_algas.png',            d: 'Fitoplancton primigenio.',                     adap: 'Dominio de la fotosíntesis en flotación libre para colonizar la inmensa zona fótica del océano.' },
        64:  { n: 'Hongos Unicelulares',img:'img/64_hongos.png',           d: 'Levaduras primitivas.',                        adap: 'Nutrición osmótrofa (absorción de nutrientes) y altísima resistencia a condiciones ambientales adversas.' },
        128: { n: 'Amebas',            img: 'img/128_amebas.png',          d: 'Cazadores microscópicos.',                     adap: 'Locomoción mediante pseudópodos y fagocitosis extrema para engullir bacterias y otras células enteras.' },
        256: { n: 'Radiolarios',       img: 'img/256_radiolarios.png',     d: 'Arquitectos de cristal oceánicos.',            adap: 'Secreción de intrincados exoesqueletos de sílice y uso de finos pseudópodos para atrapar plancton.' },
        512: { n: 'Coanoflagelados',   img: 'img/512_coanoflagelados.png', d: 'El puente hacia los animales.',               adap: 'Células con un collar de microvellosidades y un flagelo central para filtrar bacterias, capaces de formar colonias temporales.' }
    }
};

INVESTIGATIONS.flora = {
    id: 'flora',
    title: "REINO VEGETAL",
    panelTitle: "FLORA TERRESTRE",
    color: '#27ae60',
    completeDesc: "Has formado un ecosistema completo y completado la ramificación vegetal.",
    data: {
        2:   { n: 'Algas Unicelulares', img: 'img/2_algas.png',          d: 'El origen de la fotosíntesis eucariota.',            adap: 'Células flotantes que desarrollaron cloroplastos para aprovechar la energía solar en los océanos primigenios.' },
        4:   { n: 'Algas Verdes',       img: 'img/4_algas_verdes.png',   d: 'Agrupación y multicelularidad.',                     adap: 'Clorofitas que comenzaron a formar filamentos y colonias en aguas someras, precursoras directas de las plantas terrestres.' },
        8:   { n: 'Líquenes',           img: 'img/8_liquenes.png',       d: 'La conquista de la roca desnuda.',                   adap: 'Asociación simbiótica extrema entre un hongo y un alga. Capaces de disolver la roca mineral y crear el primer sustrato de suelo.' },
        16:  { n: 'Musgos',             img: 'img/16_musgos.png',        d: 'Los primeros anfibios vegetales (Briófitas).',       adap: 'Plantas no vasculares que lograron anclarse a la tierra húmeda, aunque aún dependen del agua directa para la reproducción de sus esporas.' },
        32:  { n: 'Helechos',           img: 'img/32_helechos.png',      d: 'Desarrollo de las "venas" (Pteridófitas).',          adap: 'Innovación clave: el tejido vascular (xilema y floema) y la lignina. Les permitió desafiar la gravedad y formar los primeros bosques gigantes primitivos.' },
        64:  { n: 'Semilla Desnuda',    img: 'img/64_gimnospermas.png',  d: 'Independencia del agua (Gimnospermas).',             adap: 'La invención de la semilla protegió al embrión de la desecación, permitiendo a las coníferas colonizar climas fríos y áridos.' },
        128: { n: 'Planta con Flor',    img: 'img/128_angiospermas.png', d: 'Seducción visual y olfativa (Angiospermas).',        adap: 'Evolución conjunta con los insectos. Las flores actúan como reclamos publicitarios para garantizar una polinización cruzada altamente eficiente.' },
        256: { n: 'Planta con Fruto',   img: 'img/256_frutos.png',       d: 'Recompensas para el transporte.',                    adap: 'El ovario de la flor madura y se vuelve carnoso o nutritivo, sobornando a los animales terrestres y aves para que dispersen sus semillas a grandes distancias.' },
        512: { n: 'Bosque Maduro',      img: 'img/512_bosque.png',       d: 'El ecosistema clímax.',                              adap: 'Compleja red de coexistencia donde algas, musgos, helechos y árboles con frutos conviven, conectados subterráneamente por redes micorrícicas.' }
    }
};

INVESTIGATIONS.suelo_a_bosque = {
    id: 'suelo_a_bosque',
    title: "DE SUELO A BOSQUE",
    panelTitle: "SUCESIÓN ECOLÓGICA",
    color: '#795548',
    completeDesc: "Has alcanzado el estado de Bosque Clímax, el equilibrio perfecto del ecosistema.",
    data: {
        2:   { n: 'Roca Desnuda',     img: 'img/2_suelo.png',   d: 'Mineral expuesto sin vida.',              adap: 'Entorno de estrés máximo donde solo los organismos más resistentes pueden iniciar la colonización física.' },
        4:   { n: 'Líquenes',         img: 'img/4_suelo.png',   d: 'Los pioneros químicos.',                  adap: 'Simbiosis que secreta ácidos para meteorizar la roca, liberando minerales y creando las primeras trazas orgánicas.' },
        8:   { n: 'Musgos',           img: 'img/8_suelo.png',   d: 'Alfombras de humedad.',                   adap: 'Estructuras simples que atrapan polvo y agua, engrosando la capa de suelo y fragmentando mecánicamente la roca.' },
        16:  { n: 'Hierbas Anuales',  img: 'img/16_suelo.png',  d: 'Colonizadores veloces.',                  adap: 'Plantas de ciclo corto que producen grandes cantidades de semillas y biomasa, enriqueciendo rápidamente el suelo con humus.' },
        32:  { n: 'Gramíneas',        img: 'img/32_suelo.png',  d: 'Suelo estabilizado.',                     adap: 'Raíces densas que evitan la erosión y mejoran la estructura del suelo, permitiendo la retención de nutrientes a largo plazo.' },
        64:  { n: 'Matorrales',       img: 'img/64_suelo.png',  d: 'Sombra y refugio.',                       adap: 'Plantas leñosas que transforman el microclima, atrayendo fauna que actúa como vector para semillas de árboles.' },
        128: { n: 'Árboles Pioneros', img: 'img/128_suelo.png', d: 'Conquistadores de luz.',                  adap: 'Crecimiento rápido en exposición solar plena, creando la primera bóveda forestal que protege a las especies de sombra.' },
        256: { n: 'Bosque Mixto',     img: 'img/256_suelo.png', d: 'Transición a la madurez.',                adap: 'Suelo profundo y maduro con gran biodiversidad; las especies de crecimiento lento comienzan a superar a las pioneras.' },
        512: { n: 'Bosque Clímax',    img: 'img/512_suelo.png', d: 'El equilibrio dinámico.',                 adap: 'Ecosistema estable y autosuficiente donde la sustitución de especies se detiene en favor de una comunidad resiliente.' }
    }
};

INVESTIGATIONS.pluricelulares = {
    id: 'pluricelulares',
    title: "PLURICELULARES",
    panelTitle: "EVOLUCIÓN MULTICELULAR",
    color: '#9b59b6',
    completeDesc: "Has alcanzado a los Equinodermos y completado la ramificación.",
    data: {
        2:   { n: 'Placozoos',    img: 'img/2_placozoo.png',     d: 'Trichoplax.',             adap: 'El animal multicelular más simple conocido, compuesto por muy pocos tipos celulares.' },
        4:   { n: 'Ctenóforas',   img: 'img/4_ctenoforo.png',    d: 'Medusas peine.',          adap: 'Depredadores marinos primitivos que nadan rítmicamente mediante hileras de cilios.' },
        8:   { n: 'Poríferos',    img: 'img/8_esponja.png',      d: 'Esponjas marinas.',       adap: 'Animales sésiles sin verdaderos tejidos que filtran agua constantemente para alimentarse.' },
        16:  { n: 'Medusas',      img: 'img/16_medusa.png',      d: 'Cnidarios pelágicos.',    adap: 'Forma de vida libre con simetría radial y células urticantes especializadas.' },
        32:  { n: 'Corales',      img: 'img/32_coral.png',       d: 'Pólipos coloniales.',     adap: 'Constructores de grandes arrecifes gracias a la secreción de su esqueleto calcáreo protector.' },
        64:  { n: 'Anémonas',     img: 'img/64_anemona.png',     d: 'Pólipos solitarios.',     adap: 'Depredadores bentónicos anclados al sustrato con potentes tentáculos urticantes.' },
        128: { n: 'Hidras',       img: 'img/128_hidra.png',      d: 'Cnidarios de agua dulce.',adap: 'Notable capacidad de regeneración celular, siendo biológicamente inmortales.' },
        256: { n: 'Platelmintos', img: 'img/256_platelminto.png',d: 'Gusanos planos.',         adap: 'Desarrollan por primera vez la simetría bilateral y un sistema nervioso centralizado.' },
        512: { n: 'Equinodermos', img: 'img/512_equinodermo.png',d: 'Estrellas y erizos.',     adap: 'Evolucionan hacia una simetría pentarradial y desarrollan un sistema vascular acuífero único.' }
    }
};

INVESTIGATIONS.gelatinosas_y_picantes = {
    id: 'gelatinosas_y_picantes',
    title: "GELATINOSAS Y PICANTES",
    panelTitle: "EL REINO DE LAS MEDUSAS",
    color: '#00ced1',
    completeDesc: "Has navegado entre las criaturas más etéreas y urticantes de los océanos, desde la asombrosa inmortalidad biológica hasta los gigantes abisales.",
    data: {
        2:   { n: 'Avispa de mar',            img: 'img/2_gelatinas.png',   d: 'Chironex fleckeri.',          adap: 'Cubozoo extremadamente venenoso con campana casi cúbica. Representa el linaje más letal y activo de las medusas.' },
        4:   { n: 'Medusa luna',              img: 'img/4_gelatinas.png',   d: 'Aurelia aurita.',             adap: 'La medusa "clásica" de mares templados. Transparente y delicada, ejemplifica las escifomedusas más comunes.' },
        8:   { n: 'Medusa melena de león',    img: 'img/8_gelatinas.png',   d: 'Cyanea capillata.',           adap: 'Una de las mayores medusas del mundo. Sus tentáculos urticantes pueden llegar a superar decenas de metros.' },
        16:  { n: 'Medusa inmortal',          img: 'img/16_gelatinas.png',  d: 'Turritopsis dohrnii.',        adap: 'Hidrozoo célebre por su capacidad de revertir celularmente al estado juvenil (pólipo), un caso biológico excepcional.' },
        32:  { n: 'Medusa alarma',            img: 'img/32_gelatinas.png',  d: 'Atolla wyvillei.',            adap: 'Habitante abisal bioluminiscente, famosa por generar destellos defensivos en forma de alarma luminosa.' },
        64:  { n: 'Medusa invertida',         img: 'img/64_gelatinas.png',  d: 'Cassiopea andromeda.',        adap: 'Vive apoyada sobre el fondo oceánico con los tentáculos hacia arriba para favorecer la simbiosis con algas fotosintéticas.' },
        128: { n: 'Medusa Irukandji',         img: 'img/128_gelatinas.png', d: 'Malo kingi.',                 adap: 'Pequeñísima pero extremadamente peligrosa. Representa a las letales cubomedusas diminutas y casi invisibles.' },
        256: { n: 'Medusa yema de huevo',     img: 'img/256_gelatinas.png', d: 'Phacellophora camtschatica.', adap: 'De gran valor estético, posee un centro amarillo intenso rodeado por una elegante campana translúcida.' },
        512: { n: 'Medusa gigante fantasmal', img: 'img/512_gelatinas.png', d: 'Stygiomedusa gigantea.',      adap: 'Gigante abisal raramente observada. Carece de los tentáculos finos típicos, luciendo enormes brazos orales oscuros.' }
    }
};

INVESTIGATIONS.planos_y_peligrosos = {
    id: 'planos_y_peligrosos',
    title: "PLANOS Y PELIGROSOS",
    panelTitle: "EL MUNDO DE LOS PLATELMINTOS",
    color: '#9b59b6',
    completeDesc: "Has explorado la belleza cromática y el terror parasitario de los gusanos planos.",
    data: {
        2:   { n: 'Pseudoceros caeruleus',      img: 'img/2_planitos.png',   d: 'Policládido marino.',      adap: 'Azul eléctrico intenso con bordes luminosos. Es uno de los animales más irreales a simple vista.' },
        4:   { n: 'Pseudobiceros gloriosus',    img: 'img/4_planitos.png',   d: 'Policládido Indo-Pacífico.',adap: 'Bandas negras y doradas ondulantes que recuerdan a una tela barroca; uno de los más vistosos del océano.' },
        8:   { n: 'Pseudobiceros bedfordi',     img: 'img/8_planitos.png',   d: 'Persian carpet flatworm.', adap: 'Colores eléctricos y movimientos hipnóticos; posiblemente el platelminto más espectacular visualmente.' },
        16:  { n: 'Thysanozoon nigropapillosum',img: 'img/16_planitos.png',  d: 'Policládido verrugoso.',   adap: 'Criatura con protuberancias dorsales que le dan un aspecto alienígena, con un desplazamiento ondulante único.' },
        32:  { n: 'Cestoda',                    img: 'img/32_planitos.png',  d: 'Parásito intestinal.',     adap: 'Especialista extremo que carece de aparato digestivo propio, absorbiendo nutrientes directamente de su huésped.' },
        64:  { n: 'Pseudoceros ferrugineus',    img: 'img/64_planitos.png',  d: 'Policládido fluido.',      adap: 'Posee colores cálidos metálicos y una forma de moverse que recuerda a la fluidez de los líquidos.' },
        128: { n: 'Bipalium kewense',           img: 'img/128_planitos.png', d: 'Platelminto martillo.',    adap: 'Depredador terrestre con cabeza expandida en forma de martillo que utiliza neurotoxinas para cazar lombrices.' },
        256: { n: 'Leucochloridium paradoxum',  img: 'img/256_planitos.png', d: 'Manipulador parasitario.', adap: 'Famoso por invadir los tentáculos de caracoles, transformándolos en señales pulsátiles para atraer a sus aves depredadoras.' },
        512: { n: 'Pseudoceros dimidiatus',     img: 'img/512_planitos.png', d: 'Policládido bicolor.',     adap: 'Azul intenso con borde amarillo, una pieza de color irreal muy valorada en la fotografía submarina.' }
    }
};

INVESTIGATIONS.blandos_por_dentro = {
    id: 'blandos_por_dentro',
    title: "BLANDOS POR DENTRO",
    panelTitle: "EVOLUCIÓN DE INVERTEBRADOS",
    color: '#e74c3c',
    completeDesc: "Has descifrado la increíble transición de los invertebrados: desde los cuerpos blandos y protegidos por conchas hasta el éxito masivo de los apéndices articulados.",
    data: {
        2:   { n: 'Quitones',   img: 'img/2_blanditos.png',   d: 'Clase Polyplacophora.',adap: 'Moluscos primitivos con una concha dorsal de 8 placas articuladas que les permite rodear y adherirse firmemente a rocas rugosas.' },
        4:   { n: 'Gasterópodos',img: 'img/4_blanditos.png',  d: 'Clase Gastropoda.',   adap: 'Caracoles y babosas que desarrollaron la torsión de su masa visceral durante el desarrollo y, habitualmente, una concha espiralizada.' },
        8:   { n: 'Bivalvos',   img: 'img/8_blanditos.png',   d: 'Clase Bivalvia.',      adap: 'Moluscos de concha lateral dividida en dos valvas. Perdieron la cabeza diferenciada y se especializaron de forma extrema en la filtración marina.' },
        16:  { n: 'Cefalópodos', img: 'img/16_blanditos.png', d: 'Clase Cephalopoda.',   adap: 'El pie evoluciona en tentáculos móviles rodeando la cabeza. Poseen una propulsión a chorro eficiente y el cerebro más complejo de los invertebrados.' },
        32:  { n: 'Poliquetos',  img: 'img/32_blanditos.png', d: 'Clase Polychaeta.',    adap: 'Gusanos marinos segmentados provistos de parápodos (expansiones carnosas) repletas de finas cerdas o quetas para desplazarse o nadar.' },
        64:  { n: 'Lombrices',   img: 'img/64_blanditos.png', d: 'Clase Oligochaeta.',   adap: 'Anélidos terrestres segmentados que carecen de parápodos. Verdaderos ingenieros del suelo que optimizan el reciclaje de materia orgánica.' },
        128: { n: 'Crustáceos',  img: 'img/128_blanditos.png',d: 'Subfilo Crustacea',    adap: 'Artrópodos mayoritariamente acuáticos con apéndices articulados bírreos y un exoesqueleto endurecido por depósitos de carbonato cálcico.' },
        256: { n: 'Arácnidos',   img: 'img/256_blanditos.png',d: 'Clase Arachnida.',     adap: 'Colonizadores de tierra firme con el cuerpo dividido en cefalotórax y abdomen, cuatro pares de patas locomotoras y respiración por pulmones en libro.' },
        512: { n: 'Insectos',    img: 'img/512_blanditos.png',d: 'Clase Insecta.',        adap: 'El grupo animal más diverso y exitoso de la Tierra; cuerpo dividido en tres tagmas bien claros (cabeza, tórax y abdomen) y pioneros del vuelo.' }
    }
};

INVESTIGATIONS.anfibios = {
    id: 'anfibios',
    title: "ANFIBIOS",
    panelTitle: "ANFIBIOS",
    color: '#00cec9',
    completeDesc: "Has alcanzado a la Rana y completado la ranificación.",
    data: {
        2:   { n: 'Proteo',             img: 'img/2_proteo.png',              d: 'Cazador ciego de las cavernas (Proteus anguinus).',              adap: 'Pérdida de visión y pigmentación. Branquias externas permanentes (neotenia) para vivir siempre bajo el agua en la oscuridad total.' },
        4:   { n: 'Cecilia',            img: 'img/4_cecilia.png',             d: 'Anfibio sin patas que vive bajo tierra (Caecilia thomsoni).',    adap: 'Cuerpo fusiforme y cráneo osificado para excavar. Sentido del olfato y tacto hiperdesarrollados para compensar su ceguera.' },
        8:   { n: 'Sirena Mayor',       img: 'img/8_sirena.png',              d: 'Cuerpo de anguila y patas delanteras (Siren lacertina).',        adap: 'Pérdida de las extremidades posteriores para nadar eficientemente entre la densa vegetación de los pantanos.' },
        16:  { n: 'Salamandra Gigante', img: 'img/16_salamandra_gigante.png', d: 'El anfibio más grande del mundo (Andrias davidianus).',         adap: 'Piel muy arrugada que aumenta enormemente la superficie para absorber oxígeno directamente de las frías aguas de ríos de montaña.' },
        32:  { n: 'Salamandra Común',   img: 'img/32_salamandra.png',         d: 'Marcados colores de advertencia (Salamandra salamandra).',       adap: 'Coloración aposemática (amarillo y negro) que advierte a los depredadores de las glándulas venenosas de su piel.' },
        64:  { n: 'Tritón Rojo',        img: 'img/64_triton_rojo.png',        d: 'Fase terrestre juvenil tóxica (Notophthalmus viridescens).',     adap: 'Fase de "eft" terrestre con piel rugosa y toxinas potentes, antes de volver al agua y adoptar su forma adulta lisa y verde.' },
        128: { n: 'Tritón Común',       img: 'img/128_triton.png',            d: 'Acuáticos en época de celo (Lissotriton vulgaris).',             adap: 'Los machos desarrollan una gran cresta dorsal y colores llamativos en primavera para el cortejo subacuático.' },
        256: { n: 'Ajolote',            img: 'img/256_ajolote.png',           d: 'El eterno Peter Pan (Ambystoma mexicanum).',                     adap: 'Neotenia extrema: alcanza la madurez sexual manteniendo sus branquias y aspecto de larva acuática durante toda su vida.' },
        512: { n: 'Rana Arborícola',    img: 'img/512_rana_arborea.png',      d: 'Acróbata saltadora (Hyla arborea).',                            adap: 'Patas traseras musculosas para saltos enormes y discos adhesivos en los dedos para trepar vegetación lisa.' }
    }
};

INVESTIGATIONS.ranitas = {
    id: 'ranitas',
    title: "RANITAS",
    panelTitle: "RANAS EXTRAORDINARIAS",
    color: '#0984e3',
    completeDesc: "Has alcanzado a la Rana Dardo y completado la ranificación.",
    data: {
        2:   { n: 'Rana de Darwin',  img: 'img/2_rana_darwin.png',   d: 'Rhinoderma darwinii.',              adap: 'El macho incuba los renacuajos dentro de su saco vocal hasta que se desarrollan completamente.' },
        4:   { n: 'Rana Cornuda',    img: 'img/4_rana_cornuda.png',  d: 'Ceratophrys ornata, el escuerzo.',  adap: 'Boca enorme y apetito voraz; se camufla en la hojarasca esperando emboscar a sus presas.' },
        8:   { n: 'Rana Musgosa',    img: 'img/8_rana_musgosa.png',  d: 'Theloderma corticale.',             adap: 'Piel con intrincados tubérculos y colores que imitan perfectamente el musgo y los líquenes de las rocas.' },
        16:  { n: 'Mantella Dorada', img: 'img/16_mantella.png',     d: 'Mantella aurantiaca.',              adap: 'Coloración aposemática muy intensa que advierte de las toxinas alcaloides obtenidas de su dieta.' },
        32:  { n: 'Rana Lluvia',     img: 'img/32_rana_lluvia.png',  d: 'Breviceps adspersus.',              adap: 'Excelente excavadora de cuerpo esférico que sobrevive en hábitats secos permaneciendo bajo tierra hasta que llueve.' },
        64:  { n: 'Rana Voladora',   img: 'img/64_rana_voladora.png',d: 'Rhacophorus nigropalmatus.',        adap: 'Membranas interdigitales enormes que funcionan como paracaídas para planear y saltar entre los árboles.' },
        128: { n: 'Rana Morada',     img: 'img/128_rana_morada.png', d: 'Nasikabatrachus sahyadrensis.',     adap: 'Cuerpo globoso y hocico puntiagudo adaptados a la vida fosorial profunda; solo emerge para reproducirse.' },
        256: { n: 'Pipa de Surinam', img: 'img/256_pipa.png',        d: 'Pipa pipa.',                        adap: 'Las hembras incuban los huevos incrustados en la piel de su espalda plana, de donde emergen crías completamente formadas.' },
        512: { n: 'Rana Dardo Azul', img: 'img/512_rana_dardo.png',  d: 'Dendrobates tinctorius.',           adap: 'Secreta potentes toxinas lipofílicas a través de la piel, derivadas de su dieta especializada de hormigas tropicales.' }
    }
};

INVESTIGATIONS.ranitas_dardo = {
    id: 'ranitas_dardo',
    title: "RANITAS DARDO",
    panelTitle: "DENDROBATIDAE",
    color: '#7fff00',
    completeDesc: "Has descubierto los morphos más raros y completado a las Ranitas Dardo.",
    data: {
        2:   { n: 'Phyllobates vittatus',    img: 'img/2_dardo.png',   d: 'Rana de franjas de oro.',          adap: 'Desarrolló franjas aposemáticas brillantes para advertir de sus alcaloides en el suelo de Costa Rica.' },
        4:   { n: 'D. leucomelas (Bolívar)', img: 'img/4_dardo.png',   d: 'Morpho de bandas anchas.',         adap: 'Adaptación cromática extrema para maximizar el contraste visual en la penumbra del sotobosque.' },
        8:   { n: 'Oophaga sylvatica',       img: 'img/8_dardo.png',   d: 'El pequeño diablo.',               adap: 'Especialización en cuidado parental donde la hembra provee huevos tróficos cargados de nutrientes y defensas.' },
        16:  { n: 'D. auratus (Mint)',        img: 'img/16_dardo.png',  d: 'Morpho verde menta.',              adap: 'Variación de coloración disruptiva que ofrece un equilibrio entre advertencia y camuflaje en helechos claros.' },
        32:  { n: 'Ranitomeya summersi',      img: 'img/32_dardo.png',  d: 'Joya naranja y negra.',            adap: 'Cuerpo miniaturizado para habitar exclusivamente en las axilas de bromelias y pequeñas fitotelmata.' },
        64:  { n: 'Epipedobates tricolor',    img: 'img/64_dardo.png',  d: 'Fuente de epibatidina.',           adap: 'Producción de alcaloides analgésicos únicos que han revolucionado el estudio de la medicina farmacológica.' },
        128: { n: 'Oophaga lehmanni',         img: 'img/128_dardo.png', d: 'Morpho de bandas rojas.',          adap: 'Especie en peligro crítico con una dieta altamente especializada que le permite secretar toxinas pumiliotoxinas.' },
        256: { n: 'Oophaga histrionica',      img: 'img/256_dardo.png', d: 'Rana arlequín del Chocó.',         adap: 'Sintetiza histrionicotoxinas únicas en su tipo y presenta un polimorfismo extremo con innumerables variaciones de color y patrón.' },
        512: { n: 'Oophaga pumilio',          img: 'img/512_dardo.png', d: 'Rana dardo fresa (Blue Jeans).',   adap: 'Lleva el cuidado parental al límite: la madre memoriza dónde escondió cada renacuajo en las bromelias y regresa a alimentarlos con huevos no fecundados.' }
    }
};

INVESTIGATIONS.lineas_reptilianas = {
    id: 'lineas_reptilianas',
    title: "LÍNEAS REPTILIANAS",
    panelTitle: "EVOLUCIÓN REPTILIANA",
    color: '#27ae60',
    completeDesc: "Has explorado la diversificación de los saurópsidos, desde los linajes basales hasta los amos del cielo y de la tierra.",
    data: {
        2:   { n: 'Pararreptiles', img: 'img/2_reptiliano.png',   d: 'Primeros reptiles basales.',               adap: 'Formas primitivas que divergieron temprano en la evolución de los amniotas, experimentando con las primeras armaduras óseas antes de extinguirse sin descendencia moderna.' },
        4:   { n: 'Tortugas',      img: 'img/4_reptiliano.png',   d: 'El éxito del caparazón.',                  adap: 'Anápsidos o diápsidos modificados que desarrollaron una coraza ósea protectora única fusionada con sus costillas, un diseño tan perfecto que ha sobrevivido cientos de millones de años.' },
        8:   { n: 'Lagartos',      img: 'img/8_reptiliano.png',   d: 'Maestros de la adaptación.',               adap: 'Escamosos ágiles que colonizaron casi todos los ecosistemas del planeta, desarrollando una enorme diversidad de tamaños, camuflajes y sorprendentes estrategias de supervivencia.' },
        16:  { n: 'Serpientes',    img: 'img/16_reptiliano.png',  d: 'Especialización sin extremidades.',         adap: 'Evolucionaron a partir de lagartos antiguos, perdiendo las patas y desarrollando mandíbulas altamente flexibles junto con eficaces tácticas de caza constrictora o venenosa.' },
        32:  { n: 'Tuátaras',      img: 'img/32_reptiliano.png',  d: 'Auténticos fósiles vivientes.',             adap: 'Endémicas de Nueva Zelanda, son las únicas supervivientes del antiguo orden Sphenodontia. Poseen un misterioso "tercer ojo" fotorreceptor bajo la piel de la cabeza.' },
        64:  { n: 'Pterosaurios',  img: 'img/64_reptiliano.png',  d: 'Los reyes del cielo mesozoico.',            adap: 'Los primeros vertebrados en desarrollar el vuelo activo. Sus espectaculares alas estaban formadas por una membrana muscular estirada desde un alargado cuarto dedo de la mano.' },
        128: { n: 'Cocodrilos',    img: 'img/128_reptiliano.png', d: 'Depredadores semiacuáticos perfectos.',     adap: 'Arcoosaurios especializados que alcanzaron un diseño anatómico tan letal y eficiente que ha permanecido prácticamente inalterado desde la era de los dinosaurios.' },
        256: { n: 'Dinosaurios',   img: 'img/256_reptiliano.png', d: 'Los amos del Mesozoico.',                   adap: 'Dominaron la Tierra durante más de 130 millones de años gracias a su postura erecta y metabolismo eficiente, diversificándose en colosos herbívoros y letales carnívoros.' },
        512: { n: 'Aves',          img: 'img/512_reptiliano.png', d: 'Dinosaurios con plumas.',                   adap: 'Los únicos dinosaurios terópodos que sobrevivieron a la gran extinción masiva, transformando sus escamas y plumas en herramientas de vuelo para conquistar los cielos modernos.' }
    }
};

INVESTIGATIONS.lagartos_variados = {
    id: 'lagartos_variados',
    title: "LAGARTOS VARIADOS",
    panelTitle: "DIVERSIDAD DE LAGARTOS",
    color: '#f39c12',
    completeDesc: "Has descubierto la asombrosa diversidad de formas y adaptaciones de los lagartos.",
    data: {
        2:   { n: 'Iguana verde',           img: 'img/2_lagartitos.png',   d: 'Iguana iguana.',          adap: 'Herbívoro estrictamente arborícola con una cresta dorsal prominente y una larga cola que usa como látigo para defenderse.' },
        4:   { n: 'Dragón de Komodo',       img: 'img/4_lagartitos.png',   d: 'Varanus komodoensis.',    adap: 'El lagarto más grande del mundo. Caza grandes presas gracias a su letal combinación de fuerza, tamaño y glándulas de veneno.' },
        8:   { n: 'Camaleón del Yemen',     img: 'img/8_lagartitos.png',   d: 'Chamaeleo calyptratus.',  adap: 'Posee ojos de movimiento independiente, lengua proyectable y la capacidad de cambiar de color para comunicarse y termorregularse.' },
        16:  { n: 'Geco tokay',             img: 'img/16_lagartitos.png',  d: 'Gekko gecko.',            adap: 'Sus dedos están provistos de almohadillas con millones de setas microscópicas que crean fuerzas de van der Waals para trepar cualquier superficie.' },
        32:  { n: 'Lagarto volador',        img: 'img/32_lagartitos.png',  d: 'Draco volans.',           adap: 'Sus costillas alargadas sostienen una membrana de piel (patagio) que despliega para planear hábilmente entre los árboles de la selva.' },
        64:  { n: 'Lagarto de lengua azul', img: 'img/64_lagartitos.png',  d: 'Tiliqua scincoides.',     adap: 'Desarrolló una llamativa y ancha lengua azul que muestra repentinamente junto con un fuerte siseo para disuadir a posibles atacantes.' },
        128: { n: 'Lución',                 img: 'img/128_lagartitos.png', d: 'Anguis fragilis.',        adap: 'Lagarto ápodo (sin patas) adaptado a la vida subterránea que retiene la capacidad de autotomía: puede desprender su cola para escapar.' },
        256: { n: 'Monstruo de Gila',       img: 'img/256_lagartitos.png', d: 'Heloderma suspectum.',    adap: 'Uno de los pocos lagartos venenosos. Almacena grandes reservas de grasa en su gruesa cola para sobrevivir a los duros meses de sequía en el desierto.' },
        512: { n: 'Lagarto verde europeo',  img: 'img/512_lagartitos.png', d: 'Lacerta viridis.',        adap: 'Los machos lucen una brillante coloración esmeralda con garganta azul en celo. Es un cazador terrestre extremadamente ágil entre los matorrales.' }
    }
};

INVESTIGATIONS.evolucion_deslizante = {
    id: 'evolucion_deslizante',
    title: "EVOLUCIÓN DESLIZANTE",
    panelTitle: "RADIACIÓN DE LAS SERPIENTES",
    color: '#27ae60',
    completeDesc: "Has trazado el camino evolutivo de los ofidios, desde los vestigios de sus patas hasta los sistemas venenosos más complejos.",
    data: {
        2:   { n: 'Culebra ciega',       img: 'img/2_deslizante.png',   d: 'Typhlops schlegelii.',      adap: 'Serpiente fosorial primitiva con ojos vestigiales, evidencia del origen subterráneo de las serpientes.' },
        4:   { n: 'Serpiente tubería',   img: 'img/4_deslizante.png',   d: 'Cylindrophis ruffus.',      adap: 'Conserva vestigios de pelvis y fémur, un rastro directo de sus ancestros con patas.' },
        8:   { n: 'Serpiente arco iris', img: 'img/8_deslizante.png',   d: 'Xenopeltis unicolor.',      adap: 'Eslabón intermedio con escamas iridiscentes que conectan linajes primitivos y modernos.' },
        16:  { n: 'Anaconda verde',      img: 'img/16_deslizante.png',  d: 'Eunectes murinus.',         adap: 'El reptil más pesado del mundo; conserva espuelas cloacales como patas traseras rudimentarias.' },
        32:  { n: 'Pitón reticulada',    img: 'img/32_deslizante.png',  d: 'Malayopython reticulatus.', adap: 'La serpiente más larga del mundo, capaz de alcanzar longitudes de hasta 8 metros.' },
        64:  { n: 'Serpiente rey',       img: 'img/64_deslizante.png',  d: 'Lampropeltis californiae.', adap: 'Representa la radiación colúbrida, la familia más diversa con cerca de 1800 especies.' },
        128: { n: 'Serpiente marina',    img: 'img/128_deslizante.png', d: 'Hydrophis platurus.',       adap: 'La única serpiente verdaderamente pelágica del mundo, adaptada a vivir en mar abierto.' },
        256: { n: 'Cobra real',          img: 'img/256_deslizante.png', d: 'Ophiophagus hannah.',       adap: 'La serpiente venenosa más larga; destaca por construir nidos y proteger activamente sus huevos.' },
        512: { n: 'Cascabel diamantada', img: 'img/512_deslizante.png', d: 'Crotalus atrox.',           adap: 'Posee colmillos abatibles y fosetas termorreceptoras, el sistema de caza más sofisticado del mundo ofidio.' }
    }
};

INVESTIGATIONS.monitos = {
    id: 'monitos',
    title: "MONITOS",
    panelTitle: "PRIMATES",
    color: '#2ecc71',
    completeDesc: "Has alcanzado al Chimpancé y completado la ramificación.",
    data: {
        2:   { n: 'Lémur',         img: 'img/2_lemur.png',         d: 'Primates de Madagascar.',          adap: 'Desarrollaron garras de aseo y una "peineta dental" inferior, adaptaciones clave para la higiene y el forrajeo en los densos bosques de Madagascar.' },
        4:   { n: 'Tarsero',       img: 'img/4_tarsero.png',       d: 'Pequeños de ojos enormes.',        adap: 'Sus ojos, más grandes que su cerebro, son adaptaciones nocturnas perfectas. Sus huesos tarsales alargados permiten saltos explosivos para cazar insectos.' },
        8:   { n: 'Mono Araña',    img: 'img/8_mono_arana.png',    d: 'Ágiles habitantes del dosel.',     adap: 'Poseen una cola prensil increíblemente sensible, que actúa como una "quinta mano", permitiéndoles colgarse y braquiar mientras buscan frutas.' },
        16:  { n: 'Mandril',       img: 'img/16_mandril.png',      d: 'Famosos por su colorido.',         adap: 'Fuerte coloración facial azul y roja, adaptación para la comunicación visual y selección sexual en el denso y oscuro sotobosque de las selvas africanas.' },
        32:  { n: 'Mono Narigudo', img: 'img/32_mono_narigudo.png',d: 'Endémicos de Borneo.',            adap: 'La gran nariz pendulosa de los machos, una adaptación única resultante de la selección sexual, actúa como una caja de resonancia amplificando sus vocalizaciones.' },
        64:  { n: 'Gibón',         img: 'img/64_gibon.png',        d: 'Maestros del balanceo.',           adap: 'Maestros absolutos de la braquiación. Sus brazos son mucho más largos que sus piernas y poseen hombros muy flexibles para "volar" entre ramas.' },
        128: { n: 'Orangután',     img: 'img/128_orangutan.png',   d: 'Simios sabios de Asia.',           adap: 'Adaptación a la vida solitaria y arbórea. Desarrollaron dedos largos y curvos en manos y pies, y pies prensiles casi idénticos a las manos para un agarre total.' },
        256: { n: 'Gorila',        img: 'img/256_gorila.png',      d: 'Los más poderosos.',               adap: 'Adaptación al gigantismo terrestre. Desarrollaron la locomoción de "caminar sobre los nudillos" y grandes mandíbulas para procesar vegetación fibrosa.' },
        512: { n: 'Chimpancé',     img: 'img/512_chimpance.png',   d: 'Nuestros parientes más cercanos.', adap: 'Poseen pulgares oponibles bien desarrollados y pies prensiles, otorgándoles una destreza manual excepcional para la fabricación de herramientas simples.' }
    }
};

INVESTIGATIONS.con_pies_y_cabeza = {
    id: 'con_pies_y_cabeza',
    title: "CON PIES Y CABEZA",
    panelTitle: "CEFALÓPODOS",
    color: '#8e44ad', // Un tono púrpura intenso le va muy bien a los cefalópodos
    completeDesc: "Has navegado por los océanos descubriendo mentes asombrosas, camuflajes perfectos y adaptaciones abisales de los cefalópodos.",
    data: {
        2:   { 
            n: 'Nautilo Perlado',  img: 'img/2_piecabeza.png',  d: 'Nautilus pompilius.',         
            adap: 'Fósil viviente que conserva la concha externa ancestral. La ha dividido en cámaras y regula su flotabilidad bombeando gas y líquido en su interior.' 
        },
        4:   { 
            n: 'Calamar Gigante',  img: 'img/4_piecabeza.png', d: 'Architeuthis dux.',           
            adap: 'Crecimiento desmesurado para dominar las aguas profundas. Posee los ojos más grandes del reino animal para detectar la tenue luz bioluminiscente en el abismo.' 
        },
        8:   { 
            n: 'Sepia Flamboyán',     img: 'img/8_piecabeza.png', d: 'Metasepia pfefferi.',         
            adap: 'Ha compensado su nula flotabilidad desarrollando aposematismo: su piel pulsa con colores vibrantes para advertir a los depredadores de su tejido altamente tóxico.' 
        },
        16:  { 
            n: 'Pulpo Común',  img: 'img/16_piecabeza.png',    d: 'Octopus vulgaris.',           
            adap: 'Pérdida de la concha para una flexibilidad extrema. Su sistema nervioso está descentralizado, otorgando a sus brazos cierta autonomía y una inteligencia asombrosa.' 
        },
        32:  { 
            n: 'Sepia Común', img: 'img/32_piecabeza.png', d: 'Sepia officinalis.',          
            adap: 'Maestra del camuflaje bentónico. Posee una jibia interna muy porosa para flotar y una aleta que bordea todo su manto permitiéndole una natación de alta precisión.' 
        },
        64:  { 
            n: 'Pulpo de Anillos Azules', img: 'img/64_piecabeza.png',  d: 'Hapalochlaena lunulata.',     
            adap: 'Tamaño diminuto compensado por un arma letal: bacterias simbióticas en sus glándulas salivales producen tetrodotoxina, un veneno paralizante mortal.' 
        },
        128: { 
            n: 'Calamar Vampiro',  img: 'img/128_piecabeza.png',d: 'Vampyroteuthis infernalis.',  
            adap: 'Superviviente de la zona de mínimo oxígeno. No caza; usa filamentos sensoriales para recoger nieve marina y se envuelve en sus tentáculos palmeados como defensa.' 
        },
        256: { 
            n: 'Nautilo de Papel',  img: 'img/256_piecabeza.png', d: 'Argonauta argo.',             
            adap: 'Regreso secundario a la superficie. La hembra secreta una fina ooteca calcárea que utiliza a modo de "concha" para proteger sus huevos y atrapar una burbuja de aire.' 
        },
        512: { 
            n: 'Pulpo Dumbo', img: 'img/512_piecabeza.png',  d: 'Grimpoteuthis sp.',           
            adap: 'Adaptación a la vida bentopelágica extrema (hasta 7000m de profundidad). Se desplaza lentamente usando aletas similares a orejas en su manto para ahorrar energía.' 
        }
    }
};

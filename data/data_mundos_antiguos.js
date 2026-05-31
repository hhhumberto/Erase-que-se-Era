/* ============================================================
   ÉRASE QUE SE ERA — ERA MUNDOS ANTIGUOS

   ============================================================ */

ERAS.mundos_antiguos = {
    title: "ERA ANTIGUA", panelTitle: "CIVILIZACIONES",
    data: {
        2:   { n: "Mesopotamia",       img: "img/2_antiguo.png",   d: "La cuna de la civilización entre dos ríos.",             ext: "En las fértiles llanuras del Tigris y el Éufrates nacieron las primeras ciudades-estado sumerias. Aquí se inventó la escritura cuneiforme, la rueda y las primeras leyes escritas, marcando el inicio de la historia humana registrada." },
        4:   { n: "Egipto",            img: "img/4_antiguo.png",   d: "El don del Nilo y los faraones divinos.",                ext: "Una cultura monumental que prosperó durante milenios. Construyeron pirámides colosales, desarrollaron los jeroglíficos y mantuvieron una compleja religión centrada en la vida después de la muerte." },
        8:   { n: "Babilonia",         img: "img/8_antiguo.png",   d: "La joya cultural y científica de la antigüedad.",        ext: "Famosa por sus jardines colgantes y su imponente Puerta de Ishtar. Bajo reyes como Hammurabi, Babilonia se convirtió en un centro de astronomía, matemáticas y codificación legal sin precedentes." },
        16:  { n: "Pueblos del Mar",   img: "img/16_antiguo.png",  d: "El misterioso colapso de la Edad de Bronce.",            ext: "Una serie de sequías, terremotos y violentas invasiones de los enigmáticos 'Pueblos del Mar' desestabilizaron el Mediterráneo oriental, provocando la caída súbita de grandes imperios como el hitita y el micénico." },
        32:  { n: "Atenas",            img: "img/32_antiguo.png",  d: "El nacimiento de la democracia y la filosofía.",         ext: "El faro cultural de la Antigua Grecia. Atenas sentó las bases del pensamiento occidental a través de la filosofía de Sócrates, Platón y Aristóteles, el teatro trágico y el primer sistema de gobierno democrático." },
        64:  { n: "Alejandro Magno",   img: "img/64_antiguo.png",  d: "La conquista del mundo conocido.",                       ext: "Partiendo de Macedonia, este joven rey lideró un ejército invencible que derrocó al Imperio Persa y extendió la cultura helenística desde Grecia hasta el río Indo en un tiempo récord." },
        128: { n: "Cartago contra Roma",img:"img/128_antiguo.png", d: "El choque de titanes por el Mediterráneo.",              ext: "Tres brutales Guerras Púnicas enfrentaron a la República Romana contra el imperio marítimo de Cartago. A pesar de las hazañas de Aníbal, Roma triunfó, aniquiló a su rival y aseguró su hegemonía." },
        256: { n: "Imperio Romano",    img: "img/256_antiguo.png", d: "Todas las carreteras conducen a Roma.",                  ext: "Una superpotencia militar y de ingeniería que unificó Europa, el norte de África y Oriente Próximo. Su legado en arquitectura, derecho, idioma y tácticas militares perdura hasta la actualidad." },
        512: { n: "Caída de Roma",     img: "img/512_antiguo.png", d: "El ocaso del Imperio de Occidente.",                     ext: "Debilitado por crisis económicas, división interna y la presión constante de migraciones germánicas, el Imperio Romano de Occidente finalmente sucumbió en el año 476 d.C., dando paso a la Edad Media." }
    }
};

INVESTIGATIONS.republica_roma = {
    id: 'republica_roma',
    title: "REPÚBLICA DE ROMA",
    panelTitle: "REPÚBLICA ROMANA",
    color: '#b03a2e', // Un rojo oscuro/carmesí romano
    completeDesc: "Has navegado por las turbulentas aguas de la política romana, desde la caída de los reyes hasta los Idus de marzo.",
    data: {
        2:   { n: 'Fundación de la República', img: 'img/2_republica.png',   d: 'Fin de la monarquía etrusca.',          adap: 'Tras la expulsión del último rey etrusco, Lucio Tarquinio el Soberbio, Roma abolió la monarquía y creó un sistema republicano basado en magistraturas anuales y el Senado.' },
        4:   { n: 'Primera secesión',          img: 'img/4_republica.png',   d: 'La rebelión de los plebeyos.',          adap: 'Los plebeyos, cansados de las deudas y de la exclusión política, abandonaron la ciudad y forzaron la creación del cargo de tribuno de la plebe, iniciando la lucha entre patricios y plebeyos.' },
        8:   { n: 'Ley de las Doce Tablas',    img: 'img/8_republica.png',   d: 'El primer código legal escrito.',       adap: 'Roma redactó su primer código legal escrito, base del derecho romano y un paso importante hacia una mayor igualdad jurídica entre ciudadanos.' },
        16:  { n: 'Saqueo por los galos',      img: 'img/16_republica.png',  d: 'Roma muestra su vulnerabilidad.',       adap: 'Los galos dirigidos por Breno tomaron y saquearon Roma, mostrando la vulnerabilidad de la ciudad y empujando reformas militares.' },
        32:  { n: 'Guerras Púnicas',           img: 'img/32_republica.png',  d: 'Roma domina el Mediterráneo.',          adap: 'Roma derrotó finalmente a Cartago tras tres guerras. Destaca la invasión de Italia por Aníbal Barca y la destrucción definitiva de Cartago en 146 a. C., convirtiendo a Roma en la potencia dominante del Mediterráneo.' },
        64:  { n: 'Tiberio Graco',             img: 'img/64_republica.png',  d: 'Reformas y violencia política.',        adap: 'Tiberio Sempronio Graco intentó repartir tierras a los pobres. Su asesinato inauguró una etapa de violencia política y crisis social en la República.' },
        128: { n: 'Dictadura de Sila',         img: 'img/128_republica.png', d: 'El ejército impone su ley.',            adap: 'Lucio Cornelio Sila tomó Roma con sus legiones y se convirtió en dictador, demostrando que el ejército podía imponerse sobre las instituciones republicanas.' },
        256: { n: 'Primer Triunvirato',        img: 'img/256_republica.png', d: 'La alianza que debilitó al Senado.',    adap: 'La alianza informal entre Julio César, Cneo Pompeyo Magno y Marco Licinio Craso concentró el poder en tres figuras y debilitó aún más al Senado.' },
        512: { n: 'Julio César',               img: 'img/512_republica.png', d: 'El cruce del Rubicón y la dictadura.',  adap: 'César cruzó el río Rubicón en 49 a. C., derrotó a Pompeyo y fue nombrado dictador vitalicio. Su creciente poder provocó su asesinato en los Idus de marzo de 44 a. C.' }
    }
};

INVESTIGATIONS.vida_graco = {
    id: 'vida_graco',
    title: "VIDA DE GRACO",
    panelTitle: "TIBERIO GRACO",
    color: '#a02b2b', // Un rojo sangre apagado, simbolizando su trágico final
    completeDesc: "Has revivido la trágica y revolucionaria historia de Tiberio Graco, el tribuno que intentó devolver la tierra al pueblo y cuyo asesinato fracturó la República.",
    data: {
        2: { 
            n: 'Cuna patricia',img: 'img/2_graco.png',d: 'Hijo de Cornelia y nieto del gran Africano.',          
            adap: 'Nacido en el seno de la más alta nobleza, Tiberio combinaba la ilustre herencia plebeya de su padre con la gloria patricia de los Escipiones, recibiendo una educación helenística de élite.' 
        },
        4: { 
            n: 'Bautismo de fuego en Cartago', img: 'img/4_graco.png',  d: 'El primero en escalar las murallas enemigas.',          
            adap: 'Sirviendo bajo el mando de su cuñado Escipión Emiliano durante la Tercera Guerra Púnica, el joven Tiberio demostró un inmenso valor al ser el primer oficial romano en coronar el muro de Cartago.' 
        },
        8: { 
            n: 'El tratado que salva un ejército',  img: 'img/8_graco.png', d: 'La paz deshonrosa en Numancia.',       
            adap: 'Como cuestor en Hispania, Tiberio salvó a 20.000 legionarios rodeados al negociar una paz con los numantinos. El Senado repudió el tratado, pero el pueblo y las tropas lo aclamaron como un héroe.' 
        },
        16: { 
            n: 'La travesía por Etruria', img: 'img/16_graco.png', d: 'El descubrimiento de los campos esclavizados.',       
            adap: 'Viajando por Italia, Tiberio observó con horror cómo las tierras públicas estaban en manos de latifundistas y trabajadas por esclavos extranjeros, mientras los ciudadanos romanos languidecían en la pobreza.' 
        },
        32: { 
            n: 'La Lex Sempronia Agraria', img: 'img/32_graco.png', d: 'Tierra para los desposeídos.',          
            adap: 'Elegido tribuno de la plebe en el 133 a.C., Tiberio Sempronio Graco intentó repartir tierras a los pobres[cite: 1]. Su ley proponía limitar la cantidad de tierras públicas que un solo individuo podía poseer.' 
        },
        64: { 
            n: 'La herencia de Atalo III', img: 'img/64_graco.png', d: 'El tesoro de Pérgamo desafía al Senado.',        
            adap: 'Cuando el rey de Pérgamo legó su reino a Roma, Tiberio propuso usar esa inmensa riqueza para financiar su reforma agraria y equipar a los nuevos granjeros, usurpando las prerrogativas financieras del Senado.' 
        },
        128: { 
            n: 'La reelección', img: 'img/128_graco.png', d: 'Un desafío a las costumbres ancestrales.',            
            adap: 'Para proteger su vida y asegurar que su comisión agraria no fuera desmantelada, Tiberio rompió con la tradición republicana y se postuló para un segundo mandato consecutivo como tribuno.' 
        },
        256: { 
            n: 'Sacrificado en el Capitolio', img: 'img/256_graco.png', d: 'La sangre derramada en las calles de Roma.',    
            adap: 'Acusado de aspirar a la tiranía, un grupo de senadores armados con patas de sillas y garrotes lo asesinaron junto a 300 de sus seguidores. Su asesinato inauguró una etapa de violencia política y crisis social en la República[cite: 1].' 
        },
        512: { 
            n: 'Su hermano y su legado', img: 'img/512_graco.png', d: 'Cayo Graco toma el relevo.',  
            adap: 'Años después, su hermano menor Cayo Graco retomaría su causa con reformas aún más radicales. Aunque también encontró un final violento, los Gracos iniciaron la Revolución Romana que finalmente destruiría la República.' 
        }
    }
};

INVESTIGATIONS.republica_mapas = {
    id: 'republica_mapas',
    title: "REPÚBLICA EN MAPAS",
    panelTitle: "MAPAS DE ROMA",
    color: '#8b6b42', // Un color marrón pergamino/tinta envejecida
    completeDesc: "Has completado el atlas histórico cartográfico de la República Romana, desde una pequeña ciudad en el Lacio hasta dominar el Mediterráneo.",
    data: {
        2: { n: 'Roma Temprana (509 a.C.)', img: 'img/2_repmap.png', d: 'Las siete colinas y el río Tíber.',          
            adap: 'El pequeño centro amurallado de Roma sobre las Siete Colinas, rodeado por las tribus latinas y las tierras etruscas.' 
        },
        4: {n: 'Expansión Itálica (350 a.C.)', img: 'img/4_repmap.png',  d: 'Crecimiento por el centro de Italia.',          
            adap: 'Roma se expande hacia Campania y el Samnio, frente a tribus montañesas y colonias griegas. Vemos incipientes calzadas romanas.' 
        },
        8: { n: 'Dominio Peninsular (270 a.C.)',  img: 'img/8_repmap.png', d: 'Control total de la bota itálica.',       
            adap: 'Territorio romano y estados aliados (socii), las colonias griegas al sur. Ya hay una fina red de vías consulares cruzando la península.' 
        },
        16: { n: 'I Guerra Púnica (264 a.C.)', img: 'img/16_repmap.png', d: 'El choque naval por Sicilia.',       
            adap: 'Mediterráneo occidental. Sicilia dividida y rodeada de batallas navales y flotas romanas, enfrentándose a Cartago.' 
        },
        32: { n: 'Invasión de Aníbal (218 a.C.)', img: 'img/32_repmap.png', d: 'La ruta alpina y el terror en Italia.',          
            adap: 'Ruta de Aníbal desde Hispania, cruzando los Alpes, con masacres como Cannas y Trasimeno.' 
        },
        64: { n: 'Hegemonía (146 a.C.)', img: 'img/64_repmap.png', d: 'El dominio absoluto del Mediterráneo.',        
            adap: 'El territorio republicano abarca Italia, Hispania, África y Grecia. Cartago es una ruina y el mar está surcado por rutas comerciales.' 
        },
        128: { n: 'La Crisis (133-88 a.C.)', img: 'img/128_repmap.png', d: 'Tensión social y rebeliones.',            
            adap: 'Conflictos agrarios, rebelión de esclavos en Sicilia e inestabilidad de los aliados exigiendo ciudadanía.' 
        },
        256: { n: 'Mario y Sila (88-78 a.C.)', img: 'img/256_repmap.png', d: 'Guerras civiles y frentes orientales.',    
            adap: 'Marcha militar de Sila sobre la propia ciudad de Roma y la amenaza expansionista de Mitrídates en el Ponto.' 
        },
        512: { n: 'Guerras de César (58-44 a.C.)', img: 'img/512_repmap.png', d: 'La Galia, el Rubicón y Egipto.',  
            adap: 'Arrolladoras campañas de Julio César en la Galia y Britania, la fatídica línea roja del río Rubicón y la persecución de Pompeyo hasta el Nilo.' 
        }
    }
};

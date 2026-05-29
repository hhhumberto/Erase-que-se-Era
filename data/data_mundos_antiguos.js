/* ============================================================
   ÉRASE QUE SE ERA — ERA MUNDOS ANTIGUOS

   ============================================================ */

ERAS.mundos_antiguos = {
    title: "ERA MUNDOS ANTIGUOS", panelTitle: "CIVILIZACIONES",
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
    title: "INVESTIGACIÓN: REPÚBLICA DE ROMA",
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

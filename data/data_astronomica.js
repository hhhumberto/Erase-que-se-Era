/* ============================================================
   ÉRASE QUE SE ERA — ERA ASTRONÓMICA
   Contiene: era "astronomica" + ramas que la tienen como ancestro:
     · nace_un_planeta  (portal en astronomica[128])
     · piel_con_historia (portal en nace_un_planeta[256])
   ============================================================ */

// ── ERA PRINCIPAL ─────────────────────────────────────────────

ERAS.astronomica = {
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
};

// ── RAMAS ─────────────────────────────────────────────────────

INVESTIGATIONS.nace_un_planeta = {
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
        64:  { n: 'Enfriamiento',        img: 'img/64_planeta.png',  d: 'Corteza primitiva.',       adap: 'La emisión de calor al espacio permite la formación de una corteza basáltica estable.' },
        128: { n: 'Bombardeo asteroides',img: 'img/128_planeta.png', d: 'Aporte de agua.',          adap: 'El Bombardeo Intenso Tardío trae los compuestos volátiles necesarios para los futuros océanos.' },
        256: { n: 'Pangea',              img: 'img/256_planeta.png', d: 'Primer supercontinente.',  adap: 'La tectónica de placas une las masas continentales en un único bloque colosal.' },
        512: { n: 'Continentes actuales',img: 'img/512_planeta.png', d: 'Deriva continental.',      adap: 'La fragmentación de Pangea y la configuración actual de la geografía terrestre.' }
    }
};

INVESTIGATIONS.piel_con_historia = {
    id: 'piel_con_historia',
    title: "INVESTIGACIÓN: PIEL CON HISTORIA",
    panelTitle: "CORTEZA TERRESTRE",
    color: '#d35400',
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
};

INVESTIGATIONS.vida_muerte_supernova = {
    id: 'vida_muerte_supernova',
    title: "INVESTIGACIÓN: VIDA Y MUERTE DE UNA SUPERNOVA",
    panelTitle: "EVOLUCIÓN ESTELAR",
    color: '#e74c3c',
    completeDesc: "Has presenciado el ciclo completo de una estrella masiva y el nacimiento de un agujero negro.",
    data: {
        2:   { n: 'Colapso de la nube molecular', img: 'img/2_vidasupernova.png',   d: 'Formación de una protoestrella.',          adap: 'Una región densa de gas y polvo interestelar colapsa por gravedad, formando una protoestrella. La materia cae hacia el centro y aumenta rápidamente la temperatura.' },
        4:   { n: 'Encendido nuclear',            img: 'img/4_vidasupernova.png',   d: 'Fusión de hidrógeno en helio.',            adap: 'Cuando el núcleo alcanza unos 10 millones de grados, comienza la fusión del hidrógeno en helio. Nace una estrella estable de secuencia principal.' },
        8:   { n: 'Secuencia principal',          img: 'img/8_vidasupernova.png',   d: 'Equilibrio de gravedad y presión.',        adap: 'La estrella pasa la mayor parte de su vida equilibrando gravedad y presión térmica. Fusiona hidrógeno durante millones o miles de millones de años, según su masa.' },
        16:  { n: 'Agotamiento del hidrógeno',    img: 'img/16_vidasupernova.png',  d: 'Fin del combustible principal.',           adap: 'El núcleo se queda sin combustible principal. La gravedad vuelve a comprimir el centro mientras las capas externas se expanden.' },
        32:  { n: 'Supergigante roja',            img: 'img/32_vidasupernova.png',  d: 'Fusión de elementos pesados.',             adap: 'En estrellas masivas, la envoltura exterior se hincha enormemente. El núcleo alcanza temperaturas suficientes para fusionar elementos cada vez más pesados: carbono, neón, oxígeno y silicio.' },
        64:  { n: 'Formación de núcleo de hierro',img: 'img/64_vidasupernova.png',  d: 'Colapso del equilibrio interno.',          adap: 'La fusión llega al hierro, que ya no produce energía útil. El equilibrio interno colapsa: el núcleo queda sostenido sólo de manera precaria.' },
        128: { n: 'Colapso gravitatorio',         img: 'img/128_vidasupernova.png', d: 'Implosión extrema del núcleo.',            adap: 'En segundos, el núcleo implosiona. Los protones y electrones se combinan formando neutrones, y la densidad alcanza valores extremos.' },
        256: { n: 'Explosión de Supernova',       img: 'img/256_vidasupernova.png', d: 'Expulsión colosal y forja de elementos.',  adap: 'La implosión rebota violentamente y expulsa las capas externas en una explosión colosal. Se sintetizan muchos elementos pesados del universo.' },
        512: { n: 'Agujero negro',                img: 'img/512_vidasupernova.png', d: 'Colapso gravitacional absoluto.',          adap: 'Si el núcleo residual tiene suficiente masa, ni siquiera la presión de degeneración de neutrones puede detener el colapso. Se forma un agujero negro estelar, con una gravedad tan intensa que ni la luz puede escapar.' }
    }
};

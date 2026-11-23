"""Versão em hebraico (/he/playbook/), tom descontraído e local, da direita para a esquerda.
Chamado por tools/playbook_gen.py. As chaves são os textos do espanhol (fonte).
"""

COMMON_HE = [
    ("Domus-Jurere-Playbook-ES", "Domus-Jurere-Playbook-HE"), ("<i></i>Descargar PDF</a>", "<i></i>להורדת PDF</a>"),
    ('<html lang="es">', '<html lang="he" dir="rtl">'),
    ("video/quincho-es.mp4", "video/quincho-en.mp4"), ("video/quincho-es-poster.jpg", "video/quincho-en-poster.jpg"),
    ('<link rel="canonical" href="https://domusjurere.com/es/playbook/">', '<link rel="canonical" href="https://domusjurere.com/he/playbook/">'),
    ('<meta property="og:url" content="https://domusjurere.com/es/playbook/">', '<meta property="og:url" content="https://domusjurere.com/he/playbook/">'),
    ('<meta property="og:locale" content="es_ES">', '<meta property="og:locale" content="he_IL">'),
    ('<a href="/es/playbook/" hreflang="es" lang="es" class="on" aria-current="true">ES</a>', '<a href="/es/playbook/" hreflang="es" lang="es">ES</a>'),
    ('<a href="/he/playbook/" hreflang="he" lang="he">עב</a>', '<a href="/he/playbook/" hreflang="he" lang="he" class="on" aria-current="true">עב</a>'),
    ('<a href="/es/" aria-label="Domus Jurerê">', '<a href="/en/" aria-label="Domus Jurerê">'),
    ("<i>Chef</i>", "<i>שף</i>"), ("<i>Concierge</i>", "<i>קונסיירז׳</i>"),
    ('<a href="/es/">domusjurere.com</a>', '<a href="/en/">domusjurere.com</a>'),
    ("family=Raleway:wght@500;600;700&display=swap", "family=Raleway:wght@500;600;700&family=Frank+Ruhl+Libre:wght@500;700&family=Heebo:wght@500;600;700&display=swap"),
    ("--serif:'Cormorant Garamond',Georgia,serif;--sans:Raleway,system-ui,sans-serif;",
     "--serif:'Cormorant Garamond','Frank Ruhl Libre',Georgia,serif;--sans:Raleway,Heebo,system-ui,sans-serif;"),
    ("/* revelar */", """/* hebraico: leitura da direita para a esquerda */
html[dir=rtl] body{font-family:Heebo,Raleway,system-ui,sans-serif}
html[dir=rtl] h1,html[dir=rtl] h2,html[dir=rtl] .tag,html[dir=rtl] .notes b,html[dir=rtl] .serv b{font-family:'Frank Ruhl Libre','Cormorant Garamond',serif}
html[dir=rtl] .cover h1,html[dir=rtl] .end h2{font-family:'Cormorant Garamond',serif}
html[dir=rtl] .eyebrow,html[dir=rtl] .pill,html[dir=rtl] .cap,html[dir=rtl] figcaption,html[dir=rtl] .grid-n span,html[dir=rtl] .cover .meta,html[dir=rtl] .top nav,html[dir=rtl] .end small{letter-spacing:.04em}
html[dir=rtl] .cap{left:auto;right:var(--gr)}
html[dir=rtl] .mosaic figcaption,html[dir=rtl] .fig figcaption{left:auto;right:14px}
html[dir=rtl] .suites .fig figcaption{right:12px;left:12px}
html[dir=rtl] .ch-head .n{text-align:left}
html[dir=rtl] .cover h1{text-align:right}
html[dir=rtl] .qv .play{inset:auto auto 16px 16px}
html[dir=rtl] .lg,html[dir=rtl] .cover h1,html[dir=rtl] .grid-n b,html[dir=rtl] .loc li b{direction:ltr}
/* revelar */"""),
]

HE = {
    "<title>Domus Jurerê · Playbook de la casa</title>": "<title>Domus Jurerê · הפלייבוק של הבית</title>",
    'content="Presentación de Domus Jurerê: piscina con hidromasaje, quincho integrado, salas y suite principal. Jurerê Internacional, Florianópolis."':
        'content="Domus Jurerê בפלוריאנופוליס: בריכה פרטית עם ג׳קוזי, פינת מנגל שפתוחה לגינה, סלונים וסוויטת מאסטר. 300 מטר מהים."',
    '<meta property="og:title" content="Domus Jurerê · Playbook de la casa">': '<meta property="og:title" content="Domus Jurerê · הפלייבוק של הבית">',
    'content="Piscina, quincho, salas y suite principal. A 300 m de la playa en Jurerê Internacional."':
        'content="בריכה, מנגל, סלונים וסוויטת מאסטר. 300 מטר מהחוף ב-Jurerê Internacional."',
    '<nav aria-label="Capítulos">': '<nav aria-label="פרקים">',
    '<a href="#piscina">Piscina</a><a href="#quincho">Quincho</a><a href="#salas">Salas</a><a href="#suite">Suite principal</a><a href="#servicios">Servicios</a>':
        '<a href="#piscina">בריכה</a><a href="#quincho">מנגל</a><a href="#salas">סלונים</a><a href="#suite">סוויטת מאסטר</a><a href="#servicios">שירותים</a>',
    '<div class="lg" aria-label="Idioma">': '<div class="lg" aria-label="שפה">',
    '<i></i>Escríbanos</a>': '<i></i>דברו איתנו</a>',
    'aria-label="Fachada de Domus Jurerê"': 'aria-label="החזית של Domus Jurerê"',
    "Playbook de la casa · Temporada 2026/27": "הפלייבוק של הבית · עונת 2026/27",
    '<p class="tag">Donde lo extraordinario es lo habitual.</p>': '<p class="tag">המקום שבו יוצא הדופן הוא הסטנדרט.</p>',
    "<span>Florianópolis · Brasil</span><span>300 m de la playa</span>": "<span>פלוריאנופוליס · ברזיל</span><span>300 מ׳ מהחוף</span>",
    '<p class="eyebrow rv">La casa</p>': '<p class="eyebrow rv">הבית</p>',
    "Una casa entera <em>para su grupo.</em>": "בית שלם, <em>רק לחבר׳ה שלכם.</em>",
    "Arquitectura neoclásica en Jurerê Internacional, uno de los barrios de playa más exclusivos de Florianópolis. Sin vecinos de pared, sin áreas compartidas: toda la casa es para quienes llegan juntos.":
        "אדריכלות ניאו-קלאסית ב-Jurerê Internacional, אחת משכונות החוף הכי שוות בפלוריאנופוליס. בלי קיר משותף עם שכנים ובלי שטחים משותפים: כל הבית שלכם, מהרגע שנכנסים.",
    "<span>Suites</span>": "<span>סוויטות</span>",
    "<span>Dormitorios</span>": "<span>חדרי שינה</span>",
    "<b>17</b><span>Huéspedes</span>": "<b>17</b><span>אורחים</span>",
    "<span>Construidos</span>": "<span>שטח בנוי</span>",
    "<span>De la playa</span>": "<span>מהחוף</span>",
    "<span>Del aeropuerto</span>": "<span>משדה התעופה</span>",
    "<span>Estacionamientos cubiertos</span>": "<span>חניות מקורות</span>",
    "01 · Piscina</p>": "01 · בריכה</p>",
    "El agua, <em>en privado.</em>": "בריכה, <em>רק שלכם.</em>",
    "Piscina privada con hidromasaje integrada, solárium con reposeras y mesa al aire libre. Rodeada de jardín y palmeras.":
        "בריכה פרטית עם ג׳קוזי מובנה, סולריום עם מיטות שיזוף ושולחן בחוץ. מסביב גינה ודקלים, ואין לאן למהר.",
    'alt="Vista aérea de la casa y la piscina"': 'alt="מבט מהאוויר על הבית והבריכה"',
    '<span class="cap">Vista aérea</span>': '<span class="cap">מבט מהאוויר</span>',
    'alt="Piscina con hidromasaje" loading="lazy"><figcaption>Hidromasaje</figcaption>': 'alt="בריכה עם ג׳קוזי" loading="lazy"><figcaption>ג׳קוזי</figcaption>',
    'alt="Mesa junto a la piscina" loading="lazy"><figcaption>Mesa al aire libre</figcaption>': 'alt="שולחן ליד הבריכה" loading="lazy"><figcaption>שולחן בחוץ</figcaption>',
    'alt="Piscina vista desde el dron" loading="lazy"><figcaption>Desde el aire</figcaption>': 'alt="הבריכה מהרחפן" loading="lazy"><figcaption>מלמעלה</figcaption>',
    'alt="Solárium y reposeras" loading="lazy"><figcaption>Solárium</figcaption>': 'alt="סולריום ומיטות שיזוף" loading="lazy"><figcaption>סולריום</figcaption>',
    "02 · Quincho</p>": "02 · פינת המנגל</p>",
    "Del jardín <em>a la parrilla.</em>": "מהגינה <em>ישר למנגל.</em>",
    "El quincho se abre al jardín y a la piscina por puertas de vidrio. Parrilla, cocina completa con mesón de granito y mesas para el grupo entero: el asado y la conversación en un mismo espacio.":
        "פינת המנגל נפתחת לגינה ולבריכה דרך דלתות זכוכית. גריל, מטבח מלא עם משטח גרניט ושולחנות לכל החבר׳ה: המנגל והשיחה באותו מקום.",
    "<i></i>Ver con sonido</button>": "<i></i>צפו עם סאונד</button>",
    'alt="Parrilla y cocina del quincho" loading="lazy"><figcaption>Parrilla</figcaption>': 'alt="גריל ומטבח בפינת המנגל" loading="lazy"><figcaption>גריל</figcaption>',
    'alt="Cocina del quincho con vista al jardín" loading="lazy"><figcaption>Cocina con vista al jardín</figcaption>': 'alt="מטבח עם נוף לגינה" loading="lazy"><figcaption>מטבח עם נוף לגינה</figcaption>',
    'alt="Puertas de vidrio entre jardín y quincho" loading="lazy"><figcaption>Puertas de vidrio</figcaption>': 'alt="דלתות זכוכית בין הגינה למנגל" loading="lazy"><figcaption>דלתות זכוכית</figcaption>',
    'alt="Mesón de granito del quincho" loading="lazy"><figcaption>Mesón de granito</figcaption>': 'alt="משטח גרניט" loading="lazy"><figcaption>משטח גרניט</figcaption>',
    'alt="Área gourmet" loading="lazy"><figcaption>Área gourmet</figcaption>': 'alt="אזור גורמה" loading="lazy"><figcaption>אזור גורמה</figcaption>',
    "<b>Parrilla</b><p>Parrilla a carbón junto al mesón de granito.</p>": "<b>גריל</b><p>גריל על פחמים, צמוד למשטח הגרניט.</p>",
    "<b>Cocina completa</b><p>Refrigerador, cocina, lavaplatos y mesón para preparar en grupo.</p>": "<b>מטבח מלא</b><p>מקרר, כיריים, כיור ומשטח עבודה לבשל ביחד.</p>",
    "<b>Mesas para todos</b><p>Comedor del quincho integrado al jardín y a la piscina.</p>": "<b>שולחן לכולם</b><p>שולחנות שפתוחים לגינה ולבריכה.</p>",
    "03 · Salas</p>": "03 · סלונים</p>",
    "Para estar <em>juntos.</em>": "לבלות <em>ביחד.</em>",
    "Living con chimenea y sofás capitonados, comedor formal bajo una araña de cristal, sala de TV y una escalera helicoidal que une los pisos.":
        "סלון עם קמין וספות קפיטונאז׳, פינת אוכל מתחת לנברשת קריסטל, חדר טלוויזיה ומדרגות ספירלה שמחברות בין הקומות.",
    'alt="Living con chimenea" loading="lazy"><span class="cap">Living con chimenea</span>': 'alt="סלון עם קמין" loading="lazy"><span class="cap">סלון עם קמין</span>',
    'alt="Comedor con araña de cristal" loading="lazy"><figcaption>Comedor</figcaption>': 'alt="פינת אוכל עם נברשת קריסטל" loading="lazy"><figcaption>פינת אוכל</figcaption>',
    'alt="Sala de estar" loading="lazy"><figcaption>Sala de estar</figcaption>': 'alt="סלון" loading="lazy"><figcaption>סלון</figcaption>',
    'alt="Escalera helicoidal" loading="lazy"><figcaption>Escalera helicoidal</figcaption>': 'alt="מדרגות ספירלה" loading="lazy"><figcaption>מדרגות ספירלה</figcaption>',
    'alt="Doble altura" loading="lazy"><figcaption>Doble altura</figcaption>': 'alt="תקרה כפולה" loading="lazy"><figcaption>תקרה כפולה</figcaption>',
    'alt="Sala de TV" loading="lazy"><figcaption>Sala de TV</figcaption>': 'alt="חדר טלוויזיה" loading="lazy"><figcaption>חדר טלוויזיה</figcaption>',
    "04 · Suite principal</p>": "04 · סוויטת המאסטר</p>",
    "Zeus, <em>la suite principal.</em>": "זאוס, <em>סוויטת המאסטר.</em>",
    "Cama king, araña de cristal, mesa para el desayuno y un baño con bañera de hidromasaje bajo ventanales de bloque de vidrio.":
        "מיטת קינג, נברשת קריסטל, שולחן לארוחת בוקר ואמבטיה עם ג׳קוזי מתחת לחלונות של לבני זכוכית.",
    'alt="Suite principal Zeus" loading="lazy"><span class="cap">Suite Zeus</span>': 'alt="סוויטת המאסטר זאוס" loading="lazy"><span class="cap">סוויטת זאוס</span>',
    'alt="Suite Zeus con araña de cristal" loading="lazy"><figcaption>Araña de cristal</figcaption>': 'alt="סוויטת זאוס עם נברשת קריסטל" loading="lazy"><figcaption>נברשת קריסטל</figcaption>',
    'alt="Cama de la suite Zeus" loading="lazy"><figcaption>Dormitorio</figcaption>': 'alt="מיטת קינג בסוויטת זאוס" loading="lazy"><figcaption>חדר שינה</figcaption>',
    'alt="Bañera de hidromasaje" loading="lazy"><figcaption>Bañera de hidromasaje</figcaption>': 'alt="אמבטיית ג׳קוזי" loading="lazy"><figcaption>אמבטיית ג׳קוזי</figcaption>',
    "Las otras siete suites</p>": "שבע הסוויטות הנוספות</p>",
    "05 · Servicios</p>": "05 · שירותים</p>",
    "La casa <em>atiende.</em>": "הבית <em>דואג לכם.</em>",
    "<b>Chef privado</b><p>Desayunos, asados y cenas preparados en la casa, a pedido.</p>": "<b>שף פרטי</b><p>ארוחות בוקר, מנגלים וארוחות ערב שמכינים לכם בבית, לפי הזמנה.</p>",
    "<b>Concierge 24 h</b><p>Reservas, beach clubs, paseos y lo que el grupo necesite durante la estadía.</p>": "<b>קונסיירז׳ 24/7</b><p>הזמנות, ביץ׳ קלאבים, טיולים וכל מה שהחבר׳ה צריכים בזמן החופשה.</p>",
    "<i>Traslado</i><b>Aeropuerto</b><p>Traslado desde el aeropuerto de Florianópolis, a unos 40 minutos.</p>": "<i>הסעה</i><b>משדה התעופה</b><p>הסעה משדה התעופה של פלוריאנופוליס, בערך 40 דקות נסיעה.</p>",
    "06 · Ubicación · Jurerê Internacional</p>": "06 · מיקום · Jurerê Internacional</p>",
    "A 300 m <em>de la playa.</em>": "300 מטר <em>מהחוף.</em>",
    'alt="Jurerê Internacional y el mar"': 'alt="Jurerê Internacional והים"',
    "<li><span>Playa de Jurerê</span>": "<li><span>חוף Jurerê</span>",
    "<li><span>Aeropuerto de Florianópolis</span>": "<li><span>שדה התעופה של פלוריאנופוליס</span>",
    "<li><span>Huéspedes</span><b>Hasta 17</b></li>": "<li><span>אורחים</span><b>עד 17</b></li>",
    '<p class="eyebrow rv">Temporada 2026/27</p>': '<p class="eyebrow rv">עונת 2026/27</p>',
    '<p class="tag rv">Donde lo extraordinario es lo habitual.</p>': '<p class="tag rv">המקום שבו יוצא הדופן הוא הסטנדרט.</p>',
    "<i></i>Escríbanos en privado</a>": "<i></i>דברו איתנו בפרטי</a>",
    "Fechas, valores y condiciones por mensaje privado": "תאריכים, מחירים ותנאים בהודעה פרטית",
    "Consulte fechas y condiciones con su agente inmobiliario.": "תאריכים ותנאים דרך הסוכן שלכם.",
    'aria-label="Galería"': 'aria-label="גלריה"',
    'aria-label="Cerrar"': 'aria-label="סגירה"',
    'aria-label="Siguiente"': 'aria-label="הבא"',
    'aria-label="Anterior"': 'aria-label="הקודם"',
    "'Madera, luz natural y salida a la terraza.'": "'עץ, אור טבעי ויציאה למרפסת.'",
    "'Luz natural, mesa para el desayuno y tonos claros.'": "'אור טבעי, שולחן לבוקר וגוונים בהירים.'",
    "'Araña de cristal y baño en granito.'": "'נברשת קריסטל ואמבטיה בגרניט.'",
    "'Cortinas doradas y la luz de la mañana.'": "'וילונות זהב ואור של בוקר.'",
    "'Arañas de cristal y una atmósfera serena.'": "'נברשות קריסטל ואווירה רגועה.'",
    "'Granito, espejos e iluminación indirecta.'": "'גרניט, מראות ותאורה עקיפה.'",
    "'Tonos claros, TV y baño en granito.'": "'גוונים בהירים, טלוויזיה ואמבטיה בגרניט.'",
    "(v.muted?'Ver con sonido':'Silenciar')": "(v.muted?'צפו עם סאונד':'השתקה')",
    "'Hola, vi el playbook de Domus Jurerê y quisiera consultar disponibilidad y valores para la temporada 2026/27.'":
        "'היי, ראיתי את הפלייבוק של Domus Jurerê ורציתי לבדוק זמינות ומחירים לעונת 2026/27.'",
    "<span>Domus Jurerê · Av. dos Búzios, Jurerê Internacional, Florianópolis</span>": "<span>Domus Jurerê · Av. dos Búzios, Jurerê Internacional, פלוריאנופוליס, ברזיל</span>",
}

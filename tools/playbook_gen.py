"""Gera /playbook/ (PT) e /en/playbook/ (EN) a partir de /es/playbook/ (fonte).
Uso (na raiz do repositório): python3 tools/playbook_gen.py
Toda mudança de layout é feita no espanhol; depois rode este script.
"""
SRC = "es/playbook/index.html"

COMMON_PT = [
    ('<html lang="es">', '<html lang="pt-BR">'),
    ("../../img/", "../img/"), ("../../video/", "../video/"),
    ("video/quincho-es.mp4", "video/quincho-pt.mp4"), ("video/quincho-es-poster.jpg", "video/quincho-pt-poster.jpg"),
    ('<link rel="canonical" href="https://domusjurere.com/es/playbook/">', '<link rel="canonical" href="https://domusjurere.com/playbook/">'),
    ('<meta property="og:url" content="https://domusjurere.com/es/playbook/">', '<meta property="og:url" content="https://domusjurere.com/playbook/">'),
    ('<meta property="og:locale" content="es_ES">', '<meta property="og:locale" content="pt_BR">'),
    ('<a href="/playbook/" hreflang="pt-BR" lang="pt-BR">PT</a>', '<a href="/playbook/" hreflang="pt-BR" lang="pt-BR" class="on" aria-current="true">PT</a>'),
    ('<a href="/es/playbook/" hreflang="es" lang="es" class="on" aria-current="true">ES</a>', '<a href="/es/playbook/" hreflang="es" lang="es">ES</a>'),
    ('<a href="/es/" aria-label="Domus Jurerê">', '<a href="/" aria-label="Domus Jurerê">'),
    ('<a href="/es/">domusjurere.com</a>', '<a href="/">domusjurere.com</a>'),
]
COMMON_EN = [
    ('<html lang="es">', '<html lang="en">'),
    ("video/quincho-es.mp4", "video/quincho-en.mp4"), ("video/quincho-es-poster.jpg", "video/quincho-en-poster.jpg"),
    ('<link rel="canonical" href="https://domusjurere.com/es/playbook/">', '<link rel="canonical" href="https://domusjurere.com/en/playbook/">'),
    ('<meta property="og:url" content="https://domusjurere.com/es/playbook/">', '<meta property="og:url" content="https://domusjurere.com/en/playbook/">'),
    ('<meta property="og:locale" content="es_ES">', '<meta property="og:locale" content="en_US">'),
    ('<a href="/en/playbook/" hreflang="en" lang="en">EN</a>', '<a href="/en/playbook/" hreflang="en" lang="en" class="on" aria-current="true">EN</a>'),
    ('<a href="/es/playbook/" hreflang="es" lang="es" class="on" aria-current="true">ES</a>', '<a href="/es/playbook/" hreflang="es" lang="es">ES</a>'),
    ('<a href="/es/" aria-label="Domus Jurerê">', '<a href="/en/" aria-label="Domus Jurerê">'),
    ('<a href="/es/">domusjurere.com</a>', '<a href="/en/">domusjurere.com</a>'),
]

# (espanhol, português, inglês)
T = [
    ("<title>Domus Jurerê · Playbook de la casa</title>", "<title>Domus Jurerê · Playbook da casa</title>", "<title>Domus Jurerê · House playbook</title>"),
    ('content="Presentación de Domus Jurerê: piscina con hidromasaje, quincho integrado, salas y suite principal. Jurerê Internacional, Florianópolis."',
     'content="Apresentação da Domus Jurerê: piscina com hidromassagem, espaço gourmet integrado, salas e suíte principal. Jurerê Internacional, Florianópolis."',
     'content="Presenting Domus Jurerê: pool with hydromassage, open barbecue lounge, living rooms and the principal suite. Jurerê Internacional, Florianópolis, Brazil."'),
    ('<meta property="og:title" content="Domus Jurerê · Playbook de la casa">', '<meta property="og:title" content="Domus Jurerê · Playbook da casa">', '<meta property="og:title" content="Domus Jurerê · House playbook">'),
    ('content="Piscina, quincho, salas y suite principal. A 300 m de la playa en Jurerê Internacional."',
     'content="Piscina, espaço gourmet, salas e suíte principal. A 300 m da praia em Jurerê Internacional."',
     'content="Pool, barbecue lounge, living rooms and the principal suite. 300 m from the beach in Jurerê Internacional."'),
    ('<nav aria-label="Capítulos">', '<nav aria-label="Capítulos">', '<nav aria-label="Chapters">'),
    ('<a href="#piscina">Piscina</a><a href="#quincho">Quincho</a><a href="#salas">Salas</a><a href="#suite">Suite principal</a><a href="#servicios">Servicios</a>',
     '<a href="#piscina">Piscina</a><a href="#quincho">Gourmet</a><a href="#salas">Salas</a><a href="#suite">Suíte principal</a><a href="#servicios">Serviços</a>',
     '<a href="#piscina">Pool</a><a href="#quincho">Barbecue</a><a href="#salas">Living</a><a href="#suite">Principal suite</a><a href="#servicios">Services</a>'),
    ('<div class="lg" aria-label="Idioma">', '<div class="lg" aria-label="Idioma">', '<div class="lg" aria-label="Language">'),
    ('<i></i>Escríbanos</a>', '<i></i>Fale conosco</a>', '<i></i>Message us</a>'),
    ('aria-label="Fachada de Domus Jurerê"', 'aria-label="Fachada da Domus Jurerê"', 'aria-label="Front of Domus Jurerê"'),
    ("Playbook de la casa · Temporada 2026/27", "Playbook da casa · Temporada 2026/27", "House playbook · Season 2026/27"),
    ('<p class="tag">Donde lo extraordinario es lo habitual.</p>', '<p class="tag">O lugar onde o extraordinário é o padrão.</p>', '<p class="tag">Where the extraordinary is the standard.</p>'),
    ("<span>Florianópolis · Brasil</span><span>300 m de la playa</span>", "<span>Florianópolis · Brasil</span><span>300 m da praia</span>", "<span>Florianópolis · Brazil</span><span>300 m from the beach</span>"),
    ('<p class="eyebrow rv">La casa</p>', '<p class="eyebrow rv">A casa</p>', '<p class="eyebrow rv">The house</p>'),
    ("Una casa entera <em>para su grupo.</em>", "A casa inteira <em>para o seu grupo.</em>", "The whole house, <em>for your group.</em>"),
    ("Arquitectura neoclásica en Jurerê Internacional, uno de los barrios de playa más exclusivos de Florianópolis. Sin vecinos de pared, sin áreas compartidas: toda la casa es para quienes llegan juntos.",
     "Arquitetura neoclássica em Jurerê Internacional, um dos bairros de praia mais exclusivos de Florianópolis. Sem parede com vizinho, sem áreas compartilhadas: a casa inteira é de quem chega junto.",
     "Neoclassical architecture in Jurerê Internacional, one of the most exclusive beach neighbourhoods in Florianópolis. No shared walls, no shared areas: the whole house belongs to those who arrive together."),
    ("<span>Suites</span>", "<span>Suítes</span>", "<span>Suites</span>"),
    ("<span>Dormitorios</span>", "<span>Quartos</span>", "<span>Bedrooms</span>"),
    ("<b>17</b><span>Huéspedes</span>", "<b>17</b><span>Hóspedes</span>", "<b>17</b><span>Guests</span>"),
    ("<span>Construidos</span>", "<span>Construídos</span>", "<span>Built area</span>"),
    ("<span>De la playa</span>", "<span>Da praia</span>", "<span>From the beach</span>"),
    ("<span>Del aeropuerto</span>", "<span>Do aeroporto</span>", "<span>From the airport</span>"),
    ("<span>Estacionamientos cubiertos</span>", "<span>Vagas cobertas</span>", "<span>Covered parking</span>"),
    # piscina
    ("01 · Piscina</p>", "01 · Piscina</p>", "01 · Pool</p>"),
    ("El agua, <em>en privado.</em>", "A água, <em>em privado.</em>", "The water, <em>in private.</em>"),
    ("Piscina privada con hidromasaje integrada, solárium con reposeras y mesa al aire libre. Rodeada de jardín y palmeras.",
     "Piscina privativa com hidromassagem integrada, solário com espreguiçadeiras e mesa ao ar livre. Cercada de jardim e palmeiras.",
     "Private pool with built-in hydromassage, a sun deck with loungers and an outdoor table. Surrounded by garden and palm trees."),
    ('alt="Vista aérea de la casa y la piscina"', 'alt="Vista aérea da casa e da piscina"', 'alt="Aerial view of the house and pool"'),
    ('<span class="cap">Vista aérea</span>', '<span class="cap">Vista aérea</span>', '<span class="cap">Aerial view</span>'),
    ('alt="Piscina con hidromasaje" loading="lazy"><figcaption>Hidromasaje</figcaption>', 'alt="Piscina com hidromassagem" loading="lazy"><figcaption>Hidromassagem</figcaption>', 'alt="Pool with hydromassage" loading="lazy"><figcaption>Hydromassage</figcaption>'),
    ('alt="Mesa junto a la piscina" loading="lazy"><figcaption>Mesa al aire libre</figcaption>', 'alt="Mesa ao lado da piscina" loading="lazy"><figcaption>Mesa ao ar livre</figcaption>', 'alt="Table by the pool" loading="lazy"><figcaption>Outdoor table</figcaption>'),
    ('alt="Piscina vista desde el dron" loading="lazy"><figcaption>Desde el aire</figcaption>', 'alt="Piscina vista do drone" loading="lazy"><figcaption>Do alto</figcaption>', 'alt="Pool seen from the drone" loading="lazy"><figcaption>From above</figcaption>'),
    ('alt="Solárium y reposeras" loading="lazy"><figcaption>Solárium</figcaption>', 'alt="Solário e espreguiçadeiras" loading="lazy"><figcaption>Solário</figcaption>', 'alt="Sun deck and loungers" loading="lazy"><figcaption>Sun deck</figcaption>'),
    # quincho
    ("02 · Quincho</p>", "02 · Espaço gourmet</p>", "02 · Barbecue lounge</p>"),
    ("Del jardín <em>a la parrilla.</em>", "Do jardim <em>à churrasqueira.</em>", "From the garden <em>to the grill.</em>"),
    ("El quincho se abre al jardín y a la piscina por puertas de vidrio. Parrilla, cocina completa con mesón de granito y mesas para el grupo entero: el asado y la conversación en un mismo espacio.",
     "O espaço gourmet se abre para o jardim e a piscina por portas de vidro. Churrasqueira, cozinha completa com bancada de granito e mesas para o grupo inteiro: o churrasco e a conversa no mesmo ambiente.",
     "The barbecue lounge opens onto the garden and pool through glass doors. A grill, a full kitchen with a granite counter and tables for the whole group: the barbecue and the conversation in one space."),
    ("<i></i>Ver con sonido</button>", "<i></i>Ver com som</button>", "<i></i>Play with sound</button>"),
    ('alt="Parrilla y cocina del quincho" loading="lazy"><figcaption>Parrilla</figcaption>', 'alt="Churrasqueira e cozinha do espaço gourmet" loading="lazy"><figcaption>Churrasqueira</figcaption>', 'alt="Grill and kitchen in the barbecue lounge" loading="lazy"><figcaption>Grill</figcaption>'),
    ('alt="Cocina del quincho con vista al jardín" loading="lazy"><figcaption>Cocina con vista al jardín</figcaption>', 'alt="Cozinha com vista para o jardim" loading="lazy"><figcaption>Cozinha com vista para o jardim</figcaption>', 'alt="Kitchen with a garden view" loading="lazy"><figcaption>Kitchen with a garden view</figcaption>'),
    ('alt="Puertas de vidrio entre jardín y quincho" loading="lazy"><figcaption>Puertas de vidrio</figcaption>', 'alt="Portas de vidro entre o jardim e o espaço gourmet" loading="lazy"><figcaption>Portas de vidro</figcaption>', 'alt="Glass doors between garden and lounge" loading="lazy"><figcaption>Glass doors</figcaption>'),
    ('alt="Mesón de granito del quincho" loading="lazy"><figcaption>Mesón de granito</figcaption>', 'alt="Bancada de granito" loading="lazy"><figcaption>Bancada de granito</figcaption>', 'alt="Granite counter" loading="lazy"><figcaption>Granite counter</figcaption>'),
    ('alt="Área gourmet" loading="lazy"><figcaption>Área gourmet</figcaption>', 'alt="Área gourmet" loading="lazy"><figcaption>Área gourmet</figcaption>', 'alt="Gourmet area" loading="lazy"><figcaption>Gourmet area</figcaption>'),
    ("<b>Parrilla</b><p>Parrilla a carbón junto al mesón de granito.</p>", "<b>Churrasqueira</b><p>Churrasqueira a carvão ao lado da bancada de granito.</p>", "<b>Grill</b><p>A charcoal grill beside the granite counter.</p>"),
    ("<b>Cocina completa</b><p>Refrigerador, cocina, lavaplatos y mesón para preparar en grupo.</p>", "<b>Cozinha completa</b><p>Geladeira, cooktop, pia e bancada para cozinhar em grupo.</p>", "<b>Full kitchen</b><p>Fridge, cooktop, sink and counter space to cook together.</p>"),
    ("<b>Mesas para todos</b><p>Comedor del quincho integrado al jardín y a la piscina.</p>", "<b>Mesa para todos</b><p>Mesas integradas ao jardim e à piscina.</p>", "<b>Tables for everyone</b><p>Dining tables open to the garden and pool.</p>"),
    # salas
    ("03 · Salas</p>", "03 · Salas</p>", "03 · Living</p>"),
    ("Para estar <em>juntos.</em>", "Para estar <em>juntos.</em>", "Made for <em>being together.</em>"),
    ("Living con chimenea y sofás capitonados, comedor formal bajo una araña de cristal, sala de TV y una escalera helicoidal que une los pisos.",
     "Sala de estar com lareira e sofás capitonê, sala de jantar sob um lustre de cristal, sala de TV e uma escada helicoidal que une os andares.",
     "A drawing room with a fireplace and tufted sofas, a formal dining room under a crystal chandelier, a TV room and a helical staircase joining the floors."),
    ('alt="Living con chimenea" loading="lazy"><span class="cap">Living con chimenea</span>', 'alt="Sala com lareira" loading="lazy"><span class="cap">Sala com lareira</span>', 'alt="Drawing room with fireplace" loading="lazy"><span class="cap">Fireplace room</span>'),
    ('alt="Comedor con araña de cristal" loading="lazy"><figcaption>Comedor</figcaption>', 'alt="Sala de jantar com lustre de cristal" loading="lazy"><figcaption>Sala de jantar</figcaption>', 'alt="Dining room with crystal chandelier" loading="lazy"><figcaption>Dining room</figcaption>'),
    ('alt="Sala de estar" loading="lazy"><figcaption>Sala de estar</figcaption>', 'alt="Sala de estar" loading="lazy"><figcaption>Sala de estar</figcaption>', 'alt="Living room" loading="lazy"><figcaption>Living room</figcaption>'),
    ('alt="Escalera helicoidal" loading="lazy"><figcaption>Escalera helicoidal</figcaption>', 'alt="Escada helicoidal" loading="lazy"><figcaption>Escada helicoidal</figcaption>', 'alt="Helical staircase" loading="lazy"><figcaption>Helical staircase</figcaption>'),
    ('alt="Doble altura" loading="lazy"><figcaption>Doble altura</figcaption>', 'alt="Pé-direito duplo" loading="lazy"><figcaption>Pé-direito duplo</figcaption>', 'alt="Double-height ceiling" loading="lazy"><figcaption>Double height</figcaption>'),
    ('alt="Sala de TV" loading="lazy"><figcaption>Sala de TV</figcaption>', 'alt="Sala de TV" loading="lazy"><figcaption>Sala de TV</figcaption>', 'alt="TV room" loading="lazy"><figcaption>TV room</figcaption>'),
    # suíte
    ("04 · Suite principal</p>", "04 · Suíte principal</p>", "04 · Principal suite</p>"),
    ("Zeus, <em>la suite principal.</em>", "Zeus, <em>a suíte principal.</em>", "Zeus, <em>the principal suite.</em>"),
    ("Cama king, araña de cristal, mesa para el desayuno y un baño con bañera de hidromasaje bajo ventanales de bloque de vidrio.",
     "Cama king, lustre de cristal, mesa para o café da manhã e banheiro com banheira de hidromassagem sob janelas de bloco de vidro.",
     "A king bed, a crystal chandelier, a breakfast table and a bathroom with a hydromassage tub beneath glass-block windows."),
    ('alt="Suite principal Zeus" loading="lazy"><span class="cap">Suite Zeus</span>', 'alt="Suíte principal Zeus" loading="lazy"><span class="cap">Suíte Zeus</span>', 'alt="Zeus, the principal suite" loading="lazy"><span class="cap">Zeus suite</span>'),
    ('alt="Suite Zeus con araña de cristal" loading="lazy"><figcaption>Araña de cristal</figcaption>', 'alt="Suíte Zeus com lustre de cristal" loading="lazy"><figcaption>Lustre de cristal</figcaption>', 'alt="Zeus suite with crystal chandelier" loading="lazy"><figcaption>Crystal chandelier</figcaption>'),
    ('alt="Cama de la suite Zeus" loading="lazy"><figcaption>Dormitorio</figcaption>', 'alt="Cama king da suíte Zeus" loading="lazy"><figcaption>Quarto</figcaption>', 'alt="King bed in the Zeus suite" loading="lazy"><figcaption>Bedroom</figcaption>'),
    ('alt="Bañera de hidromasaje" loading="lazy"><figcaption>Bañera de hidromasaje</figcaption>', 'alt="Banheira de hidromassagem" loading="lazy"><figcaption>Banheira de hidromassagem</figcaption>', 'alt="Hydromassage tub" loading="lazy"><figcaption>Hydromassage tub</figcaption>'),
    ("Las otras siete suites</p>", "As outras sete suítes</p>", "The other seven suites</p>"),
    # serviços
    ("05 · Servicios</p>", "05 · Serviços</p>", "05 · Services</p>"),
    ("La casa <em>atiende.</em>", "A casa <em>atende.</em>", "The house <em>takes care.</em>"),
    ("<b>Chef privado</b><p>Desayunos, asados y cenas preparados en la casa, a pedido.</p>", "<b>Chef particular</b><p>Cafés da manhã, churrascos e jantares preparados na casa, sob encomenda.</p>", "<b>Private chef</b><p>Breakfasts, barbecues and dinners cooked in the house, on request.</p>"),
    ("<b>Concierge 24 h</b><p>Reservas, beach clubs, paseos y lo que el grupo necesite durante la estadía.</p>", "<b>Concierge 24 h</b><p>Reservas, beach clubs, passeios e o que o grupo precisar durante a estadia.</p>", "<b>24 h concierge</b><p>Bookings, beach clubs, outings and whatever the group needs during the stay.</p>"),
    ("<i>Traslado</i><b>Aeropuerto</b><p>Traslado desde el aeropuerto de Florianópolis, a unos 40 minutos.</p>", "<i>Transfer</i><b>Aeroporto</b><p>Transfer do aeroporto de Florianópolis, a cerca de 40 minutos.</p>", "<i>Transfer</i><b>Airport</b><p>Transfer from Florianópolis airport, about 40 minutes away.</p>"),
    # localização
    ("06 · Ubicación · Jurerê Internacional</p>", "06 · Localização · Jurerê Internacional</p>", "06 · Location · Jurerê Internacional</p>"),
    ("A 300 m <em>de la playa.</em>", "A 300 m <em>da praia.</em>", "300 m <em>from the beach.</em>"),
    ('alt="Jurerê Internacional y el mar"', 'alt="Jurerê Internacional e o mar"', 'alt="Jurerê Internacional and the sea"'),
    ("<li><span>Playa de Jurerê</span>", "<li><span>Praia de Jurerê</span>", "<li><span>Jurerê beach</span>"),
    ("<li><span>Aeropuerto de Florianópolis</span>", "<li><span>Aeroporto de Florianópolis</span>", "<li><span>Florianópolis airport</span>"),
    ("<li><span>Huéspedes</span><b>Hasta 17</b></li>", "<li><span>Hóspedes</span><b>Até 17</b></li>", "<li><span>Guests</span><b>Up to 17</b></li>"),
    # fecho
    ('<p class="eyebrow rv">Temporada 2026/27</p>', '<p class="eyebrow rv">Temporada 2026/27</p>', '<p class="eyebrow rv">Season 2026/27</p>'),
    ('<p class="tag rv">Donde lo extraordinario es lo habitual.</p>', '<p class="tag rv">O lugar onde o extraordinário é o padrão.</p>', '<p class="tag rv">Where the extraordinary is the standard.</p>'),
    ("<i></i>Escríbanos en privado</a>", "<i></i>Chame no privado</a>", "<i></i>Message us privately</a>"),
    ("Fechas, valores y condiciones por mensaje privado", "Datas, valores e condições pelo privado", "Dates, rates and terms by private message"),
    ("Consulte fechas y condiciones con su agente inmobiliario.", "Consulte datas e condições com o seu corretor.", "Ask your agent for dates and terms."),
    ('aria-label="Galería"', 'aria-label="Galeria"', 'aria-label="Gallery"'),
    ('aria-label="Cerrar"', 'aria-label="Fechar"', 'aria-label="Close"'),
    ('aria-label="Siguiente"', 'aria-label="Próxima"', 'aria-label="Next"'),
    ('aria-label="Anterior"', 'aria-label="Anterior"', 'aria-label="Previous"'),
    # script
    ("'Madera, luz natural y salida a la terraza.'", "'Madeira, luz natural e porta para a varanda.'", "'Wood, natural light and a door to the terrace.'"),
    ("'Luz natural, mesa para el desayuno y tonos claros.'", "'Luz natural, mesa para o café e tons claros.'", "'Natural light, a breakfast table and soft tones.'"),
    ("'Araña de cristal y baño en granito.'", "'Lustre de cristal e banheiro em granito.'", "'Crystal chandelier and a granite bathroom.'"),
    ("'Cortinas doradas y la luz de la mañana.'", "'Cortinas douradas e a luz da manhã.'", "'Golden curtains and the morning light.'"),
    ("'Arañas de cristal y una atmósfera serena.'", "'Lustres de cristal e uma atmosfera serena.'", "'Crystal chandeliers and a serene atmosphere.'"),
    ("'Granito, espejos e iluminación indirecta.'", "'Granito, espelhos e iluminação indireta.'", "'Granite, mirrors and indirect lighting.'"),
    ("'Tonos claros, TV y baño en granito.'", "'Tons claros, TV e banheiro em granito.'", "'Soft tones, TV and a granite bathroom.'"),
    ("(v.muted?'Ver con sonido':'Silenciar')", "(v.muted?'Ver com som':'Silenciar')", "(v.muted?'Play with sound':'Mute')"),
    ("'Hola, vi el playbook de Domus Jurerê y quisiera consultar disponibilidad y valores para la temporada 2026/27.'",
     "'Olá, vi o playbook da Domus Jurerê e gostaria de consultar disponibilidade e valores para a temporada 2026/27.'",
     "'Hello, I saw the Domus Jurerê playbook and would like to ask about availability and rates for the 2026/27 season.'"),
    ("<span>Domus Jurerê · Av. dos Búzios, Jurerê Internacional, Florianópolis</span>", "<span>Domus Jurerê · Av. dos Búzios, Jurerê Internacional, Florianópolis</span>", "<span>Domus Jurerê · Av. dos Búzios, Jurerê Internacional, Florianópolis, Brazil</span>"),
]

def build(lang):
    s = open(SRC, encoding="utf-8").read()
    for a, b in (COMMON_PT if lang == "pt" else COMMON_EN):
        assert a in s, (lang, a); s = s.replace(a, b)
    col = 1 if lang == "pt" else 2
    for row in T:
        a, b = row[0], row[col]
        assert a in s, (lang, a[:70]); s = s.replace(a, b)
    out = "playbook/index.html" if lang == "pt" else "en/playbook/index.html"
    import os; os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write(s); print("ok", out)

build("pt"); build("en")

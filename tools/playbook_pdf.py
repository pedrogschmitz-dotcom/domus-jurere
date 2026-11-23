"""Gera o playbook em PDF (A4 horizontal) em PT, EN e ES, com e sem contato.
Uso (na raiz do repositório): python3 tools/playbook_pdf.py <pasta_saida>
"""
import sys, os, html
from playwright.sync_api import sync_playwright

R = os.path.abspath(".")
OUT = sys.argv[1] if len(sys.argv) > 1 else "pdf"
os.makedirs(OUT, exist_ok=True)
U = lambda p: "file://" + os.path.join(R, p)

T = {
 "pt": dict(lang="pt-BR", kicker="Playbook da casa · Temporada 2026/27", tag="O lugar onde o extraordinário é o padrão.",
   place="Jurerê Internacional · Florianópolis · Brasil",
   casa_k="A casa", casa_h="A casa inteira <em>para o seu grupo.</em>",
   casa_p="Arquitetura neoclássica em Jurerê Internacional, um dos bairros de praia mais exclusivos de Florianópolis. Sem parede com vizinho, sem áreas compartilhadas: a casa inteira é de quem chega junto.",
   nums=[("17","Hóspedes"),("9","Quartos"),("8","Suítes"),("800 m²","Construídos"),("300 m","Da praia"),("40 min","Do aeroporto"),("4","Vagas cobertas"),("24 h","Concierge")],
   pis_k="01 · Piscina", pis_h="A água, <em>em privado.</em>", pis_p="Piscina privativa com hidromassagem integrada, solário com espreguiçadeiras e mesa ao ar livre. Cercada de jardim e palmeiras.",
   pis_c=["Hidromassagem","Mesa ao ar livre","Do alto"],
   gou_k="02 · Espaço gourmet", gou_h="Do jardim <em>à churrasqueira.</em>", gou_p="O espaço gourmet se abre para o jardim e a piscina por portas de vidro. Churrasqueira, cozinha completa com bancada de granito e mesas para o grupo inteiro.",
   gou_c=["Churrasqueira","Cozinha com vista para o jardim","Bancada de granito"],
   sal_k="03 · Salas", sal_h="Para estar <em>juntos.</em>", sal_p="Sala de estar com lareira, sala de jantar sob um lustre de cristal, sala de TV e uma escada helicoidal que une os andares.",
   sal_c=["Sala com lareira","Sala de jantar","Escada helicoidal","Sala de TV"],
   zeu_k="04 · Suíte principal", zeu_h="Zeus, <em>a suíte principal.</em>", zeu_p="Cama king, lustre de cristal, mesa para o café da manhã e banheiro com banheira de hidromassagem sob janelas de bloco de vidro.",
   zeu_c=["Lustre de cristal","Quarto","Banheira de hidromassagem"],
   sui_k="As outras sete suítes", sui_h="Oito suítes, <em>cada uma com nome.</em>",
   sui=[("Poseidon","Madeira, luz natural e porta para a varanda."),("Artemis","Luz natural, mesa para o café e tons claros."),("Apollo","Lustre de cristal e banheiro em granito."),("Hera","Cortinas douradas e a luz da manhã."),("Dionisio","Lustres de cristal e uma atmosfera serena."),("Aphrodite","Granito, espelhos e iluminação indireta."),("Athena","Tons claros, TV e banheiro em granito.")],
   ser_k="05 · Serviços e localização", ser_h="A casa <em>atende.</em>",
   ser=[("Chef particular","Cafés da manhã, churrascos e jantares preparados na casa, sob encomenda."),("Concierge 24 h","Reservas, beach clubs, passeios e o que o grupo precisar."),("Transfer","Do aeroporto de Florianópolis, a cerca de 40 minutos.")],
   loc=[("Praia de Jurerê","300 m"),("Aeroporto de Florianópolis","40 min"),("Hóspedes","Até 17")],
   end_k="Temporada 2026/27", cta="Chame no privado", cta_p="Datas, valores e condições pelo privado", partner="Consulte datas e condições com o seu corretor.",
   wa="Olá, vi o playbook da Domus Jurerê e gostaria de consultar disponibilidade e valores para a temporada 2026/27."),
 "en": dict(lang="en", kicker="House playbook · Season 2026/27", tag="Where the extraordinary is the standard.",
   place="Jurerê Internacional · Florianópolis · Brazil",
   casa_k="The house", casa_h="The whole house, <em>for your group.</em>",
   casa_p="Neoclassical architecture in Jurerê Internacional, one of the most exclusive beach neighbourhoods in Florianópolis. No shared walls, no shared areas: the whole house belongs to those who arrive together.",
   nums=[("17","Guests"),("9","Bedrooms"),("8","Suites"),("800 m²","Built area"),("300 m","From the beach"),("40 min","From the airport"),("4","Covered parking"),("24 h","Concierge")],
   pis_k="01 · Pool", pis_h="The water, <em>in private.</em>", pis_p="Private pool with built-in hydromassage, a sun deck with loungers and an outdoor table. Surrounded by garden and palm trees.",
   pis_c=["Hydromassage","Outdoor table","From above"],
   gou_k="02 · Barbecue lounge", gou_h="From the garden <em>to the grill.</em>", gou_p="The barbecue lounge opens onto the garden and pool through glass doors. A grill, a full kitchen with a granite counter and tables for the whole group.",
   gou_c=["Grill","Kitchen with a garden view","Granite counter"],
   sal_k="03 · Living", sal_h="Made for <em>being together.</em>", sal_p="A drawing room with a fireplace, a formal dining room under a crystal chandelier, a TV room and a helical staircase joining the floors.",
   sal_c=["Fireplace room","Dining room","Helical staircase","TV room"],
   zeu_k="04 · Principal suite", zeu_h="Zeus, <em>the principal suite.</em>", zeu_p="A king bed, a crystal chandelier, a breakfast table and a bathroom with a hydromassage tub beneath glass-block windows.",
   zeu_c=["Crystal chandelier","Bedroom","Hydromassage tub"],
   sui_k="The other seven suites", sui_h="Eight suites, <em>each with a name.</em>",
   sui=[("Poseidon","Wood, natural light and a door to the terrace."),("Artemis","Natural light, a breakfast table and soft tones."),("Apollo","Crystal chandelier and a granite bathroom."),("Hera","Golden curtains and the morning light."),("Dionisio","Crystal chandeliers and a serene atmosphere."),("Aphrodite","Granite, mirrors and indirect lighting."),("Athena","Soft tones, TV and a granite bathroom.")],
   ser_k="05 · Services and location", ser_h="The house <em>takes care.</em>",
   ser=[("Private chef","Breakfasts, barbecues and dinners cooked in the house, on request."),("24 h concierge","Bookings, beach clubs, outings and whatever the group needs."),("Transfer","From Florianópolis airport, about 40 minutes away.")],
   loc=[("Jurerê beach","300 m"),("Florianópolis airport","40 min"),("Guests","Up to 17")],
   end_k="Season 2026/27", cta="Message us privately", cta_p="Dates, rates and terms by private message", partner="Ask your agent for dates and terms.",
   wa="Hello, I saw the Domus Jurerê playbook and would like to ask about availability and rates for the 2026/27 season."),
 "es": dict(lang="es", kicker="Playbook de la casa · Temporada 2026/27", tag="Donde lo extraordinario es lo habitual.",
   place="Jurerê Internacional · Florianópolis · Brasil",
   casa_k="La casa", casa_h="Una casa entera <em>para su grupo.</em>",
   casa_p="Arquitectura neoclásica en Jurerê Internacional, uno de los barrios de playa más exclusivos de Florianópolis. Sin vecinos de pared, sin áreas compartidas: toda la casa es para quienes llegan juntos.",
   nums=[("17","Huéspedes"),("9","Dormitorios"),("8","Suites"),("800 m²","Construidos"),("300 m","De la playa"),("40 min","Del aeropuerto"),("4","Estacionamientos"),("24 h","Concierge")],
   pis_k="01 · Piscina", pis_h="El agua, <em>en privado.</em>", pis_p="Piscina privada con hidromasaje integrada, solárium con reposeras y mesa al aire libre. Rodeada de jardín y palmeras.",
   pis_c=["Hidromasaje","Mesa al aire libre","Desde el aire"],
   gou_k="02 · Quincho", gou_h="Del jardín <em>a la parrilla.</em>", gou_p="El quincho se abre al jardín y a la piscina por puertas de vidrio. Parrilla, cocina completa con mesón de granito y mesas para el grupo entero.",
   gou_c=["Parrilla","Cocina con vista al jardín","Mesón de granito"],
   sal_k="03 · Salas", sal_h="Para estar <em>juntos.</em>", sal_p="Living con chimenea, comedor formal bajo una araña de cristal, sala de TV y una escalera helicoidal que une los pisos.",
   sal_c=["Living con chimenea","Comedor","Escalera helicoidal","Sala de TV"],
   zeu_k="04 · Suite principal", zeu_h="Zeus, <em>la suite principal.</em>", zeu_p="Cama king, araña de cristal, mesa para el desayuno y un baño con bañera de hidromasaje bajo ventanales de bloque de vidrio.",
   zeu_c=["Araña de cristal","Dormitorio","Bañera de hidromasaje"],
   sui_k="Las otras siete suites", sui_h="Ocho suites, <em>cada una con nombre.</em>",
   sui=[("Poseidon","Madera, luz natural y salida a la terraza."),("Artemis","Luz natural, mesa para el desayuno y tonos claros."),("Apollo","Araña de cristal y baño en granito."),("Hera","Cortinas doradas y la luz de la mañana."),("Dionisio","Arañas de cristal y una atmósfera serena."),("Aphrodite","Granito, espejos e iluminación indirecta."),("Athena","Tonos claros, TV y baño en granito.")],
   ser_k="05 · Servicios y ubicación", ser_h="La casa <em>atiende.</em>",
   ser=[("Chef privado","Desayunos, asados y cenas preparados en la casa, a pedido."),("Concierge 24 h","Reservas, beach clubs, paseos y lo que el grupo necesite."),("Traslado","Desde el aeropuerto de Florianópolis, a unos 40 minutos.")],
   loc=[("Playa de Jurerê","300 m"),("Aeropuerto de Florianópolis","40 min"),("Huéspedes","Hasta 17")],
   end_k="Temporada 2026/27", cta="Escríbanos en privado", cta_p="Fechas, valores y condiciones por mensaje privado", partner="Consulte fechas y condiciones con su agente inmobiliario.",
   wa="Hola, vi el playbook de Domus Jurerê y quisiera consultar disponibilidad y valores para la temporada 2026/27."),
}

CSS = """
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0A0A0A;color:#F6F1E8;font:500 10.5pt/1.55 Raleway,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.pg:last-child{page-break-after:auto;break-after:auto}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.shade:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,10,.85) 0%,rgba(10,10,10,.35) 55%,rgba(10,10,10,.1) 100%)}
.k{font:600 7.5pt/1 Raleway;letter-spacing:.32em;text-transform:uppercase;color:#D4BC80}
h1{font:700 64pt/1 'Cormorant Garamond',serif;letter-spacing:.06em}
h2{font:700 32pt/1.05 'Cormorant Garamond',serif;margin-top:4mm}
h1 em,h2 em{font-style:italic;font-weight:600;color:#D4BC80}
p.t{color:rgba(246,241,232,.78);margin-top:5mm;max-width:105mm;font-size:10.5pt}
.sub{font:600 12pt/1 Raleway;letter-spacing:.6em;color:#D4BC80;margin-top:4mm}
.tag{font:italic 600 18pt/1.2 'Cormorant Garamond',serif;color:#D4BC80;margin-top:8mm}
.cap{position:absolute;left:4mm;bottom:4mm;font:600 6.5pt/1 Raleway;letter-spacing:.22em;text-transform:uppercase;background:rgba(0,0,0,.6);padding:2.2mm 3mm;border-radius:10mm}
.ph{position:absolute;background-size:cover;background-position:center;border-radius:1.5mm;overflow:hidden}
.left{position:absolute;left:16mm;top:18mm;width:112mm;z-index:2}
.foot{position:absolute;left:16mm;right:16mm;bottom:9mm;display:flex;justify-content:space-between;font:600 6.5pt/1 Raleway;letter-spacing:.26em;text-transform:uppercase;color:rgba(246,241,232,.5);z-index:3}
.nums{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(212,188,128,.35);margin-top:9mm}
.nums div{padding:4mm 4mm 3.5mm;border-right:1px solid rgba(212,188,128,.35);border-bottom:1px solid rgba(212,188,128,.35)}
.nums div:nth-child(4n){border-right:0}.nums div:nth-child(n+5){border-bottom:0}
.nums b{display:block;font:700 20pt/1 'Cormorant Garamond',serif}
.nums span{display:block;margin-top:2mm;font:600 6pt/1.3 Raleway;letter-spacing:.2em;text-transform:uppercase;color:rgba(246,241,232,.65)}
.suites{position:absolute;left:16mm;right:16mm;top:52mm;display:grid;grid-template-columns:repeat(4,1fr);gap:4mm}
.suites div{position:relative;height:62mm;border-radius:1.5mm;background-size:cover;background-position:center;overflow:hidden}
.suites div:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.85))}
.suites b{position:absolute;left:3.5mm;bottom:9mm;z-index:2;font:700 15pt/1 'Cormorant Garamond',serif}
.suites span{position:absolute;left:3.5mm;right:3mm;bottom:3mm;z-index:2;font:500 7pt/1.3 Raleway;color:rgba(246,241,232,.8)}
.ser{display:grid;gap:4mm;margin-top:8mm}
.ser div{border-top:1px solid rgba(212,188,128,.3);padding-top:3mm}
.ser b{display:block;font:700 15pt/1.1 'Cormorant Garamond',serif}
.ser span{color:rgba(246,241,232,.75);font-size:9pt}
.loc{margin-top:7mm;border-top:1px solid rgba(212,188,128,.3)}
.loc div{display:flex;justify-content:space-between;padding:2.6mm 0;border-bottom:1px solid rgba(212,188,128,.3);font-size:9pt;color:rgba(246,241,232,.75)}
.loc b{font:700 13pt/1 'Cormorant Garamond',serif;color:#F6F1E8}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:2}
.btn{display:inline-flex;align-items:center;gap:3mm;margin-top:10mm;padding:4mm 7mm;border-radius:20mm;background:#D4BC80;color:#0A0A0A;font:600 8pt/1 Raleway;letter-spacing:.26em;text-transform:uppercase;text-decoration:none}
.btn i{width:2mm;height:2mm;border-radius:50%;background:#0A0A0A}
.links{margin-top:7mm;font:600 8pt/1.8 Raleway;letter-spacing:.2em;text-transform:uppercase;color:rgba(246,241,232,.75)}
.links a{color:#D4BC80;text-decoration:none}
"""

def ph(x, y, w, h, img, cap=None, extra=""):
    c = f'<span class="cap">{html.escape(cap)}</span>' if cap else ""
    return f'<div class="ph" style="left:{x}mm;top:{y}mm;width:{w}mm;height:{h}mm;background-image:url({U(img)});{extra}">{c}</div>'

def page_photo(k, h, p, big, smalls, caps):
    # texto à esquerda, foto grande à direita, fotos menores embaixo do texto
    s = f'<section class="pg"><div class="left"><p class="k">{k}</p><h2>{h}</h2><p class="t">{p}</p></div>'
    s += ph(140, 14, 143, 120, big, caps[0])
    n = len(smalls); W = (267 - 4 * (n - 1)) / n if n else 0
    for i, (img, cap) in enumerate(zip(smalls, caps[1:])):
        s += ph(16 + i * (W + 4), 140, W, 52, img, cap)
    return s + "</section>"

def build(lang, partner):
    L = T[lang]
    wa = "https://wa.me/5548984680088?text=" + __import__("urllib.parse", fromlist=["quote"]).quote(L["wa"])
    P = []
    # 1 capa
    P.append(f'''<section class="pg"><div class="bg shade" style="background-image:url({U("img/hero.jpg")});background-position:center 40%"></div>
      <div class="left" style="top:auto;bottom:26mm"><p class="k">{L["kicker"]}</p><h1 style="margin-top:6mm">DOMUS</h1><p class="sub">JURERÊ</p><p class="tag">{L["tag"]}</p></div>
      <div class="foot"><span>{L["place"]}</span><span>{"" if partner else "domusjurere.com"}</span></div></section>''')
    # 2 a casa
    nums = "".join(f"<div><b>{a}</b><span>{b}</span></div>" for a, b in L["nums"])
    P.append(f'''<section class="pg"><div class="left" style="width:128mm"><p class="k">{L["casa_k"]}</p><h2>{L["casa_h"]}</h2><p class="t" style="max-width:120mm">{L["casa_p"]}</p><div class="nums">{nums}</div></div>
      {ph(152, 14, 131, 178, "img/playbook/casa-aerea.jpg")}</section>''')
    # 3 piscina
    P.append(page_photo(L["pis_k"], L["pis_h"], L["pis_p"], "img/playbook/piscina.jpg",
                        ["img/piscina-mesa.jpg", "img/playbook/piscina-aerea.jpg", "img/playbook/piscina-mesa2.jpg"],
                        [L["pis_c"][0], L["pis_c"][1], L["pis_c"][2], "Solárium" if lang == "es" else ("Solário" if lang == "pt" else "Sun deck")]))
    # 4 gourmet
    P.append(page_photo(L["gou_k"], L["gou_h"], L["gou_p"], "img/playbook/churrasqueira.jpg",
                        ["img/playbook/quincho-cocina.jpg", "img/playbook/quincho-bar.jpg", "img/gourmet.jpg"],
                        [L["gou_c"][0], L["gou_c"][1], L["gou_c"][2], ""]))
    # 5 salas
    P.append(page_photo(L["sal_k"], L["sal_h"], L["sal_p"], "img/lareira.jpg",
                        ["img/playbook/comedor.jpg", "img/escada.jpg", "img/tv.jpg", "img/pedireito.jpg"],
                        [L["sal_c"][0], L["sal_c"][1], L["sal_c"][2], L["sal_c"][3], ""]))
    # 6 zeus
    P.append(page_photo(L["zeu_k"], L["zeu_h"], L["zeu_p"], "img/suites/zeus-3.jpg",
                        ["img/suites/zeus-1.jpg", "img/suites/zeus-2.jpg", "img/suites/zeus-4.jpg"],
                        ["Zeus", L["zeu_c"][0], L["zeu_c"][1], L["zeu_c"][2]]))
    # 7 outras suítes
    covers = {"Poseidon": "poseidon-1", "Artemis": "artemis-2", "Apollo": "apollo-2", "Hera": "hera-3", "Dionisio": "dionisio-2", "Aphrodite": "aphrodite-1", "Athena": "athena-1"}
    cards = "".join(f'<div style="background-image:url({U("img/suites/" + covers[n] + ".jpg")})"><b>{n}</b><span>{d}</span></div>' for n, d in L["sui"])
    cards += f'<div style="background-image:url({U("img/suites/zeus-2.jpg")})"><b>Zeus</b><span>{L["zeu_k"].split("·")[1].strip()}</span></div>'
    P.append(f'''<section class="pg"><div class="left" style="width:200mm"><p class="k">{L["sui_k"]}</p><h2>{L["sui_h"]}</h2></div><div class="suites">{cards}</div></section>''')
    # 8 serviços e localização
    ser = "".join(f"<div><b>{a}</b><span>{b}</span></div>" for a, b in L["ser"])
    loc = "".join(f"<div><span>{a}</span><b>{b}</b></div>" for a, b in L["loc"])
    P.append(f'''<section class="pg"><div class="left"><p class="k">{L["ser_k"]}</p><h2>{L["ser_h"]}</h2><div class="ser">{ser}</div><div class="loc">{loc}</div></div>
      {ph(140, 14, 143, 178, "img/playbook/vista.jpg", "Jurerê Internacional")}</section>''')
    # 9 contato
    if partner:
        cta = f'<p class="links" style="margin-top:10mm">{L["partner"]}</p>'
    else:
        cta = f'''<a class="btn" href="{html.escape(wa)}"><i></i>{L["cta"]}</a>
          <p class="links"><a href="https://instagram.com/domus.jurere">@domus.jurere</a> · <a href="https://domusjurere.com/{'' if lang == 'pt' else lang + '/'}">domusjurere.com</a><br>{L["cta_p"]}</p>'''
    P.append(f'''<section class="pg"><div class="bg" style="background-image:url({U("img/playbook/piscina-aerea.jpg")})"></div><div class="bg" style="background:rgba(8,8,8,.74)"></div>
      <div class="center"><p class="k">{L["end_k"]}</p><h1 style="margin-top:6mm">DOMUS</h1><p class="sub">JURERÊ</p><p class="tag">{L["tag"]}</p>{cta}</div></section>''')
    return f'''<!doctype html><html lang="{L["lang"]}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Raleway:wght@500;600&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>{"".join(P)}</body></html>'''

names = {"pt": "Domus-Jurere-Playbook-PT", "en": "Domus-Jurere-Playbook-EN", "es": "Domus-Jurere-Playbook-ES"}
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page()
    for lang in ["pt", "en", "es"]:
        for partner in [False, True]:
            hf = os.path.join(OUT, f"_tmp_{lang}_{int(partner)}.html")
            open(hf, "w", encoding="utf-8").write(build(lang, partner))
            pg.goto("file://" + os.path.abspath(hf), wait_until="networkidle"); pg.wait_for_timeout(600)
            out = os.path.join(OUT, names[lang] + ("-sem-contato" if partner else "") + ".pdf")
            pg.pdf(path=out, width="297mm", height="210mm", print_background=True, margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
            print("ok", out, os.path.getsize(out) // 1024, "KB")
    b.close()

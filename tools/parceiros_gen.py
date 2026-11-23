"""Gera a página escondida do kit do parceiro (/parceiros/) e a ficha em PDF.
Uso (na raiz do repositório):
  python3 tools/parceiros_gen.py A   -> com tabela de valores
  python3 tools/parceiros_gen.py B   -> valores sob consulta
  (opcional) segundo argumento = arquivo de saída; padrão parceiros/index.html
"""
import json, sys, html, os

OPT = (sys.argv[1] if len(sys.argv) > 1 else "A").upper()
OUT = sys.argv[2] if len(sys.argv) > 2 else "parceiros/index.html"
FOTOS = json.load(open("tools/parceiros_fotos.json", encoding="utf-8"))
COMISSAO = "10%"
WA = "5548984680088"
WA_MSG = "Olá, sou corretor(a) da imobiliária ____ e tenho um cliente para a Domus Jurerê. Datas: ____ · Hóspedes: ____"

D = json.load(open("disponibilidade.json", encoding="utf-8"))

def brl(v): return "R$ " + f"{v:,.0f}".replace(",", ".")
def dt(s): y, m, d = s.split("-"); return f"{d}/{m}"

# feriados futuros (a partir de hoje)
import datetime
hoje = datetime.date.today().isoformat()
fer = [p for p in D["periodos"] if p["nome"] == "feriado" and p["ate"] >= hoje]
res = {(r["de"], r["ate"]) for r in D["reservado"]}

def linha(nome, quando, semana, fds, minimo, extra=""):
    return f'<tr><td><b>{nome}</b><span>{quando}</span></td><td data-l="Seg a qui">{semana}</td><td data-l="Sex a dom">{fds}</td><td data-l="Mínimo">{minimo}</td></tr>'

pad = D["padrao"]
alta = next(p for p in D["periodos"] if p["nome"] == "alta" and p["ate"] >= hoje)
rev = next(p for p in D["periodos"] if p["nome"] == "reveillon" and p["ate"] >= hoje)
car = next((p for p in D["periodos"] if p["nome"] == "carnaval" and p["ate"] >= hoje), None)
ss = next((p for p in D["periodos"] if p["nome"] == "semana_santa" and p["ate"] >= hoje), None)

rows = [
    linha("Alta temporada", f"{dt(alta['de'])}/{alta['de'][:4]} a {dt(alta['ate'])}/{alta['ate'][:4]}", brl(alta["semana"]), brl(alta["fimdesemana"]), f"{alta['min']} noites"),
    linha("Réveillon", f"{dt(rev['de'])} a {dt(rev['ate'])}", brl(rev["noite"]), brl(rev["noite"]), f"{rev['min']} noites"),
]
if car:
    reservado = (car["de"], car["ate"]) in res or any(r["de"] <= car["de"] and r["ate"] >= car["ate"] for r in D["reservado"])
    rows.append(linha("Carnaval", f"{dt(car['de'])} a {dt(car['ate'])}/{car['de'][:4]}", "Reservado" if reservado else brl(car["noite"]), "Reservado" if reservado else brl(car["noite"]), "—" if reservado else f"{car['min']} noites"))
if ss:
    rows.append(linha("Semana Santa", f"{dt(ss['de'])} a {dt(ss['ate'])}/{ss['de'][:4]}", brl(ss["semana"]), brl(ss["fimdesemana"]), f"{ss['min']} noites"))
rows.append(linha("Feriados", " · ".join(f"{dt(p['de'])}–{dt(p['ate'])}" for p in fer), brl(fer[0]["noite"]) if fer else "—", brl(fer[0]["noite"]) if fer else "—", f"{fer[0]['min']} noites" if fer else "—"))
rows.append(linha("Baixa temporada", "Demais datas", brl(pad["semana"]), brl(pad["fimdesemana"]), f"{pad['min']} noites"))

if OPT == "A":
    VALORES = f"""
    <div class="tbl rv"><table>
      <thead><tr><th>Período</th><th>Seg a qui<small>por noite</small></th><th>Sex a dom<small>por noite</small></th><th>Mínimo</th></tr></thead>
      <tbody>{''.join(rows)}</tbody></table></div>
    <p class="fine rv">Casa inteira, valores por noite em reais. Caução e serviços extras (chef, transfer) à parte. Tabela atualizada em {D['atualizado'][8:10]}/{D['atualizado'][5:7]}/{D['atualizado'][:4]}; confirme sempre antes de enviar proposta.</p>"""
else:
    VALORES = """
    <div class="ask rv"><p>Os valores variam por data, número de noites e serviços. Envie as datas e o número de hóspedes e o proprietário responde com o valor fechado para o seu cliente.</p>
    <a class="pill gold" href="__WA__" target="_blank" rel="noopener"><i></i>Pedir valor ao proprietário</a></div>"""

cats = []
for f in FOTOS:
    if f["cat"] not in cats: cats.append(f["cat"])
GAL = ""
for c in cats:
    items = "".join(f'<a class="ph" href="fotos/{f["f"]}" download><img src="fotos/web/{f["f"]}" alt="{html.escape(c)}" loading="lazy"><span>Baixar</span></a>' for f in FOTOS if f["cat"] == c)
    GAL += f'<h3 class="rv">{c}</h3><div class="grid rv">{items}</div>'

wa = f"https://wa.me/{WA}?text=" + __import__("urllib.parse", fromlist=["quote"]).quote(WA_MSG)

PAGE = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Domus Jurerê · Kit do parceiro</title>
<meta name="robots" content="noindex,nofollow">
<meta name="description" content="Material para imobiliárias parceiras: fotos em alta, playbook sem contato, ficha técnica e condições.">
<meta property="og:title" content="Domus Jurerê · Kit do parceiro">
<meta property="og:description" content="Fotos em alta, playbook para o cliente, ficha técnica e condições de parceria.">
<meta property="og:image" content="https://domusjurere.com/img/og-domus.jpg">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0A0A0A">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Raleway:wght@500;600;700&display=swap" rel="stylesheet">
<style>
:root{{--ink:#0A0A0A;--ink2:#141311;--gold:#D4BC80;--creme:#F6F1E8;--mute:rgba(246,241,232,.72);--line:rgba(212,188,128,.28);
  --serif:'Cormorant Garamond',Georgia,serif;--sans:Raleway,system-ui,sans-serif}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{overflow-x:clip;background:var(--ink);color:var(--creme)}}
body{{font:500 16px/1.6 var(--sans);-webkit-font-smoothing:antialiased}}
[hidden]{{display:none!important}}
img{{display:block;max-width:100%}}
a{{color:inherit}}
.wrap{{max-width:1180px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}}
header{{border-bottom:1px solid var(--line);padding-top:env(safe-area-inset-top,0px)}}
header .wrap{{display:flex;align-items:center;justify-content:space-between;gap:16px;height:70px}}
header img{{height:26px;width:auto}}
.eyebrow{{font:600 11px/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}}
h1{{font:700 clamp(44px,7vw,84px)/1 var(--serif);margin-top:16px;text-wrap:balance}}
h1 em,h2 em{{font-style:italic;color:var(--gold);font-weight:600}}
h2{{font:700 clamp(34px,4.6vw,54px)/1.05 var(--serif);margin-top:12px;text-wrap:balance}}
h3{{font:600 11px/1 var(--sans);letter-spacing:.26em;text-transform:uppercase;color:var(--gold);margin:40px 0 14px}}
.lead{{color:var(--mute);max-width:62ch;margin-top:18px;font-size:17px}}
.hero{{padding-block:70px 40px}}
.toc{{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}}
.pill{{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border-radius:999px;border:1px solid rgba(212,188,128,.6);background:rgba(0,0,0,.35);
  font:600 11px/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--creme);text-decoration:none;cursor:pointer}}
.pill i{{width:7px;height:7px;border-radius:50%;background:var(--gold);flex:none}}
.pill.gold{{background:var(--gold);color:var(--ink);border-color:var(--gold)}}.pill.gold i{{background:var(--ink)}}
section{{padding:70px 0;border-top:1px solid var(--line)}}
.cards{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:30px}}
.card{{border:1px solid var(--line);border-radius:6px;padding:22px;background:var(--ink2);min-width:0}}
.card b{{display:block;font:700 26px/1.1 var(--serif)}}
.card p{{color:var(--mute);font-size:14px;margin:6px 0 16px}}
.card .row{{display:flex;flex-wrap:wrap;gap:8px}}
.url{{font:500 12px/1.4 ui-monospace,monospace;color:var(--mute);word-break:break-all;margin-bottom:14px}}
@media (max-width:860px){{.cards{{grid-template-columns:1fr}}}}
.grid{{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}}
@media (max-width:860px){{.grid{{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}}}}
.ph{{position:relative;display:block;border-radius:4px;overflow:hidden;aspect-ratio:4/3;background:var(--ink2)}}
.ph img{{width:100%;height:100%;object-fit:cover;transition:transform .8s}}
.ph:hover img{{transform:scale(1.04)}}
.ph span{{position:absolute;right:8px;bottom:8px;font:600 10px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;background:rgba(0,0,0,.6);border:1px solid var(--line);padding:7px 10px;border-radius:999px}}
.facts{{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:30px}}
.facts div{{background:var(--ink);padding:22px 18px}}
.facts b{{display:block;font:700 40px/1 var(--serif)}}
.facts span{{display:block;margin-top:8px;font:600 10px/1.4 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}}
@media (max-width:760px){{.facts{{grid-template-columns:repeat(2,minmax(0,1fr))}}}}
.cols{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;margin-top:34px}}
.cols ul{{list-style:none;border-top:1px solid var(--line)}}
.cols li{{padding:12px 0;border-bottom:1px solid var(--line);color:var(--mute);font-size:15px}}
.cols li b{{color:var(--creme);font-weight:600}}
@media (max-width:760px){{.cols{{grid-template-columns:1fr;gap:24px}}}}
.tbl{{overflow-x:auto;margin-top:30px;border:1px solid var(--line);border-radius:6px}}
table{{width:100%;border-collapse:collapse;min-width:560px}}
th,td{{text-align:left;padding:14px 16px;border-bottom:1px solid var(--line);vertical-align:top}}
th{{font:600 10px/1.3 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}}
th small{{display:block;color:var(--mute);letter-spacing:.1em;margin-top:4px}}
td{{font:600 16px/1.3 var(--sans);font-variant-numeric:tabular-nums}}
td b{{display:block;font:700 22px/1.1 var(--serif)}}
td span{{display:block;font:500 12px/1.5 var(--sans);color:var(--mute);margin-top:4px;max-width:34ch}}
tr:last-child td{{border-bottom:0}}
@media (max-width:640px){{table{{min-width:0}}thead{{display:none}}tr{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-bottom:1px solid var(--line)}}tr:last-child{{border-bottom:0}}td{{border-bottom:0;padding:10px 14px}}td:first-child{{grid-column:1/-1;padding-bottom:2px}}td[data-l]:before{{content:attr(data-l);display:block;font:600 9px/1.3 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}}}}
.fine{{color:var(--mute);font-size:13px;margin-top:14px;max-width:80ch}}
.ask{{border:1px solid var(--line);border-radius:6px;padding:28px;margin-top:30px;background:var(--ink2)}}
.ask p{{color:var(--mute);margin-bottom:18px;max-width:60ch}}
.steps{{list-style:none;counter-reset:s;margin-top:30px;display:grid;gap:12px}}
.steps li{{counter-increment:s;display:grid;grid-template-columns:56px minmax(0,1fr);gap:14px;align-items:start;border:1px solid var(--line);border-radius:6px;padding:18px;background:var(--ink2)}}
.steps li:before{{content:counter(s,decimal-leading-zero);font:700 32px/1 var(--serif);color:var(--gold)}}
.steps b{{display:block;font-weight:700;color:var(--creme)}}
.steps span{{color:var(--mute);font-size:15px}}
.com{{display:flex;flex-wrap:wrap;align-items:center;gap:18px 30px;margin-top:30px;border:1px solid var(--gold);border-radius:6px;padding:24px}}
.com b{{font:700 64px/1 var(--serif);color:var(--gold)}}
.com p{{color:var(--mute);max-width:52ch}}
footer{{border-top:1px solid var(--line);padding:30px 0 calc(30px + env(safe-area-inset-bottom,0px));color:var(--mute);font-size:13px}}
.rv{{opacity:0;transform:translateY(18px);transition:opacity .8s,transform .8s}}.rv.in{{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){{.rv{{opacity:1;transform:none;transition:none}}}}
.toast{{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--gold);color:var(--ink);font:600 12px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:12px 18px;border-radius:999px}}
</style>
</head>
<body>
<header><div class="wrap"><img src="../img/logo-texto.png" alt="DOMUS"><span class="eyebrow">Kit do parceiro</span></div></header>

<div class="wrap hero">
  <p class="eyebrow rv">Imobiliárias e corretores · Temporada 2026/27</p>
  <h1 class="rv">A casa certa <em>para o seu cliente.</em></h1>
  <p class="lead rv">Tudo o que você precisa para apresentar e fechar a casa: playbook sem os nossos contatos para enviar ao cliente, fotos em alta, vídeos, ficha técnica e condições de parceria.</p>
  <div class="toc rv"><a class="pill" href="#cliente"><i></i>Para o cliente</a><a class="pill" href="#fotos"><i></i>Fotos</a><a class="pill" href="#ficha"><i></i>Ficha</a><a class="pill" href="#valores"><i></i>Valores</a><a class="pill" href="#fechar"><i></i>Como fechar</a></div>
</div>

<section id="cliente"><div class="wrap">
  <p class="eyebrow rv">01 · Para enviar ao cliente</p>
  <h2 class="rv">Playbook <em>sem os nossos contatos.</em></h2>
  <p class="lead rv">A mesma apresentação do site, sem WhatsApp, Instagram ou link para o proprietário, em link ou em PDF. Envie com a sua marca e o seu contato.</p>
  <div class="cards">
    <div class="card rv"><b>Português</b><p>Clientes brasileiros</p><div class="url">domusjurere.com/playbook/?p=parceiro</div><div class="row"><a class="pill gold" href="/playbook/?p=parceiro" target="_blank" rel="noopener"><i></i>Abrir</a><button class="pill cp" data-u="https://domusjurere.com/playbook/?p=parceiro" type="button"><i></i>Copiar link</button></div></div>
    <div class="card rv"><b>English</b><p>Clientes internacionais</p><div class="url">domusjurere.com/en/playbook/?p=parceiro</div><div class="row"><a class="pill gold" href="/en/playbook/?p=parceiro" target="_blank" rel="noopener"><i></i>Abrir</a><button class="pill cp" data-u="https://domusjurere.com/en/playbook/?p=parceiro" type="button"><i></i>Copiar link</button></div></div>
    <div class="card rv"><b>Español</b><p>Chile, Argentina e Uruguai</p><div class="url">domusjurere.com/es/playbook/?p=parceiro</div><div class="row"><a class="pill gold" href="/es/playbook/?p=parceiro" target="_blank" rel="noopener"><i></i>Abrir</a><button class="pill cp" data-u="https://domusjurere.com/es/playbook/?p=parceiro" type="button"><i></i>Copiar link</button></div></div>
    <div class="card rv"><b>עברית · Hebraico</b><p>Clientes de Israel</p><div class="url">domusjurere.com/he/playbook/?p=parceiro</div><div class="row"><a class="pill gold" href="/he/playbook/?p=parceiro" target="_blank" rel="noopener"><i></i>Abrir</a><button class="pill cp" data-u="https://domusjurere.com/he/playbook/?p=parceiro" type="button"><i></i>Copiar link</button></div></div>
  </div>
  <h3 class="rv">Vídeos sem contato · 16 s · vertical</h3>
  <div class="row rv" style="display:flex;flex-wrap:wrap;gap:10px">
    <a class="pill" href="videos/domus-jurere-gourmet-pt.mp4" download><i></i>Vídeo PT</a>
    <a class="pill" href="videos/domus-jurere-gourmet-en.mp4" download><i></i>Vídeo EN</a>
    <a class="pill" href="videos/domus-jurere-gourmet-es.mp4" download><i></i>Vídeo ES</a>
  </div>
  <h3 class="rv">Playbook em PDF sem contato · 9 páginas</h3>
  <div class="row rv" style="display:flex;flex-wrap:wrap;gap:10px">
    <a class="pill" href="/pdf/Domus-Jurere-Playbook-PT-sem-contato.pdf" download><i></i>PDF PT</a>
    <a class="pill" href="/pdf/Domus-Jurere-Playbook-EN-sem-contato.pdf" download><i></i>PDF EN</a>
    <a class="pill" href="/pdf/Domus-Jurere-Playbook-ES-sem-contato.pdf" download><i></i>PDF ES</a>
    <a class="pill" href="/pdf/Domus-Jurere-Playbook-HE-sem-contato.pdf" download><i></i>PDF עברית</a>
  </div>
</div></section>

<section id="fotos"><div class="wrap">
  <p class="eyebrow rv">02 · Fotos em alta</p>
  <h2 class="rv">{len(FOTOS)} fotos <em>prontas para anúncio.</em></h2>
  <p class="lead rv">Toque em uma foto para baixar em alta resolução, ou baixe todas de uma vez.</p>
  <div class="toc rv"><a class="pill gold" href="domus-jurere-fotos.zip" download><i></i>Baixar todas (ZIP, {round(os.path.getsize('parceiros/domus-jurere-fotos.zip')/1e6)} MB)</a></div>
  {GAL}
</div></section>

<section id="ficha"><div class="wrap">
  <p class="eyebrow rv">03 · Ficha técnica</p>
  <h2 class="rv">A casa <em>em números.</em></h2>
  <div class="facts rv">
    <div><b>17</b><span>Hóspedes</span></div><div><b>9</b><span>Quartos</span></div><div><b>8</b><span>Suítes</span></div><div><b>800 m²</b><span>Construídos</span></div>
    <div><b>300 m</b><span>Da praia</span></div><div><b>40 min</b><span>Do aeroporto</span></div><div><b>4</b><span>Vagas cobertas</span></div><div><b>15h</b><span>Check-in</span></div>
  </div>
  <div class="cols">
    <div class="rv"><h3 style="margin-top:0">Ambientes</h3><ul>
      <li><b>Piscina privativa</b> com hidromassagem, solário e mesa ao ar livre</li>
      <li><b>Espaço gourmet</b> com churrasqueira, cozinha completa e mesas integradas ao jardim</li>
      <li><b>Salas</b> de estar com lareira, de jantar e de TV; pé-direito duplo</li>
      <li><b>Suíte principal Zeus</b> com cama king e banheira de hidromassagem</li>
      <li><b>Mais 7 suítes</b>: Poseidon, Artemis, Apollo, Hera, Dionisio, Aphrodite e Athena</li>
    </ul></div>
    <div class="rv"><h3 style="margin-top:0">Serviços e regras</h3><ul>
      <li><b>Sob encomenda:</b> chef particular, concierge 24 h e transfer do aeroporto</li>
      <li><b>Limpeza</b> regular durante a estadia</li>
      <li><b>Festas e eventos:</b> não permitidos sem aprovação prévia do proprietário</li>
      <li><b>Silêncio</b> após as 22h, conforme a lei municipal; sem som profissional</li>
      <li><b>Pets:</b> sob consulta · <b>Caução:</b> sob consulta</li>
    </ul></div>
  </div>
  <div class="toc rv"><a class="pill gold" href="ficha-domus-jurere.pdf" download><i></i>Baixar ficha em PDF (sem contato)</a></div>
</div></section>

<section id="valores"><div class="wrap">
  <p class="eyebrow rv">04 · Valores e parceria</p>
  <h2 class="rv">Condições <em>para o corretor.</em></h2>
  {VALORES}
  <div class="com rv"><b>{COMISSAO}</b><p>Comissão de parceria sobre o valor da locação. O cliente fica vinculado ao corretor que o registrou primeiro com o proprietário.</p></div>
</div></section>

<section id="fechar"><div class="wrap">
  <p class="eyebrow rv">05 · Como fechar</p>
  <h2 class="rv">Do contato <em>ao contrato.</em></h2>
  <ol class="steps">
    <li class="rv"><div><b>Veja as datas livres</b><span>O calendário do site mostra os dias ocupados: <a href="/#datas" target="_blank" rel="noopener">domusjurere.com/#datas</a>.</span></div></li>
    <li class="rv"><div><b>Registre o cliente com o proprietário</b><span>Mande pelo WhatsApp: imobiliária, nome do cliente, datas e número de hóspedes.</span></div></li>
    <li class="rv"><div><b>Proposta e contrato</b><span>O proprietário confirma valor e disponibilidade e formaliza a locação por temporada em contrato.</span></div></li>
    <li class="rv"><div><b>Check-in personalizado</b><span>Apresentação completa da casa na chegada; horários combinados na reserva.</span></div></li>
  </ol>
  <div class="toc rv"><a class="pill gold" href="__WA__" target="_blank" rel="noopener"><i></i>Falar com o proprietário</a></div>
  <p class="fine rv">Contato exclusivo de parceiros; não repasse ao cliente.</p>
</div></section>

<footer><div class="wrap">Domus Jurerê · Av. dos Búzios, Jurerê Internacional, Florianópolis · Material exclusivo para parceiros</div></footer>
<div class="toast" id="toast" hidden>Link copiado</div>
<script>
(function(){{
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){{es.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('in');io.unobserve(e.target)}}}})}},{{rootMargin:'0px 0px -6% 0px'}}):null;
  document.querySelectorAll('.rv').forEach(function(e){{io?io.observe(e):e.classList.add('in')}});
  var t=document.getElementById('toast');
  document.querySelectorAll('.cp').forEach(function(b){{b.addEventListener('click',function(){{
    var u=b.getAttribute('data-u'); function ok(){{t.hidden=false;setTimeout(function(){{t.hidden=true}},1600)}}
    if(navigator.clipboard&&navigator.clipboard.writeText){{navigator.clipboard.writeText(u).then(ok,function(){{prompt('Copie o link:',u)}})}}else{{prompt('Copie o link:',u)}}
  }})}});
}})();
</script>
</body>
</html>
"""
PAGE = PAGE.replace("__WA__", html.escape(wa))
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(PAGE)
print("ok", OUT, OPT)

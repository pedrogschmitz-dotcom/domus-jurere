# Prompt de Geração — Site Mansão 1540 · Domus Jurerê
**Versão corrigida** · 28 abril 2026  
**Stack base**: Projeto Schmitz Centro Comercial (reutilização de configuração técnica)  
**Design school**: Dark Editorial Luxury — NÃO skeuomorphism

---

## CONTEXTO PARA O AGENTE

Você irá criar o site de locação de temporada de ultra luxo da **Mansão 1540**, conhecida comercialmente como **Domus Jurerê**, localizada em Jurerê Internacional, Florianópolis, SC.

Este site NÃO é um imóvel comum. É uma locação de R$ 15.000 a R$ 40.000 por noite. O cliente não precisa ser convencido — ele precisa sentir que o imóvel está no nível dele. O design carrega essa mensagem antes de qualquer palavra.

**Reutilize do projeto Schmitz Centro Comercial**:
- Toda a configuração técnica: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `.github/workflows/deploy.yml`
- Estrutura de pastas e scaffold React
- Lógica do carrossel 3D (Galeria.tsx) — trocar apenas os dados
- Componente WhatsAppFloat.tsx — trocar apenas o número

**NÃO reutilize do projeto Schmitz**:
- CSS de identidade visual (cores, sombras, tipografia) — tudo novo
- Nenhuma shadow skeuomórfica (`inset`, emboss, `rgba(255,255,255,0.35)`)
- Nenhum gradiente claro (`#fdfaf4`, `#f5ecda`)
- Nenhuma lógica de "luxury-card" com fundo bege
- Nenhum padrão visual que funcione num imóvel de R$ 500/noite

---

## STACK TÉCNICO

```
Framework:   Vite 8.x + React 19 + TypeScript
Styling:     Tailwind CSS 4 (via @tailwindcss/vite — NÃO criar tailwind.config.ts)
Ícones:      lucide-react (NÃO tem Instagram — usar SVG inline)
Deploy:      GitHub Pages via GitHub Actions (copiar deploy.yml do Schmitz)
Base URL:    /domus-jurere/
```

### `package.json`
```json
{
  "name": "domus-jurere",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.11.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.2.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "tailwindcss": "^4.2.4",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.58.2",
    "vite": "^8.0.10"
  }
}
```

---

## DESIGN SYSTEM — DARK EDITORIAL LUXURY

### Filosofia
O site é escuro, silencioso e grandioso. Cada elemento respira. O imóvel é o protagonista — toda a interface serve para exibir a mansão, não para chamar atenção para si mesma. Inspiração: Brunello Cucinelli website, OneFineStay, Christie's International Real Estate.

### Paleta de Cores — EXATA (não substituir)
```css
:root {
  /* Base */
  --ink:        #0A0A0A;   /* Fundo de todas as páginas e seções */
  --ink-soft:   #141414;   /* Fundo alternado de seções */
  --ink-mid:    #1E1E1E;   /* Cards e elementos elevados */

  /* Gold */
  --gold:       #D4BC80;   /* Destaque principal — títulos em itálico, bordas CTA */
  --gold-dk:    #C8B48A;   /* Elementos dourados de apoio, labels */
  --gold-lt:    #E8D9A8;   /* Hover de elementos dourados */

  /* Texto */
  --white:      #FFFFFF;   /* Texto principal sobre foto */
  --cream:      #F6F1E8;   /* Texto em elementos glass/backdrop */
  --cream-dk:   #E8E0D0;   /* Texto secundário */
  --gray:       #6B6560;   /* Texto terciário, page numbers */

  /* Funcional */
  --green-wa:   #25D366;   /* Botão WhatsApp exclusivamente */
}
```

### Tipografia
```html
<!-- No index.html — OBRIGATÓRIO -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

```css
/* Regras tipográficas */
--font-display: 'Cormorant Garamond', Georgia, serif;  /* Títulos, taglines, números */
--font-body:    'Raleway', system-ui, sans-serif;       /* Todo o restante */

/* Raleway NUNCA abaixo de weight 500 */
/* Cormorant em itálico para termos e destaques dourados */
/* Labels: Raleway 600, 9-10px, letter-spacing 0.28-0.32em, uppercase */
```

### Sistema de CSS Base (`src/index.css`)
```css
@import "tailwindcss";

/* ── VARIÁVEIS ── */
:root {
  --ink:        #0A0A0A;
  --ink-soft:   #141414;
  --ink-mid:    #1E1E1E;
  --gold:       #D4BC80;
  --gold-dk:    #C8B48A;
  --gold-lt:    #E8D9A8;
  --white:      #FFFFFF;
  --cream:      #F6F1E8;
  --cream-dk:   #E8E0D0;
  --gray:       #6B6560;
  --green-wa:   #25D366;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Raleway', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  font-weight: 500;
  background-color: var(--ink);
  color: var(--cream);
  -webkit-font-smoothing: antialiased;
}

/* ── TIPOGRAFIA ── */
.font-display  { font-family: var(--font-display); }
.font-body     { font-family: var(--font-body); }
.gold-text     { color: var(--gold); }
.gold-italic   { font-family: var(--font-display); font-style: italic; color: var(--gold); }

.label-track {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.30em;
  text-transform: uppercase;
  color: var(--gold-dk);
}

/* ── DIVISÓRIA DOURADA ── */
.rule-gold {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, var(--gold), transparent);
  border: none;
  margin: 20px 0;
}

.divider-full {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  border: none;
  opacity: 0.25;
}

/* ── GLASS CARD (Glassmorphism — NÃO skeuomorphism) ── */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 0.5px solid rgba(212, 188, 128, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 2px;
}

.glass-card:hover {
  background: rgba(212, 188, 128, 0.05);
  border-color: rgba(212, 188, 128, 0.30);
}

/* ── CTA PRINCIPAL ── */
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-cta:hover {
  background: var(--gold);
  color: var(--ink);
}

.btn-cta-filled {
  background: var(--gold);
  color: var(--ink);
}

.btn-cta-filled:hover {
  background: var(--gold-lt);
}

/* ── WHATSAPP ── */
.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--green-wa);
  color: #fff;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.08em;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  text-decoration: none;
}

.btn-whatsapp:hover { opacity: 0.88; }

/* ── ANIMAÇÕES ── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-in-up { animation: fadeInUp 0.8s ease both; }
.animate-fade-in    { animation: fadeIn 1.2s ease both; }
.delay-100  { animation-delay: 0.1s; }
.delay-200  { animation-delay: 0.2s; }
.delay-300  { animation-delay: 0.3s; }
.delay-500  { animation-delay: 0.5s; }
.delay-700  { animation-delay: 0.7s; }
```

---

## COMPONENTES — ESPECIFICAÇÃO COMPLETA

### 1. `Header.tsx` — Adaptado do Schmitz

**Visual**: Fixo no topo. Fundo transparente inicialmente, `rgba(10,10,10,0.95)` ao rolar. Sem gradiente claro.

```tsx
// Dados a preencher:
const WHATSAPP = 'wa.me/5548XXXXXXXX'
const INSTAGRAM = 'https://www.instagram.com/jurere1540'

// Logo: "MANSÃO" em Cormorant weight 300 + "1540" em Cormorant italic gold
// Nav links: #mansao | #galeria | #amenidades | #localizacao | #contato
// CTA: botão outline gold — texto "CHAME NO PRIVADO"
// Ícone Instagram: SVG inline (lucide não exporta)
// Mobile: menu hambúrguer, overlay escuro ao abrir
```

**Regras do header**:
- Sem preço visível
- Sem número de telefone visível (apenas WhatsApp via botão)
- Logo centralizado em mobile, esquerda em desktop

---

### 2. `Hero.tsx` — Novo (não copiar do Schmitz)

**Visual**: Full viewport. Foto ou vídeo de fachada. Overlay escuro gradiente. Título editorial centralizado.

```tsx
// Estrutura:
// - Vídeo/foto fundo: public/videos/fachada-hero.mp4 ou public/images/fachada.jpg
// - Overlay: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)
// - Conteúdo central:
//     Label: "JURERÊ INTERNACIONAL · FLORIANÓPOLIS · SC" (Raleway 600, tracking 0.3em)
//     Linha dourada: <div class="rule-gold" style="margin: 20px auto" />
//     Título: "Uma obra" (Cormorant 300, 80-96px, branco)
//              "à parte." (Cormorant italic, gold, mesmo tamanho)
//     Subtítulo: "800m² de arquitetura neoclássica" (Raleway 500, 14px, cream 70%)
//     Espaço
//     Botão: "CHAME NO PRIVADO" (btn-cta-filled)
//
// NÃO usar: "Descubra o Luxo em Jurere", "Agendar Visita"
// NÃO usar: CTA com exclamação
// NÃO usar: contador de disponibilidade ou urgência

// Indicador de scroll: seta chevron pulsante, dourado, bottom center
```

---

### 3. `Galeria.tsx` — Copiar lógica do Schmitz, trocar dados

**Visual**: Carrossel 3D perspective sobre fundo `--ink`. Sem cards brancos ao redor.

```tsx
type MediaItem = {
  id: number;
  label: string;
  tag: 'FOTO' | 'VÍDEO';
  src: string;
  poster: string;
};

// Mínimo 15 itens — sugestão de labels:
// 'Fachada Principal', 'Vista Aérea', 'Piscina', 'Área Gourmet',
// 'Sala de Estar', 'Sala de Jantar', 'Suite Master', 'Suite 2',
// 'Banheiro Master', 'Cozinha', 'Home Theater', 'Jardim',
// 'Escadaria', 'Torre', 'Varanda'

// Paths: './images/galeria-01.jpg' etc.
// Estilo dos botões prev/next: outline gold, sem fundo sólido claro
// Dots/indicadores: gold ativo, gray-dark inativo
```

---

### 4. `Especificacoes.tsx` — Novo

**Visual**: Seção sobre `--ink-soft`. Grid de números + labels. Sem cards volumosos — layout editorial flat com divisórias douradas.

```tsx
// Dados do imóvel:
const specs = [
  { value: '9',     label: 'Quartos' },
  { value: '8',     label: 'Suítes' },
  { value: '800m²', label: 'Área Construída' },
  { value: '300m',  label: 'Da Praia' },
  // Adicionar: vagas de garagem, área do terreno
];

// Layout:
// - Número: Cormorant Garamond 72px, gold, weight 300
// - Label: Raleway 600, 10px, tracking 0.28em, uppercase, gray
// - Divisória vertical: 1px solid rgba(212,188,128,0.15) entre items
// - Grid: 4 colunas desktop, 2 colunas mobile
//
// Header da seção:
// - Label: "03 — ESPECIFICAÇÕES"
// - Título: "Uma obra" / "à parte." (padrão editorial)
// - Descrição: "Arquitetura neoclássica com torre circular, colunas, arcos e
//   escadaria helicoidal. O padrão mais alto da locação de temporada em
//   Jurerê Internacional." (Raleway 500, 15px, cream 70%)
```

---

### 5. `Amenidades.tsx` — Novo

**Visual**: Grid de cards glass sobre fundo `--ink`. Hover revela borda gold mais intensa.

```tsx
const amenidades = [
  { icon: 'Waves',       titulo: 'Piscina Azul Cobalto',   desc: 'Vista do alto, com borda infinita e deck exclusivo.' },
  { icon: 'Thermometer', titulo: 'Sauna & Spa Privativo',  desc: 'Área de bem-estar completa para uso exclusivo.' },
  { icon: 'ChefHat',     titulo: 'Cozinha Gourmet',        desc: 'Equipamentos de alto padrão e área de preparo profissional.' },
  { icon: 'Film',        titulo: 'Home Theater',           desc: 'Cinema privativo com sistema de som imersivo.' },
  { icon: 'Wifi',        titulo: 'Smart Home',             desc: 'Automação completa de iluminação, climatização e som.' },
  { icon: 'Car',         titulo: 'Garagem Coberta',        desc: 'Vagas para múltiplos veículos com acesso privativo.' },
  { icon: 'TreePalm',    titulo: 'Jardim com Palmeiras',   desc: 'Paisagismo tropical com palmeiras imperiais.' },
  { icon: 'Wine',        titulo: 'Área de Entretenimento', desc: 'Espaço gourmet com churrasqueira e adega.' },
];

// Ícones: lucide-react (exceto Instagram)
// Card: glass-card, padding 28px, gap 16px
// Ícone: 24px, color: gold
// Título: Raleway 600, 14px, white
// Desc: Raleway 500, 13px, cream 60%
// NÃO usar emojis como ícones
```

---

### 6. `Experiencia.tsx` — Novo (substitui Testimonios com stars)

**Visual**: Seção editorial, sem cards de review com estrelas. Tom de curadoria.

```tsx
// Esta seção NÃO usa estrelas (⭐) — viola identidade da marca
// Em vez disso: dois blocos editoriais
//
// Bloco 1 — "A Experiência"
// Texto em itálico, Cormorant 28px:
// "Não é para todo mundo. E está tudo bem assim."
// Subtext: Raleway 500, 14px, cream 60%: "A Mansão 1540 não recebe hóspedes.
// Recebe pessoas que sabem o que querem — e que encontraram exatamente isso."
//
// Bloco 2 — Cards de serviços disponíveis (upsell discreto):
const servicos = [
  { titulo: 'Chef Privativo',      desc: 'Cardápio personalizado, disponível para todas as refeições.' },
  { titulo: 'Concierge 24h',       desc: 'Suporte exclusivo durante toda a estadia.' },
  { titulo: 'Transfer Premium',    desc: 'Motorista e veículo disponíveis mediante agendamento.' },
  { titulo: 'Passeios Privados',   desc: 'Curadoria de experiências náuticas e gastronômicas em Florianópolis.' },
];
// Apresentação: linha horizontal com divisória gold, sem card box ao redor
```

---

### 7. `Localizacao.tsx` — Copiar do Schmitz, trocar coords e estilo

**Coords**: -27.444444, -48.499167 (Jurerê Internacional — confirmar coordenada exata)

```tsx
// Atualizar:
// - Título: "Jurerê Internacional" / "O endereço certo."
// - Subtítulo: "300 metros da praia. O endereço de maior prestígio de Florianópolis."
// - Botões: outline gold (NÃO verde ou azul)
// - Google Maps embed: tema escuro se possível
// - Proximidades: Praia de Jurerê · Restaurantes à beira-mar · Aeroporto 30min
```

---

### 8. `FAQ.tsx` — Novo (regras críticas de conteúdo)

**ATENÇÃO**: Nunca expor preço publicamente. O FAQ deve qualificar o lead, não fechar a venda.

```tsx
const faqs = [
  {
    q: 'Como funciona a reserva?',
    a: 'As reservas são feitas exclusivamente por contato direto. Chame no privado para verificar disponibilidade e receber todas as informações.',
  },
  {
    q: 'Qual o período mínimo de locação?',
    a: 'O período mínimo varia conforme a época do ano. Entre em contato para verificar disponibilidade para sua data.',
  },
  {
    q: 'Há serviços inclusos na locação?',
    a: 'A mansão inclui limpeza regular durante a estadia e suporte técnico. Serviços adicionais — chef privativo, concierge, transfer — estão disponíveis mediante solicitação.',
  },
  {
    q: 'Pets são aceitos?',
    a: 'Cada solicitação é avaliada individualmente. Entre em contato para verificar as condições.',
  },
  {
    q: 'Como é o processo de check-in?',
    a: 'Check-in personalizado com apresentação completa do imóvel e entrega das instruções de uso. Horários conforme combinado no momento da reserva.',
  },
  {
    q: 'A mansão está disponível para eventos?',
    a: 'Sim, mediante análise e aprovação. Eventos corporativos, comemorações privadas e confraternizações são avaliados caso a caso.',
  },
  // NÃO incluir: "Qual é o valor mensal?", "Qual o preço da diária?"
  // NÃO incluir: "Tem seguro de viagem?" — foge do posicionamento
];

// Visual: accordion com borda gold ao expandir. Fundo --ink-mid ao hover.
// Chevron dourado. Texto Raleway 500.
```

---

### 9. `Contato.tsx` — Adaptado do Schmitz

**Visual**: Seção escura, formulário glass, sem fundo claro.

```tsx
// Campos:
// Nome (obrigatório)
// Email (obrigatório)
// Telefone (obrigatório)
// Período desejado (text, ex: "10 a 20 de janeiro")
// Mensagem (textarea)
//
// Envio: montar URL wa.me/ com mensagem pré-formatada
// NÃO usar campo "Data desejada" com input date (parece booking barato)
// NÃO usar label "Agendar Visita"
// CTA do formulário: "CHAME NO PRIVADO" — sempre esse texto
//
// Inputs: fundo rgba(255,255,255,0.04), borda gold 30% opacidade
// Focus: borda gold 60% opacidade, sem box-shadow colorido
//
// Contato direto abaixo do form:
// "Prefere chamar direto?" + ícone WhatsApp + link wa.me/
```

---

### 10. `Footer.tsx` — Adaptado do Schmitz

```tsx
// Layout: três colunas desktop, empilhado mobile
//
// Col 1: Logo "MANSÃO 1540" + "Jurerê Internacional · Florianópolis · SC"
// Col 2: Links de navegação (Raleway 500, sem bullets)
// Col 3: "Chame no privado" + link wa.me/ + Instagram
//
// Base: fundo --ink-soft, borda superior 1px gold 15% opacidade
// Copyright: "© {ano} Mansão 1540. Todos os direitos reservados."
// NÃO usar Facebook (fora do posicionamento da marca)
```

---

### 11. `WhatsAppFloat.tsx` — Copiar do Schmitz, trocar número

```tsx
// Número: wa.me/5548XXXXXXXX
// Posição: fixed bottom-6 right-6, z-50
// Visual: círculo verde #25D366, ícone WhatsApp SVG branco
// NÃO adicionar label de texto ao botão flutuante
```

---

## `index.html` — SEO E META TAGS

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Mansão 1540 — Locação de temporada de ultra luxo em Jurerê Internacional, Florianópolis. 9 quartos, 8 suítes, 800m², 300m da praia." />
    <title>Mansão 1540 — Jurerê Internacional · Ultra Luxury Vacation Rental</title>

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Mansão 1540 — Jurerê Internacional" />
    <meta property="og:description" content="Uma obra à parte. 800m² de arquitetura neoclássica em Jurerê Internacional. Locação por temporada exclusiva." />
    <meta property="og:image" content="https://pedrogschmitz-dotcom.github.io/domus-jurere/images/og-cover.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Mansão 1540" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mansão 1540 — Jurerê Internacional" />
    <meta name="twitter:description" content="Ultra luxury vacation rental. Chame no privado." />
    <meta name="twitter:image" content="https://pedrogschmitz-dotcom.github.io/domus-jurere/images/og-cover.jpg" />

    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Mansão 1540",
      "description": "Ultra luxury vacation rental em Jurerê Internacional, Florianópolis",
      "url": "https://pedrogschmitz-dotcom.github.io/domus-jurere/",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Florianópolis",
        "addressRegion": "SC",
        "addressCountry": "BR"
      },
      "sameAs": ["https://www.instagram.com/jurere1540"]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="/domus-jurere/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## `App.tsx` — ORDEM DAS SEÇÕES

```tsx
import Header from './components/Header'
import Hero from './components/Hero'
import Especificacoes from './components/Especificacoes'
import Galeria from './components/Galeria'
import Amenidades from './components/Amenidades'
import Experiencia from './components/Experiencia'
import Localizacao from './components/Localizacao'
import FAQ from './components/FAQ'
import Contato from './components/Contato'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div style={{ background: 'var(--ink)' }}>
      <Header />
      <main>
        <Hero />
        <Especificacoes />    {/* Âncora: #mansao */}
        <Galeria />           {/* Âncora: #galeria */}
        <Amenidades />        {/* Âncora: #amenidades */}
        <Experiencia />
        <Localizacao />       {/* Âncora: #localizacao */}
        <FAQ />
        <Contato />           {/* Âncora: #contato */}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
```

---

## ESTRUTURA DE PASTAS

```
domus-jurere/
├── .github/workflows/deploy.yml      ← Copiar do Schmitz
├── public/
│   ├── images/
│   │   ├── og-cover.jpg              ← 1200x630 para OG/WhatsApp preview
│   │   ├── fachada.jpg               ← Hero fallback
│   │   ├── galeria-01.jpg            ← a galeria-15.jpg (mínimo)
│   │   └── ...
│   ├── videos/
│   │   └── fachada-hero.mp4          ← Hero background (opcional, <50MB)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Especificacoes.tsx
│   │   ├── Galeria.tsx               ← Lógica do carrossel copiada do Schmitz
│   │   ├── Amenidades.tsx
│   │   ├── Experiencia.tsx
│   │   ├── Localizacao.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contato.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── App.tsx
│   ├── index.css                     ← Sistema CSS deste documento
│   └── main.tsx                      ← Copiar do Schmitz
├── index.html                        ← Seção acima
├── vite.config.ts                    ← Copiar do Schmitz (base: '/domus-jurere/')
├── package.json
├── tsconfig.json                     ← Copiar do Schmitz
├── tsconfig.app.json                 ← Copiar do Schmitz
├── tsconfig.node.json                ← Copiar do Schmitz
└── eslint.config.js                  ← Copiar do Schmitz
```

---

## REGRAS ABSOLUTAS — O QUE NUNCA FAZER

```
❌  Fundo branco ou bege em qualquer seção
❌  Shadow skeuomórfica (inset, emboss, rgba branco dentro de sombra)
❌  Gradiente de background claro (linear-gradient com #fdfaf4, #f5ecda)
❌  Qualquer emoji (incluindo ⭐ em avaliações)
❌  Preço exposto — nem estimativa
❌  Número de telefone visível na arte/layout (apenas via botão clicável)
❌  CTA "Agendar Visita", "Reservar Agora", "Confira"
❌  Exclamação em qualquer texto
❌  "Aproveite", "Incrível", "Não perca", urgência artificial
❌  Fonte Montserrat (usar Raleway)
❌  Facebook (usar apenas Instagram + WhatsApp)
❌  tailwind.config.ts (quebra com @tailwindcss/vite)
❌  Estrelas de avaliação (fora do posicionamento)
❌  Card com fundo claro sobre seção escura
```

## O QUE SEMPRE FAZER

```
✓  Raleway weight mínimo 500 em todo corpo de texto
✓  Cormorant Garamond em itálico para termos em destaque (sempre gold)
✓  Overlay escuro suficiente para legibilidade do texto sobre foto
✓  Espaço negativo generoso — menos é mais
✓  CTA sempre: "CHAME NO PRIVADO" (uppercase, tracking 0.22em)
✓  Seções alternadas: --ink e --ink-soft
✓  Divisória: <div class="divider-full"> entre seções maiores
✓  Labels de seção: "01 — A MANSÃO", "02 — GALERIA", etc.
✓  Todos os elementos de UI com border-radius máximo de 4px (preferencialmente 2px)
✓  Borda gold sempre com opacidade: rgba(212,188,128,0.15) a 0.30
```

---

## CHECKLIST ANTES DE `npm run build`

- [ ] Todas as fontes carregando do Google Fonts (Cormorant + Raleway)
- [ ] Fundo do `body` é `#0A0A0A` — não branco
- [ ] Nenhuma shadow com `rgba(255,255,255,...)` interna (skeuomorphism)
- [ ] Hero com overlay escuro funcional
- [ ] Carrossel: botões prev/next com estilo gold, não azul/branco
- [ ] FAQ sem perguntas de preço
- [ ] Todos os CTAs dizem "CHAME NO PRIVADO"
- [ ] Nenhum emoji no código
- [ ] `vite.config.ts` com `base: '/domus-jurere/'`
- [ ] `og:image` apontando para path correto no GitHub Pages
- [ ] WhatsApp number atualizado em Header, Contato, Footer, WhatsAppFloat
- [ ] Instagram link atualizado
- [ ] Build sem erros TypeScript: `npm run build`

---

*Prompt gerado em 28 de abril de 2026 · Mansão 1540 · Jurerê Internacional*  
*Design school: Dark Editorial Luxury — baseado no Brandbook 2025*

As fotos anexadas são da mansão real. Use-as para:
- Entender o estilo arquitetônico neoclássico
- Escrever copy preciso (torre circular, colunas, escadaria)
- Identificar qual foto usar como hero (fachada) e OG image
- As fotos seguem esta ordem: [fachada / aérea / interior / piscina / detalhe]

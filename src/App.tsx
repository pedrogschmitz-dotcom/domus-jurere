import Amenidades from "./components/Amenidades";
import CitacaoEditorial from "./components/CitacaoEditorial";
import Contato from "./components/Contato";
import CustomCursor from "./components/CustomCursor";
import Especificacoes from "./components/Especificacoes";
import Experiencia from "./components/Experiencia";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Galeria from "./components/Galeria";
import Quartos from "./components/Quartos";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Localizacao from "./components/Localizacao";
import StickyBarCTA from "./components/StickyBarCTA";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { LanguageProvider } from "./contexts/LanguageContext";

function GoldDivider() {
  return <div className="divider-full" />;
}

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ background: "var(--ink)" }}>
        <CustomCursor />
        <Header />
        <main id="conteudo-principal" tabIndex={-1}>
          <Hero />
          <Especificacoes />
          <GoldDivider />
          <CitacaoEditorial />
          <GoldDivider />
          <Galeria />
          <GoldDivider />
          <Quartos />
          <GoldDivider />
          <Amenidades />
          <GoldDivider />
          <Experiencia />
          <GoldDivider />
          <Localizacao />
          <GoldDivider />
          <FAQ />
          <GoldDivider />
          <Contato />
        </main>
        <Footer />
        <WhatsAppFloat />
        <StickyBarCTA />
      </div>
    </LanguageProvider>
  );
}


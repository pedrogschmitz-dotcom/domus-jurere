import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_BASE = "https://wa.me/5548984680088";

type FormState = {
  nome: string;
  email: string;
  telefone: string;
  período: string;
  mensagem: string;
};

const initialState: FormState = {
  nome: "",
  email: "",
  telefone: "",
  período: "",
  mensagem: "",
};

export default function Contato() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(initialState);
  const revealRef = useScrollReveal<HTMLElement>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = [
      t.contato.formIntro,
      `${t.contato.formNome}: ${form.nome}`,
      `${t.contato.formEmail}: ${form.email}`,
      `${t.contato.formTelefone}: ${form.telefone}`,
      `${t.contato.formPeriodo}: ${form.período}`,
      `${t.contato.formMensagem}: ${form.mensagem || t.contato.formMensagemDefault}`,
    ].join("\n");

    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-[var(--ink)] px-6 py-20 md:px-8 md:py-20" id="contato" ref={revealRef}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <p className="label-track reveal">{t.contato.label}</p>
          <h2 className="mt-6 text-3xl font-light leading-[0.95] text-[var(--white)] sm:text-5xl lg:text-7xl reveal reveal-delay-1">
            <span className="font-display">{t.contato.h2_1}</span>
            <span className="gold-italic block">{t.contato.h2_2}</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] font-medium leading-relaxed text-[rgba(246,241,232,0.7)] reveal reveal-delay-2">
            {t.contato.desc}
          </p>
        </div>

        <form onSubmit={onSubmit} className="glass-card space-y-4 p-7 reveal reveal-delay-2">
          <input required placeholder={t.contato.placeholderNome} value={form.nome} onChange={(e) => setForm((v) => ({ ...v, nome: e.target.value }))} className="form-input reveal reveal-delay-1" />
          <input required type="email" placeholder={t.contato.placeholderEmail} value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} className="form-input reveal reveal-delay-1" />
          <input required placeholder={t.contato.placeholderTelefone} value={form.telefone} onChange={(e) => setForm((v) => ({ ...v, telefone: e.target.value }))} className="form-input reveal reveal-delay-2" />
          <input required placeholder={t.contato.placeholderPeriodo} value={form.período} onChange={(e) => setForm((v) => ({ ...v, período: e.target.value }))} className="form-input reveal reveal-delay-2" />
          <textarea placeholder={t.contato.placeholderMensagem} value={form.mensagem} onChange={(e) => setForm((v) => ({ ...v, mensagem: e.target.value }))} className="form-input min-h-28 resize-y reveal reveal-delay-3" />

          <button type="submit" className="btn-cta-primary w-full justify-center reveal reveal-delay-3" data-hover>
            {t.contato.ctaSubmit}
          </button>

          <p className="pt-2 text-xs font-semibold tracking-[0.16em] text-[var(--cream-dk)] reveal reveal-delay-4">
            {t.contato.ctaDireto} <a className="text-[var(--gold)]" href={WHATSAPP_BASE} target="_blank" rel="noreferrer" data-hover>WHATSAPP</a>
          </p>
        </form>
      </div>
    </section>
  );
}

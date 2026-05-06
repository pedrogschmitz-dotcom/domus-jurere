import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ContactFormErrors,
  ContactFormState,
  initialContactFormState,
  validateContactForm,
} from "@/lib/contactFormValidation";

const WHATSAPP_BASE = "https://wa.me/5548984680088";

export default function Contato() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactFormState>(initialContactFormState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revealRef = useScrollReveal<HTMLElement>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const text = [
      t.contato.formIntro,
      `${t.contato.formNome}: ${form.nome}`,
      `${t.contato.formEmail}: ${form.email}`,
      `${t.contato.formTelefone}: ${form.telefone}`,
      `${t.contato.formPeriodo}: ${form.periodo}`,
      `${t.contato.formMensagem}: ${form.mensagem || t.contato.formMensagemDefault}`,
    ].join("\n");

    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");

    setForm(initialContactFormState);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof ContactFormState) => (value: string) => {
    setForm((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const isFormValid = Object.keys(validateContactForm(form)).length === 0;

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
          <div>
            <label htmlFor="nome" className="text-xs text-[rgba(246,241,232,0.5)] mb-1 block">
              {t.contato.placeholderNome} <span className="text-red-400">*</span>
            </label>
            <input
              id="nome"
              type="text"
              required
              aria-invalid={Boolean(errors.nome)}
              aria-describedby={errors.nome ? "nome-erro" : undefined}
              placeholder={t.contato.placeholderNome}
              value={form.nome}
              onChange={(e) => handleChange("nome")(e.target.value)}
              className={`form-input reveal reveal-delay-1 ${errors.nome ? "border-red-500 bg-red-500/5" : ""}`}
            />
            {errors.nome && <p id="nome-erro" className="text-xs text-red-400 mt-1">{errors.nome}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-xs text-[rgba(246,241,232,0.5)] mb-1 block">
              {t.contato.placeholderEmail} <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-erro" : undefined}
              placeholder={t.contato.placeholderEmail}
              value={form.email}
              onChange={(e) => handleChange("email")(e.target.value)}
              className={`form-input reveal reveal-delay-1 ${errors.email ? "border-red-500 bg-red-500/5" : ""}`}
            />
            {errors.email && <p id="email-erro" className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="telefone" className="text-xs text-[rgba(246,241,232,0.5)] mb-1 block">
              {t.contato.placeholderTelefone} <span className="text-red-400">*</span>
            </label>
            <input
              id="telefone"
              type="tel"
              required
              aria-invalid={Boolean(errors.telefone)}
              aria-describedby={errors.telefone ? "telefone-erro" : undefined}
              placeholder={t.contato.placeholderTelefone}
              value={form.telefone}
              onChange={(e) => handleChange("telefone")(e.target.value)}
              className={`form-input reveal reveal-delay-2 ${errors.telefone ? "border-red-500 bg-red-500/5" : ""}`}
            />
            {errors.telefone && <p id="telefone-erro" className="text-xs text-red-400 mt-1">{errors.telefone}</p>}
          </div>

          <div>
            <label htmlFor="periodo" className="text-xs text-[rgba(246,241,232,0.5)] mb-1 block">
              {t.contato.placeholderPeriodo} <span className="text-red-400">*</span>
            </label>
            <input
              id="periodo"
              type="text"
              required
              aria-invalid={Boolean(errors.periodo)}
              aria-describedby={errors.periodo ? "periodo-erro" : undefined}
              placeholder={t.contato.placeholderPeriodo}
              value={form.periodo}
              onChange={(e) => handleChange("periodo")(e.target.value)}
              className={`form-input reveal reveal-delay-2 ${errors.periodo ? "border-red-500 bg-red-500/5" : ""}`}
            />
            {errors.periodo && <p id="periodo-erro" className="text-xs text-red-400 mt-1">{errors.periodo}</p>}
          </div>

          <div>
            <label htmlFor="mensagem" className="text-xs text-[rgba(246,241,232,0.5)] mb-1 block">
              {t.contato.placeholderMensagem}
            </label>
            <textarea
              id="mensagem"
              placeholder={t.contato.placeholderMensagem}
              value={form.mensagem}
              onChange={(e) => handleChange("mensagem")(e.target.value)}
              className="form-input min-h-28 resize-y reveal reveal-delay-3"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="btn-cta-primary w-full justify-center reveal reveal-delay-3 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            data-hover={isFormValid ? true : undefined}
          >
            {isSubmitting ? "Enviando..." : t.contato.ctaSubmit}
          </button>

          <p className="pt-2 text-xs font-semibold tracking-[0.16em] text-[var(--cream-dk)] reveal reveal-delay-4">
            {t.contato.ctaDireto} <a className="text-[var(--gold)]" href={WHATSAPP_BASE} target="_blank" rel="noreferrer" data-hover>WHATSAPP</a>
          </p>
        </form>
      </div>
    </section>
  );
}

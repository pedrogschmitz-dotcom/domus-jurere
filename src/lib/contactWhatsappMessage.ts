import { ContactFormState } from "@/lib/contactFormValidation";

type ContactTranslations = {
  formIntro: string;
  formNome: string;
  formEmail: string;
  formTelefone: string;
  formPeriodo: string;
  formMensagem: string;
  formMensagemDefault: string;
};

export function buildContactWhatsappMessage(form: ContactFormState, t: ContactTranslations): string {
  return [
    t.formIntro,
    `${t.formNome}: ${form.nome}`,
    `${t.formEmail}: ${form.email}`,
    `${t.formTelefone}: ${form.telefone}`,
    `${t.formPeriodo}: ${form.periodo}`,
    `${t.formMensagem}: ${form.mensagem || t.formMensagemDefault}`,
  ].join("\n");
}
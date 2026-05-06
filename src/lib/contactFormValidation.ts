export type ContactFormState = {
  nome: string;
  email: string;
  telefone: string;
  periodo: string;
  mensagem: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

export const initialContactFormState: ContactFormState = {
  nome: "",
  email: "",
  telefone: "",
  periodo: "",
  mensagem: "",
};

export const validateContactForm = (form: ContactFormState): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!form.nome.trim() || form.nome.trim().length < 3) {
    errors.nome = "Nome deve ter pelo menos 3 caracteres";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim() || !emailRegex.test(form.email)) {
    errors.email = "Email invalido";
  }

  if (!form.telefone.trim() || form.telefone.replace(/\D/g, "").length < 10) {
    errors.telefone = "Telefone deve ter pelo menos 10 digitos";
  }

  if (!form.periodo.trim() || form.periodo.trim().length < 3) {
    errors.periodo = "Periodo desejado e obrigatorio";
  }

  return errors;
};
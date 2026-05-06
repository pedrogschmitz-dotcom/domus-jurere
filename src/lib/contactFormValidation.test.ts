import { describe, expect, it } from "vitest";
import { validateContactForm } from "./contactFormValidation";

describe("validateContactForm", () => {
  it("retorna erros para campos obrigatorios invalidos", () => {
    const errors = validateContactForm({
      nome: "A",
      email: "invalido",
      telefone: "123",
      periodo: "",
      mensagem: "",
    });

    expect(errors.nome).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.telefone).toBeTruthy();
    expect(errors.periodo).toBeTruthy();
  });

  it("nao retorna erros para formulario valido", () => {
    const errors = validateContactForm({
      nome: "Maria Silva",
      email: "maria@exemplo.com",
      telefone: "48999998888",
      periodo: "Junho 2026",
      mensagem: "Gostaria de mais informacoes",
    });

    expect(Object.keys(errors)).toHaveLength(0);
  });
});
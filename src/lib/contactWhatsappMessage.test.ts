import { describe, expect, it } from "vitest";
import { buildContactWhatsappMessage } from "./contactWhatsappMessage";

const t = {
  formIntro: "Novo contato",
  formNome: "Nome",
  formEmail: "Email",
  formTelefone: "Telefone",
  formPeriodo: "Periodo",
  formMensagem: "Mensagem",
  formMensagemDefault: "Sem mensagem",
};

describe("buildContactWhatsappMessage", () => {
  it("monta mensagem com todos os campos", () => {
    const message = buildContactWhatsappMessage(
      {
        nome: "Ana",
        email: "ana@domus.com",
        telefone: "48999990000",
        periodo: "Julho",
        mensagem: "Tenho interesse",
      },
      t,
    );

    expect(message).toContain("Nome: Ana");
    expect(message).toContain("Email: ana@domus.com");
    expect(message).toContain("Mensagem: Tenho interesse");
  });

  it("usa mensagem default quando campo mensagem estiver vazio", () => {
    const message = buildContactWhatsappMessage(
      {
        nome: "Joao",
        email: "joao@domus.com",
        telefone: "48988887777",
        periodo: "Agosto",
        mensagem: "",
      },
      t,
    );

    expect(message).toContain("Mensagem: Sem mensagem");
  });
});
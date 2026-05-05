export type Lang = "pt" | "es" | "en";

export interface Translations {
  nav: {
    mansion: string;
    galeria: string;
    quartos: string;
    amenidades: string;
    localizacao: string;
    contato: string;
    ctaPrivado: string;
    ctaAgendarVisita: string;
  };
  hero: {
    subtitle: string;
    cta: string;
  };
  especificacoes: {
    label: string;
    h2_1: string;
    h2_2: string;
    desc: string;
    items: { label: string }[];
  };
  suitesAmbientes: {
    label: string;
    h2_1: string;
    h2_2: string;
    desc: string;
    suites: { tag: string; name: string; description: string }[];
  };
  galeria: {
    label: string;
    h2_1: string;
    h2_2: string;
    mediaLabels: string[];
  };
  quartos: {
    label: string;
    h2: string;
    colecao: string;
    destaques: string;
    reservar: string;
    ctaDisponibilidade: string;
    ariaFechar: string;
    ariaAnterior: string;
    ariaProxima: string;
    ariaExpandir: string;
    suites: Array<{
      nome: string;
      destaque?: string;
      descricao: string;
      amenidades: string[];
    }>;
  };
  amenidades: {
    label: string;
    h2_1: string;
    h2_2: string;
    items: { titulo: string; desc: string }[];
  };
  citacao: {
    text1: string;
    em: string;
    text2: string;
    rodape: string;
  };
  experiencia: {
    label: string;
    citacao: string;
    desc: string;
    servicos: { titulo: string; desc: string }[];
  };
  localizacao: {
    label: string;
    h2_1: string;
    h2_2: string;
    desc: string;
    items: string[];
    cta: string;
    mapTitle: string;
  };
  faq: {
    label: string;
    h2_1: string;
    h2_2: string;
    items: { q: string; a: string }[];
  };
  contato: {
    label: string;
    h2_1: string;
    h2_2: string;
    desc: string;
    placeholderNome: string;
    placeholderEmail: string;
    placeholderTelefone: string;
    placeholderPeriodo: string;
    placeholderMensagem: string;
    ctaSubmit: string;
    ctaDireto: string;
    ctaDiretoLink: string;
    formIntro: string;
    formNome: string;
    formEmail: string;
    formTelefone: string;
    formPeriodo: string;
    formMensagem: string;
    formMensagemDefault: string;
  };
  footer: {
    nav: string;
    contato: string;
    ctaPrivado: string;
    copyright: string;
    subtext: string;
  };
  stickybar: {
    subtitle: string;
    cta: string;
  };
  howItWorks: {
    label: string;
    h2_1: string;
    h2_2: string;
    desc: string;
    steps: { title: string; description: string }[];
  };
  identification: {
    label: string;
    h2: string;
    items: string[];
  };
  principles: {
    label: string;
    h2: string;
    items: { title: string; description: string }[];
  };
  procedures: {
    items: { title: string; description: string }[];
  };
  services: {
    label: string;
    h2: string;
    items: { title: string; description: string }[];
  };
  statsStrip: {
    stats: { value: string; unit: string; label: string }[];
  };
  team: {
    label: string;
    h2: string;
    members: { name: string; title: string; description: string }[];
  };
  testimonials: {
    label: string;
    h2: string;
    items: { text: string; author: string }[];
  };
  ctaSection: {
    label: string;
    h2: string;
    description: string;
    cta: string;
  };
}

export const translations: Record<Lang, Translations> = {
  pt: {
    nav: {
      mansion: "A MANSÃO",
      galeria: "GALERIA",
      quartos: "QUARTOS",
      amenidades: "AMENIDADES",
      localizacao: "LOCALIZAÇÃO",
      contato: "CONTATO",
      ctaPrivado: "CHAME NO PRIVADO",
      ctaAgendarVisita: "AGENDAR VISITA",
    },
    hero: {
      subtitle: "JURERÊ INTERNACIONAL · FLORIANÓPOLIS · SC",
      cta: "CHAME NO PRIVADO",
    },
    especificacoes: {
      label: "ESPECIFICAÇÕES",
      h2_1: "Uma obra",
      h2_2: "à parte.",
      desc: "Arquitetura neoclássica com torre circular, colunas, arcos e escadaria helicoidal. O padrão mais alto da locação de temporada em Jurerê Internacional.",
      items: [
        { label: "QUARTOS" },
        { label: "SUÍTES" },
        { label: "ÁREA CONSTRUÍDA" },
        { label: "DA PRAIA" },
        { label: "VAGAS COBERTAS" },
        { label: "ÁREA DE TERRENO" },
      ],
    },
    suitesAmbientes: {
      label: "SUÍTES & AMBIENTES",
      h2_1: "Cinco suítes,",
      h2_2: "uma experiência.",
      desc: "Cada ambiente foi concebido para uma vivência singular — do silêncio matinal à celebração noturna.",
      suites: [
        {
          tag: "MASTER SUITE",
          name: "Suite Principal",
          description:
            "Ambiente duplex com vista privilegiada para o canal de Jurerê, closet amplo, banheiro em mármore Calacatta e varanda privativa.",
        },
        {
          tag: "SUITE",
          name: "Suíte Jardim",
          description:
            "Acesso direto ao jardim coberto, banheira freestanding e atmosfera de spa privativo rodeada de jardim contemporâneo.",
        },
        {
          tag: "SUITE",
          name: "Suíte Piscina",
          description:
            "Vista frontal para a piscina infinity, varanda coberta com espreguiçadeiras exclusivas e iluminação cênica noturna.",
        },
        {
          tag: "SUITE",
          name: "Suíte Torre",
          description:
            "Localizada na torre central com pé-direito duplo, janelas do piso ao teto e vista panorâmica 270° de Jurerê Internacional.",
        },
        {
          tag: "ÁREA SOCIAL",
          name: "Espaço Gourmet",
          description:
            "Área de lazer integrada com piscina aquecida, cozinha de alto padrão, adega climatizada e terraço com forno a lenha.",
        },
      ],
    },
    galeria: {
      label: "GALERIA",
      h2_1: "Arquitetura",
      h2_2: "em perspectiva.",
      mediaLabels: [
        "Entrada da Mansão",
        "Piscina & Área Externa",
        "Cozinha Integrada",
        "Sala de Estar & Living",
        "Garagem Ampla",
      ],
    },
    quartos: {
      label: "AS SUITES",
      h2: "Oito suites, oito universos",
      colecao: "COLEÇÃO PRIVADA DE SUITES",
      destaques: "DESTAQUES",
      reservar: "RESERVAR ESTA SUITE",
      ctaDisponibilidade: "CHAME NO PRIVADO PARA DISPONIBILIDADE",
      ariaFechar: "Fechar",
      ariaAnterior: "Foto anterior",
      ariaProxima: "Próxima foto",
      ariaExpandir: "Abrir em tela cheia",
      suites: [
        {
          nome: "Suite Zeus",
          destaque: "Suite Master",
          descricao:
            "A suite principal da mansão. Cama king-size, varanda privativa, banheira de imersão e vista privilegiada para o jardim.",
          amenidades: ["Cama king-size", "Banheira de imersão", "Varanda privativa"],
        },
        {
          nome: "Suite Poseidon",
          descricao:
            "Paleta de azuis profundos e acabamentos nacarados. Uma experiência imersiva dentro da mansão.",
          amenidades: ["Paleta exclusiva", "Acabamentos finos", "Banheiro completo"],
        },
        {
          nome: "Suite Artemis",
          descricao:
            "Leveza e neutralidade. Cama casal, luz natural abundante e banheiro privativo completo.",
          amenidades: ["Cama casal", "Luz natural", "Conforto silencioso"],
        },
        {
          nome: "Suite Apollo",
          descricao:
            "Cama queen, tons neutros quentes e vista lateral para a piscina. Conforto e serenidade.",
          amenidades: ["Cama queen", "Vista lateral da piscina", "Climatização"],
        },
        {
          nome: "Suite Hera",
          descricao:
            "Elegância e sofisticação. Detalhes em dourado, mobiliário de alto padrão e iluminação cênica.",
          amenidades: ["Enxoval premium", "Iluminação cênica", "Banheiro privativo"],
        },
        {
          nome: "Suite Dionisio",
          descricao:
            "Cores terrosas, texturas ricas e uma atmosfera que convida ao descanso profundo.",
          amenidades: ["Texturas nobres", "Atmosfera intimista", "Banheiro privativo"],
        },
        {
          nome: "Suite Aphrodite",
          descricao:
            "Ambiente romântico com acabamentos refinados e banheiro spa com ducha de hidromassagem.",
          amenidades: ["Ambiente romântico", "Banheiro spa", "Ducha premium"],
        },
        {
          nome: "Suite Athena",
          descricao:
            "Design contemporâneo com toques clássicos. Ideal para hóspedes que buscam equilíbrio entre estilo e funcionalidade.",
          amenidades: ["Layout funcional", "Acabamento elegante", "Iluminação natural"],
        },
      ],
    },
    amenidades: {
      label: "AMENIDADES",
      h2_1: "Oito razões",
      h2_2: "para não sair.",
      items: [
        { titulo: "Piscina Azul Cobalto", desc: "Vista do alto, com borda elegante e deck exclusivo." },
        { titulo: "Cozinha Gourmet", desc: "Equipamentos de alto padrão e área de preparo profissional." },
        { titulo: "Home Theater", desc: "Cinema privativo com sistema de som imersivo." },
        { titulo: "Smart Home", desc: "Automação de iluminação, climatização e som." },
        { titulo: "Garagem Coberta", desc: "Vagas para múltiplos veículos com acesso privativo." },
        { titulo: "Jardim com Palmeiras", desc: "Paisagismo tropical com desenho neoclássico." },
        { titulo: "Área de Entretenimento", desc: "Espaço gourmet com curadoria para reuniões privadas." },
        { titulo: "Sauna e Spa", desc: "Área de bem-estar completa para uso exclusivo." },
      ],
    },
    citacao: {
      text1: "Não é uma casa de praia. ",
      em: "É um estado de espírito",
      text2: " à beira-mar.",
      rodape: "DOMUS.JURERE — JURERÊ INTERNACIONAL, FLORIANÓPOLIS",
    },
    experiencia: {
      label: "EXPERIÊNCIA",
      citacao: "Não é para todo mundo. E está tudo bem assim.",
      desc: "A DOMUS.JURERE não recebe hóspedes. Recebe pessoas que sabem o que querem e que encontraram exatamente isso.",
      servicos: [
        { titulo: "Chef Privativo", desc: "Cardápio personalizado, disponível para todas as refeições." },
        { titulo: "Concierge 24h", desc: "Suporte exclusivo durante toda a estadia." },
        { titulo: "Transfer Premium", desc: "Motorista e veículo disponíveis mediante agendamento." },
        {
          titulo: "Passeios Privados",
          desc: "Curadoria de experiências náuticas e gastronômicas em Florianópolis.",
        },
      ],
    },
    localizacao: {
      label: "LOCALIZAÇÃO",
      h2_1: "Jurerê Internacional",
      h2_2: "o endereço certo.",
      desc: "300 metros da praia. O endereço de maior prestígio de Florianópolis.",
      items: ["PRAIA DE JURERÊ", "RESTAURANTES À BEIRA-MAR", "AEROPORTO 30 MIN"],
      cta: "VER NO MAPA",
      mapTitle: "Mapa Jurerê Internacional",
    },
    faq: {
      label: "FAQ",
      h2_1: "Informações",
      h2_2: "essenciais.",
      items: [
        {
          q: "Como funciona a reserva?",
          a: "As reservas são feitas exclusivamente por contato direto. Chame no privado para verificar disponibilidade e receber todas as informações.",
        },
        {
          q: "Qual o período mínimo de locação?",
          a: "O período mínimo varia conforme a época do ano. Entre em contato para verificar disponibilidade para sua data.",
        },
        {
          q: "Há serviços inclusos na locação?",
          a: "A mansão inclui limpeza regular durante a estadia e suporte técnico. Serviços adicionais de chef privativo, concierge e transfer estão disponíveis mediante solicitação.",
        },
        {
          q: "Pets são aceitos?",
          a: "Cada solicitação é avaliada individualmente. Entre em contato para verificar as condições.",
        },
        {
          q: "Como é o processo de check-in?",
          a: "Check-in personalizado com apresentação completa do imóvel e entrega das instruções de uso. Horários conforme combinado no momento da reserva.",
        },
        {
          q: "A mansão está disponível para eventos?",
          a: "Sim, mediante análise e aprovação. Eventos corporativos, comemorações privadas e confraternizações são avaliados caso a caso.",
        },
      ],
    },
    contato: {
      label: "CONTATO",
      h2_1: "Converse em",
      h2_2: "sigilo.",
      desc: "Informe seu período e perfil de estadia. A equipe retorna com disponibilidade e condições de reserva por atendimento privado.",
      placeholderNome: "Nome",
      placeholderEmail: "Email",
      placeholderTelefone: "Telefone",
      placeholderPeriodo: "Período desejado",
      placeholderMensagem: "Mensagem",
      ctaSubmit: "CHAME NO PRIVADO",
      ctaDireto: "PREFERE CHAMAR DIRETO?",
      ctaDiretoLink: "WHATSAPP",
      formIntro: "Contato via site DOMUS.JURERE",
      formNome: "Nome",
      formEmail: "Email",
      formTelefone: "Telefone",
      formPeriodo: "Período desejado",
      formMensagem: "Mensagem",
      formMensagemDefault: "Não informada",
    },
    footer: {
      nav: "NAVEGAÇÃO",
      contato: "CONTATO PRIVADO",
      ctaPrivado: "CHAME NO PRIVADO",
      copyright: "© 2026 DOMUS.JURERE. Todos os direitos reservados.",
      subtext: "Jurerê Internacional · Florianópolis · SC",
    },
    stickybar: {
      subtitle: "Jurerê Internacional",
      cta: "AGENDAR VISITA",
    },
    howItWorks: {
      label: "Como funciona",
      h2_1: "Um atendimento",
      h2_2: "diferente do padrão",
      desc: "Consulta sem pressa, com escuta, explicação clara e plano construído para você. Cada passo é discutido, e você sai entendendo o que está acontecendo e o que vem a seguir.",
      steps: [
        { title: "Tempo de consulta", description: "Consulta longa, sem pressa. Espaço real para escutar a sua história." },
        { title: "Escuta clínica", description: "Anamnese cuidadosa para entender o contexto, não apenas o sintoma." },
        { title: "Investigação", description: "Exames e raciocínio clínico para chegar à raiz do que está acontecendo." },
        { title: "Plano individualizado", description: "Estratégia construída com você, com explicação clara de cada passo." },
      ],
    },
    identification: {
      label: "Talvez você esteja aqui porque",
      h2: "Se você se identifica com isso",
      items: [
        "Já passou por vários atendimentos e não resolveu",
        "Cansaço constante ou baixa energia",
        "Dificuldade para emagrecer",
        "Quer um acompanhamento mais próximo",
        "Quer melhorar a aparência com naturalidade",
      ],
    },
    principles: {
      label: "Princípios do atendimento",
      h2: "O que guia o nosso cuidado",
      items: [
        { title: "Tempo", description: "Consulta longa, com espaço para a sua história ser ouvida sem pressa." },
        { title: "Escuta", description: "Anamnese cuidadosa, atenção ao contexto e ao que muitas vezes passa despercebido." },
        { title: "Plano individualizado", description: "Estratégia construída para você, com explicação clara de cada passo e revisão contínua." },
      ],
    },
    procedures: {
      items: [
        { title: "Toxina botulínica", description: "Quem deseja suavizar marcas de expressão dinâmicas no rosto." },
        { title: "Preenchimento facial", description: "Quem busca recuperar volume ou contorno em áreas específicas do rosto." },
        { title: "Bioestimuladores", description: "Estratégia para estimular colágeno e melhorar qualidade de pele." },
        { title: "Microagulhagem", description: "Procedimento para estimular colágeno e melhorar textura da pele." },
        { title: "Luz pulsada", description: "Tratamento não-ablativo para manchas, rugas e rejuvenescimento." },
        { title: "Peeling químico", description: "Esfoliação controlada para melhorar textura e claridade da pele." },
        { title: "Laser CO2", description: "Tratamento ablatativo para rugas profundas e flacidez." },
        { title: "Radiofrequência", description: "Aquecimento profundo para firmeza e estimulação de colágeno." },
        { title: "Microcorrentes", description: "Estimulação elétrica leve para tonificar e lifting facial não-invasivo." },
      ],
    },
    services: {
      label: "Serviços",
      h2: "Serviços",
      items: [
        { title: "Saúde clínica", description: "Consulta médica ampla com investigação, raciocínio clínico e acompanhamento contínuo." },
        { title: "Emagrecimento e metabolismo", description: "Avaliação metabólica e plano individualizado para emagrecimento sustentável e mais energia." },
        { title: "Saúde da pele", description: "Cuidados com a pele com foco em naturalidade, qualidade de pele e contorno facial harmonioso." },
      ],
    },
    statsStrip: {
      stats: [
        { value: "1.540", unit: "m²", label: "Terreno Total" },
        { value: "900", unit: "m²", label: "Área Construída" },
        { value: "5", unit: "", label: "Suítes" },
        { value: "2", unit: "", label: "Piscinas" },
        { value: "4", unit: "", label: "Vagas Cobertas" },
        { value: "100%", unit: "", label: "Privacidade" },
      ],
    },
    team: {
      label: "Nossa Equipe",
      h2: "Nossa equipe médica",
      members: [
        {
          name: "Dr. Pedro Schmitz",
          title: "Médico",
          description: "Atendimento médico amplo, com foco em investigação e acompanhamento. Consulta extensa para entender o contexto antes de propor qualquer conduta.",
        },
        {
          name: "Dra. Júlia Schmitz",
          title: "Médica",
          description: "Atendimento com foco em emagrecimento, saúde metabólica e saúde hormonal feminina. Plano individualizado, construído a partir da escuta e da investigação.",
        },
      ],
    },
    testimonials: {
      label: "Experiência de pacientes",
      h2: "O que nossos pacientes relatam",
      items: [
        { text: "Atendimento humano e sem pressa. Saí entendendo meu caso e com plano claro.", author: "Paciente de São José" },
        { text: "Finalmente um acompanhamento que olha o todo, não só o sintoma isolado.", author: "Paciente de Kobrasol" },
        { text: "Equipe atenciosa, explicação objetiva e condutas com naturalidade.", author: "Paciente da Grande Florianópolis" },
      ],
    },
    ctaSection: {
      label: "Próximo passo",
      h2: "Se você quer um atendimento mais completo, o próximo passo é simples",
      description: "Mande uma mensagem e nossa equipe te ajuda a agendar a primeira consulta.",
      cta: "Agendar consulta no WhatsApp",
    },
  },

  // ─────────────────────────────── ESPAÑOL ────────────────────────────────
  es: {
    nav: {
      mansion: "LA MANSIÓN",
      galeria: "GALERÍA",
      quartos: "SUITES",
      amenidades: "AMENIDADES",
      localizacao: "UBICACIÓN",
      contato: "CONTACTO",
      ctaPrivado: "CONTÁCTENOS",
      ctaAgendarVisita: "AGENDAR VISITA",
    },
    hero: {
      subtitle: "JURERÊ INTERNACIONAL · FLORIANÓPOLIS · SC",
      cta: "CONTÁCTENOS EN PRIVADO",
    },
    especificacoes: {
      label: "ESPECIFICACIONES",
      h2_1: "Una obra",
      h2_2: "excepcional.",
      desc: "Arquitectura neoclásica con torre circular, columnas, arcos y escalera helicoidal. El estándar más alto de alquiler vacacional en Jurerê Internacional.",
      items: [
        { label: "HABITACIONES" },
        { label: "SUITES" },
        { label: "ÁREA CONSTRUIDA" },
        { label: "DE LA PLAYA" },
        { label: "PLAZAS CUBIERTAS" },
        { label: "ÁREA DEL TERRENO" },
      ],
    },
    suitesAmbientes: {
      label: "SUITES & AMBIENTES",
      h2_1: "Cinco suites,",
      h2_2: "una experiencia.",
      desc: "Cada espacio fue concebido para una vivencia singular — desde el silencio matutino hasta la celebración nocturna.",
      suites: [
        {
          tag: "MASTER SUITE",
          name: "Suite Principal",
          description:
            "Ambiente dúplex con vistas privilegiadas al canal de Jurerê, vestidor amplio, baño en mármol Calacatta y terraza privada.",
        },
        {
          tag: "SUITE",
          name: "Suite Jardín",
          description:
            "Acceso directo al jardín cubierto, bañera independiente y atmósfera de spa privado rodeado de jardín contemporáneo.",
        },
        {
          tag: "SUITE",
          name: "Suite Piscina",
          description:
            "Vista frontal a la piscina infinity, terraza cubierta con tumbonas exclusivas e iluminación escénica nocturna.",
        },
        {
          tag: "SUITE",
          name: "Suite Torre",
          description:
            "Ubicada en la torre central con doble altura, ventanales del suelo al techo y vista panorámica 270° de Jurerê Internacional.",
        },
        {
          tag: "ÁREA SOCIAL",
          name: "Espacio Gourmet",
          description:
            "Área de ocio integrada con piscina climatizada, cocina de alto nivel, bodega climatizada y terraza con horno de leña.",
        },
      ],
    },
    galeria: {
      label: "GALERÍA",
      h2_1: "Arquitectura",
      h2_2: "en perspectiva.",
      mediaLabels: [
        "Entrada de la Mansión",
        "Piscina & Área Exterior",
        "Cocina Integrada",
        "Salón & Living",
        "Garaje Amplio",
      ],
    },
    quartos: {
      label: "LAS SUITES",
      h2: "Ocho suites, ocho universos",
      colecao: "COLECCIÓN PRIVADA DE SUITES",
      destaques: "DESTACADOS",
      reservar: "RESERVAR ESTA SUITE",
      ctaDisponibilidade: "CONSÚLTENOS DISPONIBILIDAD",
      ariaFechar: "Cerrar",
      ariaAnterior: "Foto anterior",
      ariaProxima: "Foto siguiente",
      ariaExpandir: "Abrir en pantalla completa",
      suites: [
        {
          nome: "Suite Zeus",
          destaque: "Suite Master",
          descricao:
            "La suite principal de la mansión. Cama king-size, terraza privada, bañera de inmersión y vistas privilegiadas al jardín.",
          amenidades: ["Cama king-size", "Bañera de inmersión", "Terraza privada"],
        },
        {
          nome: "Suite Poseidon",
          descricao:
            "Paleta de azules profundos y acabados nacarados. Una experiencia inmersiva en el corazón de la mansión.",
          amenidades: ["Paleta exclusiva", "Acabados finos", "Baño completo"],
        },
        {
          nome: "Suite Artemis",
          descricao:
            "Ligereza y neutralidad. Cama doble, luz natural abundante y cuarto de baño privado completo.",
          amenidades: ["Cama doble", "Luz natural", "Confort silencioso"],
        },
        {
          nome: "Suite Apollo",
          descricao:
            "Cama queen, tonos neutros cálidos y vistas laterales a la piscina. Comodidad y serenidad.",
          amenidades: ["Cama queen", "Vistas a la piscina", "Climatización"],
        },
        {
          nome: "Suite Hera",
          descricao:
            "Elegancia y sofisticación. Detalles en dorado, mobiliario de alta gama e iluminación escénica.",
          amenidades: ["Ropa de cama premium", "Iluminación escénica", "Baño privado"],
        },
        {
          nome: "Suite Dionisio",
          descricao:
            "Tonos terrosos, texturas ricas y una atmósfera que invita al descanso más profundo.",
          amenidades: ["Texturas nobles", "Atmósfera íntima", "Baño privado"],
        },
        {
          nome: "Suite Aphrodite",
          descricao:
            "Ambiente romántico con acabados refinados y baño spa con ducha de hidromasaje.",
          amenidades: ["Ambiente romántico", "Baño spa", "Ducha premium"],
        },
        {
          nome: "Suite Athena",
          descricao:
            "Diseño contemporáneo con toques clásicos. Ideal para huéspedes que buscan equilibrio entre estilo y funcionalidad.",
          amenidades: ["Diseño funcional", "Acabado elegante", "Luz natural"],
        },
      ],
    },
    amenidades: {
      label: "AMENIDADES",
      h2_1: "Ocho razones",
      h2_2: "para no salir.",
      items: [
        { titulo: "Piscina Azul Cobalto", desc: "Vista panorámica con borde elegante y deck exclusivo." },
        { titulo: "Cocina Gourmet", desc: "Equipamiento de alto nivel y zona de preparación profesional." },
        { titulo: "Home Theater", desc: "Cine privado con sistema de sonido inmersivo." },
        { titulo: "Smart Home", desc: "Domótica de iluminación, climatización y sonido." },
        { titulo: "Garaje Cubierto", desc: "Plazas para múltiples vehículos con acceso privado." },
        { titulo: "Jardín con Palmeras", desc: "Paisajismo tropical con diseño neoclásico." },
        { titulo: "Área de Entretenimiento", desc: "Espacio gourmet con curación para reuniones privadas." },
        { titulo: "Sauna y Spa", desc: "Área de bienestar completa para uso exclusivo." },
      ],
    },
    citacao: {
      text1: "No es una casa de playa. ",
      em: "Es un estado de ánimo",
      text2: " frente al mar.",
      rodape: "DOMUS.JURERE — JURERÊ INTERNACIONAL, FLORIANÓPOLIS",
    },
    experiencia: {
      label: "EXPERIENCIA",
      citacao: "No es para cualquiera. Y así está bien.",
      desc: "La DOMUS.JURERE no recibe huéspedes. Recibe personas que saben lo que quieren y que han encontrado exactamente eso.",
      servicos: [
        { titulo: "Chef Privado", desc: "Menú personalizado, disponible para todas las comidas." },
        { titulo: "Concierge 24h", desc: "Asistencia exclusiva durante toda la estancia." },
        { titulo: "Transfer Premium", desc: "Conductor y vehículo disponibles bajo reserva." },
        {
          titulo: "Excursiones Privadas",
          desc: "Curación de experiencias náuticas y gastronómicas en Florianópolis.",
        },
      ],
    },
    localizacao: {
      label: "UBICACIÓN",
      h2_1: "Jurerê Internacional",
      h2_2: "la dirección correcta.",
      desc: "A 300 metros de la playa. La dirección de mayor prestigio de Florianópolis.",
      items: ["PLAYA DE JURERÊ", "RESTAURANTES FRENTE AL MAR", "AEROPUERTO 30 MIN"],
      cta: "VER EN EL MAPA",
      mapTitle: "Mapa Jurerê Internacional",
    },
    faq: {
      label: "PREGUNTAS",
      h2_1: "Información",
      h2_2: "esencial.",
      items: [
        {
          q: "¿Cómo funciona la reserva?",
          a: "Las reservas se realizan exclusivamente por contacto directo. Contáctenos en privado para verificar disponibilidad y recibir toda la información.",
        },
        {
          q: "¿Cuál es el período mínimo de alquiler?",
          a: "El período mínimo varía según la época del año. Contáctenos para verificar disponibilidad en su fecha.",
        },
        {
          q: "¿Hay servicios incluidos en el alquiler?",
          a: "La mansión incluye limpieza regular durante la estancia y soporte técnico. Servicios adicionales de chef privado, concierge y transfer están disponibles bajo solicitud.",
        },
        {
          q: "¿Se aceptan mascotas?",
          a: "Cada solicitud se evalúa de forma individual. Contáctenos para conocer las condiciones.",
        },
        {
          q: "¿Cómo es el proceso de check-in?",
          a: "Check-in personalizado con presentación completa de la propiedad y entrega de las instrucciones de uso. Horarios según lo acordado en la reserva.",
        },
        {
          q: "¿La mansión está disponible para eventos?",
          a: "Sí, previa solicitud y aprobación. Eventos corporativos, celebraciones privadas y reuniones se evalúan caso por caso.",
        },
      ],
    },
    contato: {
      label: "CONTACTO",
      h2_1: "Conversemos",
      h2_2: "en privado.",
      desc: "Indíquenos su período y perfil de estancia. Nuestro equipo le responderá con disponibilidad y condiciones de reserva por atención privada.",
      placeholderNome: "Nombre",
      placeholderEmail: "Email",
      placeholderTelefone: "Teléfono",
      placeholderPeriodo: "Período deseado",
      placeholderMensagem: "Mensaje",
      ctaSubmit: "CONTACTAR EN PRIVADO",
      ctaDireto: "¿PREFIERE CONTACTAR DIRECTO?",
      ctaDiretoLink: "WHATSAPP",
      formIntro: "Contacto vía web DOMUS.JURERE",
      formNome: "Nombre",
      formEmail: "Email",
      formTelefone: "Teléfono",
      formPeriodo: "Período deseado",
      formMensagem: "Mensaje",
      formMensagemDefault: "No especificado",
    },
    footer: {
      nav: "NAVEGACIÓN",
      contato: "CONTACTO PRIVADO",
      ctaPrivado: "CONTACTAR EN PRIVADO",
      copyright: "© 2026 DOMUS.JURERE. Todos los derechos reservados.",
      subtext: "Jurerê Internacional · Florianópolis · SC",
    },
    stickybar: {
      subtitle: "Jurerê Internacional",
      cta: "AGENDAR VISITA",
    },
    howItWorks: {
      label: "Cómo funciona",
      h2_1: "Una atención",
      h2_2: "diferente del estándar",
      desc: "Consulta sin prisa, con escucha, explicación clara y plan construido para ti. Cada paso se discute y te vas entendiendo qué está sucediendo y qué viene después.",
      steps: [
        { title: "Tiempo de consulta", description: "Consulta larga, sin prisa. Espacio real para escuchar tu historia." },
        { title: "Escucha clínica", description: "Anamnesis cuidadosa para entender el contexto, no solo el síntoma." },
        { title: "Investigación", description: "Exámenes y razonamiento clínico para llegar a la raíz de lo que sucede." },
        { title: "Plan individualizado", description: "Estrategia construida para ti, con explicación clara de cada paso." },
      ],
    },
    identification: {
      label: "Tal vez estés aquí porque",
      h2: "Si te identifies con esto",
      items: [
        "Ya has pasado por varios servicios y no se ha resuelto",
        "Cansancio constante o baja energía",
        "Dificultad para bajar de peso",
        "Quieres un acompañamiento más cercano",
        "Quieres mejorar la apariencia con naturalidad",
      ],
    },
    principles: {
      label: "Principios de la atención",
      h2: "Lo que guía nuestro cuidado",
      items: [
        { title: "Tiempo", description: "Consulta larga, con espacio para que tu historia sea escuchada sin prisa." },
        { title: "Escucha", description: "Anamnesis cuidadosa, atención al contexto y a lo que a menudo pasa desapercibido." },
        { title: "Plan individualizado", description: "Estrategia construida para ti, con explicación clara de cada paso y revisión continua." },
      ],
    },
    procedures: {
      items: [
        { title: "Toxina botulínica", description: "Para quienes desean suavizar marcas de expresión dinámicas en la cara." },
        { title: "Relleno facial", description: "Para quienes buscan recuperar volumen o contorno en áreas específicas del rostro." },
        { title: "Bioestimuladores", description: "Estrategia para estimular colágeno y mejorar la calidad de la piel." },
        { title: "Microagujas", description: "Procedimiento para estimular colágeno y mejorar la textura de la piel." },
        { title: "Luz pulsada", description: "Tratamiento no ablativo para manchas, arrugas y rejuvenecimiento." },
        { title: "Peeling químico", description: "Exfoliación controlada para mejorar textura y claridad de la piel." },
        { title: "Láser CO2", description: "Tratamiento ablativo para arrugas profundas y flacidez." },
        { title: "Radiofrecuencia", description: "Calentamiento profundo para firmeza y estimulación de colágeno." },
        { title: "Microcorrientes", description: "Estimulación eléctrica leve para tonificar y lifting facial no invasivo." },
      ],
    },
    services: {
      label: "Servicios",
      h2: "Servicios",
      items: [
        { title: "Salud clínica", description: "Consulta médica amplia con investigación, razonamiento clínico y seguimiento continuo." },
        { title: "Pérdida de peso y metabolismo", description: "Evaluación metabólica y plan individualizado para pérdida de peso sostenible y más energía." },
        { title: "Salud de la piel", description: "Cuidados de la piel con enfoque en naturalidad, calidad de piel y contorno facial armonioso." },
      ],
    },
    statsStrip: {
      stats: [
        { value: "1.540", unit: "m²", label: "Terreno Total" },
        { value: "900", unit: "m²", label: "Área Construida" },
        { value: "5", unit: "", label: "Suites" },
        { value: "2", unit: "", label: "Piscinas" },
        { value: "4", unit: "", label: "Plazas Cubiertas" },
        { value: "100%", unit: "", label: "Privacidad" },
      ],
    },
    team: {
      label: "Nuestro Equipo",
      h2: "Nuestro equipo médico",
      members: [
        {
          name: "Dr. Pedro Schmitz",
          title: "Médico",
          description: "Atención médica amplia, con enfoque en investigación y seguimiento. Consulta extensa para entender el contexto antes de proponer cualquier conducta.",
        },
        {
          name: "Dra. Júlia Schmitz",
          title: "Médica",
          description: "Atención enfocada en pérdida de peso, salud metabólica y salud hormonal femenina. Plan individualizado, construido a partir de la escucha e investigación.",
        },
      ],
    },
    testimonials: {
      label: "Experiencia de pacientes",
      h2: "Lo que nuestros pacientes reportan",
      items: [
        { text: "Atención humana y sin prisa. Me fui entendiendo mi caso y con un plan claro.", author: "Paciente de São José" },
        { text: "Finalmente un seguimiento que mira el todo, no solo el síntoma aislado.", author: "Paciente de Kobrasol" },
        { text: "Equipo atento, explicación objetiva y conductas con naturalidad.", author: "Paciente de la Gran Florianópolis" },
      ],
    },
    ctaSection: {
      label: "Próximo paso",
      h2: "Si quieres una atención más completa, el próximo paso es simple",
      description: "Envía un mensaje y nuestro equipo te ayuda a agendar la primera consulta.",
      cta: "Agendar consulta en WhatsApp",
    },
  },

  // ─────────────────────────────── ENGLISH ────────────────────────────────
  en: {
    nav: {
      mansion: "THE MANSION",
      galeria: "GALLERY",
      quartos: "SUITES",
      amenidades: "AMENITIES",
      localizacao: "LOCATION",
      contato: "CONTACT",
      ctaPrivado: "BOOK IN PRIVATE",
      ctaAgendarVisita: "SCHEDULE A VISIT",
    },
    hero: {
      subtitle: "JURERÊ INTERNACIONAL · FLORIANÓPOLIS · SC",
      cta: "BOOK IN PRIVATE",
    },
    especificacoes: {
      label: "SPECIFICATIONS",
      h2_1: "Architecture",
      h2_2: "beyond compare.",
      desc: "Neoclassical architecture with a circular tower, columns, arches, and a helical staircase. The highest standard of seasonal rental in Jurerê Internacional.",
      items: [
        { label: "BEDROOMS" },
        { label: "SUITES" },
        { label: "BUILT AREA" },
        { label: "TO THE BEACH" },
        { label: "COVERED PARKING" },
        { label: "LAND AREA" },
      ],
    },
    suitesAmbientes: {
      label: "SUITES & SPACES",
      h2_1: "Five suites,",
      h2_2: "one experience.",
      desc: "Every space was designed for a singular experience — from the quiet of early morning to the celebration after dark.",
      suites: [
        {
          tag: "MASTER SUITE",
          name: "Principal Suite",
          description:
            "A duplex setting with privileged views over the Jurerê canal, a spacious walk-in closet, Calacatta marble bathroom, and private terrace.",
        },
        {
          tag: "SUITE",
          name: "Garden Suite",
          description:
            "Direct access to the covered garden, a freestanding soaking tub, and a private spa atmosphere surrounded by a contemporary garden.",
        },
        {
          tag: "SUITE",
          name: "Pool Suite",
          description:
            "Front-facing views of the infinity pool, a covered terrace with exclusive loungers, and scenic nighttime lighting.",
        },
        {
          tag: "SUITE",
          name: "Tower Suite",
          description:
            "Located in the central tower with double-height ceilings, floor-to-ceiling windows, and a 270° panoramic view of Jurerê Internacional.",
        },
        {
          tag: "SOCIAL AREA",
          name: "Gourmet Space",
          description:
            "Integrated leisure area with a heated pool, premium kitchen, climate-controlled wine cellar, and a terrace with a wood-fired oven.",
        },
      ],
    },
    galeria: {
      label: "GALLERY",
      h2_1: "Architecture",
      h2_2: "in perspective.",
      mediaLabels: [
        "Mansion Entrance",
        "Pool & Outdoor Area",
        "Integrated Kitchen",
        "Living Room & Lounge",
        "Spacious Garage",
      ],
    },
    quartos: {
      label: "THE SUITES",
      h2: "Eight suites, eight worlds",
      colecao: "PRIVATE SUITE COLLECTION",
      destaques: "HIGHLIGHTS",
      reservar: "RESERVE THIS SUITE",
      ctaDisponibilidade: "CONTACT US FOR AVAILABILITY",
      ariaFechar: "Close",
      ariaAnterior: "Previous photo",
      ariaProxima: "Next photo",
      ariaExpandir: "Open full screen",
      suites: [
        {
          nome: "Zeus Suite",
          destaque: "Master Suite",
          descricao:
            "The mansion's principal suite. King-size bed, private terrace, soaking tub, and privileged garden views.",
          amenidades: ["King-size bed", "Soaking tub", "Private terrace"],
        },
        {
          nome: "Poseidon Suite",
          descricao:
            "Deep blue palette and pearlescent finishes. An immersive experience at the heart of the mansion.",
          amenidades: ["Exclusive palette", "Fine finishes", "Full bathroom"],
        },
        {
          nome: "Artemis Suite",
          descricao:
            "Lightness and neutrality. Double bed, abundant natural light, and a full private bathroom.",
          amenidades: ["Double bed", "Natural light", "Silent comfort"],
        },
        {
          nome: "Apollo Suite",
          descricao:
            "Queen bed, warm neutral tones, and lateral pool views. Comfort and serenity in equal measure.",
          amenidades: ["Queen bed", "Pool view", "Climate control"],
        },
        {
          nome: "Hera Suite",
          descricao:
            "Elegance and sophistication. Gold detailing, high-end furnishings, and scenic lighting.",
          amenidades: ["Premium bedding", "Scenic lighting", "Private bathroom"],
        },
        {
          nome: "Dionisio Suite",
          descricao:
            "Earthy tones, rich textures, and an atmosphere that invites the deepest rest.",
          amenidades: ["Noble textures", "Intimate atmosphere", "Private bathroom"],
        },
        {
          nome: "Aphrodite Suite",
          descricao:
            "A romantic ambiance with refined finishes and a spa bathroom featuring a hydromassage shower.",
          amenidades: ["Romantic setting", "Spa bathroom", "Premium shower"],
        },
        {
          nome: "Athena Suite",
          descricao:
            "Contemporary design with classic touches. Ideal for guests who seek balance between style and functionality.",
          amenidades: ["Functional layout", "Elegant finishes", "Natural light"],
        },
      ],
    },
    amenidades: {
      label: "AMENITIES",
      h2_1: "Eight reasons",
      h2_2: "to never leave.",
      items: [
        { titulo: "Cobalt Blue Pool", desc: "Panoramic views with an elegant edge and exclusive deck." },
        { titulo: "Gourmet Kitchen", desc: "Professional-grade equipment and a full preparation area." },
        { titulo: "Home Theater", desc: "Private cinema with an immersive surround sound system." },
        { titulo: "Smart Home", desc: "Automated lighting, climate control, and sound." },
        { titulo: "Covered Garage", desc: "Multi-vehicle parking with private access." },
        { titulo: "Palm Garden", desc: "Tropical landscaping with a neoclassical design." },
        { titulo: "Entertainment Area", desc: "Curated gourmet space for private gatherings." },
        { titulo: "Sauna & Spa", desc: "Full wellness area for exclusive use." },
      ],
    },
    citacao: {
      text1: "This is not a beach house. ",
      em: "It is a state of mind",
      text2: " by the sea.",
      rodape: "DOMUS.JURERE — JURERÊ INTERNACIONAL, FLORIANÓPOLIS",
    },
    experiencia: {
      label: "EXPERIENCE",
      citacao: "Not for everyone. And that is perfectly fine.",
      desc: "DOMUS.JURERE does not receive guests. It welcomes people who know exactly what they want — and have found precisely that.",
      servicos: [
        { titulo: "Private Chef", desc: "Personalised menu, available for all meals." },
        { titulo: "24h Concierge", desc: "Exclusive support throughout your stay." },
        { titulo: "Premium Transfer", desc: "Driver and vehicle available upon request." },
        {
          titulo: "Private Excursions",
          desc: "Curated nautical and gastronomic experiences in Florianópolis.",
        },
      ],
    },
    localizacao: {
      label: "LOCATION",
      h2_1: "Jurerê Internacional",
      h2_2: "the right address.",
      desc: "300 metres from the beach. The most prestigious address in Florianópolis.",
      items: ["JURERÊ BEACH", "BEACHFRONT RESTAURANTS", "AIRPORT 30 MIN"],
      cta: "VIEW ON MAP",
      mapTitle: "Map — Jurerê Internacional",
    },
    faq: {
      label: "FAQ",
      h2_1: "Essential",
      h2_2: "information.",
      items: [
        {
          q: "How does the booking process work?",
          a: "All bookings are made exclusively through direct contact. Reach out in private to check availability and receive full details.",
        },
        {
          q: "What is the minimum rental period?",
          a: "The minimum stay varies by season. Contact us to check availability for your preferred dates.",
        },
        {
          q: "Are services included in the rental?",
          a: "The mansion includes regular housekeeping and technical support throughout your stay. Additional services such as a private chef, concierge, and transfer are available upon request.",
        },
        {
          q: "Are pets allowed?",
          a: "Each request is assessed individually. Please contact us to discuss the conditions.",
        },
        {
          q: "What is the check-in process?",
          a: "A personalised check-in with a full walkthrough of the property and handover of instructions. Arrival times are agreed upon at the time of booking.",
        },
        {
          q: "Is the mansion available for events?",
          a: "Yes, subject to review and approval. Corporate events, private celebrations, and gatherings are assessed on a case-by-case basis.",
        },
      ],
    },
    contato: {
      label: "CONTACT",
      h2_1: "A private",
      h2_2: "conversation.",
      desc: "Let us know your preferred dates and the nature of your stay. Our team will respond with availability and booking terms through a private channel.",
      placeholderNome: "Name",
      placeholderEmail: "Email",
      placeholderTelefone: "Phone",
      placeholderPeriodo: "Desired period",
      placeholderMensagem: "Message",
      ctaSubmit: "BOOK IN PRIVATE",
      ctaDireto: "PREFER TO REACH US DIRECTLY?",
      ctaDiretoLink: "WHATSAPP",
      formIntro: "Contact via DOMUS.JURERE website",
      formNome: "Name",
      formEmail: "Email",
      formTelefone: "Phone",
      formPeriodo: "Desired period",
      formMensagem: "Message",
      formMensagemDefault: "Not provided",
    },
    footer: {
      nav: "NAVIGATION",
      contato: "PRIVATE CONTACT",
      ctaPrivado: "BOOK IN PRIVATE",
      copyright: "© 2026 DOMUS.JURERE. All rights reserved.",
      subtext: "Jurerê Internacional · Florianópolis · SC",
    },
    stickybar: {
      subtitle: "Jurerê Internacional",
      cta: "SCHEDULE A VISIT",
    },
    howItWorks: {
      label: "How it works",
      h2_1: "A different",
      h2_2: "kind of care",
      desc: "Unhurried consultation with listening, clear explanation and a plan built for you. Every step is discussed and you leave understanding what's happening and what comes next.",
      steps: [
        { title: "Consultation time", description: "Long consultation, without rushing. Real space to listen to your story." },
        { title: "Clinical listening", description: "Careful case history to understand context, not just the symptom." },
        { title: "Investigation", description: "Exams and clinical reasoning to get to the root of what's happening." },
        { title: "Individualised plan", description: "Strategy built for you, with clear explanation of each step." },
      ],
    },
    identification: {
      label: "Maybe you're here because",
      h2: "If you identify with this",
      items: [
        "You've been to several appointments and nothing has been resolved",
        "Constant fatigue or low energy",
        "Difficulty losing weight",
        "You want closer follow-up",
        "You want to improve your appearance naturally",
      ],
    },
    principles: {
      label: "Care principles",
      h2: "What guides our care",
      items: [
        { title: "Time", description: "Long consultation, with space for your story to be listened to without rushing." },
        { title: "Listening", description: "Careful case history, attention to context and what often goes unnoticed." },
        { title: "Individualised plan", description: "Strategy built for you, with clear explanation of each step and continuous review." },
      ],
    },
    procedures: {
      items: [
        { title: "Botulinum toxin", description: "For those who wish to soften dynamic expression marks on the face." },
        { title: "Facial fillers", description: "For those seeking to restore volume or contour to specific facial areas." },
        { title: "Biostimulators", description: "Strategy to stimulate collagen and improve skin quality." },
        { title: "Microneedling", description: "Procedure to stimulate collagen and improve skin texture." },
        { title: "Intense pulsed light", description: "Non-ablative treatment for spots, wrinkles and rejuvenation." },
        { title: "Chemical peel", description: "Controlled exfoliation to improve skin texture and clarity." },
        { title: "CO2 laser", description: "Ablative treatment for deep wrinkles and sagging skin." },
        { title: "Radiofrequency", description: "Deep heating for firmness and collagen stimulation." },
        { title: "Microcurrent", description: "Gentle electrical stimulation for toning and non-invasive facial lifting." },
      ],
    },
    services: {
      label: "Services",
      h2: "Services",
      items: [
        { title: "Clinical health", description: "Broad medical consultation with investigation, clinical reasoning and continuous care." },
        { title: "Weight loss and metabolism", description: "Metabolic assessment and individualised plan for sustainable weight loss and more energy." },
        { title: "Skin health", description: "Skincare with a focus on naturalness, skin quality and harmonious facial contour." },
      ],
    },
    statsStrip: {
      stats: [
        { value: "1.540", unit: "m²", label: "Total land" },
        { value: "900", unit: "m²", label: "Built area" },
        { value: "5", unit: "", label: "Suites" },
        { value: "2", unit: "", label: "Pools" },
        { value: "4", unit: "", label: "Covered spaces" },
        { value: "100%", unit: "", label: "Privacy" },
      ],
    },
    team: {
      label: "Our Team",
      h2: "Our medical team",
      members: [
        {
          name: "Dr. Pedro Schmitz",
          title: "Physician",
          description: "Comprehensive medical care with a focus on investigation and follow-up. Extended consultation to understand the context before proposing any course of action.",
        },
        {
          name: "Dr. Júlia Schmitz",
          title: "Physician",
          description: "Care focused on weight loss, metabolic health and female hormonal health. An individualised plan, built from listening and investigation.",
        },
      ],
    },
    testimonials: {
      label: "Patient experience",
      h2: "What our patients report",
      items: [
        { text: "Humane and unhurried care. I left understanding my case and with a clear plan.", author: "Patient from São José" },
        { text: "Finally, follow-up care that looks at the whole picture, not just the isolated symptom.", author: "Patient from Kobrasol" },
        { text: "Attentive team, objective explanations and natural approaches.", author: "Patient from Greater Florianópolis" },
      ],
    },
    ctaSection: {
      label: "Next step",
      h2: "If you want more complete care, the next step is simple",
      description: "Send a message and our team will help you schedule your first appointment.",
      cta: "Schedule appointment on WhatsApp",
    },
  },
};

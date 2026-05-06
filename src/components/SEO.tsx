import { Helmet } from "react-helmet-async";

const BASE_URL = "https://domusjurere.com";
const DEFAULT_TITLE = "Domus Jurerê — Residência de Alto Padrão em Jurerê Internacional";
const DEFAULT_DESCRIPTION =
  "Conheça a Domus Jurerê, residência de alto padrão em Jurerê Internacional, Florianópolis. Estrutura completa, ambientes exclusivos e atendimento privado.";
const DEFAULT_IMAGE = `${BASE_URL}/images/og-cover.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  faq?: Array<{ question: string; answer: string }>;
}

const SEO = ({
  title,
  description,
  path = "/",
  image,
  type = "website",
  faq = [],
}: SEOProps) => {
  const fullTitle = title ? `${title} — Domus Jurerê` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Domus Jurerê",
    image: img,
    url: BASE_URL,
    telephone: "+55 48 98468-0088",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Florianópolis",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    areaServed: "Jurerê Internacional, Florianópolis e região",
    sameAs: [
      "https://www.instagram.com/domus.jurere",
    ],
  };

  const faqJsonLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Domus Jurerê" />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;

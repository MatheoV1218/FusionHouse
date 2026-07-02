import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://www.thefusionhousefitness.com";
const DEFAULT_IMAGE = `${SITE_URL}/FusionLogov2.png`;

const pages = {
  "/": {
    en: {
      title:
        "The Fusion House | Personal Training & Group Fitness in White Plains, NY",
      description:
        "The Fusion House is a boutique fitness studio in White Plains, NY offering personal training, small-group fitness classes, memberships, strength training, mobility training, and coaching for adults.",
    },
    es: {
      title:
        "The Fusion House | Entrenamiento Personal y Clases en White Plains, NY",
      description:
        "The Fusion House es un estudio boutique de fitness en White Plains, NY que ofrece entrenamiento personal, clases en grupos pequeños, membresías, fuerza, movilidad y coaching para adultos.",
    },
  },
  "/services": {
    en: {
      title: "Personal Training & Memberships | The Fusion House White Plains",
      description:
        "Explore personal training, small-group fitness classes, memberships, and space rental options at The Fusion House in White Plains, NY.",
    },
    es: {
      title:
        "Entrenamiento Personal y Membresías | The Fusion House White Plains",
      description:
        "Explora entrenamiento personal, clases en grupos pequeños, membresías y opciones de entrenamiento en The Fusion House en White Plains, NY.",
    },
  },
  "/about": {
    en: {
      title: "About The Fusion House | White Plains Fitness Coaching Community",
      description:
        "Learn about The Fusion House, a coaching-driven fitness community in White Plains built around accountability, strength, mobility, and long-term growth.",
    },
    es: {
      title: "Sobre The Fusion House | Comunidad Fitness en White Plains",
      description:
        "Conoce The Fusion House, una comunidad de fitness en White Plains enfocada en coaching, responsabilidad, fuerza, movilidad y crecimiento a largo plazo.",
    },
  },
  "/contact": {
    en: {
      title: "Contact The Fusion House | Gym in White Plains, NY",
      description:
        "Contact The Fusion House in White Plains, NY for personal training, memberships, group fitness classes, directions, hours, and booking support.",
    },
    es: {
      title: "Contacto | The Fusion House en White Plains, NY",
      description:
        "Contacta a The Fusion House en White Plains, NY para entrenamiento personal, membresías, clases grupales, direcciones, horarios y ayuda para reservar.",
    },
  },
  "/faq": {
    en: {
      title: "Fusion House FAQ | Classes, Memberships & Booking Questions",
      description:
        "Answers to common questions about The Fusion House, including personal training, memberships, class booking, trials, and gym information.",
    },
    es: {
      title: "Preguntas Frecuentes | The Fusion House",
      description:
        "Respuestas a preguntas comunes sobre The Fusion House, incluyendo entrenamiento personal, membresías, reservas, pruebas y información del gimnasio.",
    },
  },
  "/guide": {
    en: {
      title: "Reservation Guide | How to Book The Fusion House on Mindbody",
      description:
        "Step-by-step guide for booking a class or session at The Fusion House through Mindbody.",
    },
    es: {
      title: "Guía de Reservas | Cómo Reservar en The Fusion House",
      description:
        "Guía paso a paso para reservar una clase o sesión en The Fusion House a través de Mindbody.",
    },
  },
};

function getBasePath(pathname: string) {
  return pathname.replace(/^\/es/, "") || "/";
}

function getPageName(pathname: string) {
  const basePath = getBasePath(pathname);
  if (basePath === "/") return "Home";
  return basePath
    .replace("/", "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    if (property) tag.setAttribute("property", name);
    else tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;

  let tag = document.head.querySelector<HTMLLinkElement>(selector);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    if (hreflang) tag.setAttribute("hreflang", hreflang);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathname = location.pathname;
    const isSpanish = pathname.startsWith("/es");
    const basePath = getBasePath(pathname);
    const canonicalPath = isSpanish
      ? `/es${basePath === "/" ? "" : basePath}`
      : basePath;
    const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const englishUrl = `${SITE_URL}${basePath === "/" ? "/" : basePath}`;
    const spanishUrl = `${SITE_URL}/es${basePath === "/" ? "" : basePath}`;
    const pageGroup = pages[basePath as keyof typeof pages] || pages["/"];
    const page = isSpanish ? pageGroup.es : pageGroup.en;
    const title = page.title;

    document.title = title;
    document.documentElement.lang = isSpanish ? "es" : "en";

    setMeta("description", page.description);
    setMeta("robots", "index, follow, max-image-preview:large");
    setMeta("theme-color", "#ff5a3d");

    setMeta("og:type", "website", true);
    setMeta("og:site_name", "The Fusion House", true);
    setMeta("og:title", title, true);
    setMeta("og:description", page.description, true);
    setMeta("og:image", DEFAULT_IMAGE, true);
    setMeta("og:image:alt", "The Fusion House Fitness logo", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:locale", isSpanish ? "es_US" : "en_US", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", page.description);
    setMeta("twitter:image", DEFAULT_IMAGE);

    setLink("canonical", canonicalUrl);
    setLink("alternate", englishUrl, "en");
    setLink("alternate", spanishUrl, "es");
    setLink("alternate", englishUrl, "x-default");

    setJsonLd("fusion-house-schema", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ExerciseGym",
          "@id": `${SITE_URL}/#business`,
          name: "The Fusion House",
          alternateName: "The Fusion House Fitness",
          url: `${SITE_URL}/`,
          logo: DEFAULT_IMAGE,
          image: DEFAULT_IMAGE,
          description:
            "Boutique fitness studio offering personal training, small-group fitness classes, memberships, strength training, mobility training, and wellness-focused coaching in White Plains, New York.",
          telephone: "+1-914-552-9619",
          email: "Infofusionhouse@gmail.com",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "126 South Lexington Avenue",
            addressLocality: "White Plains",
            addressRegion: "NY",
            postalCode: "10606",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 41.0277988,
            longitude: -73.7720076,
          },
          areaServed: [
            "White Plains, NY",
            "Westchester County, NY",
            "New York",
          ],
          sameAs: [
            "https://www.instagram.com/the_fusion_house",
            "https://www.facebook.com/thefusionhouseny/",
            "https://www.yelp.com/biz/the-fusion-house-fitness-white-plains",
          ],
          makesOffer: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Personal Training" },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Small-Group Fitness Classes",
              },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Fitness Memberships" },
            },
          ],
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "The Fusion House",
          url: `${SITE_URL}/`,
          publisher: { "@id": `${SITE_URL}/#business` },
          inLanguage: i18n.language,
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          name: title,
          url: canonicalUrl,
          description: page.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#business` },
          inLanguage: i18n.language,
        },
        basePath === "/contact"
          ? {
              "@type": "ContactPage",
              "@id": `${canonicalUrl}#contact`,
              name: "Contact The Fusion House",
              url: canonicalUrl,
            }
          : null,
      ].filter(Boolean),
    });
  }, [location.pathname, i18n.language]);

  return null;
}

export { getPageName };

export type Locale = "ar" | "en";

export type ServiceId =
  | "engine"
  | "transmission"
  | "suspension"
  | "diagnostics"
  | "inspection";

export type SiteCopy = {
  metaTitle: string;
  languageLabel: string;
  menuOpen: string;
  menuClose: string;
  navLabel: string;
  nav: { href: string; label: string }[];
  cta: {
    call: string;
    whatsapp: string;
    bookInspection: string;
    learnMore: string;
  };
  placeholders: {
    phone: string;
    whatsapp: string;
    location: string;
    hours: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    support: string;
    chips: { id: ServiceId; label: string; href: string }[];
    imageAlt: string;
  };
  services: {
    heading: string;
    intro: string;
    items: { id: ServiceId; title: string; text: string; href: string }[];
  };
  inspection: {
    kicker: string;
    heading: string;
    body: string;
    note: string;
    points: string[];
    ctaNote: string;
    panelTitle: string;
    panelText: string;
  };
  experience: {
    years: string;
    yearsLabel: string;
    heading: string;
    body: string;
  };
  process: {
    heading: string;
    intro: string;
    steps: { title: string; text: string }[];
  };
  contact: {
    heading: string;
    body: string;
    phoneLabel: string;
    whatsappLabel: string;
    locationLabel: string;
    hoursLabel: string;
  };
  location: {
    heading: string;
    mapsCta: string;
  };
  footer: {
    blurb: string;
    servicesHeading: string;
    contactHeading: string;
    rights: string;
  };
};

export const content: Record<Locale, SiteCopy> = {
  ar: {
    metaTitle: "تركي كار | ورشة صيانة وتشخيص السيارات",
    languageLabel: "اللغة",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    navLabel: "التنقل",
    nav: [
      { href: "#services", label: "الخدمات" },
      { href: "#inspection", label: "فحص قبل الشراء" },
      { href: "#process", label: "كيف نعمل" },
      { href: "#contact", label: "تواصل معنا" },
      { href: "#location", label: "الموقع" },
    ],
    cta: {
      call: "اتصل بنا",
      whatsapp: "واتساب",
      bookInspection: "احجز فحص السيارة",
      learnMore: "اعرف المزيد",
    },
    placeholders: {
      phone: "[رقم الهاتف]",
      whatsapp: "[رابط واتساب]",
      location: "[الموقع]",
      hours: "[ساعات العمل]",
    },
    hero: {
      eyebrow: "ورشة صيانة سيارات",
      title: "سيارتك فيها مشكلة؟ نحدد السبب ونصلحها.",
      support:
        "تشخيص وإصلاح للمحرك والقير والعفشة وأعطال الكمبيوتر، مع فحص السيارة قبل الشراء.",
      chips: [
        { id: "engine", label: "المحرك", href: "#services" },
        { id: "transmission", label: "القير", href: "#services" },
        { id: "suspension", label: "العفشة", href: "#services" },
        { id: "diagnostics", label: "فحص الكمبيوتر", href: "#services" },
        { id: "inspection", label: "فحص قبل الشراء", href: "#inspection" },
      ],
      imageAlt: "ورشة تركي كار",
    },
    services: {
      heading: "خدماتنا",
      intro: "أعمال الصيانة والتشخيص التي ننفذها في الورشة.",
      items: [
        {
          id: "engine",
          title: "إصلاح المحرك",
          text: "تشخيص أعطال المحرك وإصلاحها.",
          href: "#contact",
        },
        {
          id: "transmission",
          title: "إصلاح القير",
          text: "تشخيص أعطال القير وإصلاحها.",
          href: "#contact",
        },
        {
          id: "suspension",
          title: "صيانة العفشة ونظام التعليق",
          text: "فحص وإصلاح العفشة ونظام التعليق.",
          href: "#contact",
        },
        {
          id: "diagnostics",
          title: "فحص وتشخيص أعطال الكمبيوتر",
          text: "قراءة أعطال الكمبيوتر وتحديد سببها.",
          href: "#contact",
        },
        {
          id: "inspection",
          title: "فحص السيارة قبل الشراء",
          text: "فحص مستقل لحالة السيارة قبل الشراء.",
          href: "#inspection",
        },
      ],
    },
    inspection: {
      kicker: "فحص قبل الشراء",
      heading: "قبل ما تشتري، افحص السيارة",
      body: "فحص السيارة قبل الشراء يساعدك على معرفة حالتها قبل اتخاذ قرارك.",
      note: "الفحص يوضّح الحالة. قرار الشراء يبقى لك.",
      points: [
        "فحص مستقل قبل قرار الشراء",
        "معرفة حالة السيارة",
        "معلومات واضحة تساعدك على القرار",
      ],
      ctaNote: "حالياً يتم طلب الفحص بالاتصال أو واتساب.",
      panelTitle: "فحص مستقل",
      panelText: "لمعرفة حالة السيارة قبل ما تقرر.",
    },
    experience: {
      years: "30",
      yearsLabel: "عاماً",
      heading: "خبرة تُبنى عليها الثقة",
      body: "أكثر من 30 عاماً من الخبرة العملية.",
    },
    process: {
      heading: "كيف نعمل",
      intro: "ثلاث خطوات، من فهم العطل إلى الإصلاح.",
      steps: [
        {
          title: "تشخيص",
          text: "فهم المشكلة وتحديد سبب العطل.",
        },
        {
          title: "توضيح",
          text: "شرح المشكلة للعميل وما يحتاجه الإصلاح.",
        },
        {
          title: "إصلاح",
          text: "تنفيذ العمل المطلوب على السيارة.",
        },
      ],
    },
    contact: {
      heading: "عندك مشكلة في السيارة؟\nتواصل معنا.",
      body: "اتصل بنا أو راسلنا على واتساب.",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      locationLabel: "الموقع",
      hoursLabel: "ساعات العمل",
    },
    location: {
      heading: "موقع تركي كار",
      mapsCta: "فتح الموقع في خرائط Google",
    },
    footer: {
      blurb: "ورشة لصيانة السيارات وتشخيص أعطالها.",
      servicesHeading: "الخدمات",
      contactHeading: "التواصل",
      rights: "جميع الحقوق محفوظة.",
    },
  },
  en: {
    metaTitle: "Turki Car | Automotive Repair and Diagnostics",
    languageLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navLabel: "Main",
    nav: [
      { href: "#services", label: "Services" },
      { href: "#inspection", label: "Pre-purchase check" },
      { href: "#process", label: "How we work" },
      { href: "#contact", label: "Contact" },
      { href: "#location", label: "Location" },
    ],
    cta: {
      call: "Call us",
      whatsapp: "WhatsApp",
      bookInspection: "Book an inspection",
      learnMore: "Learn more",
    },
    placeholders: {
      phone: "[Phone number]",
      whatsapp: "[WhatsApp link]",
      location: "[Location]",
      hours: "[Working hours]",
    },
    hero: {
      eyebrow: "Automotive workshop",
      title: "Car trouble? We find the cause and fix it.",
      support:
        "Diagnosis and repair for the engine, transmission, suspension, and computer faults, plus a pre-purchase inspection.",
      chips: [
        { id: "engine", label: "Engine", href: "#services" },
        { id: "transmission", label: "Transmission", href: "#services" },
        { id: "suspension", label: "Suspension", href: "#services" },
        { id: "diagnostics", label: "Computer check", href: "#services" },
        { id: "inspection", label: "Pre-purchase check", href: "#inspection" },
      ],
      imageAlt: "Turki Car workshop",
    },
    services: {
      heading: "Our services",
      intro: "The maintenance and diagnostic work we do in the workshop.",
      items: [
        {
          id: "engine",
          title: "Engine repair",
          text: "Diagnose and repair engine faults.",
          href: "#contact",
        },
        {
          id: "transmission",
          title: "Transmission repair",
          text: "Diagnose and repair gearbox faults.",
          href: "#contact",
        },
        {
          id: "suspension",
          title: "Suspension and undercarriage",
          text: "Inspect and repair the suspension and undercarriage.",
          href: "#contact",
        },
        {
          id: "diagnostics",
          title: "Computer diagnostics",
          text: "Read computer faults and identify the cause.",
          href: "#contact",
        },
        {
          id: "inspection",
          title: "Pre-purchase inspection",
          text: "An independent check of the car before you buy.",
          href: "#inspection",
        },
      ],
    },
    inspection: {
      kicker: "Pre-purchase inspection",
      heading: "Before you buy, inspect the car.",
      body: "A pre-purchase inspection helps you understand the car’s condition before you decide.",
      note: "The inspection shows the condition. The buying decision stays yours.",
      points: [
        "An independent check before you buy",
        "A clear picture of the car’s condition",
        "Information that helps you decide",
      ],
      ctaNote: "For now, request the inspection by phone or WhatsApp.",
      panelTitle: "An independent check",
      panelText: "So you know the car’s condition before you decide.",
    },
    experience: {
      years: "30",
      yearsLabel: "years",
      heading: "Trust built on experience",
      body: "More than 30 years of hands-on experience.",
    },
    process: {
      heading: "How we work",
      intro: "Three steps, from understanding the fault to the repair.",
      steps: [
        {
          title: "Diagnose",
          text: "Understand the problem and identify the cause.",
        },
        {
          title: "Explain",
          text: "Walk you through the fault and what the repair needs.",
        },
        {
          title: "Repair",
          text: "Carry out the required work on the vehicle.",
        },
      ],
    },
    contact: {
      heading: "Car problem?\nGet in touch.",
      body: "Call us or message us on WhatsApp.",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      locationLabel: "Location",
      hoursLabel: "Working hours",
    },
    location: {
      heading: "Turki Car Location",
      mapsCta: "Open in Google Maps",
    },
    footer: {
      blurb: "A workshop for car repair and fault diagnosis.",
      servicesHeading: "Services",
      contactHeading: "Contact",
      rights: "All rights reserved.",
    },
  },
};

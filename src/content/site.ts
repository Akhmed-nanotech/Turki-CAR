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
    note: string;
    examplesLabel: string;
    items: {
      id: ServiceId;
      title: string;
      text: string;
      href: string;
      detail: string;
      examples: string[];
    }[];
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
    heading: string;
    body: string;
    support: string;
    photoAlt: string;
  };
  trust: {
    heading: string;
    points: string[];
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
    intro: string;
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
      title: "سيارتك فيها مشكلة؟\nخلّ التشخيص علينا.",
      support:
        "ورشة لإصلاح وصيانة السيارات. من الصيانة الدورية إلى أعطال المحرك والقير والعفشة والكمبيوتر، مع فحص السيارة قبل الشراء.",
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
      note: "ومن الصيانة الدورية والإصلاحات اليومية إلى الأعطال الأكبر، نساعدك في فحص السيارة وتحديد ما تحتاجه.",
      examplesLabel: "من الأعمال المعتادة",
      items: [
        {
          id: "engine",
          title: "إصلاح المحرك",
          text: "فحص مشاكل المحرك الشائعة والعمل عليها حسب الحالة.",
          href: "#services",
          detail:
            "نفحص مشاكل المحرك الشائعة ونحدد السبب. أي إصلاح يكون بعد الفحص، وحسب حالة السيارة.",
          examples: [
            "تشخيص ضعف أداء المحرك",
            "معالجة التقطيع أو الاهتزاز",
            "فحص مشاكل الحرارة وارتفاع حرارة المحرك",
            "فحص تسربات الزيوت والسوائل",
            "تغيير الزيت والفلاتر",
            "تغيير شمعات الاحتراق عند الحاجة",
          ],
        },
        {
          id: "transmission",
          title: "إصلاح القير وناقل الحركة",
          text: "فحص مشاكل القير وناقل الحركة وتوضيح الحالة.",
          href: "#services",
          detail: "نفحص مشاكل تبديل القير وناقل الحركة، ونوضح لك الحالة قبل أي خطوة.",
          examples: [
            "فحص مشاكل تبديل القير",
            "التقطيع أو التأخير أثناء النقل",
            "فحص الأصوات أو الاهتزازات المرتبطة بالقير",
            "فحص تسرب زيت القير",
            "صيانة زيت القير حسب حالة السيارة ومتطلباتها",
          ],
        },
        {
          id: "suspension",
          title: "صيانة العفشة ونظام التعليق",
          text: "فحص المساعدات وأجزاء التعليق وثبات السيارة.",
          href: "#services",
          detail:
            "نفحص العفشة ونظام التعليق، من المساعدات والمقصات إلى سبب الاهتزاز أو تآكل الإطارات إذا كان مرتبطاً بالتعليق.",
          examples: [
            "فحص المساعدات",
            "فحص المقصات والجلب",
            "فحص أذرعة وأجزاء نظام التعليق",
            "معالجة الاهتزازات أو عدم الثبات",
            "فحص الأصوات القادمة من العفشة",
            "فحص مشاكل تآكل الإطارات المرتبطة بالتعليق أو المحاذاة",
          ],
        },
        {
          id: "diagnostics",
          title: "فحص وتشخيص أعطال الكمبيوتر",
          text: "قراءة الأعطال وتحديد مصدر الخلل قبل الإصلاح.",
          href: "#services",
          detail: "نقرأ أكواد الأعطال ونحدد مصدر الخلل قبل البدء بالإصلاح.",
          examples: [
            "قراءة أكواد الأعطال",
            "فحص لمبة المكينة",
            "تشخيص مشاكل الحساسات والأنظمة الإلكترونية",
            "تحديد مصدر الخلل قبل البدء بالإصلاح",
          ],
        },
        {
          id: "inspection",
          title: "فحص السيارة قبل الشراء",
          text: "فهم الحالة الميكانيكية للسيارة قبل قرار الشراء.",
          href: "#services",
          detail:
            "نساعدك تفهم الحالة الميكانيكية للسيارة قبل الشراء. الفحص يوضّح الحالة، وقرار الشراء يبقى لك.",
          examples: [
            "فحص المحرك",
            "فحص القير",
            "فحص العفشة",
            "فحص التسريبات",
            "فحص الأعطال الظاهرة عبر الكمبيوتر",
            "ملاحظات عامة على الحالة الميكانيكية للسيارة",
          ],
        },
      ],
    },
    inspection: {
      kicker: "فحص قبل الشراء",
      heading: "قبل ما تشتري، افحص السيارة",
      body: "نفحص الحالة الميكانيكية للسيارة قبل الشراء، ونوضح لك اللي تبين من الفحص.",
      note: "الفحص يوضّح الحالة. قرار الشراء يبقى لك.",
      points: [
        "المحرك والقير والعفشة",
        "التسريبات والأعطال الظاهرة عبر الكمبيوتر",
        "ملاحظات تساعدك على القرار",
      ],
      ctaNote: "حالياً يتم طلب الفحص بالاتصال أو واتساب.",
      panelTitle: "فحص مستقل",
      panelText: "لمعرفة حالة السيارة قبل ما تقرر.",
    },
    experience: {
      heading: "الخبرة تصنع الفرق",
      body: "أكثر من 30 عاماً من الخبرة العملية في صيانة وإصلاح السيارات، مع خبرة سابقة في السيارات الرياضية وأعمال التعديل والتجهيز.",
      support: "هالخبرة تساعدنا نتعامل مع التشخيص والإصلاح بطريقة عملية ومتأنية.",
      photoAlt: "الميكانيكي في ورشة تركي كار",
    },
    trust: {
      heading: "ليش تركي كار",
      points: [
        "خبرة عملية طويلة",
        "تشخيص وفحص قبل الإصلاح",
        "صيانة دورية وإصلاحات متنوعة",
        "فحص السيارة قبل الشراء",
        "تواصل مباشر عبر الهاتف وواتساب",
      ],
    },
    process: {
      heading: "كيف نعمل",
      intro: "ثلاث خطوات واضحة.",
      steps: [
        {
          title: "تواصل معنا",
          text: "اتصل أو أرسل رسالة.",
        },
        {
          title: "فحص السيارة",
          text: "نحدد المشكلة ونوضح لك الحالة.",
        },
        {
          title: "الإصلاح",
          text: "نبدأ بالعمل بعد الاتفاق.",
        },
      ],
    },
    contact: {
      heading: "سيارتك تحتاج فحص أو صيانة؟",
      body: "تواصل معنا وخلّنا نساعدك في معرفة المشكلة.",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      locationLabel: "الموقع",
      hoursLabel: "ساعات العمل",
    },
    location: {
      heading: "موقعنا",
      intro: "موقع الورشة على خرائط Google.",
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
      title: "Car trouble?\nLeave the diagnosis to us.",
      support:
        "A workshop for repair and routine maintenance, from engine, transmission, and suspension work to computer diagnostics and a pre-purchase inspection.",
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
      note: "From routine maintenance and everyday repairs to larger faults, we help you check the car and see what it needs.",
      examplesLabel: "Typical work",
      items: [
        {
          id: "engine",
          title: "Engine repair",
          text: "Inspect common engine problems and repair according to the condition.",
          href: "#services",
          detail:
            "We inspect common engine problems and identify the cause. Any repair follows the inspection and depends on the car’s condition.",
          examples: [
            "Weak engine performance",
            "Hesitation or vibration",
            "Overheating and cooling problems",
            "Oil and fluid leaks",
            "Oil and filter changes",
            "Spark plugs when needed",
          ],
        },
        {
          id: "transmission",
          title: "Gearbox and transmission repair",
          text: "Inspect gearbox and transmission problems and explain the condition.",
          href: "#services",
          detail: "We inspect gear-change and transmission problems and explain the condition before any next step.",
          examples: [
            "Gear-change problems",
            "Hesitation or delay while shifting",
            "Noise or vibration linked to the gearbox",
            "Gearbox oil leaks",
            "Gearbox oil service according to the car and its requirements",
          ],
        },
        {
          id: "suspension",
          title: "Suspension and undercarriage",
          text: "Inspect shocks, suspension parts, and how the car sits on the road.",
          href: "#services",
          detail:
            "We inspect the suspension and undercarriage, from shocks and control arms to vibration or tire wear when it is linked to the suspension.",
          examples: [
            "Shock absorbers",
            "Control arms and bushings",
            "Suspension arms and related parts",
            "Vibration or unstable handling",
            "Noise from the undercarriage",
            "Tire wear linked to the suspension or alignment",
          ],
        },
        {
          id: "diagnostics",
          title: "Computer diagnostics",
          text: "Read fault codes and find the source before repair.",
          href: "#services",
          detail: "We read the fault codes and identify the source of the problem before repair starts.",
          examples: [
            "Reading fault codes",
            "Check-engine light",
            "Sensors and electronic systems",
            "Finding the source before repair",
          ],
        },
        {
          id: "inspection",
          title: "Pre-purchase inspection",
          text: "Understand the mechanical condition before you decide to buy.",
          href: "#services",
          detail:
            "We help you understand the car’s mechanical condition before you buy. The inspection shows the condition. The buying decision stays yours.",
          examples: [
            "Engine",
            "Gearbox",
            "Suspension and undercarriage",
            "Leaks",
            "Faults showing through the computer",
            "General notes on the mechanical condition",
          ],
        },
      ],
    },
    inspection: {
      kicker: "Pre-purchase inspection",
      heading: "Before you buy, inspect the car.",
      body: "We inspect the mechanical condition of the car before you buy and explain what the check shows.",
      note: "The inspection shows the condition. The buying decision stays yours.",
      points: [
        "Engine, gearbox, and suspension",
        "Leaks and faults showing through the computer",
        "Notes that help you decide",
      ],
      ctaNote: "For now, request the inspection by phone or WhatsApp.",
      panelTitle: "An independent check",
      panelText: "So you know the car’s condition before you decide.",
    },
    experience: {
      heading: "Experience makes the difference",
      body: "More than 30 years of practical experience in vehicle maintenance and repair, with earlier experience in sports cars, tuning, and vehicle preparation.",
      support: "That experience helps the workshop approach diagnosis and repair in a practical, careful way.",
      photoAlt: "The mechanic at the Turki Car workshop",
    },
    trust: {
      heading: "Why Turki Car",
      points: [
        "Long practical experience",
        "Diagnosis and inspection before repair",
        "Routine maintenance and a range of repairs",
        "Pre-purchase inspection",
        "Direct contact by phone and WhatsApp",
      ],
    },
    process: {
      heading: "How we work",
      intro: "Three clear steps.",
      steps: [
        {
          title: "Get in touch",
          text: "Call or send a message.",
        },
        {
          title: "Inspect the car",
          text: "We identify the problem and explain the condition.",
        },
        {
          title: "Repair",
          text: "We start the work after we agree.",
        },
      ],
    },
    contact: {
      heading: "Need an inspection or maintenance?",
      body: "Get in touch and we’ll help you understand the problem.",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      locationLabel: "Location",
      hoursLabel: "Working hours",
    },
    location: {
      heading: "Our location",
      intro: "The workshop on Google Maps.",
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

export type Locale = "ar" | "en" | "ru";

export type ServiceId =
  | "engine"
  | "transmission"
  | "suspension"
  | "diagnostics"
  | "inspection";

export type WorkshopServiceId =
  | "checkup"
  | "fluids"
  | "ac"
  | "suspension"
  | "mechanical"
  | "electrical"
  | "detailing"
  | "wheels";

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
    items: {
      id: WorkshopServiceId;
      title: string;
      href: string;
      options: { id: string; label: string }[];
    }[];
    booking: {
      title: string;
      date: string;
      time: string;
      name: string;
      phone: string;
      vehicle: string;
      confirm: string;
      close: string;
      missing: string;
      summary: string;
    };
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
      { href: "#services", label: "فحص قبل الشراء" },
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
      title: "عندك مشكلة في سيارتك؟ نساعدك في حلها.",
      support:
        "ورشة لإصلاح وصيانة السيارات. من الصيانة الدورية إلى أعطال المحرك والقير والعفشة والكمبيوتر، مع فحص السيارة قبل الشراء.",
      chips: [
        { id: "engine", label: "المحرك", href: "#services" },
        { id: "transmission", label: "القير", href: "#services" },
        { id: "suspension", label: "العفشة", href: "#services" },
        { id: "diagnostics", label: "فحص الكمبيوتر", href: "#services" },
        { id: "inspection", label: "فحص السيارة قبل الشراء", href: "#services" },
      ],
      imageAlt: "ورشة تركي كار",
    },
    services: {
      heading: "خدماتنا",
      intro: "أعمال الصيانة والتشخيص التي ننفذها في الورشة.",
      note: "ومن الصيانة الدورية والإصلاحات اليومية إلى الأعطال الأكبر، نساعدك في فحص السيارة وتحديد ما تحتاجه.",
      items: [
        {
          id: "checkup",
          title: "فحص السيارة قبل الشراء",
          href: "#services",
          options: [
            { id: "full", label: "فحص شامل" },
            { id: "partial", label: "فحص جزئي" },
          ],
        },
        {
          id: "fluids",
          title: "تغيير الزيوت والسوائل",
          href: "#services",
          options: [
            { id: "engine-oil", label: "زيت المحرك" },
            { id: "gearbox-oil", label: "زيت القير / ناقل الحركة" },
            { id: "differential-oil", label: "زيت الدفرنس" },
            { id: "other-fluids", label: "سوائل أخرى" },
          ],
        },
        {
          id: "ac",
          title: "إصلاح التكييف",
          href: "#services",
          options: [
            { id: "diagnostics", label: "تشخيص التكييف" },
            { id: "refill", label: "تعبئة الفريون" },
            { id: "repair", label: "إصلاح التكييف" },
          ],
        },
        {
          id: "suspension",
          title: "العفشة والهيكل",
          href: "#services",
          options: [
            { id: "inspection", label: "فحص وإصلاح العفشة" },
            { id: "shocks", label: "المساعدات" },
            { id: "arms", label: "المقصات والجلب" },
            { id: "brakes", label: "خدمة نظام الفرامل" },
            { id: "other", label: "أعمال أخرى في الهيكل" },
          ],
        },
        {
          id: "mechanical",
          title: "الإصلاح الميكانيكي",
          href: "#services",
          options: [
            { id: "engine", label: "إصلاح المحرك" },
            { id: "gearbox", label: "إصلاح القير / ناقل الحركة" },
            { id: "other", label: "إصلاح ميكانيكي آخر" },
          ],
        },
        {
          id: "electrical",
          title: "إصلاح كهرباء السيارة",
          href: "#services",
          options: [
            { id: "diagnostics", label: "تشخيص كهرباء السيارة" },
            { id: "wiring", label: "إصلاح التمديدات الكهربائية" },
            { id: "other", label: "إصلاح كهربائي آخر" },
          ],
        },
        {
          id: "detailing",
          title: "التنظيف والتلميع",
          href: "#services",
          options: [
            { id: "interior", label: "تنظيف داخلي" },
            { id: "polishing", label: "تلميع" },
            { id: "wash", label: "غسيل السيارة" },
            { id: "engine-bay", label: "تنظيف غرفة المحرك" },
            { id: "underbody", label: "تنظيف أسفل السيارة" },
            { id: "full", label: "تلميع وتفصيل كامل" },
          ],
        },
        {
          id: "wheels",
          title: "إصلاح الجنوط",
          href: "#services",
          options: [
            { id: "repair", label: "إصلاح الجنط" },
            { id: "straightening", label: "تعديل الجنط" },
          ],
        },
      ],
      booking: {
        title: "حجز موعد",
        date: "التاريخ",
        time: "الوقت",
        name: "الاسم",
        phone: "الجوال",
        vehicle: "السيارة",
        confirm: "تأكيد الحجز",
        close: "إغلاق",
        missing: "أكمل البيانات المطلوبة",
        summary: "طلب الحجز",
      },
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
      { href: "#services", label: "Pre-Purchase Inspection" },
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
      title: "Car problem? We’ll find the right solution.",
      support:
        "A workshop for repair and routine maintenance, from engine, transmission, and suspension work to computer diagnostics and a pre-purchase inspection.",
      chips: [
        { id: "engine", label: "Engine", href: "#services" },
        { id: "transmission", label: "Transmission", href: "#services" },
        { id: "suspension", label: "Suspension", href: "#services" },
        { id: "diagnostics", label: "Computer check", href: "#services" },
        { id: "inspection", label: "Pre-Purchase Inspection", href: "#services" },
      ],
      imageAlt: "Turki Car workshop",
    },
    services: {
      heading: "Our services",
      intro: "The maintenance and diagnostic work we do in the workshop.",
      note: "From routine maintenance and everyday repairs to larger faults, we help you check the car and see what it needs.",
      items: [
        {
          id: "checkup",
          title: "Pre-Purchase Inspection",
          href: "#services",
          options: [
            { id: "full", label: "Full Inspection" },
            { id: "partial", label: "Partial Inspection" },
          ],
        },
        {
          id: "fluids",
          title: "Oil & Fluid Changes",
          href: "#services",
          options: [
            { id: "engine-oil", label: "Engine Oil" },
            { id: "gearbox-oil", label: "Gearbox / Transmission Oil" },
            { id: "differential-oil", label: "Differential Oil" },
            { id: "other-fluids", label: "Other Fluid Changes" },
          ],
        },
        {
          id: "ac",
          title: "A/C Repair",
          href: "#services",
          options: [
            { id: "diagnostics", label: "A/C Diagnostics" },
            { id: "refill", label: "Refrigerant Refill" },
            { id: "repair", label: "A/C Repair" },
          ],
        },
        {
          id: "suspension",
          title: "Suspension / Chassis",
          href: "#services",
          options: [
            { id: "inspection", label: "Suspension Inspection / Repair" },
            { id: "shocks", label: "Shock Absorbers" },
            { id: "arms", label: "Control Arms / Bushings" },
            { id: "brakes", label: "Brake System Service" },
            { id: "other", label: "Other Chassis Work" },
          ],
        },
        {
          id: "mechanical",
          title: "Mechanical Repair",
          href: "#services",
          options: [
            { id: "engine", label: "Engine Repair" },
            { id: "gearbox", label: "Gearbox / Transmission Repair" },
            { id: "other", label: "Other Mechanical Repair" },
          ],
        },
        {
          id: "electrical",
          title: "Auto Electrical Repair",
          href: "#services",
          options: [
            { id: "diagnostics", label: "Electrical Diagnostics" },
            { id: "wiring", label: "Wiring Repair" },
            { id: "other", label: "Other Electrical Repair" },
          ],
        },
        {
          id: "detailing",
          title: "Cleaning & Detailing",
          href: "#services",
          options: [
            { id: "interior", label: "Interior Cleaning" },
            { id: "polishing", label: "Polishing" },
            { id: "wash", label: "Car Wash" },
            { id: "engine-bay", label: "Engine Bay Cleaning" },
            { id: "underbody", label: "Underbody Cleaning" },
            { id: "full", label: "Full Detailing" },
          ],
        },
        {
          id: "wheels",
          title: "Wheel / Rim Repair",
          href: "#services",
          options: [
            { id: "repair", label: "Rim Repair" },
            { id: "straightening", label: "Rim Straightening" },
          ],
        },
      ],
      booking: {
        title: "Book an appointment",
        date: "Date",
        time: "Time",
        name: "Name",
        phone: "Phone",
        vehicle: "Vehicle",
        confirm: "Confirm booking",
        close: "Close",
        missing: "Complete the required fields",
        summary: "Booking request",
      },
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
  ru: {
    metaTitle: "Turki Car | Ремонт и диагностика автомобилей",
    languageLabel: "Язык",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    navLabel: "Навигация",
    nav: [
      { href: "#services", label: "Услуги" },
      { href: "#services", label: "Проверка перед покупкой" },
      { href: "#process", label: "Как мы работаем" },
      { href: "#contact", label: "Контакты" },
      { href: "#location", label: "Адрес" },
    ],
    cta: {
      call: "Позвонить",
      whatsapp: "WhatsApp",
      bookInspection: "Записать на проверку",
      learnMore: "Подробнее",
    },
    placeholders: {
      phone: "[Телефон]",
      whatsapp: "[Ссылка WhatsApp]",
      location: "[Адрес]",
      hours: "[Часы работы]",
    },
    hero: {
      eyebrow: "Автомастерская",
      title: "Проблема с машиной? Найдём решение.",
      support:
        "Мастерская по ремонту и обслуживанию: от регулярного ТО до двигателя, коробки, подвески и компьютерной диагностики, а также проверка перед покупкой.",
      chips: [
        { id: "engine", label: "Двигатель", href: "#services" },
        { id: "transmission", label: "Коробка", href: "#services" },
        { id: "suspension", label: "Подвеска", href: "#services" },
        { id: "diagnostics", label: "Компьютерная диагностика", href: "#services" },
        { id: "inspection", label: "Проверка перед покупкой", href: "#services" },
      ],
      imageAlt: "Мастерская Turki Car",
    },
    services: {
      heading: "Услуги",
      intro: "Обслуживание и диагностика, которые мы делаем в мастерской.",
      note: "От регулярного обслуживания и повседневного ремонта до более серьёзных неисправностей: проверяем автомобиль и объясняем, что ему нужно.",
      items: [
        {
          id: "checkup",
          title: "Проверка перед покупкой",
          href: "#services",
          options: [
            { id: "full", label: "Полная проверка" },
            { id: "partial", label: "Частичная проверка" },
          ],
        },
        {
          id: "fluids",
          title: "Замена масел и жидкостей",
          href: "#services",
          options: [
            { id: "engine-oil", label: "Моторное масло" },
            { id: "gearbox-oil", label: "Масло коробки передач" },
            { id: "differential-oil", label: "Масло дифференциала" },
            { id: "other-fluids", label: "Другие жидкости" },
          ],
        },
        {
          id: "ac",
          title: "Ремонт кондиционера",
          href: "#services",
          options: [
            { id: "diagnostics", label: "Диагностика кондиционера" },
            { id: "refill", label: "Заправка хладагента" },
            { id: "repair", label: "Ремонт кондиционера" },
          ],
        },
        {
          id: "suspension",
          title: "Подвеска и ходовая",
          href: "#services",
          options: [
            { id: "inspection", label: "Проверка и ремонт подвески" },
            { id: "shocks", label: "Амортизаторы" },
            { id: "arms", label: "Рычаги и сайлентблоки" },
            { id: "brakes", label: "Тормозная система" },
            { id: "other", label: "Другие работы по ходовой" },
          ],
        },
        {
          id: "mechanical",
          title: "Механический ремонт",
          href: "#services",
          options: [
            { id: "engine", label: "Ремонт двигателя" },
            { id: "gearbox", label: "Ремонт коробки передач" },
            { id: "other", label: "Другой механический ремонт" },
          ],
        },
        {
          id: "electrical",
          title: "Ремонт автоэлектрики",
          href: "#services",
          options: [
            { id: "diagnostics", label: "Диагностика электрики" },
            { id: "wiring", label: "Ремонт проводки" },
            { id: "other", label: "Другой электроремонт" },
          ],
        },
        {
          id: "detailing",
          title: "Мойка и детейлинг",
          href: "#services",
          options: [
            { id: "interior", label: "Химчистка салона" },
            { id: "polishing", label: "Полировка" },
            { id: "wash", label: "Мойка" },
            { id: "engine-bay", label: "Мойка моторного отсека" },
            { id: "underbody", label: "Мойка днища" },
            { id: "full", label: "Полный детейлинг" },
          ],
        },
        {
          id: "wheels",
          title: "Ремонт дисков",
          href: "#services",
          options: [
            { id: "repair", label: "Ремонт диска" },
            { id: "straightening", label: "Правка диска" },
          ],
        },
      ],
      booking: {
        title: "Запись",
        date: "Дата",
        time: "Время",
        name: "Имя",
        phone: "Телефон",
        vehicle: "Автомобиль",
        confirm: "Подтвердить запись",
        close: "Закрыть",
        missing: "Заполните обязательные поля",
        summary: "Заявка на запись",
      },
    },
    experience: {
      heading: "Опыт решает",
      body: "Более 30 лет практического опыта в обслуживании и ремонте автомобилей, включая работу со спортивными автомобилями, тюнингом и подготовкой.",
      support: "Этот опыт помогает подходить к диагностике и ремонту практично и внимательно.",
      photoAlt: "Механик в мастерской Turki Car",
    },
    trust: {
      heading: "Почему Turki Car",
      points: [
        "Большой практический опыт",
        "Диагностика и проверка до ремонта",
        "Регулярное обслуживание и разные виды ремонта",
        "Проверка перед покупкой",
        "Прямая связь по телефону и WhatsApp",
      ],
    },
    process: {
      heading: "Как мы работаем",
      intro: "Три понятных шага.",
      steps: [
        {
          title: "Свяжитесь с нами",
          text: "Позвоните или напишите.",
        },
        {
          title: "Проверяем автомобиль",
          text: "Определяем проблему и объясняем состояние.",
        },
        {
          title: "Ремонт",
          text: "Начинаем работу после согласования.",
        },
      ],
    },
    contact: {
      heading: "Нужна проверка или обслуживание?",
      body: "Свяжитесь с нами, и мы поможем разобраться в проблеме.",
      phoneLabel: "Телефон",
      whatsappLabel: "WhatsApp",
      locationLabel: "Адрес",
      hoursLabel: "Часы работы",
    },
    location: {
      heading: "Наш адрес",
      intro: "Мастерская на Google Картах.",
      mapsCta: "Открыть в Google Картах",
    },
    footer: {
      blurb: "Мастерская по ремонту автомобилей и диагностике неисправностей.",
      servicesHeading: "Услуги",
      contactHeading: "Контакты",
      rights: "Все права защищены.",
    },
  },
};

const RESERVATION_STATUSES = ["pending", "confirmed", "declined", "cancelled"];
const TESTIMONIAL_STATUSES = ["pending", "approved", "rejected", "archived"];
const CONTENT_STATUSES = ["draft", "published", "archived"];

const trim = (value) => String(value ?? "").trim();

const parseInteger = (value, fallback = 0) => {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parsePercent = (value, fallback = 50) => {
  const parsed = parseInteger(value, fallback);
  return Math.min(100, Math.max(0, parsed));
};

const ensureOneOf = (value, values, message) => {
  if (!values.includes(value)) {
    throw new Error(message);
  }

  return value;
};

export const normalizeReservationUpdate = (input) => ({
  customer_name: trim(input.customer_name),
  email: trim(input.email).toLowerCase(),
  phone: trim(input.phone),
  party_size: parseInteger(input.party_size),
  requested_date: trim(input.requested_date),
  requested_time: trim(input.requested_time),
  occasion: trim(input.occasion),
  notes: trim(input.notes),
  status: ensureOneOf(
    input.status,
    RESERVATION_STATUSES,
    "Unsupported reservation status.",
  ),
  staff_notes: trim(input.staff_notes),
});

export const normalizeTestimonialUpdate = (input) => ({
  status: ensureOneOf(
    input.status,
    TESTIMONIAL_STATUSES,
    "Unsupported testimonial status.",
  ),
  is_featured: Boolean(input.is_featured),
  customer_name: trim(input.customer_name),
  message: trim(input.message),
});

export const normalizeMenuItemPayload = (input) => ({
  category_id: trim(input.category_id),
  name: trim(input.name),
  description: trim(input.description),
  price_inr: parseInteger(input.price ?? input.price_inr),
  dietary_tags: Array.isArray(input.dietary_tags)
    ? input.dietary_tags.map(trim).filter(Boolean)
    : trim(input.dietary_tags)
        .split(",")
        .map(trim)
        .filter(Boolean),
  image_url: trim(input.image_url),
  image_position_x: parsePercent(input.image_position_x),
  image_position_y: parsePercent(input.image_position_y),
  is_available: Boolean(input.is_available),
  status: ensureOneOf(input.status, CONTENT_STATUSES, "Unsupported content status."),
  sort_order: parseInteger(input.sort_order),
});

export const normalizeCategoryPayload = (input) => ({
  name: trim(input.name),
  slug: trim(input.slug || input.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  description: trim(input.description),
  image_url: trim(input.image_url),
  video_url: trim(input.video_url),
  image_position_x: parsePercent(input.image_position_x),
  image_position_y: parsePercent(input.image_position_y),
  sort_order: parseInteger(input.sort_order),
  status: ensureOneOf(input.status || "published", CONTENT_STATUSES, "Unsupported content status."),
});

export const normalizeContentPayload = (input) => ({
  key: trim(input.key),
  title: trim(input.title),
  eyebrow: trim(input.eyebrow),
  body: trim(input.body),
  data: input.data && typeof input.data === "object" ? input.data : {},
  status: ensureOneOf(input.status || "draft", CONTENT_STATUSES, "Unsupported content status."),
});

export const normalizeMediaAssetPayload = (input) => ({
  title: trim(input.title),
  alt_text: trim(input.alt_text),
  caption: trim(input.caption),
  category_id: trim(input.category_id),
  storage_path: trim(input.storage_path),
  public_url: trim(input.public_url),
  image_position_x: parsePercent(input.image_position_x),
  image_position_y: parsePercent(input.image_position_y),
  sort_order: parseInteger(input.sort_order),
  status: ensureOneOf(input.status || "draft", CONTENT_STATUSES, "Unsupported content status."),
});

export const normalizeSiteBasicsPayload = (input) => ({
  key: "site_basics",
  value: {
    hours: {
      openClose: trim(input.openClose),
    },
    contact: {
      phone: trim(input.phone),
      email: trim(input.email),
      address: trim(input.address),
    },
    links: {
      directions: trim(input.directionsUrl),
      instagram: trim(input.instagramUrl),
    },
    notice: {
      enabled: Boolean(input.noticeEnabled),
      text: trim(input.noticeText),
    },
  },
  status: "published",
});

const cardFromFields = (input, group, index, includeTime = false) => {
  const card = {
    title: trim(input[`${group}Title${index}`]),
    body: trim(input[`${group}Body${index}`]),
  };

  if (includeTime) {
    card.time = trim(input[`${group}Time${index}`]);
  }

  return card;
};

const filledCards = (cards) => cards.filter((card) => card.title || card.body || card.time);

const itemFromFields = (input, index) => ({
  title: trim(input[`signatureItemTitle${index}`]),
  body: trim(input[`signatureItemBody${index}`]),
  price: trim(input[`signatureItemPrice${index}`]),
  imageUrl: trim(input[`signatureItemImageUrl${index}`]),
  imagePositionX: parsePercent(input[`signatureItemImagePositionX${index}`]),
  imagePositionY: parsePercent(input[`signatureItemImagePositionY${index}`]),
});

const filledItems = (items) => items.filter((item) => item.title || item.body || item.price || item.imageUrl);

const offerFromFields = (input, index) => ({
  badge: trim(input[`offerBadge${index}`]),
  title: trim(input[`offerTitle${index}`]),
  body: trim(input[`offerBody${index}`]),
});

const filledOffers = (offers) => offers.filter((offer) => offer.badge || offer.title || offer.body);

export const normalizeHomepageSections = (input) => [
  {
    key: "hero",
    eyebrow: trim(input.heroEyebrow),
    title: trim(input.heroTitle),
    body: trim(input.heroSubtitle),
    data: {
      primaryButtonLabel: trim(input.primaryButtonLabel),
      primaryButtonPath: trim(input.primaryButtonPath),
    },
    status: "published",
  },
  {
    key: "stay_longer",
    eyebrow: "Why people stay longer",
    title: "Why People Stay Longer",
    body: "",
    data: {
      cards: filledCards([
        cardFromFields(input, "stay", 1),
        cardFromFields(input, "stay", 2),
        cardFromFields(input, "stay", 3),
      ]),
    },
    status: "published",
  },
  {
    key: "daily_ritual",
    eyebrow: "Daily ritual",
    title: "The Rhythm of the Day",
    body: "",
    data: {
      cards: filledCards([
        cardFromFields(input, "ritual", 1, true),
        cardFromFields(input, "ritual", 2, true),
        cardFromFields(input, "ritual", 3, true),
      ]),
    },
    status: "published",
  },
  {
    key: "notice",
    eyebrow: "",
    title: "Homepage notice",
    body: trim(input.noticeText),
    data: {
      enabled: Boolean(input.noticeEnabled),
    },
    status: "published",
  },
  {
    key: "signature_offering",
    eyebrow: trim(input.signatureEyebrow),
    title: trim(input.signatureTitle),
    body: "",
    data: {
      items: filledItems([1, 2, 3, 4].map((index) => itemFromFields(input, index))),
    },
    status: "published",
  },
  {
    key: "offers",
    eyebrow: trim(input.offersEyebrow),
    title: trim(input.offersTitle),
    body: "",
    data: {
      offers: filledOffers([1, 2, 3].map((index) => offerFromFields(input, index))),
    },
    status: "published",
  },
];

const joinParagraphs = (...paragraphs) => paragraphs.map(trim).filter(Boolean).join("\n\n");

export const normalizeCafeSections = (input) => [
  {
    key: "story",
    eyebrow: trim(input.storyEyebrow),
    title: trim(input.storyTitle),
    body: joinParagraphs(input.storyBody1, input.storyBody2),
    data: {
      quote: trim(input.storyQuote),
    },
    status: "published",
  },
  {
    key: "founders",
    eyebrow: "The People Behind",
    title: trim(input.foundersTitle),
    body: "",
    data: {
      people: [
        {
          name: trim(input.founder1Name),
          role: trim(input.founder1Role),
          bio: trim(input.founder1Bio),
        },
        {
          name: trim(input.founder2Name),
          role: trim(input.founder2Role),
          bio: trim(input.founder2Bio),
        },
      ].filter((person) => person.name || person.bio),
    },
    status: "published",
  },
  {
    key: "interior",
    eyebrow: "Interior Philosophy",
    title: trim(input.interiorTitle),
    body: joinParagraphs(input.interiorBody1, input.interiorBody2),
    data: {},
    status: "published",
  },
  {
    key: "city",
    eyebrow: "Why Here",
    title: trim(input.cityTitle),
    body: trim(input.cityBody),
    data: {
      quote: trim(input.cityQuote),
    },
    status: "published",
  },
  {
    key: "press",
    eyebrow: "For Media",
    title: trim(input.pressTitle),
    body: trim(input.pressBody),
    data: {},
    status: "published",
  },
];

export const isPublishedRow = (row) =>
  Boolean(row && row.status === "published" && row.is_available !== false);

export const toMomentPublicAsset = (row) => ({
  id: row.id,
  title: row.title,
  alt: row.alt_text || row.title,
  imageUrl: row.public_url,
  imagePosition: `${parsePercent(row.image_position_x)}% ${parsePercent(row.image_position_y)}%`,
  category: String(row.category?.name || row.category_name || "Moments").toUpperCase(),
});

export const groupMenuItemsByCategory = (categories = [], items = []) =>
  categories
    .filter(isPublishedRow)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((category) => ({
      ...category,
      items: items
        .filter((item) => item.category_id === category.id && isPublishedRow(item))
        .sort((a, b) => a.sort_order - b.sort_order),
    }))
    .filter((category) => category.items.length > 0);

export const toPublicMenuSections = (sections = [], fallbackSections = []) => {
  const usedKeys = new Set();
  const toUniqueKey = (section, index) => {
    const baseKey = trim(section.key || section.slug || section.id || section.name || `section-${index + 1}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index + 1}`;
    let key = baseKey;
    let suffix = 2;

    while (usedKeys.has(key)) {
      key = `${baseKey}-${suffix}`;
      suffix += 1;
    }

    usedKeys.add(key);
    return key;
  };

  return sections.map((section, index) => {
    const fallback = fallbackSections[index] ?? {};
    const key = toUniqueKey(section, index);
    const imageMap = section.imageMap || fallback.imageMap || {};
    const defaultImg = section.image_url
      ? `url('${section.image_url}')`
      : section.defaultImg || fallback.defaultImg;

    return {
      ...fallback,
      ...section,
      key,
      title: section.name || section.title || fallback.title || "Menu",
      defaultImg,
      imageMap,
      caption: section.caption || section.description || fallback.caption || section.name || "Menu",
      reverse: typeof section.reverse === "boolean"
        ? section.reverse
        : typeof fallback.reverse === "boolean"
          ? fallback.reverse
          : index % 2 === 1,
      items: Array.isArray(section.items) ? section.items : [],
    };
  });
};

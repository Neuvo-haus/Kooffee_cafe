import { describe, expect, it } from "vitest";
import {
  groupMenuItemsByCategory,
  isPublishedRow,
  normalizeCafeSections,
  normalizeCategoryPayload,
  normalizeHomepageSections,
  normalizeMenuItemPayload,
  normalizeReservationUpdate,
  normalizeSiteBasicsPayload,
  normalizeTestimonialUpdate,
  toPublicMenuSections,
  toMomentPublicAsset,
} from "./cms";

describe("admin cms helpers", () => {
  it("normalizes menu item form values for Supabase writes", () => {
    expect(
      normalizeMenuItemPayload({
        category_id: "cat-1",
        name: " Saffron Latte ",
        description: " House espresso with saffron ",
        price: "320",
        dietary_tags: "vegetarian, signature",
        image_url: " https://cdn.example/saffron.jpg ",
        image_position_x: "25",
        image_position_y: "65",
        is_available: true,
        status: "published",
        sort_order: "4",
      }),
    ).toEqual({
      category_id: "cat-1",
      name: "Saffron Latte",
      description: "House espresso with saffron",
      price_inr: 320,
      dietary_tags: ["vegetarian", "signature"],
      image_url: "https://cdn.example/saffron.jpg",
      image_position_x: 25,
      image_position_y: 65,
      is_available: true,
      status: "published",
      sort_order: 4,
    });
  });

  it("normalizes menu category media fields for Supabase writes", () => {
    expect(
      normalizeCategoryPayload({
        name: " Coffee ",
        description: " Espresso and slow brews ",
        image_url: " https://cdn.example/coffee.jpg ",
        video_url: " https://cdn.example/coffee.mp4 ",
        image_position_x: "40",
        image_position_y: "70",
        sort_order: "2",
        status: "published",
      }),
    ).toEqual({
      name: "Coffee",
      slug: "coffee",
      description: "Espresso and slow brews",
      image_url: "https://cdn.example/coffee.jpg",
      video_url: "https://cdn.example/coffee.mp4",
      image_position_x: 40,
      image_position_y: 70,
      sort_order: 2,
      status: "published",
    });
  });

  it("keeps category media on public menu groups", () => {
    expect(
      groupMenuItemsByCategory(
        [
          {
            id: "cat-1",
            name: "Coffee",
            status: "published",
            sort_order: 1,
            image_url: "https://cdn.example/coffee.jpg",
            video_url: "https://cdn.example/coffee.mp4",
          },
        ],
        [
          {
            id: "item-1",
            category_id: "cat-1",
            name: "Latte",
            status: "published",
            sort_order: 1,
            image_url: "https://cdn.example/latte.jpg",
          },
        ],
      ),
    ).toEqual([
      expect.objectContaining({
        image_url: "https://cdn.example/coffee.jpg",
        video_url: "https://cdn.example/coffee.mp4",
        items: [
          expect.objectContaining({
            image_url: "https://cdn.example/latte.jpg",
          }),
        ],
      }),
    ]);
  });

  it("maps CMS menu categories without reusing hardcoded three-section keys", () => {
    const sections = toPublicMenuSections(
      [
        { id: "cat-1", slug: "coffee", name: "Coffee", items: [{ name: "Latte" }] },
        { id: "cat-2", slug: "tea", name: "Tea", items: [{ name: "Chai" }] },
        { id: "cat-3", slug: "food", name: "Food", items: [{ name: "Toast" }] },
        {
          id: "cat-4",
          slug: "desserts",
          name: "Desserts",
          image_url: "https://cdn.example/desserts.jpg",
          items: [{ name: "Cake", image_url: "https://cdn.example/cake.jpg" }],
        },
      ],
      [
        { key: "coffee", defaultImg: "coffee.jpg", imageMap: { Latte: "latte.jpg" } },
        { key: "tea", defaultImg: "tea.jpg", imageMap: { Chai: "chai.jpg" }, reverse: true },
        { key: "food", defaultImg: "food.jpg", imageMap: { Toast: "toast.jpg" } },
      ],
    );

    expect(sections.map((section) => section.key)).toEqual([
      "coffee",
      "tea",
      "food",
      "desserts",
    ]);
    expect(sections[3]).toMatchObject({
      title: "Desserts",
      defaultImg: "url('https://cdn.example/desserts.jpg')",
      imageMap: {},
      reverse: true,
      caption: "Desserts",
    });
  });

  it("normalizes reservation status updates", () => {
    expect(
      normalizeReservationUpdate({
        status: "confirmed",
        staff_notes: " Window table ",
      }),
    ).toEqual({
      status: "confirmed",
      staff_notes: "Window table",
    });
  });

  it("rejects unsupported testimonial statuses", () => {
    expect(() =>
      normalizeTestimonialUpdate({ status: "deleted", is_featured: true }),
    ).toThrow("Unsupported testimonial status.");
  });

  it("filters public rows to published content only", () => {
    expect(isPublishedRow({ status: "published" })).toBe(true);
    expect(isPublishedRow({ status: "draft" })).toBe(false);
    expect(isPublishedRow({ status: "published", is_available: false })).toBe(
      false,
    );
  });

  it("maps storage-backed moment rows for public rendering", () => {
    expect(
      toMomentPublicAsset({
        id: "asset-1",
        title: "Quiet afternoon",
        alt_text: "A quiet afternoon table",
        public_url: "https://cdn.example/moment.jpg",
        image_position_x: 35,
        image_position_y: 80,
        category: { name: "Quiet Afternoons" },
      }),
    ).toEqual({
      id: "asset-1",
      title: "Quiet afternoon",
      alt: "A quiet afternoon table",
      imageUrl: "https://cdn.example/moment.jpg",
      imagePosition: "35% 80%",
      category: "QUIET AFTERNOONS",
    });
  });

  it("normalizes non-coder site basics settings", () => {
    expect(
      normalizeSiteBasicsPayload({
        openClose: " 7 AM - 9 PM ",
        phone: " +91 98765 43210 ",
        email: " hello@kooffee.test ",
        address: " Ahmedabad ",
        directionsUrl: " https://maps.example ",
        instagramUrl: " https://instagram.example/kooffee ",
        noticeText: " Weekend brunch starts at 9 ",
        noticeEnabled: true,
      }),
    ).toEqual({
      key: "site_basics",
      value: {
        hours: { openClose: "7 AM - 9 PM" },
        contact: {
          phone: "+91 98765 43210",
          email: "hello@kooffee.test",
          address: "Ahmedabad",
        },
        links: {
          directions: "https://maps.example",
          instagram: "https://instagram.example/kooffee",
        },
        notice: {
          enabled: true,
          text: "Weekend brunch starts at 9",
        },
      },
      status: "published",
    });
  });

  it("normalizes non-coder homepage fields into CMS sections", () => {
    expect(
      normalizeHomepageSections({
        heroEyebrow: " Est. Ahmedabad ",
        heroTitle: " Kooffee cafe in Ahmedabad ",
        heroSubtitle: " Specialty coffee. Slow mornings. ",
        primaryButtonLabel: " View menu ",
        primaryButtonPath: "/menu",
        stayTitle1: " Slow Morning ",
        stayBody1: " Stay as long as you need. ",
        stayTitle2: " Deep Conversation ",
        stayBody2: " Pull up a chair. ",
        stayTitle3: " Quick Focus ",
        stayBody3: " Plug in, tune out. ",
        ritualTitle1: " Golden Hour ",
        ritualBody1: " Fresh pastries and specialty brews. ",
        ritualTime1: " 7-10 AM ",
        signatureEyebrow: " Signature Offering ",
        signatureTitle: " What We Serve ",
        signatureItemTitle1: " Espresso Macchiato ",
        signatureItemBody1: " Rich espresso marked with milk. ",
        signatureItemPrice1: " ₹180 ",
        signatureItemImageUrl1: " https://cdn.example/espresso.jpg ",
        signatureItemImagePositionX1: "35",
        signatureItemImagePositionY1: "70",
        offersEyebrow: " This Week ",
        offersTitle: " Slow Hour Offers ",
        offerBadge1: " Mon-Fri ",
        offerTitle1: " Morning Pour ",
        offerBody1: " Complimentary biscotti with any pour over before 10 AM. ",
        noticeEnabled: true,
        noticeText: " Open late this Friday. ",
      }),
    ).toEqual([
      {
        key: "hero",
        eyebrow: "Est. Ahmedabad",
        title: "Kooffee cafe in Ahmedabad",
        body: "Specialty coffee. Slow mornings.",
        data: {
          primaryButtonLabel: "View menu",
          primaryButtonPath: "/menu",
        },
        status: "published",
      },
      {
        key: "stay_longer",
        eyebrow: "Why people stay longer",
        title: "Why People Stay Longer",
        body: "",
        data: {
          cards: [
            { title: "Slow Morning", body: "Stay as long as you need." },
            { title: "Deep Conversation", body: "Pull up a chair." },
            { title: "Quick Focus", body: "Plug in, tune out." },
          ],
        },
        status: "published",
      },
      {
        key: "daily_ritual",
        eyebrow: "Daily ritual",
        title: "The Rhythm of the Day",
        body: "",
        data: {
          cards: [
            { title: "Golden Hour", body: "Fresh pastries and specialty brews.", time: "7-10 AM" },
          ],
        },
        status: "published",
      },
      {
        key: "notice",
        eyebrow: "",
        title: "Homepage notice",
        body: "Open late this Friday.",
        data: { enabled: true },
        status: "published",
      },
      {
        key: "signature_offering",
        eyebrow: "Signature Offering",
        title: "What We Serve",
        body: "",
        data: {
          items: [
            {
              title: "Espresso Macchiato",
              body: "Rich espresso marked with milk.",
              price: "₹180",
              imageUrl: "https://cdn.example/espresso.jpg",
              imagePositionX: 35,
              imagePositionY: 70,
            },
          ],
        },
        status: "published",
      },
      {
        key: "offers",
        eyebrow: "This Week",
        title: "Slow Hour Offers",
        body: "",
        data: {
          offers: [
            {
              badge: "Mon-Fri",
              title: "Morning Pour",
              body: "Complimentary biscotti with any pour over before 10 AM.",
            },
          ],
        },
        status: "published",
      },
    ]);
  });

  it("normalizes non-coder cafe fields into CMS sections", () => {
    expect(
      normalizeCafeSections({
        storyEyebrow: " Our Story ",
        storyTitle: " Why This Space Exists ",
        storyQuote: " We built a reason to slow down. ",
        storyBody1: " Ahmedabad moves fast. ",
        storyBody2: " We wanted to honor a slower pace. ",
        foundersTitle: " Founded on Friendship ",
        founder1Name: " Malhar Thakar ",
        founder1Role: " Co-Founder ",
        founder1Bio: " Old city stories over coffee. ",
        founder2Name: " Puja Joshi ",
        founder2Role: " Co-Founder ",
        founder2Bio: " Food should nourish more than the body. ",
        interiorTitle: " The Space Itself ",
        interiorBody1: " Reclaimed teak tables. ",
        interiorBody2: " Warm lighting and quiet corners. ",
        cityTitle: " Why Ahmedabad ",
        cityBody: " Ahmedabad holds energy and calm. ",
        cityQuote: " Some cities wake up slowly. ",
        pressTitle: " Press Inquiries ",
        pressBody: " Specialty cafe in Ahmedabad. ",
      }),
    ).toEqual([
      {
        key: "story",
        eyebrow: "Our Story",
        title: "Why This Space Exists",
        body: "Ahmedabad moves fast.\n\nWe wanted to honor a slower pace.",
        data: { quote: "We built a reason to slow down." },
        status: "published",
      },
      {
        key: "founders",
        eyebrow: "The People Behind",
        title: "Founded on Friendship",
        body: "",
        data: {
          people: [
            { name: "Malhar Thakar", role: "Co-Founder", bio: "Old city stories over coffee." },
            { name: "Puja Joshi", role: "Co-Founder", bio: "Food should nourish more than the body." },
          ],
        },
        status: "published",
      },
      {
        key: "interior",
        eyebrow: "Interior Philosophy",
        title: "The Space Itself",
        body: "Reclaimed teak tables.\n\nWarm lighting and quiet corners.",
        data: {},
        status: "published",
      },
      {
        key: "city",
        eyebrow: "Why Here",
        title: "Why Ahmedabad",
        body: "Ahmedabad holds energy and calm.",
        data: { quote: "Some cities wake up slowly." },
        status: "published",
      },
      {
        key: "press",
        eyebrow: "For Media",
        title: "Press Inquiries",
        body: "Specialty cafe in Ahmedabad.",
        data: {},
        status: "published",
      },
    ]);
  });
});

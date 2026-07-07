const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const getViteEnv = () => {
  if (typeof import.meta === "undefined" || !import.meta.env) {
    return {};
  }

  return import.meta.env;
};

const trimValue = (value) => String(value ?? "").trim();

const toReservationTemplateParams = (reservation) => ({
  to_email: reservation.email,
  customer_name: reservation.customer_name,
  customer_email: reservation.email,
  customer_phone: reservation.phone,
  party_size: String(reservation.party_size),
  requested_date: reservation.requested_date,
  requested_time: reservation.requested_time,
  occasion: reservation.occasion || "-",
  notes: reservation.notes || "-",
});

export const createEmailJsClient = (options) => {
  const env = options ? {} : getViteEnv();
  const {
    serviceId = env.VITE_EMAILJS_SERVICE_ID,
    publicKey = env.VITE_EMAILJS_PUBLIC_KEY,
    adminTemplateId = env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
    customerTemplateId = env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
    statusTemplateId = env.VITE_EMAILJS_STATUS_TEMPLATE_ID,
    fetchImpl = globalThis.fetch,
  } = options ?? {};
  const config = {
    serviceId: trimValue(serviceId),
    publicKey: trimValue(publicKey),
    adminTemplateId: trimValue(adminTemplateId),
    customerTemplateId: trimValue(customerTemplateId),
    statusTemplateId: trimValue(statusTemplateId),
  };
  const hasBaseConfig = Boolean(config.serviceId && config.publicKey);
  const isConfigured = Boolean(
    hasBaseConfig && config.adminTemplateId && config.customerTemplateId,
  );

  const sendTemplate = async (templateId, templateParams) => {
    if (!hasBaseConfig || !templateId) {
      return { skipped: true };
    }

    if (typeof fetchImpl !== "function") {
      throw new Error("Fetch is not available in this environment.");
    }

    const response = await fetchImpl(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: templateId,
        user_id: config.publicKey,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "EmailJS request failed.");
    }

    return { skipped: false };
  };

  return {
    isConfigured,
    sendReservationEmails: async (reservation) => {
      if (!isConfigured) {
        return { skipped: true };
      }

      const templateParams = toReservationTemplateParams(reservation);

      const adminEmail = await sendTemplate(config.adminTemplateId, {
        ...templateParams,
        to_email: "rshivam993909@gmail.com",
      });

      const customerEmail = await sendTemplate(
        config.customerTemplateId,
        templateParams,
      );

      return {
        skipped: adminEmail.skipped || customerEmail.skipped,
      };
    },
    sendReservationStatusEmail: async (reservation) => {
      const templateParams = {
        ...toReservationTemplateParams(reservation),
        reservation_status: reservation.status,
        staff_notes: reservation.staff_notes || "-",
      };

      return sendTemplate(config.statusTemplateId, templateParams);
    },
  };
};

export const emailJs = createEmailJsClient();

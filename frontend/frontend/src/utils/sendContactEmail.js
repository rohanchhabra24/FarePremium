import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_7mbiqha";
const TEMPLATE_ID = "template_3ysx36f";
const PUBLIC_KEY = "t1BMHcWgCaiJeHhUr";

export const sendContactEmail = async (data) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
};

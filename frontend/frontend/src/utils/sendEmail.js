import emailjs from "@emailjs/browser";

export const sendConfirmationEmail = (templateParams) => {
  return emailjs.send(
    "service_7mbiqha", // ✅ Your Service ID
    "template_ivuvqxk", // ✅ Your Template ID
    templateParams,
    "t1BMHcWgCaiJeHhUr" // 🔑 Replace with your actual EmailJS public key
  );
};

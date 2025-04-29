import emailjs from "@emailjs/browser";

export const sendConfirmationEmail = (templateParams) => {
  return emailjs.send(
    "service_7mbiqha", //Service ID
    "template_ivuvqxk", //Template ID
    templateParams,
    "t1BMHcWgCaiJeHhUr" // EmailJS public key
  );
};

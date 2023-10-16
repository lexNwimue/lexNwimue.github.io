const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  document.querySelector(".loading").classList.remove("d-none");
  document
    .querySelector(".loading")
    .classList.add("alert", "alert-info", "d-block");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // There seems to be an issue with nodemailer making the 'from' (sender's) address
  // my address, making me unable to identify the actual sender.
  // Hence, I am using the message body to get the sender's name and email as shown in the next line
  console.log({ name, email, subject, message });

  emailjs
    .send("service_uubdeax", "template_u77fs9y", {
      from_name: `${name} ${email}`,
      to_name: "Lex Nwimue",
      message: `${subject} - ${message}`,
      reply_to: email,
    })
    .then((info) => {
      if (info.status === 200) {
        document.querySelector(".loading").classList.remove("d-block");
        document.querySelector(".loading").classList.add("d-none");
        document.querySelector(".sent-message").classList.remove("d-none");
        document
          .querySelector(".sent-message")
          .classList.add("alert", "alert-success", "d-block");
        setTimeout(() => {
          document.querySelector(".sent-message").classList.remove("d-block");
          document.querySelector(".sent-message").classList.add("d-none");
          submitBtn.disabled = false;
        }, 5000);
      } else {
        document.querySelector(".sent-message").classList.remove("d-block");
        document.querySelector(".sent-message").classList.add("d-none");
        document.querySelector(".error-message").classList.remove("d-none");
        document
          .querySelector(".error-message")
          .classList.add("alert", "alert-danger", "d-block");
        setTimeout(() => {
          document.querySelector(".error-message").classList.remove("d-block");
          document.querySelector(".error-message").classList.add("d-none");
          submitBtn.disabled = false;
        }, 5000);
      }
    })
    .catch((err) => {
      (err) => console.err(err);
    });
});

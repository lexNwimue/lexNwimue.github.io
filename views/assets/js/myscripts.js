const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-message").value;

  const loadingDiv = document.getElementById("loading");
  const successDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("loading");

  submitBtn.disabled = true;
  loadingDiv.style.display = "block";
  const mail = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  fetch("/contact", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(mail),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingDiv.style.display = "none";
      successDiv.style.display = "block";

      if (data.err) {
        errorDiv.style.display = "block";
        loadingDiv.style.display = "none";
        submitBtn.disabled = false;
        setTimeout(() => {
          errorDiv.style.display = "none";
        }, 5000);
      }
    })
    .catch();
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const mail = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }

    console.log(mail);

    fetch("/contact", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(mail)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
});
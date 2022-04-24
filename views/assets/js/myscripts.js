const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('loading').classList.add('alert', 'alert-info', 'd-block');
    const mail = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }
    
    fetch("/contact", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(mail)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').classList.remove('d-block');
            document.getElementById('loading').classList.add('d-none');
            document.getElementById('sent-message').classList.remove('d-none');
            document.getElementById('sent-message').classList.add('alert', 'alert-success', 'd-block');
            setTimeout(() => {
                document.getElementById('sent-message').classList.remove('d-block');
                document.getElementById('sent-message').classList.add('d-none');
                submitBtn.disabled = false;
            }, 5000);
        })
        .catch(err => {
            document.getElementById('sent-message').classList.remove('d-block');
            document.getElementById('sent-message').classList.add('d-none');
            document.getElementById('error-message').classList.remove('d-none');
            document.getElementById('error-message').classList.add('alert', 'alert-danger', 'd-block');
            setTimeout(() => {
                document.getElementById('error-message').classList.remove('d-block');
                document.getElementById('error-message').classList.add('d-none');
                submitBtn.disabled = false;
            }, 5000);
        })
});
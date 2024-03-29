const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailMsg = document.getElementById('email-validation-box');
    const passMsg = document.getElementById('password-validation-box');
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    let validCreds = true;
    if (!emailRegex.test(email) ||  !email) {
        emailMsg.classList.add('show');
        validCreds = false;
    } else emailMsg.classList.remove('show');
    if (password.length < 8){
        passMsg.classList.add('show');
        validCreds  = false;
    } else passMsg.classList.remove('show');
    if (validCreds) {
        window.location.assign('/dashboard.html');
    }

})
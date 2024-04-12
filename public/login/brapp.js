const loginBtn = document.getElementById('login-btn');
const forgotPassBtn = document.getElementById('forgot-password-btn');
const otpMsg = document.getElementById('otp-msg-box');
const passVisToggle = document.getElementById('password-visibility-btn');
const passwordInput = document.getElementById('password');

forgotPassBtn.addEventListener('click', e => {
    otpMsg.classList.add('show');
})

passVisToggle.addEventListener('click', e => {
    if (password.type === 'password') {
        password.type = 'text';
        passVisToggle.classList.add('show');
    } else {
        password.type = 'password';
        passVisToggle.classList.remove('show');
    }
})

loginBtn.addEventListener('click', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const usernameMsg = document.getElementById('username-validation-box');
    const passMsg = document.getElementById('password-validation-box');
    //const usernameRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/gm;
    const usernameRegex = /[a-zA-Z0-9-_]{1,20}/gm;
    const password = passwordInput.value;
    let validCreds = true;
    if (!usernameRegex.test(username) ||  !username) {
        usernameMsg.classList.add('show');
        validCreds = false;
    } else usernameMsg.classList.remove('show');
    if (!password.length){
        passMsg.classList.add('show');
        validCreds  = false;
    } else passMsg.classList.remove('show');
    if (validCreds) {
        axios.post('/api/v1/auth/login', {username, password}).then(res => {
            window.location.replace('/lists/');
        }).catch(err => alert(err.response.data.errorMessage));
    }
});
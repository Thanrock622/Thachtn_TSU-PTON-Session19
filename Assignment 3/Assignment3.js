const users = JSON.parse(localStorage.getItem('users')) || [];

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorEmail = document.querySelector('.error-email');
const errorPassword = document.querySelector('.error-password');
const rememberCheck = document.getElementById('remember');
const toggleBtn = document.getElementById('togglePassword');

toggleBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

if (localStorage.getItem('rememberEmail')) {
    emailInput.value = localStorage.getItem('rememberEmail');
    rememberCheck.checked = true;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;
    
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    
    if (!email) {
        errorEmail.textContent = 'Email không được để trống';
        isValid = false;
    }
    
    if (!password) {
        errorPassword.textContent = 'Password không được để trống';
        isValid = false;
    }
    
    if (!isValid) return;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorPassword.textContent = 'Email hoặc mật khẩu không đúng';
        return;
    }
    
    if (rememberCheck.checked) {
        localStorage.setItem('rememberEmail', email);
        localStorage.setItem('rememberTime', Date.now());
    } else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberTime');
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Đăng nhập thành công!');
    window.location.href = 'dashboard.html';
});

const rememberTime = localStorage.getItem('rememberTime');
if (rememberTime && Date.now() - parseInt(rememberTime) > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('rememberEmail');
    localStorage.removeItem('rememberTime');
}
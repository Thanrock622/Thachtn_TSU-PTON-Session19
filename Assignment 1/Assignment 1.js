let users = JSON.parse(localStorage.getItem('users')) || [];

let form = document.getElementById('form');
let errorEmail = document.querySelector('.error-email');
let errorPassword = document.querySelector('.error-password');
let errorConfirmPassword = document.querySelector('.error-confirm-password');

form.onsubmit = function (e) {
  e.preventDefault();
  
  let isValid = true;
  
  if (form.email.value === '') {
    errorEmail.innerText = 'Email không được để trống';
    isValid = false;
  } else if (!validEmail(form.email.value)) {
    errorEmail.innerText = 'Email không hợp lệ';
    isValid = false;
  } else {
    errorEmail.innerText = '';
  }
  
  if (form.password.value === '') {
    errorPassword.innerText = 'Password không được để trống';
    isValid = false;
  } else {
    errorPassword.innerText = '';
  }
  
  if (form.confirmPassword.value === '') {
    errorConfirmPassword.innerText = 'Xác nhận mật khẩu không được để trống';
    isValid = false;
  } else if (form.password.value !== form.confirmPassword.value) {
    errorConfirmPassword.innerText = 'Xác nhận mật khẩu không trùng khớp';
    isValid = false;
  } else {
    errorConfirmPassword.innerText = '';
  }
  
  if (isValid) {
    let emailExists = users.some(user => user.email === form.email.value);
    if (emailExists) {
      errorEmail.innerText = 'Email đã tồn tại';
      return;
    }
    
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      email: form.email.value,
      password: form.password.value,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
    form.reset();
  }
};

function validEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
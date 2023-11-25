let signupbtn = document.getElementById("signupbtn");
let signinbtn = document.getElementById("signinbtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

let usersData = JSON.parse(localStorage.getItem('usersData')) || { users: [] };

function updateLocalStorage(userData) {
  localStorage.setItem('usersData', JSON.stringify(userData));
}

function validateUser(email, password) {
  for (let user of usersData.users) {
    if (user.email === email && user.password === password) {
      return true;
    }
  }
  return false;
}

nameField.style.maxHeight = "0";
title.innerHTML = "Sign In";
signupbtn.classList.add("disabled");
signinbtn.classList.remove("disabled");

signinbtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupbtn.classList.add("disabled");
  signinbtn.classList.remove("disabled");

  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;

  if (emailInput.trim() !== '' && passwordInput.trim() !== '') {
    if (validateUser(emailInput, passwordInput)) {
      alert("Login successful!");
    } else {
      alert("Login failed. Please check your email and password.");
    }
  } else {
    alert("Please enter both email and password.");
  }
};

signupbtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupbtn.classList.remove("disabled");
  signinbtn.classList.add("disabled");

  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;
  let nameInput = document.querySelector('input[type="text"]').value;

  if (emailInput.trim() !== '' && passwordInput.trim() !== '' && nameInput.trim() !== '') {
    usersData.users.push({
      email: emailInput,
      password: passwordInput,
      name: nameInput
    });

    updateLocalStorage(usersData);
    alert("Sign up successful!");
  } else {
    alert("Please enter valid email, password, and name.");
  }
};


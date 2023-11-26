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

// signinbtn.onclick = function () {
//   nameField.style.maxHeight = "0";
//   title.innerHTML = "Sign In";
//   signupbtn.classList.add("disabled");
//   signinbtn.classList.remove("disabled");

//   let emailInput = document.querySelector('input[type="email"]').value;
//   let passwordInput = document.querySelector('input[type="password"]').value;

//   if (emailInput.trim() !== '' && passwordInput.trim() !== '') {
//     if (validateUser(emailInput, passwordInput)) {
//       alert("Login successful!");
//     } else {
//       alert("Login failed. Please check your email and password.");
//     }
//   } else {
//     alert("Please enter both email and password.");
//   }
// };

signinbtn.onclick = async function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupbtn.classList.add("disabled");
  signinbtn.classList.remove("disabled");

  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;

  if (emailInput.trim() !== '' && passwordInput.trim() !== '') {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Redirect to admin.html upon successful login
        window.location.href = '/admin/admin.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during sign-in.');
    }
  } else {
    alert("Please enter both email and password.");
  }
};



// signupbtn.onclick = function () {
//   nameField.style.maxHeight = "60px";
//   title.innerHTML = "Sign Up";
//   signupbtn.classList.remove("disabled");
//   signinbtn.classList.add("disabled");

//   let emailInput = document.querySelector('input[type="email"]').value;
//   let passwordInput = document.querySelector('input[type="password"]').value;
//   let nameInput = document.querySelector('input[type="text"]').value;

//   if (emailInput.trim() !== '' && passwordInput.trim() !== '' && nameInput.trim() !== '') {
//     usersData.users.push({
//       email: emailInput,
//       password: passwordInput,
//       name: nameInput
//     });

//     updateLocalStorage(usersData);
//     alert("Sign up successful!");
//   } else {
//     alert("Please enter valid email, password, and name.");
//   }
// };

signupbtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupbtn.classList.remove("disabled");
  signinbtn.classList.add("disabled");

  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;
  let nameInput = document.querySelector('input[type="text"]').value;

  if (emailInput.trim() !== '' && passwordInput.trim() !== '' && nameInput.trim() !== '') {
    const userData = {
      email: emailInput,
      password: passwordInput,
      name: nameInput,
      premiumStatus: 0, // Set premiumStatus to 0 by default
    };

    // Make a POST request to the server
    fetch('../signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during sign-up.');
      });
  } else {
    alert("Please enter valid email, password, and name.");
  }
};


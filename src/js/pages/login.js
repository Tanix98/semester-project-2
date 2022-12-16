import { apiBaseUrl } from "/src/js/api.js";

const loginBtn = document.querySelector("#login-button");
const registerBtn = document.querySelector("#register-button");

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const regName = document.querySelector("#register-name");
const regEmail = document.querySelector("#register-email");
const regPassword = document.querySelector("#register-password");

const loginError = document.querySelector("#login-error");
const loginSuccess = document.querySelector("#login-success");
const regError = document.querySelector("#register-error");
const regSuccess = document.querySelector("#register-success");

async function registerUser() {
  console.log("register user");
  try {
    const sendBody = {
      name: regName.value,
      email: regEmail.value,
      password: regPassword.value,
    };
    const response = await fetch(apiBaseUrl + "/auth/register", {
      method: "POST",
      body: JSON.stringify(sendBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.statusCode === 400 || data.statusCode === 401) {
      regError.style.display = "block";
      regError.innerHTML = "Error: " + data.errors[0].message;
    } else {
      regError.style.display = "none";
      regSuccess.style.display = "block";
      setTimeout(function () {
        document.location.reload();
      }, 2000);
    }
  } catch (e) {
    console.log(e);
  }
}

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser();
});

async function loginUser() {
  console.log("login user");
  try {
    const sendBody = {
      email: loginEmail.value,
      password: loginPassword.value,
    };
    const response = await fetch(apiBaseUrl + "/auth/login", {
      method: "POST",
      body: JSON.stringify(sendBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.statusCode === 400 || data.statusCode === 401) {
      loginError.style.display = "block";
      loginError.innerHTML = "Error: " + data.errors[0].message;
    } else {
      loginError.style.display = "none";
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userAvatar", data.avatar);
      loginSuccess.style.display = "block";
      setTimeout(function () {
        window.location.href = "/index.html";
      }, 2000);
    }
  } catch (e) {
    console.log(e);
  }
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginUser();
});

// Redirect user to home page if there's an accesstoken in localStorage
if (localStorage.getItem("accessToken")) {
  window.location.href = "/index.html";
}

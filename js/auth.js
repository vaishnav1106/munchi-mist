function showToast(message, duration = 2500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

/* REGISTER */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !phone || !password) {
      showToast("Please fill all fields", 3000);
      return;
    }

    localStorage.setItem(
      "munchiUser",
      JSON.stringify({ name, email, phone, password })
    );

    showToast("Sign up successful");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

/* LOGIN */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = JSON.parse(localStorage.getItem("munchiUser"));

    if (!user || email !== user.email || password !== user.password) {
      showToast("Invalid email or password", 3000);
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    showToast("Login successful");

    setTimeout(() => {
      window.location.href = "products.html";
    }, 2000);
  });
}



lpohkjtotglghnbmo
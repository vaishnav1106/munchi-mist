// ===============================
// REGISTER PAGE LOGIC
// ===============================

// Select form
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!name || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (phone.length < 10 || phone.length > 10) {
      alert("Please enter a valid mobile number");
      return;
    }


    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Create user object
    const user = {
      name,
      email,
      phone,
      password
    };

    // Save to localStorage
    localStorage.setItem("munchiUser", JSON.stringify(user));

    alert("Registration successful! Please login.");

    // Redirect to login page
    window.location.href = "login.html";
  });
}

// Email validation function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}



// LOGIN PAGE LOGIC

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    if (!loginEmail || !loginPassword) {
      alert("Please fill all fields");
      return;
    }

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("munchiUser"));

    if (!storedUser) {
      alert("No account found. Please register.");
      return;
    }

    // Check credentials
    if (
      loginEmail === storedUser.email &&
      loginPassword === storedUser.password
    ) {
      alert("Login successful!");

      // Optional login flag
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to products page
      window.location.href = "products.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

const AUTH_URL = "http://localhost:3001";

let token = localStorage.getItem("token");

// AUTO LOGIN JIKA ADA TOKEN
if (token) {
  showDashboard(token);
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorText = document.getElementById("login-error");

  errorText.innerText = "";

  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorText.innerText = data.message || "Login gagal";
      return;
    }

    token = data.token;
    localStorage.setItem("token", token);

    showDashboard(token);

  } catch (err) {
    console.error(err);
    errorText.innerText = "Server tidak dapat diakses";
  }
}

function showDashboard(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));

  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("role").innerText = payload.role;
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs.forEach(tab => tab.classList.add('hidden'));

    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.remove('hidden');
    selectedTab.classList.add('active');
}

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = document.getElementById("loginUserId").value;
    const password = document.getElementById("loginPassword").value;

    const result = await loginUser(userId, password);
    if (result.token) {
        alert("Login successful!");
        localStorage.setItem("token", result.token); // Save token for authenticated requests
        // Redirect to the dashboard or perform another action
    } else {
        alert(result.error || "Login failed");
    }
});

// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Registration successful!");
});

// Handle upload form submission
document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Document uploaded successfully!");
});

async function loginUser(userId, password) {
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
    });
    return response.json();
}

async function registerUser(data) {
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function uploadDocument(formData) {
    const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
    });
    return response.json();
}

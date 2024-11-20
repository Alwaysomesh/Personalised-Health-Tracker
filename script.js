// Function to log in a user
async function loginUser(userId, password) {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            return { error: "Invalid credentials" };
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return { error: "An error occurred during login." };
    }
}

// Function to register a user
async function registerUser(userData) {
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return { error: "An error occurred during registration." };
    }
}

// Function to upload a health document
async function uploadDocument(formData) {
    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Error uploading document:", error);
        return { error: "An error occurred during document upload." };
    }
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
        window.location.href = "dashboard.html"; // Example redirect
    } else {
        alert(result.error || "Login failed");
    }
});

// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const userId = document.getElementById("registerUserId").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const result = await registerUser({ name, userId, email, password });
    if (result.message) {
        alert("Registration successful!");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert(result.error || "Registration failed");
    }
});

// Handle document upload form submission
document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = document.getElementById("uploadUserId").value;
    const fileInput = document.getElementById("healthDocument");
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("healthDocument", fileInput.files[0]);

    const result = await uploadDocument(formData);
    if (result.message) {
        alert("Document uploaded successfully!");
        // Optionally refresh the document list or redirect
    } else {
        alert(result.error || "Document upload failed");
    }
});

// Check if the user is authenticated before accessing the dashboard
function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if the token exists
}

// Redirect to login if not authenticated
if (window.location.pathname.endsWith("dashboard.html") && !isAuthenticated()) {
    alert("Please log in to access the dashboard.");
    window.location.href = "login.html";
}

// JavaScript script for a user connection with hashed password:

// Import the bcrypt module
const bcrypt = require("bcrypt");

// Create a new user object
const user = {
    username: "hery",
    password: "password123",
};

// Hash the password using bcrypt
const salt = bcrypt.genSalt(10);
const hashedPassword = bcrypt.hash(user.password, salt);

// Save the user object to the database
const db = new Database();
db.saveUser(user);

// Check if the user password is correct
function checkPassword(username, password) {
    const user = db.getUser(username);
    if (!user) {
        return false;
    }
    return bcrypt.compareSync(password, user.password);
}

// basic script for a JSON Web Token (JWT) use:
// Import the jwt module
const jwt = require("jsonwebtoken");

// Create a new JWT object
const jwtToken = jwt.sign({
    // The data that will be included in the JWT
    data: {
        username: "hery",
        email: "hery@example.com",
    },
    // The algorithm that will be used to sign the JWT
    algorithm: "HS256",
    // The secret key that will be used to sign the JWT
    secret: "password123",
});

// Save the JWT token to the database
const db = new Database();
db.saveJwtToken(jwtToken);

// Verify the JWT token
function verifyJwtToken(jwtToken) {
    // Check if the JWT token is valid
    if (!jwt.verify(jwtToken, "password123")) {
        return false;
    }

    // Get the data from the JWT token
    const data = jwt.decode(jwtToken);

    // Return the data
    return data;
}

// This script will create a session object, set the session id, 
// check if the session is already logged in, save the session object to localStorage, 
// create a function to log in the user, create a function to log out the user, 
// create a function to check if the user is logged in, and create a function to get the user data.

// Create a session object
const session = {
    id: "",
    username: "",
    email: "",
    isLoggedIn: false,
};

// Set the session id
session.id = localStorage.getItem("sessionId");

// Check if the session is already logged in
if (session.isLoggedIn) {
    // Get the user data from the database
    const user = db.getUserById(session.id);

    // Set the user data on the session object
    session.username = user.username;
    session.email = user.email;
}

// Save the session object to localStorage
localStorage.setItem("session", JSON.stringify(session));

// Create a function to log in the user
function login(username, password) {
    // Check if the username and password are valid
    if (!username || !password) {
        return;
    }

    // Get the user from the database
    const user = db.getUserByUsername(username);

    // Check if the user exists
    if (!user) {
        return;
    }

    // Check if the password is correct
    if (bcrypt.compareSync(password, user.password)) {
        // Set the session id
        session.id = user.id;

        // Set the user data on the session object
        session.username = user.username;
        session.email = user.email;

        // Save the session object to localStorage
        localStorage.setItem("session", JSON.stringify(session));

        // Set the logged in flag to true
        session.isLoggedIn = true;
    }
}

// Create a function to log out the user
function logout() {
    // Set the session id to empty string
    session.id = "";

    // Set the logged in flag to false
    session.isLoggedIn = false;

    // Remove the session object from localStorage
    localStorage.removeItem("session");
}

// Create a function to check if the user is logged in
function isLoggedIn() {
    return session.isLoggedIn;
}

// Create a function to get the user data
function getUser() {
    return session;
}

// Export the functions
export { login, logout, isLoggedIn, getUser };




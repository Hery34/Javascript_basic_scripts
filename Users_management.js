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


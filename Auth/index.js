require("dotenv").config();
const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");

require("./passport");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
}

// Home route
app.get("/", (req, res) => {
    res.send(`<a href='/auth/google' style='font-size:30px'>Google</a><br><br>
        <a href='/auth/facebook' style='font-size:30px'>Facebook</a><br><br>
        <a href='/auth/twitter' style='font-size:30px'>Twitter</a>
        `);
});

// Google auth
app.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'] }));

// Facebook auth
app.get("/auth/facebook", passport.authenticate('facebook'))

// Twitter auth
app.get("/auth/twitter", passport.authenticate('twitter'));


// Google callback
app.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
}));

// Facebook callback
app.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
}));

// Twitter callback
app.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
}));

// Protected route
app.get("/protected", isLoggedIn, (req, res) => {
    res.send(`
        <h1>Protected Route</h1>
        <p><strong>Username:</strong> ${req.user.displayName}</p>
        <p><strong>Email:</strong> ${req.user.email}</p>
    `);
});

// Failure route
app.get("/auth/failure", (req, res) => {
    res.send("Something went wrong...");
});



app.listen(port, () => console.log(`Server started at ${port}`));
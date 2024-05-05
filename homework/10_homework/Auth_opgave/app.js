
import express from 'express';
import "./auth.js";
import passport from 'passport';
import session from 'express-session';


const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

function isLoggedIn(req, res, next) {
    req.user ? next() : res.send({error: "You are not authenticated"});
}
 

app.get("/auth/google", 
    passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get("/google/callback", 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'   
    })
);

app.get("/auth/failure", (req, res) => {
    res.send("Something went wrong during authentication");
});


app.get("/protected", isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
    req.logout(function() {
        res.send("You are now logged out");
    });
});
    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const dotenv = require('dotenv');

const express = require('express');
const app = express();

const passport = require('passport');
const { Strategy: NaverStrategy } = require('passport-naver-v2');

dotenv.config();

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)

      done(null, profile)
    }
  )
)

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (obj, done) {
    done(null, obj)
});

app.get('/oauth/naver', passport.authenticate('naver'));

app.get('/callback/naver', passport.authenticate('naver'), (req, res) => {
    res.send('result :' + JSON.stringify({ state: req.query.state, user: req.user }))
})

app.listen(5000, () => {
    console.log('Succesfully.');
})
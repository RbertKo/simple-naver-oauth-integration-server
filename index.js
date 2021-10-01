const dotenv = require('dotenv');
const { response } = require('express');

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
      // console.log(profile)

      

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

const callbacks = [passport.authenticate('naver'), (req, res) => {
    res.send('result :' + JSON.stringify({ state: req.query.state, user: req.user }))
}];

app.get('/oauth/naver', passport.authenticate('naver'));

app.get('/callback/naver', callbacks)
app.get('/dex/callback/naver', callbacks)

app.listen(5000, () => {
    console.log('Succesfully.');
})
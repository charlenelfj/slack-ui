let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 5000;

require('dotenv').config()

let views = require('./home');


const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));


// app to receive events from the slack api

app.post('/actions', (req, res) => {
  let response = JSON.parse(req.body.payload);
  if (response.actions[0].block_id === "name") {
    views.displayHome(response.user.id, 2)
  }
  else if (response.actions[0].block_id === "interest") {
    views.displayHome(response.user.id, 3)
    // console.log(response.actions[0].selected_option.value)
  }
  else if (response.actions[0].block_id === "preference") {
    views.displayHome(response.user.id, 4)
  }
  else {
    views.displayHome(response.user.id, 5)
  }
  res.send("received")
})

// api that will trigger when the user has initiated an event
app.post('/events', (req, res) => {
  if (req.body.type === "url_verification") {
    res.send({ challenge: req.body.challenge });
  }
  // if action == opening the home tab
  else if (req.body.type === "event_callback") {
    let { type, user } = req.body.event;
    if (type === "app_home_opened") {
      // we will show the home tab here
      views.displayHome(user, 1);
    }
  }
})


app.listen(port, () => {
  console.log(`back end running on port ${port}`);
})

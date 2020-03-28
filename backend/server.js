const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

app.post("/api/send_sms", function(req, res) {
    var messageBody = req.body.message;
    var sendToPhoneNumber = req.body.phone_number

    client.messages.create({
        body: messageBody,
        from: twilioPhoneNumber,
        to: sendToPhoneNumber
    })
    .then(message => console.log(message.sid));

    res.send('sent message (' + messageBody + ') to ' + sendToPhoneNumber);
});
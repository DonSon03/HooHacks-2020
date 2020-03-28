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
    const messageBody = req.body.message;
    const sendToPhoneNumber = req.body.phone_number;

    client.messages.create({
        body: messageBody,
        from: twilioPhoneNumber,
        to: sendToPhoneNumber
    })
    .then(message => 
        {
            console.log(message.sid);
            res.send('sent message (' + messageBody + ') to ' + sendToPhoneNumber);
        }  
    );

});

app.get("/api/get_verification_service", function(req, res) {

    const friendlyName = req.param('friendly_name');

    client.verify.services.create({friendlyName: friendlyName})
    .then(service =>
        {
            console.log(service.sid)
            res.send({"data":service})
        } 
        
    );

});

app.get("/api/send_verification_token", function(req, res) {
    const sid = req.param('sid');
    const phoneNumber = req.param('phone_number');

    client.verify.services(sid)
    .verifications
    .create({to: phoneNumber, channel: 'sms'})
    .then(verification => 
        {
            console.log(verification.status)
            res.send({"data":verification})
        }
        
    );

});

app.get("/api/check_verification_token", function(req, res) {

    const sid = req.param('sid');
    const phoneNumber = req.param('phone_number');
    const code = req.param('code');

    client.verify.services(sid)
    .verificationChecks
    .create({to: phoneNumber, code: code})
    .then(verification_check => 
        {
            console.log(verification_check.status)
            res.send({"data":verification_check})
        }
    );
});
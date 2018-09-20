let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let nodemailer = require('nodemailer');
let port = 8080;

let transporter = nodemailer.createTransport({
    service : 'outlook',
    auth : {
        user : 'myominthant1997@outlook.com',
        pass : 'myominthant12'
    }
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', function(req,res) {
    res.sendFile('public/index.html', { root : __dirname});
});

app.post('/message', function(req,res) {
    var data = req.body;
    sendEmail(data);
    res.sendFile('public/index.html', { root : __dirname});
})

app.listen(process.env.port || port, function() {
    console.log("Server is listening at 8080");
})

// sub-functions

function sendEmail(data) {
    let name = data.Name;
    let email = data.Email;
    let msg = data.Message;
    let subj = name + " sent you with " + email;
    let mailOptions = {
        from: 'myominthant1997@outlook.com',
        to: 'mmthant@wpi.edu',
        subject: subj,
        text: msg
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
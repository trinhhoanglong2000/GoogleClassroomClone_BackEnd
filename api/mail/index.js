const express = require('express');
const router = express.Router();
const mailController = require('./mailController');
const nodemailer =  require('nodemailer');

router.get('/send', function(req, res) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'triplelacademic@gmail.com', // generated ethereal user
          pass: '10DiemDoAn', // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
      });
    
      var mainOptions = {
        from: '"TripleLAcademic" <triplelacademic@gmail.com>', // sender address
        to: "longbinkg@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
      // send mail with defined transport object
    transporter.sendMail(mainOptions, function(err){
        if (err) {
            console.log(err);
            res.json('Lỗi');
        } else {
            res.json('Thành công');
        }
    });
});

module.exports = router;

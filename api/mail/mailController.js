const nodemailer =  require('nodemailer');

exports.SendMail = (req, res) =>
{
    const className = "KungFu"
    const destMail = "ttlgame123@gmail.comnpm, longbinkg@gmail.com"
    const link= "https://youtu.be/BWeg2GEhAMo";
    let transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
         auth: 
        {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, 
        },
        tls: 
        {
             rejectUnauthorized: false
        }
    });
    var mainOptions = {
        from: '"TripleLAcademic" <triplelacademic@gmail.com>',
        to: destMail, 
        subject: "You have an invite to join "+ className +"class", 
        text: "",
        html:"<b>You have an invite to join"+ className +" Class</b><br/>"
            +"<p>Click the link below for accept and join<p/><br/>"
            +'<a href="https://youtu.be/BWeg2GEhAMo">'+className+'<a/><br/>'
    }
      // send mail with defined transport object
    transporter.sendMail(mainOptions, function(err){
        if (err) {
            console.log(err);
            res.status(404).json('Lỗi');
        } else {
            res.status(200).json('Thành công');
        }
    });
}
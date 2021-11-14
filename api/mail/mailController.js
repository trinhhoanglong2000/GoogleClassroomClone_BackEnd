const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode"); 
const poolean = require('../../Database/index.js')
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
        subject: "You have an invite to join "+ className +" class", 
        text: "",
        html:"<b>You have an invite to join"+ className +" class</b><br/>"
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

//Trả về cái giá trị cho query accessToken với class 
exports.CreateInviteLink = (req,res) => {
    const JWS = generateJWTByClassId("2d85b90e-64ae-4db7-b7ab-68b479086ca6");
    if (JWS){
        res.status(200).json("localhost:5000/mail/AccessInviteLink?accessToken=" + JWS)
    }else{
        res.status(404).json("Error")
    }
    
}
function generateJWTByClassId (classId){
    var JWT = null;
    try {
        JWT = jwt.sign({classId:classId}, process.env.INVITER_SECRET_TOKEN, { expiresIn: '1d' });
    }
    catch(err){
        console.log(err)
    }
    
    return JWT
}

// Dung de access vao lop hoc voi token tu CreateInviteLink
//localhost:5000/mail/AccessInviteLink?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFzc0lkIjoiMmQ4NWI5MGUtNjRhZS00ZGI3LWI3YWItNjhiNDc5MDg2Y2E2IiwiaWF0IjoxNjM2ODg0OTM4LCJleHAiOjE2MzY4ODg1Mzh9.AzJJGJXspGBHCEpHQAVOBOAh-GFYKllVhTA-WHeeBsg&=

const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode"); 
const poolean = require('../../Database/index.js');
const { token } = require('morgan');
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
        subject: "You have an invite to join "+ className +" class", 
        text: "",
        html:"<b>You have an invite to join"+ className +" class</b><br/>"
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

//Trả về cái giá trị cho query accessToken với class 
exports.CreateInviteLink = (req,res) => {
    const JWS = generateJWTByClassId("2d85b90e-64ae-4db7-b7ab-68b479086ca6");
    if (JWS){
        res.status(200).json("localhost:5000/mail/AccessInviteLink?accessToken=" + JWS)
    }else{
        res.status(404).json("Error")
    }
    
}
function generateJWTByClassId (classId){
    var JWT = null;
    try {
        JWT = jwt.sign({classId:classId}, process.env.INVITER_SECRET_TOKEN, { expiresIn: '1d' });
    }
    catch(err){
        console.log(err)
    }
    
    return JWT
}

// Dung de access vao lop hoc voi token tu CreateInviteLink
//localhost:5000/mail/AccessInviteLink?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFzc0lkIjoiMmQ4NWI5MGUtNjRhZS00ZGI3LWI3YWItNjhiNDc5MDg2Y2E2IiwiaWF0IjoxNjM2ODg0OTM4LCJleHAiOjE2MzY4ODg1Mzh9.AzJJGJXspGBHCEpHQAVOBOAh-GFYKllVhTA-WHeeBsg&=
exports.AccessInviteLink =async (req,res) =>{
    var userData =null
    var authToken = null
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var authToken = req.headers.authorization.split(' ')[1];
        try{
            userData = jwt.verify(authToken, process.env.JWT_SECRET);
        }catch(err){
            res.status(404).json({
                message: 'User not valid'
            })
        }
    }
    else{
        res.status(404).json({
            message: 'User not valid'
        })
    }
     //Thay user ID ở đây nhe
    var UserID = userData.id;
    var accessToken = null
    var dateNow = new Date();
    //Chứa classid và time hết hạn
    try{
        accessToken = jwt.verify(req.query.accessToken, process.env.INVITER_SECRET_TOKEN);
    }catch(err){
        res.status(404).json({
            message: 'Access Token Wrong'
        })
    }
    isExpiredToken = false
    if(parseFloat(accessToken.exp) < parseFloat(dateNow.getTime()/1000))
    {
        isExpiredToken = true;
    }
    if (isExpiredToken){
        res.status(404).json("expired or wrong token");
    }else{
        try {
            const classItem = await poolean.query(`
            SELECT * 
            FROM \"Classes\"
            WHERE id = $1
            `,[accessToken.classId])
    
            if(classItem.rows.length >0 ){
                try {
                    const classInsert = await poolean.query(`
                    INSERT INTO \"classesaccount\" (classid, accountid, type)
                    VALUES ($1, $2, $3)
                    RETURNING *
                    `,[accessToken.classId,UserID,false])
                res.status(200).json(classInsert.rows);
                } catch (err) {
                    res.status(404).json({
                    message: 'Something wrong in process'
                    })
                }    
            }
            else{
                res.status(404).json({
                    message: 'The class with given ID was not found'
                })
            }
        } catch (err) {
            res.status(404).json({
              message: 'The class with given ID was not found'
            })
        }
    }     
   
  
}
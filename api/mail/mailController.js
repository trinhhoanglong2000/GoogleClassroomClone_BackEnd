const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');
const poolean = require('../../Database/index.js');

exports.SendMail = async (req, res) =>
{
    var ClassID = req.query.classid;
    var mails = req.query.mails;
    var isTeacherInvite = req.query.isTeacherInvite == "true";
    console.log(isTeacherInvite)
    console.log(ClassID)
    console.log(mails)
    //2d85b90e-64ae-4db7-b7ab-68b479086ca6
    const classItem = await poolean.query(`
    SELECT * 
    FROM \"Classes\"
    WHERE id = $1
    `,[ClassID])
    if (classItem.rows.length==0){
        res.status(404).json({messange: 'This classes not found'})
    }else{
        const JWS = generateJWTByClassId(ClassID, isTeacherInvite);
        const className = classItem.rows[0].name
        const destMail = mails;
        const link= `${process.env.CLIENT_URL}/AccessInviteLink?accessToken=${JWS}`;
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
            html:"<b>You have an invite to join "+ className +" class as a "+ (isTeacherInvite?"Teacher" :"Student") +"</b><br/>"
                +"<p>Click the link below for accept and join class: <p/>"
                +`<a href="${link}">`+className+'<a/><br/>'
        }
          // send mail with defined transport object
        transporter.sendMail(mainOptions, function(err){
            if (err) {
                console.log(err);
                res.status(404).json({message: 'Lỗi'});
            } else {
                res.status(200).json({message:'Thành công'});
            }
        });
    }

    
}

//Trả về cái giá trị cho query accessToken với class 
exports.CreateInviteLink =async (req,res) => {
    var ClassID = req.query.classid;
    var isTeacherInvite = req.query.isTeacherInvite == "true";
    console.log(isTeacherInvite)
    //2d85b90e-64ae-4db7-b7ab-68b479086ca6
    const classItem = await poolean.query(`
    SELECT * 
    FROM \"Classes\"
    WHERE id = $1
    `,[ClassID])
    if (classItem.rows.length==0){
        res.status(404).json({messange: 'This classes not found'})
    }

    const JWS = generateJWTByClassId(ClassID, isTeacherInvite);
    if (JWS){
        res.status(200).json({link : `${process.env.CLIENT_URL}/AccessInviteLink?accessToken=${JWS}`,token : JWS, classInfo: classItem.rows[0]} )
    }else{
        res.status(404).json({messange: 'Error'})
    }
    
}
function generateJWTByClassId ( classId,isTeacherInvite ){
    var JWT = null;
    try {
        JWT = jwt.sign({classId:classId, isTeacherInvite:isTeacherInvite }, process.env.INVITER_SECRET_TOKEN, { expiresIn: '1d' });
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
    console.log(req.headers)
    console.log(req.query.accessToken)
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
        console.log('Access Token Wrong')
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
        res.status(404).json({message: "expired or wrong token"});
    }else{
        try {
            const classItem = await poolean.query(`
            SELECT * 
            FROM \"Classes\"
            WHERE id = $1
            `,[accessToken.classId])
            if(classItem.rows.length >0 ){
                try {
                    const Joined =await poolean.query(`
                    SELECT * 
                    FROM \"classesaccount\"
                    WHERE classid = $1 AND accountid = $2 
                    `,[accessToken.classId, UserID])
                    if (Joined.rows.length > 0){
                        res.status(200).json({message: 'You already in this class'});
                    }else{
                        try {
                            const classInsert = await poolean.query(`
                            INSERT INTO \"classesaccount\" (classid, accountid, type)
                            VALUES ($1, $2, $3)
                            RETURNING *
                            `,[accessToken.classId,UserID,accessToken.isTeacherInvite])
                        
                        res.status(200).json({message: 'Successful'});
                        } catch (err) {
                            res.status(404).json({
                            message: 'Something wrong in process'
                            })
                        }    
                    }
                }
                catch(err) {
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
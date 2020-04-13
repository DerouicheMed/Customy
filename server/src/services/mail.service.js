const nodemailer = require('nodemailer');
const hbs =require('nodemailer-express-handlebars');
class MailService {   

    sendEmail=(user)=>{        
        
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.NODE_EMAIL_USER,
                pass : process.env.NODE_EMAIL_PASS
            }
        });

        transporter.use('compile',hbs({
            viewEngine: {
                extName: '.handlebars',
                partialsDir: '../templates',
                layoutsDir: '../templates',
                defaultLayout: 'email_template.handlebars',
              },
              viewPath: '../templates',
              extName: '.handlebars',
        }))
    
        let mailOptions ={
            from : 'jeremy.bellefois@gmail.com',
            to: user.email,
            subject : 'This is a test',
            template : 'publish_email',
            context :{
                url : 'localhost:3000/management/studies'
            }
        }
    
        
        transporter.sendMail(mailOptions,(err,data)=>{
            if (err) console.log(err);
            else console.log( 'Emails sent !');
        })
    }

}



module.exports = MailService;
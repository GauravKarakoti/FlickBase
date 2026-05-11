const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
const registerEmail = async(userEmail, emailToken) => {
    try {
        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'FlickBase',
                link: `${process.env.EMAIL_MAIN_URL}`
            }
        });
        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to FlickBase! We\'re excited to have you on board.',
                action: {
                    instructions: 'To validate your account, please click here:',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate you account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have any questions? Just reply to this email, we\'d love to help.'
            }
        };
        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome to FlickBase',
            html: emailBody
        };
        await transporter.sendMail(message);
        return true;
    } catch(error) {
        if(error) throw error;
    }
}
const contactMail = async(contact) => {
    try {
        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'FlickBase',
                link: `${process.env.EMAIL_MAIN_URL}`
            }
        });
        const email = {
            body: {
                intro: [
                    'Someone sent you a message',
                    `Email: ${contact.email}`,
                    `First Name: ${contact.firstname}`,
                    `Last Name: ${contact.lastname}`,
                ],
                outro: [`${contact.message}`]
            }
        };
        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Contact',
            html: emailBody
        };
        await transporter.sendMail(message);
        return true;
    } catch(error) {
        if(error) throw error;
    }
}
module.exports = {
    contactMail,
    registerEmail
}

const {
    MAILER_USER,
    MAILER_PASS
} = process.env;

/**
 * NOTE: Nodemailer have a major version update after
 * which, Now you're supposed to provide host address
 * via host param, not service param
 * */
const nodemailer = require("nodemailer");

/**
 * errLogs is used to save and check the last time same
 * category have suffered some issue or failure
 * */
let errLogs = {}

let hour = 60 * 60 * 1000;

/**
 * mailService is used to send email to dev@exponentialhost.com
 * in case a service is down or have some failure
 * */
async function mailService(category, mailSubject, mailBody) {
    if (((new Date()) - errLogs[category]) > hour) {
        return;
    }

    // Update the time for same category of errors
    errLogs[category] = new Date();

    let transporter = await nodemailer.createTransport({
        host: 'smtppro.zoho.com',
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: MAILER_USER,
            pass: MAILER_PASS
        },
    });

    await transporter.sendMail({
        from: '"Exponential Error" <dev@exponentialhost.com>',
        to: 'dev+alerts@exponentialhost.com',
        subject: mailSubject,
        text: mailBody
    });
}

module.exports = {
    mailService
}
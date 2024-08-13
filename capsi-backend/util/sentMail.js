const { mailService } = require("../controllers/emailService/mailService");
const { getMailContent } = require("./getMailContent");


const sentMail = async (mailData) => {
    // const mailData = {
    //     clientEmail: email,
    //     mailSubject: 'Subscription updated successfully',
    //     mailText: 'Updated successfully',
    //     bodyHeading: 'Subscription updated successfully',
    //     noOfVideos: plan,

    // }
    // Replace these values with your actual subject, email text, and HTML content
    const emailSubject = mailData.mailSubject;
    const emailText = mailData.mailText;
    const emailHtml = getMailContent(mailData.bodyHeading, mailData.noOfVideos);
    const email = mailData.clientEmail;
    // Call the mailService function
    try {

        await mailService(email, emailSubject, emailText, emailHtml);
        return console.log('Email sent successfully!');
    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    sentMail,
}
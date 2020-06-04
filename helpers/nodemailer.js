"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(targets, title) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'georgiana3@ethereal.email',
        pass: 'VkaMPNcJNGSpVgQGrB'
    },
    tls: {
        rejectUnauthorized: false
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pair Project Library 📚" <georgiana3@ethereal.email>', // sender address
    to: targets.join(', '), // list of receivers
    subject: `⏰New Book⏰, ${title}`, // Subject line
    text: `Hey, we have released a new Book called ${title}, hope you enjoy it!` // plain text body
    // html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main;
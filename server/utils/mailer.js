const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendMail = (user, email, list = []) => {
    if (list.length === 0) {
        const hospitalAdminTemplate = `
<html>
  <head>
    <title>Welcome To HSM</title>
    <style>
      .body {
        font-size: 1rem;
      }
      .body .weblink {
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="body">
      Hello ${user},
      <br /><br />
      Thank you for registering with us as hospital Admin.
      <br /><br />
      <br /><br />
      Regards,<br />
      Team HSM
    </div>
  </body>
</html>
`;

        return transport.sendMail({
            from: 'rushipatel9650@gmail.com', // From address
            to: email, // To address
            subject: 'Registration Successfully', // Subject
            html: hospitalAdminTemplate,
        });
    }
    const patientTemplate = `
<html>
  <head>
    <title>Welcome To HSM</title>
    <style>
      .body {
        font-size: 1rem;
      }
      .body .weblink {
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="body">
      Hello ${user},
      <br /><br />
      Thank you for registering with us.
      <br /><br />
      Check the list of hospitals near to you.
      <br /><br />
      ${list.map((item) => {
          return item.name;
      })}
      <br /><br />
      Regards,<br />
      Team HSM
    </div>
  </body>
</html>
`;
    return transport.sendMail({
        from: 'rushipatel9650@gmail.com', // From address
        to: email, // To address
        subject: 'Registration Successfully', // Subject
        html: patientTemplate,
    });
};

const sendResetLink = (email, resetLink) => {
    const template = `
  <html>
    <head>
      <title>Password reset link</title>
      <style>
        .body {
          font-size: 1rem;
        }
        .body .weblink {
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="body">
        Hello User,
        <br /><br />
        Use the below link to reset your password.
        <br /><br />
        Reset link : ${resetLink}
        <br /><br />
        If you have not requested the reset, contact our support team immediately.
        <br /><br />
        Regards,<br />
        Team HMS
      </div>
    </body>
  </html>
  `;

    return transport.sendMail({
        from: 'rushipatel9650@gmail.com', // From address
        to: email, // To address
        subject: 'Link to reset password', // Subject
        html: template,
    });
};

module.exports = { sendMail, sendResetLink };

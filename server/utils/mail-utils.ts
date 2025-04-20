const nodemailer = require("nodemailer");

export async function sendMail(
  receiver: string,
  subject: string,
  message: string,
  attachments = []
) {
  const fullMessage = message;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mihir.patel@drcsystems.com",
      pass: process.env.PASSWORD_KEY,
    },
  });

  let mailOptions = {
    from: `Finance Manager <${"mihir.patel@drcsystems.com"}>`,
    to: receiver,
    subject: subject,
    html: fullMessage,
  };
  try {
    const emailRes = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
}

// async function passwordReset(username, fullname, email, randomBytes) {
// 	const resetLink = process.env.FRONTEND_URL + 'reset-password?token=' + randomBytes;
// 	const emailText = `
//     <h2>Password Reset Request</h2>
//     <p>Hello ${fullname},</p>
//     <p>We received a request to reset the password for your account associated with the username: <strong>${username}</strong>.</p>
//     <p>To reset your password, please click the link below:</p>
//     <a href="${resetLink}" class="button">Reset Your Password</a>
//     <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
//     <p>Best regards,<br/>The Quiz Portal Team</p>
// 	`;
// 	await sendMail(email, 'Password Reset for QuizPortal', emailText);
// }

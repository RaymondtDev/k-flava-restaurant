import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/contact', async (req, res) => {
  const { name, surname, email, number, message } = req.body;

  try {
    await resend.emails.send({
      from: `Mail from ${name} <onboarding@resend.dev>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `New message from ${name} ${surname}`,
      text: `${message}\nNumber: ${number}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>${name} ${surname}</strong></p>
        <p><strong>Email: </strong>${email}</p>
        <p><strong>Number: </strong>${number}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

export default router;
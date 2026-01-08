import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import path from 'path';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
// es modules workaround to get __dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT || 5000;

app.post('/api/contact', async (req, res) => {
  try {
    const { name, surname, email, number, message } = req.body;

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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


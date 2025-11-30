import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, surname, email, number, message } = await request.json()

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

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to send email.' }), { status: 500 })
  }
}
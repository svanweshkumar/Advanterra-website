import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { name, email, subject, message } =
      JSON.parse(event.body || "{}");

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "All fields are required" }),
      };
    }

    await resend.emails.send({
      from: "contact@mail.advanterra.in",
      to: "advanterraconstruction@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Send mail error:", error);
    return { statusCode: 500, body: "Failed to send email" };
  }
};

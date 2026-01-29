import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { fullName, email, phone, date, message } = JSON.parse(event.body || "{}");

    if (!fullName || !email || !date) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Full name, email, and date are required",
        }),
      };
    }

    const data = await resend.emails.send({
      from: "contact@mail.advanterra.in",
      to: "advanterraconstruction@gmail.com",
      subject: `New Appointment Booking Request: ${fullName}`,
      html: `
        <h2>New Appointment Booking Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Project Details / Message:</strong></p>
        <p>${message ? message.replace(/\n/g, "<br>") : "No additional details provided"}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Appointment request sent successfully",
        data,
      }),
    };
  } catch (error) {
    console.error("Appointment error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send appointment request" }),
    };
  }
};

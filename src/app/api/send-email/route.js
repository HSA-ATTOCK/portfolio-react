import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Email sent to YOU (the owner) with all submission details
function ownerEmailHTML(name, email, phone, subject, message) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #081b29; color: #ededed; padding: 30px; border-radius: 10px;">
      <h2 style="color: #00abf0; border-bottom: 2px solid #00abf0; padding-bottom: 10px; margin-top: 0;">
        📬 New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #00abf0; width: 120px; vertical-align: top;">Name:</td>
          <td style="padding: 10px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #00abf0; vertical-align: top;">Email:</td>
          <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00abf0;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #00abf0; vertical-align: top;">Phone:</td>
          <td style="padding: 10px 0;">${phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #00abf0; vertical-align: top;">Subject:</td>
          <td style="padding: 10px 0;">${subject}</td>
        </tr>
      </table>
      <div style="background: #112e42; padding: 20px; border-radius: 8px; border-left: 4px solid #00abf0;">
        <p style="font-weight: bold; color: #00abf0; margin: 0 0 10px 0;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">
        Reply directly to this email to respond to ${name}.
      </p>
    </div>
  `;
}

// Confirmation email sent to the PERSON who submitted the form
function confirmationEmailHTML(name, subject, message) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #081b29; color: #ededed; padding: 30px; border-radius: 10px;">
      <h2 style="color: #00abf0; border-bottom: 2px solid #00abf0; padding-bottom: 10px; margin-top: 0;">
        ✅ Message Received!
      </h2>
      <p style="line-height: 1.7;">Hi <strong>${name}</strong>,</p>
      <p style="line-height: 1.7;">
        Thank you for reaching out! I've received your message and will get back to you as soon as possible — usually within 24–48 hours.
      </p>
      <div style="background: #112e42; padding: 20px; border-radius: 8px; border-left: 4px solid #00abf0; margin: 20px 0;">
        <p style="font-weight: bold; color: #00abf0; margin: 0 0 8px 0;">Your message summary:</p>
        <p style="margin: 0 0 6px 0;"><strong style="color: #00abf0;">Subject:</strong> ${subject}</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #ccc;">${message}</p>
      </div>
      <p style="line-height: 1.7;">
        In the meantime, feel free to check out my work on
        <a href="https://github.com/HSA-ATTOCK" style="color: #00abf0;">GitHub</a> or connect with me on
        <a href="https://www.linkedin.com/in/haidersajjadazmat/" style="color: #00abf0;">LinkedIn</a>.
      </p>
      <p style="line-height: 1.7; margin-bottom: 0;">
        Best regards,<br/>
        <strong style="color: #00abf0;">Haider Sajjad</strong><br/>
        AI Automation Engineer | Full-Stack Web Developer
      </p>
    </div>
  `;
}

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // --- Validation ---
    const errors = {};

    if (!name || !name.trim()) errors.name = "Full name is required.";
    if (!email || !email.trim()) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!subject || !subject.trim()) errors.subject = "Subject is required.";
    if (!message || !message.trim()) errors.message = "Message is required.";
    if (phone && phone.trim() && !PHONE_REGEX.test(phone.trim())) {
      errors.phone =
        "Please enter a valid phone number (e.g. +92 300 1234567).";
    }

    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const transporter = createTransporter();

    // Send both emails in parallel
    await Promise.all([
      // 1. Notification to owner
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email.trim(),
        subject: `[Portfolio] ${subject.trim()} — from ${name.trim()}`,
        html: ownerEmailHTML(
          name.trim(),
          email.trim(),
          phone?.trim() || "",
          subject.trim(),
          message.trim(),
        ),
      }),
      // 2. Confirmation to submitter
      transporter.sendMail({
        from: `"Haider Sajjad" <${process.env.EMAIL_USER}>`,
        to: email.trim(),
        subject: `Got your message! — ${subject.trim()}`,
        html: confirmationEmailHTML(
          name.trim(),
          subject.trim(),
          message.trim(),
        ),
      }),
    ]);

    return Response.json({
      success: true,
      message:
        "Message sent successfully! A confirmation has been sent to your email.",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}

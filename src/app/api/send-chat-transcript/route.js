import nodemailer from "nodemailer";

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

// Format timestamp
function formatTime() {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Convert basic markdown to HTML for email display
function mdToHtml(text) {
  const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = escaped.split("\n");
  const output = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      output.push(
        `<ul style="margin:6px 0 6px 18px;padding:0;">${listItems.join("")}</ul>`
      );
      listItems = [];
    }
  };

  const parseBold = (str) =>
    str.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  lines.forEach((raw) => {
    const line = raw.trim();
    if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(
        `<li style="margin-bottom:3px;">${parseBold(line.slice(2))}</li>`
      );
    } else {
      flushList();
      if (line === "") {
        output.push(`<div style="height:6px;"></div>`);
      } else {
        output.push(`<p style="margin:0 0 5px 0;">${parseBold(line)}</p>`);
      }
    }
  });

  flushList();
  return output.join("");
}

// Build the transcript HTML rows
// Class names are added so the <style> block's u+#body (Gmail) and
// @media (prefers-color-scheme: dark) rules can override Gmail's auto-inversion.
function buildTranscriptRows(messages, userName) {
  return messages
    .map((msg) => {
      const isUser     = msg.type === "user";
      const bgColor    = isUser ? "#00abf0" : "#112240";
      const textColor  = "#ffffff";
      const labelColor = isUser ? "#cce8ff" : "#00abf0";
      const label      = isUser ? (userName || "Visitor") : "Haider's Assistant";
      const align      = isUser ? "right" : "left";
      const bubbleCls  = isUser ? "bubble-user" : "bubble-bot";
      const labelCls   = isUser ? "label-user"  : "label-bot";

      return `
        <tr>
          <td style="padding: 8px 0;">
            <div style="text-align: ${align};">
              <span class="${labelCls}" style="font-size: 11px; color: ${labelColor}; font-weight: bold; display: block; margin-bottom: 4px;">
                ${label}
              </span>
              <div class="${bubbleCls}" style="display: inline-block; max-width: 80%; background-color: ${bgColor}; color: ${textColor}; -webkit-text-fill-color: ${textColor}; padding: 10px 15px; border-radius: ${isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"}; font-size: 14px; line-height: 1.6; text-align: left;">
                ${mdToHtml(msg.text)}
              </div>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

// Shared CSS injected into every email <head>.
// Three layers of dark-mode protection:
//   1. color-scheme: light  →  Apple Mail, Outlook, Samsung Mail
//   2. u + #body selectors  →  Gmail (Gmail wraps content creating a sibling <u>)
//   3. @media prefers-color-scheme: dark  →  Any client that applies its own dark rules
const EMAIL_STYLES = `
  :root { color-scheme: light; }
  body  { background-color: #081b29 !important; color: #ededed !important; }

  /* ── Gmail dark-mode override (u + #body trick) ── */
  u + #body .em-wrap   { background-color: #081b29 !important; color: #ededed !important; }
  u + #body .em-card   { background-color: #112240 !important; }
  u + #body .em-label  { color: #00abf0 !important; }
  u + #body .em-value  { color: #ededed !important; }
  u + #body .em-h2     { color: #00abf0 !important; }
  u + #body .em-h3     { color: #00abf0 !important; }
  u + #body .bubble-user { background-color: #00abf0 !important; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
  u + #body .bubble-bot  { background-color: #112240 !important; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
  u + #body .label-user  { color: #cce8ff !important; }
  u + #body .label-bot   { color: #00abf0 !important; }
  u + #body .em-footer   { color: rgba(255,255,255,0.35) !important; }
  u + #body .em-followup { background-color: #112240 !important; }
  u + #body .em-followup p { color: #ededed !important; }
  u + #body .em-followup a { color: #00abf0 !important; }

  /* ── @media dark override for other clients ── */
  @media (prefers-color-scheme: dark) {
    .em-wrap   { background-color: #081b29 !important; color: #ededed !important; }
    .em-card   { background-color: #112240 !important; }
    .em-label  { color: #00abf0 !important; }
    .em-value  { color: #ededed !important; }
    .em-h2     { color: #00abf0 !important; }
    .em-h3     { color: #00abf0 !important; }
    .bubble-user { background-color: #00abf0 !important; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
    .bubble-bot  { background-color: #112240 !important; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
    .label-user  { color: #cce8ff !important; }
    .label-bot   { color: #00abf0 !important; }
    .em-footer   { color: rgba(255,255,255,0.35) !important; }
    .em-followup { background-color: #112240 !important; }
    .em-followup p { color: #ededed !important; }
    .em-followup a { color: #00abf0 !important; }
  }
`;

// Email to Haider — owner notification
function ownerTranscriptHTML(userName, userEmail, messages) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <style>${EMAIL_STYLES}</style>
</head>
<body id="body" style="margin: 0; padding: 0; background-color: #081b29;">
  <div class="em-wrap" style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #081b29; color: #ededed; padding: 30px; border-radius: 12px;">
    <h2 class="em-h2" style="color: #00abf0; border-bottom: 2px solid #00abf0; padding-bottom: 10px; margin-top: 0;">
      💬 New Chat Transcript
    </h2>

    <table class="em-card" style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #112240; border-radius: 8px; padding: 16px;">
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0; width: 100px;">Name:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${userName}</td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Email:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;"><a href="mailto:${userEmail}" style="color: #00abf0;">${userEmail}</a></td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Time:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${formatTime()}</td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Messages:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${messages.filter(m => m.type === "user").length} from visitor</td>
      </tr>
    </table>

    <h3 class="em-h3" style="color: #00abf0; margin-bottom: 16px;">Conversation</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${buildTranscriptRows(messages, userName)}
    </table>

    <p class="em-footer" style="margin-top: 28px; font-size: 12px; color: rgba(255,255,255,0.35); text-align: center;">
      Sent automatically from your portfolio chatbot · ${formatTime()}
    </p>
  </div>
</body>
</html>`;
}

// Email to visitor — their copy
function visitorTranscriptHTML(userName, userEmail, messages) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <style>${EMAIL_STYLES}</style>
</head>
<body id="body" style="margin: 0; padding: 0; background-color: #081b29;">
  <div class="em-wrap" style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #081b29; color: #ededed; padding: 30px; border-radius: 12px;">
    <h2 class="em-h2" style="color: #00abf0; border-bottom: 2px solid #00abf0; padding-bottom: 10px; margin-top: 0;">
      💬 Your Conversation with Haider's Assistant
    </h2>

    <table class="em-card" style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #112240; border-radius: 8px; padding: 16px;">
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0; width: 100px;">Name:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${userName}</td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Email:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;"><a href="mailto:${userEmail}" style="color: #00abf0;">${userEmail}</a></td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Time:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${formatTime()}</td>
      </tr>
      <tr>
        <td class="em-label" style="padding: 8px 16px; font-weight: bold; color: #00abf0;">Messages:</td>
        <td class="em-value" style="padding: 8px 16px; color: #ededed;">${messages.filter(m => m.type === "user").length} from you</td>
      </tr>
    </table>

    <h3 class="em-h3" style="color: #00abf0; margin-bottom: 16px;">Conversation</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${buildTranscriptRows(messages, userName)}
    </table>

    <div class="em-followup" style="margin-top: 32px; background-color: #112240; border-radius: 10px; padding: 20px;">
      <p style="margin: 0 0 12px; font-weight: bold; color: #00abf0;">Want to follow up? Reach Haider directly:</p>
      <p style="margin: 4px 0; font-size: 14px; color: #ededed;">📧 <a href="mailto:me@haidersajjad.com" style="color: #00abf0;">me@haidersajjad.com</a></p>
      <p style="margin: 4px 0; font-size: 14px; color: #ededed;">💬 WhatsApp: <a href="https://wa.me/923420658137" style="color: #00abf0;">+92 342 0658137</a></p>
      <p style="margin: 4px 0; font-size: 14px; color: #ededed;">🌐 <a href="https://www.haidersajjad.com" style="color: #00abf0;">www.haidersajjad.com</a></p>
      <p style="margin: 4px 0; font-size: 14px; color: #ededed;">💼 <a href="https://www.upwork.com/freelancers/~011382bef96a02b3f6" style="color: #00abf0;">Hire on Upwork</a></p>
    </div>

    <p class="em-footer" style="margin-top: 24px; font-size: 12px; color: rgba(255,255,255,0.35); text-align: center;">
      This email was sent automatically from haidersajjad.com · ${formatTime()}
    </p>
  </div>
</body>
</html>`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, userName, userEmail } = body;

    // Validate
    if (!userName || !userEmail || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    // Only send if there is at least one actual user message
    const userMessages = messages.filter((m) => m.type === "user");
    if (userMessages.length === 0) {
      return Response.json({ skipped: true });
    }

    const transporter = createTransporter();

    await Promise.all([
      // Email to Haider
      transporter.sendMail({
        from: `"Portfolio Chatbot" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `💬 Chat Transcript — ${userName} (${userEmail})`,
        html: ownerTranscriptHTML(userName, userEmail, messages),
      }),
      // Email to visitor
      transporter.sendMail({
        from: `"Haider Sajjad" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        replyTo: process.env.EMAIL_TO,
        subject: "Your conversation with Haider's AI Assistant",
        html: visitorTranscriptHTML(userName, userEmail, messages),
      }),
    ]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Chat transcript email error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}

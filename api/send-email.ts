import nodemailer from "nodemailer";

// Sends website form submissions through the gym's Gmail account.
// Requires GMAIL_USER and GMAIL_APP_PASSWORD environment variables.

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Random-case gibberish like "QnfraNHnNhCLwcJzumqphqW": one long word that
// flips from lowercase to uppercase several times
const looksRandom = (value: string) =>
  value
    .split(/\s+/)
    .some(
      (word) => word.length >= 10 && (word.match(/[a-z][A-Z]/g) || []).length >= 3,
    );

function detectSpam(
  formData: FormData,
  fields: [string, string][],
  senderEmail: string,
) {
  // Honeypot: hidden from people, but bots fill in every field
  if (String(formData.get("website") || "").trim()) return "honeypot";

  // Missing load time means the form was never loaded in a browser;
  // under 3 seconds is faster than a person can fill it in
  const loadedAt = Number(formData.get("_ts"));
  if (!loadedAt) return "no timestamp";
  const elapsed = Date.now() - loadedAt;
  if (elapsed >= 0 && elapsed < 3000) return "too fast";

  // Gmail ignores dots, so bots pad addresses like m.a.g.ica.p.ug8.4@gmail.com
  const [local, domain = ""] = senderEmail.toLowerCase().split("@");
  if (domain === "gmail.com" && (local.match(/\./g) || []).length >= 3) {
    return "dotted gmail";
  }

  if (fields.some(([key, value]) => key !== "email" && looksRandom(value))) {
    return "gibberish";
  }

  return null;
}

export async function POST(request: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return json({ success: "false", message: "Email is not configured" }, 500);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ success: "false", message: "Invalid form data" }, 400);
  }

  const subject = String(formData.get("_subject") || "New Website Message");
  const autoresponse = String(formData.get("_autoresponse") || "").trim();

  // Fields starting with "_" are settings, not visitor answers
  const fields: [string, string][] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("_") || key === "website") continue;
    if (typeof value !== "string") continue;
    fields.push([key, value.trim()]);
  }

  const senderEmail = String(formData.get("email") || "").trim();
  const validSender = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail);

  if (fields.length === 0 || !validSender) {
    return json({ success: "false", message: "Missing required fields" }, 400);
  }

  // Bots get a normal success reply so they don't adapt, but nothing is sent
  const spamReason = detectSpam(formData, fields, senderEmail);
  if (spamReason) {
    console.log("Blocked spam submission:", spamReason, senderEmail);
    return json({ success: "true" });
  }

  const rows = fields
    .map(
      ([key, value]) =>
        `<tr><th style="text-align:left;padding:8px 12px;background:#f4f4f4;border:1px solid #ddd;vertical-align:top">${escapeHtml(key)}</th>` +
        `<td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"The Fusion House Website" <${user}>`,
      to: user,
      replyTo: senderEmail,
      subject,
      text: fields.map(([key, value]) => `${key}: ${value}`).join("\n"),
      html: `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>`,
    });

    if (autoresponse) {
      await transporter
        .sendMail({
          from: `"The Fusion House" <${user}>`,
          to: senderEmail,
          replyTo: user,
          subject: "The Fusion House",
          text: autoresponse,
        })
        .catch((error) => console.error("Autoresponse failed", error));
    }
  } catch (error) {
    console.error("Email send failed", error);
    return json({ success: "false", message: "Submission failed" }, 500);
  }

  return json({ success: "true" });
}

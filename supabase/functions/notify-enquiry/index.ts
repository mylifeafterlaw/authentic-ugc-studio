// notify-enquiry — sends two emails when the contact form is submitted:
//   1. Notification to the site owner (with the enquirer's details, reply-to set
//      to the enquirer so a reply goes straight back to them).
//   2. A confirmation to the person who submitted the enquiry.
//
// Called from the browser by ContactSection.tsx via supabase.functions.invoke.
// Runs with verify_jwt = false (see supabase/config.toml) so the public form
// can reach it with the anon key.
//
// Required secret:  RESEND_API_KEY
// Optional secrets (with sensible defaults):
//   OWNER_EMAIL   — where owner notifications go (default my.lifeafterlaw@gmail.com)
//   RESEND_FROM   — verified sender, e.g. "Jess Cousin <hello@jesscousin.com>".
//                   Defaults to Resend's onboarding sender, which can ONLY send
//                   to your own Resend account email until you verify a domain.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

async function sendEmail(payload: Record<string, unknown>, apiKey: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "Email not configured" }, 500);
  }

  const ownerEmail = Deno.env.get("OWNER_EMAIL") ?? "my.lifeafterlaw@gmail.com";
  const from = Deno.env.get("RESEND_FROM") ?? "Jess Cousin <onboarding@resend.dev>";

  let body: { name?: string; email?: string; brand?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const brand = (body.brand ?? "").trim();
  const message = (body.message ?? "").trim();

  // Mirror the validation used by the form + the DB row-level check.
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (
    name.length < 1 || name.length > 200 ||
    !emailOk || email.length > 320 ||
    message.length < 1 || message.length > 5000 ||
    brand.length > 200
  ) {
    return json({ error: "Invalid enquiry data" }, 422);
  }

  const brandLine = brand ? `<p><strong>Brand / company:</strong> ${escapeHtml(brand)}</p>` : "";
  const results: Record<string, string> = {};

  // 1) Owner notification (critical) — reply-to goes to the enquirer.
  try {
    await sendEmail(
      {
        from,
        to: [ownerEmail],
        reply_to: email,
        subject: `New enquiry from ${name}${brand ? ` (${brand})` : ""}`,
        html:
          `<h2>New website enquiry</h2>` +
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
          `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
          brandLine +
          `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      },
      apiKey,
    );
    results.owner = "sent";
  } catch (err) {
    console.error("Owner notification failed:", err);
    results.owner = "failed";
    // If we can't even notify the owner, surface an error.
    return json({ error: "Failed to send notification", results }, 502);
  }

  // 2) Confirmation to the enquirer (best-effort — needs a verified domain to
  //    reach arbitrary addresses; don't fail the request if this one bounces).
  try {
    await sendEmail(
      {
        from,
        to: [email],
        subject: "Thanks for your enquiry — Jess Cousin",
        html:
          `<p>Hi ${escapeHtml(name)},</p>` +
          `<p>Thanks for reaching out${brand ? ` on behalf of ${escapeHtml(brand)}` : ""} — ` +
          `I've received your enquiry and I'll be in touch soon.</p>` +
          `<p>For reference, here's what you sent:</p>` +
          `<blockquote style="border-left:3px solid #e5b8c4;padding-left:12px;color:#555">` +
          `${escapeHtml(message).replace(/\n/g, "<br>")}</blockquote>` +
          `<p>Speak soon,<br>Jess</p>`,
      },
      apiKey,
    );
    results.confirmation = "sent";
  } catch (err) {
    console.error("Confirmation email failed (owner was still notified):", err);
    results.confirmation = "failed";
  }

  return json({ ok: true, results });
});

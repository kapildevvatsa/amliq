import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'ap-southeast-2' });
const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@tranche2compliance.com.au';

export const handler: PostConfirmationTriggerHandler = async (event) => {
  // Only send on user confirmation (not forgot password, etc.)
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    return event;
  }

  const email = event.request.userAttributes.email;
  if (!email) return event;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: {
            Data: 'Welcome to T2C — Your AML/CTF Compliance Journey Starts Here',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: getWelcomeEmailHTML(email),
              Charset: 'UTF-8',
            },
            Text: {
              Data: getWelcomeEmailText(email),
              Charset: 'UTF-8',
            },
          },
        },
      })
    );
    console.log(`Welcome email sent to ${email}`);
  } catch (err) {
    // Log but don't fail the signup
    console.error('Failed to send welcome email:', err);
  }

  return event;
};

function getWelcomeEmailHTML(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #334155; line-height: 1.6; margin: 0; padding: 0; background: #f8fafc; }
    .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .header { background: #1e3a5f; color: white; padding: 24px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
    .btn { display: inline-block; padding: 12px 24px; background: #1e3a5f; color: white !important; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0; }
    .footer { text-align: center; padding: 16px; font-size: 12px; color: #94a3b8; }
    h1 { margin: 0; font-size: 22px; }
    h2 { color: #1e3a5f; font-size: 16px; margin-top: 20px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to T2C</h1>
      <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Tranche 2 AML/CTF Compliance Portal</p>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>Thanks for signing up for T2C! You now have free access to comprehensive AML/CTF compliance guidance for Australia's Tranche 2 reforms.</p>

      <h2>Getting Started</h2>
      <ul>
        <li><strong>Check if you're regulated</strong> — Use the "Am I Regulated?" tool to confirm your obligations</li>
        <li><strong>Review key dates</strong> — Obligations commence 1 July 2026</li>
        <li><strong>Understand your obligations</strong> — Read the obligations overview for your profession</li>
      </ul>

      <p style="text-align:center;">
        <a href="https://www.tranche2compliance.com.au/" class="btn">Go to Your Dashboard</a>
      </p>

      <h2>Want to Build Your Full Compliance Program?</h2>
      <p>Upgrade to <strong>Pro</strong> to access risk assessment tools, fillable CDD forms, program builder, PDF document generation, and more — starting at just $29/month with a 14-day free trial.</p>
      <p><a href="https://www.tranche2compliance.com.au/pricing.html" style="color:#1e3a5f;font-weight:600;">View Pricing &rarr;</a></p>
    </div>
    <div class="footer">
      <p>&copy; 2026 T2C — Tranche 2 AML/CTF Compliance Portal</p>
      <p>This is an educational tool, not legal or compliance advice.</p>
      <p><a href="https://www.tranche2compliance.com.au/disclaimer.html" style="color:#94a3b8;">Disclaimer</a> &middot; <a href="https://www.tranche2compliance.com.au/privacy.html" style="color:#94a3b8;">Privacy</a></p>
    </div>
  </div>
</body>
</html>`;
}

function getWelcomeEmailText(email: string): string {
  return `Welcome to T2C — Tranche 2 AML/CTF Compliance Portal

Thanks for signing up! You now have free access to comprehensive AML/CTF compliance guidance for Australia's Tranche 2 reforms.

GETTING STARTED:
- Check if you're regulated — Use the "Am I Regulated?" tool
- Review key dates — Obligations commence 1 July 2026
- Understand your obligations — Read the overview for your profession

Go to your dashboard: https://www.tranche2compliance.com.au/

WANT THE FULL COMPLIANCE TOOLKIT?
Upgrade to Pro for risk assessment, CDD forms, program builder, PDF generation, and more — starting at $29/month with a 14-day free trial.
View pricing: https://www.tranche2compliance.com.au/pricing.html

---
T2C — Tranche 2 AML/CTF Compliance Portal
This is an educational tool, not legal or compliance advice.
https://www.tranche2compliance.com.au/disclaimer.html`;
}

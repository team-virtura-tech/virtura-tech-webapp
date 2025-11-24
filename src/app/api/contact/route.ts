import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactRequest {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  interests: string[];
  goal: string;
  recaptchaToken: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();
    const { firstName, email, goal, recaptchaToken } = body;

    // Validate required fields
    if (!firstName || !email || !goal || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token using reCAPTCHA Enterprise Assessment API
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const projectId = process.env.RECAPTCHA_PROJECT_ID;

    if (!siteKey || !projectId) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create reCAPTCHA Enterprise client using service account credentials
    let credentials;
    try {
      credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
        : undefined;
    } catch (error) {
      console.error(
        'Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:',
        error
      );
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const client = new RecaptchaEnterpriseServiceClient({
      credentials,
    });
    const projectPath = client.projectPath(projectId);

    // Build the assessment request
    const assessmentRequest = {
      parent: projectPath,
      assessment: {
        event: {
          token: recaptchaToken,
          siteKey: siteKey,
          expectedAction: 'contact_form_submit',
        },
      },
    };

    const [response] = await client.createAssessment(assessmentRequest);

    // Check if token is valid
    if (!response.tokenProperties?.valid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Check if the action matches what we expected
    if (response.tokenProperties?.action !== 'contact_form_submit') {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Check the risk score (0.0 = very likely bot, 1.0 = very likely human)
    const riskScore = response.riskAnalysis?.score || 0;
    if (riskScore < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Initialize Resend client
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content with beautiful brand styling
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FFFCF2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header with brand color -->
          <div style="background: linear-gradient(135deg, #EB5E28 0%, #d34e1f 100%); padding: 40px 32px; text-align: center;">
            <h1 style="margin: 0; color: #FFFCF2; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
              New Contact Inquiry
            </h1>
            <p style="margin: 8px 0 0; color: rgba(255, 252, 242, 0.9); font-size: 14px;">
              Someone wants to work with you!
            </p>
          </div>

          <!-- Main content -->
          <div style="padding: 32px;">

            <!-- Contact Information Card -->
            <div style="background-color: #FFFCF2; border: 2px solid #CCC5B9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="margin: 0 0 20px; color: #252422; font-size: 18px; font-weight: 600; border-bottom: 2px solid #EB5E28; padding-bottom: 8px; display: inline-block;">
                Contact Information
              </h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #403D39; font-size: 14px; font-weight: 600; width: 100px;">Name</td>
                  <td style="padding: 8px 0; color: #252422; font-size: 14px;">${firstName} ${body.lastName}</td>
                </tr>
                ${
                  body.company
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #403D39; font-size: 14px; font-weight: 600;">Company</td>
                  <td style="padding: 8px 0; color: #252422; font-size: 14px;">${body.company}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding: 8px 0; color: #403D39; font-size: 14px; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #EB5E28; text-decoration: none; font-size: 14px; font-weight: 500;">
                      ${email}
                    </a>
                  </td>
                </tr>
                ${
                  body.phone
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #403D39; font-size: 14px; font-weight: 600;">Phone</td>
                  <td style="padding: 8px 0; color: #252422; font-size: 14px;">${body.phone}</td>
                </tr>
                `
                    : ''
                }
              </table>
            </div>

            ${
              body.budget
                ? `
            <!-- Budget Card -->
            <div style="background-color: #FFFCF2; border: 2px solid #CCC5B9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="margin: 0 0 12px; color: #252422; font-size: 18px; font-weight: 600; border-bottom: 2px solid #EB5E28; padding-bottom: 8px; display: inline-block;">
                Budget
              </h2>
              <p style="margin: 12px 0 0; color: #252422; font-size: 16px; font-weight: 500; background-color: rgba(235, 94, 40, 0.1); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #EB5E28;">
                ${body.budget}
              </p>
            </div>
            `
                : ''
            }

            ${
              body.interests.length > 0
                ? `
            <!-- Interests Card -->
            <div style="background-color: #FFFCF2; border: 2px solid #CCC5B9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="margin: 0 0 16px; color: #252422; font-size: 18px; font-weight: 600; border-bottom: 2px solid #EB5E28; padding-bottom: 8px; display: inline-block;">
                Interests
              </h2>
              <div style="margin-top: 12px;">
                ${body.interests
                  .map(
                    (interest: string) => `
                  <span style="display: inline-block; background-color: #EB5E28; color: #FFFCF2; padding: 8px 16px; border-radius: 20px; margin: 4px 8px 4px 0; font-size: 13px; font-weight: 500;">
                    ${interest}
                  </span>
                `
                  )
                  .join('')}
              </div>
            </div>
            `
                : ''
            }

            <!-- Project Goal Card -->
            <div style="background-color: #FFFCF2; border: 2px solid #CCC5B9; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="margin: 0 0 16px; color: #252422; font-size: 18px; font-weight: 600; border-bottom: 2px solid #EB5E28; padding-bottom: 8px; display: inline-block;">
                Project Goal
              </h2>
              <p style="margin: 12px 0 0; color: #252422; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                ${body.goal}
              </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #EB5E28 0%, #d34e1f 100%); color: #FFFCF2; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(235, 94, 40, 0.3);">
                Reply to ${firstName}
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #252422; padding: 24px 32px; text-align: center; border-top: 4px solid #EB5E28;">
            <p style="margin: 0 0 8px; color: #CCC5B9; font-size: 14px; font-weight: 500;">
              VirturaTech Contact Form
            </p>
            <p style="margin: 0; color: #403D39; font-size: 12px;">
              Security Score: ${riskScore.toFixed(2)} • Verified by reCAPTCHA Enterprise
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // Prepare plain text version for better deliverability
    const emailText = `
New Contact Form Submission

CONTACT INFORMATION
Name: ${firstName} ${body.lastName}
${body.company ? `Company: ${body.company}` : ''}
Email: ${email}
${body.phone ? `Phone: ${body.phone}` : ''}

${body.budget ? `BUDGET\n${body.budget}\n` : ''}

${body.interests.length > 0 ? `INTERESTS\n${body.interests.join(', ')}\n` : ''}

PROJECT GOAL
${body.goal}

---
This email was sent from the Virtura Tech contact form.
Risk Score: ${riskScore.toFixed(2)}
    `.trim();

    // Confirmation email to submitter
    const confirmationHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We Received Your Message</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FFFCF2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #EB5E28 0%, #d34e1f 100%); padding: 48px 32px; text-align: center;">
            <h1 style="margin: 0; color: #FFFCF2; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
              Message Received!
            </h1>
            <p style="margin: 12px 0 0; color: rgba(255, 252, 242, 0.9); font-size: 16px;">
              Thank you for reaching out to us
            </p>
          </div>

          <!-- Main content -->
          <div style="padding: 40px 32px;">

            <div style="text-align: center; margin-bottom: 32px;">
              <p style="margin: 0; color: #252422; font-size: 18px; line-height: 1.6;">
                Hi <strong style="color: #EB5E28;">${firstName}</strong>,
              </p>
            </div>

            <div style="background-color: #FFFCF2; border-left: 4px solid #EB5E28; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
              <p style="margin: 0 0 16px; color: #252422; font-size: 16px; line-height: 1.6;">
                We've received your message and we're excited to learn more about your project!
              </p>
              <p style="margin: 0; color: #403D39; font-size: 16px; line-height: 1.6;">
                Our team will review your inquiry and get back to you <strong style="color: #EB5E28;">within 24 hours on weekdays</strong>.
              </p>
            </div>

            <!-- What's Next Card -->
            <div style="background-color: #FFFCF2; border: 2px solid #CCC5B9; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
              <h2 style="margin: 0 0 20px; color: #252422; font-size: 18px; font-weight: 600; border-bottom: 2px solid #EB5E28; padding-bottom: 8px; display: inline-block;">
                What's Next?
              </h2>
              <ul style="margin: 12px 0 0; padding-left: 24px; color: #252422; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 12px;">Our team will review your requirements</li>
                <li style="margin-bottom: 12px;">We'll reach out to discuss your project in detail</li>
                <li style="margin-bottom: 0;">Together, we'll create a plan to bring your vision to life</li>
              </ul>
            </div>

            <!-- Your Details Card -->
            <div style="background-color: rgba(235, 94, 40, 0.05); border: 1px solid #CCC5B9; border-radius: 12px; padding: 20px; margin-bottom: 32px;">
              <p style="margin: 0 0 12px; color: #403D39; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Your Submission Details
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #403D39; font-size: 14px; font-weight: 600;">Name</td>
                  <td style="padding: 6px 0; color: #252422; font-size: 14px;">${firstName} ${body.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #403D39; font-size: 14px; font-weight: 600;">Email</td>
                  <td style="padding: 6px 0; color: #252422; font-size: 14px;">${email}</td>
                </tr>
                ${
                  body.company
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #403D39; font-size: 14px; font-weight: 600;">Company</td>
                  <td style="padding: 6px 0; color: #252422; font-size: 14px;">${body.company}</td>
                </tr>
                `
                    : ''
                }
              </table>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; padding: 24px 0; border-top: 1px solid #CCC5B9;">
              <p style="margin: 0 0 8px; color: #403D39; font-size: 14px;">
                Have questions in the meantime?
              </p>
              <a href="mailto:${toEmail}" style="color: #EB5E28; text-decoration: none; font-size: 16px; font-weight: 600;">
                ${toEmail}
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #252422; padding: 32px; text-align: center; border-top: 4px solid #EB5E28;">
            <p style="margin: 0 0 12px; color: #CCC5B9; font-size: 16px; font-weight: 600;">
              VirturaTech
            </p>
            <p style="margin: 0; color: #CCC5B9; font-size: 13px; line-height: 1.6; opacity: 0.8;">
              Building digital solutions that transform businesses
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    const confirmationText = `
Hi ${firstName},

Thank you for contacting VirturaTech!

We've received your message and we're excited to learn more about your project. Our team will review your inquiry and get back to you within 24 hours on weekdays.

WHAT'S NEXT?
• Our team will review your requirements
• We'll reach out to discuss your project in detail
• Together, we'll create a plan to bring your vision to life

YOUR SUBMISSION DETAILS
Name: ${firstName} ${body.lastName}
Email: ${email}
${body.company ? `Company: ${body.company}` : ''}

Have questions in the meantime? Email us at ${toEmail}

---
VirturaTech
Building digital solutions that transform businesses
    `.trim();

    // Send emails using Resend
    try {
      // Send notification to team
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Contact Form: ${firstName} ${body.lastName}${body.company ? ` - ${body.company}` : ''}`,
        html: emailHtml,
        text: emailText,
        replyTo: email,
      });

      // Send confirmation to submitter
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'We Received Your Message - VirturaTech',
        html: confirmationHtml,
        text: confirmationText,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

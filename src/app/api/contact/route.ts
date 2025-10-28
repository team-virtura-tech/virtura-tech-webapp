import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { NextResponse } from 'next/server';

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

    // Create reCAPTCHA Enterprise client using Application Default Credentials
    const client = new RecaptchaEnterpriseServiceClient();
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

    // Here you would typically send the email or store the contact form data
    // For now, we'll just return success
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

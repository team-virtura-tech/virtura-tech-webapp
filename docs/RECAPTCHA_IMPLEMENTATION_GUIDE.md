# reCAPTCHA Enterprise Implementation Guide

## 📋 Prerequisites & Requirements

### 1. **Google Cloud Setup**

- [ ] Google Cloud Console account
- [ ] Project created in Google Cloud Console
- [ ] Billing account enabled (reCAPTCHA Enterprise requires billing)
- [ ] reCAPTCHA Enterprise API enabled

### 2. **Required Secrets & Environment Variables**

#### **Client-Side (Public)**

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

#### **Server-Side (Private)**

```bash
# Google Cloud Project ID
RECAPTCHA_PROJECT_ID=

# Service Account Credentials (JSON format)
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key":"..."}
```

### 3. **Dependencies**

```json
{
  "@google-cloud/recaptcha-enterprise": "^5.x.x"
}
```

### 4. **Domain Configuration**

- [ ] Domain(s) registered in reCAPTCHA Enterprise console
- [ ] Site key configured for specific domains
- [ ] Production and development domains added

---

## 🏗️ Architecture Overview

### **Flow Diagram**

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐    ┌─────────────┐
│   Client    │───▶│   reCAPTCHA  │───▶│   Your Server   │───▶│   Google    │
│  (Browser)  │    │   Frontend   │    │   API Route     │    │   Cloud     │
└─────────────┘    └──────────────┘    └─────────────────┘    └─────────────┘
      │                     │                    │                     │
      │ 1. User submits     │ 2. Execute         │ 3. Verify token     │ 4. Assessment
      │    form             │    reCAPTCHA       │    with Google      │    response
      │                     │                    │                     │
      │◀────────────────────│◀───────────────────│◀────────────────────│
      │ 5. Show success/error message based on verification result
```

### **Component Architecture**

#### **1. Frontend Components**

- **Hook**: `useRecaptcha.ts` - Encapsulates reCAPTCHA logic
- **Form Component**: Integrates with hook for seamless UX
- **Global Types**: TypeScript definitions for reCAPTCHA

#### **2. Backend Components**

- **API Route**: Handles form submission and reCAPTCHA verification
- **Google Cloud Client**: Authenticates and communicates with reCAPTCHA Enterprise
- **Validation Logic**: Risk score evaluation and security checks

---

## 🔧 Implementation Steps

### **Step 1: Google Cloud Configuration**

#### 1.1 Enable reCAPTCHA Enterprise API

```bash
gcloud services enable recaptchaenterprise.googleapis.com
```

#### 1.2 Create Service Account

1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Create new service account: `your-app-recaptcha-service`
3. Grant role: `reCAPTCHA Enterprise Agent`
4. Download JSON key file

#### 1.3 Create reCAPTCHA Site Key

1. Go to Security → reCAPTCHA Enterprise
2. Create new site key
3. Configure domains (localhost for dev, your-domain.com for prod)
4. Copy site key for frontend use

### **Step 2: Environment Setup**

#### 2.1 Local Development (.env.local)

```bash
# Public - exposed to browser
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# Private - server only
RECAPTCHA_PROJECT_ID=your-google-cloud-project-id
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...full_json_here...}
```

#### 2.2 Production Deployment (Vercel/Netlify/etc.)

- Add same environment variables to hosting platform
- Ensure `GOOGLE_APPLICATION_CREDENTIALS_JSON` is properly escaped
- Test in preview deployments before production

### **Step 3: Frontend Implementation**

#### 3.1 Add reCAPTCHA Script to Layout

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://www.google.com/recaptcha/enterprise.js"
          async
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 3.2 Create reCAPTCHA Hook

```tsx
// hooks/useRecaptcha.ts
import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

export const useRecaptcha = () => {
  const executeRecaptcha = useCallback((action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        reject(new Error('reCAPTCHA site key not found'));
        return;
      }

      if (typeof window === 'undefined' || !window.grecaptcha) {
        reject(new Error('reCAPTCHA not loaded'));
        return;
      }

      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { executeRecaptcha };
};
```

#### 3.3 Integrate in Form Component

```tsx
// components/ContactForm.tsx
'use client';

import { useCallback, useState } from 'react';
import { useRecaptcha } from '@/hooks/useRecaptcha';

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { executeRecaptcha } = useRecaptcha();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      setIsSubmitting(true);

      try {
        // Execute reCAPTCHA
        const token = await executeRecaptcha('form_submit');

        // Submit with token
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, recaptchaToken: token }),
        });

        if (!response.ok) throw new Error('Submission failed');

        setMessage('Success! Your message has been sent.');
      } catch (error) {
        setMessage('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}
    >
      {/* Your form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
```

### **Step 4: Backend Implementation**

#### 4.1 API Route Setup

```tsx
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

interface ContactRequest {
  // Your form fields
  email: string;
  message: string;
  recaptchaToken: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();
    const { email, message, recaptchaToken } = body;

    // Validate required fields
    if (!email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // reCAPTCHA verification
    const isVerified = await verifyRecaptcha(recaptchaToken);
    if (!isVerified) {
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 400 }
      );
    }

    // Process your form (send email, save to DB, etc.)
    // ... your business logic here ...

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully!',
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const projectId = process.env.RECAPTCHA_PROJECT_ID;

    if (!siteKey || !projectId) {
      throw new Error('Missing reCAPTCHA configuration');
    }

    // Parse service account credentials
    let credentials;
    try {
      credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
        : undefined;
    } catch (error) {
      console.error('Failed to parse service account credentials:', error);
      return false;
    }

    // Create reCAPTCHA Enterprise client
    const client = new RecaptchaEnterpriseServiceClient({ credentials });
    const projectPath = client.projectPath(projectId);

    // Create assessment
    const [response] = await client.createAssessment({
      parent: projectPath,
      assessment: {
        event: {
          token,
          siteKey,
          expectedAction: 'form_submit',
        },
      },
    });

    // Validate response
    if (!response.tokenProperties?.valid) {
      console.error(
        'Invalid reCAPTCHA token:',
        response.tokenProperties?.invalidReason
      );
      return false;
    }

    // Check action matches
    if (response.tokenProperties?.action !== 'form_submit') {
      console.error('Action mismatch:', response.tokenProperties?.action);
      return false;
    }

    // Check risk score (0.0 = bot, 1.0 = human)
    const riskScore = response.riskAnalysis?.score || 0;
    if (riskScore < 0.5) {
      console.error('Risk score too low:', riskScore);
      return false;
    }

    return true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}
```

---

## 🔒 Security Considerations

### **1. Risk Score Thresholds**

- **0.9-1.0**: Very likely legitimate user
- **0.7-0.8**: Likely legitimate user
- **0.3-0.6**: Suspicious activity
- **0.0-0.2**: Very likely bot

**Recommended threshold**: `>= 0.5` for most applications

### **2. Action Validation**

- Always verify the action matches expected value
- Use specific action names: `login`, `contact_form`, `checkout`
- Reject tokens with mismatched actions

### **3. Environment Security**

- Never expose service account credentials client-side
- Use different site keys for dev/staging/production
- Regularly rotate service account keys

### **4. Rate Limiting**

- Implement rate limiting on API endpoints
- Consider additional validation for high-risk scores
- Monitor for unusual patterns in reCAPTCHA assessments

---

## 🐛 Troubleshooting

### **Common Issues**

#### **1. "reCAPTCHA not loaded" Error**

- **Cause**: Script not loaded or CSP blocking
- **Solution**: Check script tag in layout, verify CSP settings

#### **2. "API key not valid" Error**

- **Cause**: Incorrect service account credentials
- **Solution**: Verify JSON format, check IAM permissions

#### **3. "Invalid site key" Error**

- **Cause**: Wrong site key or domain not configured
- **Solution**: Check site key matches, add domain to reCAPTCHA console

#### **4. 500 Internal Server Error in Production**

- **Cause**: Missing environment variables or malformed JSON
- **Solution**: Verify all env vars set, check JSON escaping

### **Debugging Steps**

1. **Check Environment Variables**

   ```bash
   # Verify all required vars are set
   echo $NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   echo $RECAPTCHA_PROJECT_ID
   echo $GOOGLE_APPLICATION_CREDENTIALS_JSON | jq . # Should parse as valid JSON
   ```

2. **Test reCAPTCHA Load**

   ```javascript
   // Browser console
   console.log(window.grecaptcha?.enterprise ? 'Loaded' : 'Not loaded');
   ```

3. **Verify Google Cloud Permissions**
   ```bash
   # Check service account has correct role
   gcloud projects get-iam-policy PROJECT_ID
   ```

---

## 📚 Additional Resources

- [reCAPTCHA Enterprise Documentation](https://cloud.google.com/recaptcha-enterprise/docs)
- [Google Cloud IAM Best Practices](https://cloud.google.com/iam/docs/using-iam-securely)
- [Next.js Environment Variables Guide](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## 📝 Implementation Checklist

### **Pre-Development**

- [ ] Google Cloud project created
- [ ] Billing enabled
- [ ] reCAPTCHA Enterprise API enabled
- [ ] Service account created with proper permissions
- [ ] Site key created and configured

### **Development**

- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] reCAPTCHA script added to layout
- [ ] useRecaptcha hook implemented
- [ ] Form component integrated
- [ ] API route created with verification logic

### **Testing**

- [ ] Local development tested
- [ ] Form submission works
- [ ] reCAPTCHA verification passes
- [ ] Error handling works
- [ ] Console shows no errors

### **Deployment**

- [ ] Environment variables added to hosting platform
- [ ] Production domains added to reCAPTCHA console
- [ ] Deployed version tested
- [ ] Monitoring/logging configured
- [ ] Security review completed

---

_This guide covers reCAPTCHA Enterprise implementation for Next.js applications. Adapt the code examples for other frameworks as needed._

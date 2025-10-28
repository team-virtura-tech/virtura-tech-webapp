# Google reCAPTCHA Enterprise Setup Instructions

## 1. Get reCAPTCHA Enterprise Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com/security/recaptcha)
2. Create or select a Google Cloud Project
3. Enable the reCAPTCHA Enterprise API
4. Create a new reCAPTCHA Enterprise key
5. Select **Score-based (v3)** type
6. Add your domain(s)
7. Get the following credentials:
   - **Site Key** (for frontend)
   - **API Key** (for backend verification)
   - **Project ID** (your Google Cloud project ID)

## 2. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```bash
# Google reCAPTCHA Enterprise Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
RECAPTCHA_API_KEY=your_actual_api_key_here
RECAPTCHA_PROJECT_ID=your_actual_project_id_here
```

## 3. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/contact-us`
3. Fill out and submit the form
4. Check browser console and server logs for reCAPTCHA verification

## 4. Production Deployment

Make sure to:

- Add your production domain to reCAPTCHA admin console
- Set environment variables in your hosting platform (Vercel, etc.)
- Test thoroughly in production environment

## 5. reCAPTCHA Enterprise Assessment

The implementation uses reCAPTCHA Enterprise Assessment API with:

- **Risk Score Threshold**: 0.5 (adjustable in `/api/contact/route.ts`)
- **Action Verification**: Ensures action matches `'contact_form_submit'`
- **Token Validation**: Verifies token is valid and not expired

```typescript
// Assessment request format
{
  "event": {
    "token": "TOKEN_FROM_FRONTEND",
    "expectedAction": "contact_form_submit",
    "siteKey": "YOUR_SITE_KEY"
  }
}
```

Score interpretation:

- **1.0** = Very likely human
- **0.5** = Neutral threshold (recommended for forms)
- **0.0** = Very likely bot

## Files Modified

- `/src/app/layout.tsx` - Added reCAPTCHA script
- `/src/hooks/useRecaptcha.ts` - Custom hook for reCAPTCHA
- `/src/app/contact-us/page.tsx` - Form with reCAPTCHA integration
- `/src/app/api/contact/route.ts` - Server-side verification
- `.env.local` - Environment variables

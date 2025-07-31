# 📅 Calendar Integration Guide

## 🎯 Overview

This guide explains how to integrate your Capital Firm dashboard with external calendar systems to automatically track meetings.

## 🔗 Integration Options

### 1. UTM Tracking (Easiest - Start Here)

**How it works:** Add UTM parameters to your calendar links to track which meetings came from your platform.

**Setup:**
1. Use the UTM links generated in your dashboard
2. Replace your calendar URLs with these tracked versions
3. Monitor analytics to see meeting sources

**Example UTM Link:**
```
https://calendly.com/your-calendar?utm_source=capitalfirm&utm_medium=dashboard&utm_campaign=client_meeting&utm_content=calendly
```

### 2. Calendly API Integration

**Setup Steps:**

1. **Get Calendly API Key:**
   - Go to [Calendly Integrations](https://calendly.com/integrations)
   - Create a new API key
   - Add to your environment variables: `CALENDLY_API_KEY`

2. **Configure Webhooks:**
   - Go to Calendly Webhooks
   - Add webhook URL: `https://your-domain.com/api/webhooks/calendar`
   - Select events: `invitee.created`, `invitee.canceled`

3. **Environment Variables:**
   ```env
   CALENDLY_API_KEY=your_api_key_here
   CALENDLY_WEBHOOK_SECRET=your_webhook_secret
   ```

### 3. HubSpot Calendar Integration

**Setup Steps:**

1. **Enable HubSpot Calendar:**
   - Go to HubSpot Settings > Calendar
   - Enable calendar integration
   - Get your calendar URL

2. **Configure Webhooks:**
   - Go to HubSpot Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/calendar`
   - Select events: `meeting.created`, `meeting.updated`

3. **Environment Variables:**
   ```env
   HUBSPOT_API_KEY=your_hubspot_api_key
   HUBSPOT_WEBHOOK_SECRET=your_webhook_secret
   ```

### 4. Google Calendar API

**Setup Steps:**

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Google Calendar API

2. **Get OAuth Credentials:**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Download JSON credentials

3. **Environment Variables:**
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALENDAR_ID=your_calendar_id
   ```

### 5. Zcal Integration

**Setup Steps:**

1. **Get Zcal API Key:**
   - Contact Zcal support for API access
   - Get your API key and webhook URL

2. **Configure Webhooks:**
   - Add webhook endpoint: `https://your-domain.com/api/webhooks/calendar`
   - Select meeting events

3. **Environment Variables:**
   ```env
   ZCAL_API_KEY=your_zcal_api_key
   ZCAL_WEBHOOK_SECRET=your_webhook_secret
   ```

## 🔧 Implementation Steps

### Step 1: Update Environment Variables

Add these to your `.env.local` file:

```env
# Calendar Integration
CALENDLY_API_KEY=your_calendly_api_key
CALENDLY_WEBHOOK_SECRET=your_calendly_webhook_secret
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_WEBHOOK_SECRET=your_hubspot_webhook_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALENDAR_ID=your_google_calendar_id
ZCAL_API_KEY=your_zcal_api_key
ZCAL_WEBHOOK_SECRET=your_zcal_webhook_secret
```

### Step 2: Update Calendar Links

In your dashboard, update the calendar links with your actual URLs:

```typescript
const calendarLinks = {
  calendly: 'https://calendly.com/your-actual-calendar',
  hubspot: 'https://meetings.hubspot.com/your-actual-calendar',
  google: 'https://calendar.google.com/your-actual-calendar',
  zcal: 'https://zcal.co/your-actual-calendar'
};
```

### Step 3: Test Webhook Endpoint

Test your webhook endpoint:

```bash
curl -X POST https://your-domain.com/api/webhooks/calendar \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "meeting.created",
    "meeting": {
      "id": "test-123",
      "title": "Test Meeting",
      "start_time": "2024-01-15T10:00:00Z",
      "end_time": "2024-01-15T11:00:00Z",
      "attendees": [{"email": "test@example.com", "name": "Test User"}],
      "source": "calendly",
      "utm_source": "capitalfirm",
      "utm_medium": "dashboard",
      "utm_campaign": "client_meeting"
    }
  }'
```

## 📊 Analytics & Tracking

### UTM Parameters to Track:

- `utm_source=capitalfirm` - Identifies your platform
- `utm_medium=dashboard` - Shows it came from dashboard
- `utm_campaign=client_meeting` - Specific campaign
- `utm_content=calendly|hubspot|google|zcal` - Calendar source

### Meeting Data Captured:

- Meeting title and description
- Date and time
- Attendee information
- Source (which calendar system)
- UTM tracking data
- Meeting status (scheduled/completed/cancelled)

## 🚀 Advanced Features

### 1. Automatic Meeting Status Updates

The webhook handler automatically updates meeting status when:
- Meetings are cancelled
- Meetings are rescheduled
- Meetings are completed

### 2. Meeting Analytics

Track metrics like:
- Meetings per source
- Conversion rates
- Popular meeting times
- Attendee engagement

### 3. CRM Integration

Automatically create CRM records for:
- New meeting attendees
- Meeting outcomes
- Follow-up tasks

## 🔒 Security Considerations

1. **Webhook Verification:** Always verify webhook signatures
2. **API Rate Limits:** Respect calendar provider rate limits
3. **Data Privacy:** Only collect necessary meeting data
4. **Access Control:** Secure API keys and credentials

## 🐛 Troubleshooting

### Common Issues:

1. **Webhooks not receiving data:**
   - Check webhook URL is accessible
   - Verify webhook is properly configured
   - Check server logs for errors

2. **UTM tracking not working:**
   - Ensure UTM parameters are properly encoded
   - Check calendar provider supports UTM parameters
   - Verify analytics tracking is set up

3. **API integration failing:**
   - Verify API keys are correct
   - Check API rate limits
   - Ensure proper authentication

### Debug Steps:

1. Check server logs for webhook errors
2. Test webhook endpoint manually
3. Verify environment variables are set
4. Check calendar provider documentation

## 📞 Support

For integration help:
1. Check calendar provider documentation
2. Review server logs for errors
3. Test webhook endpoints manually
4. Contact calendar provider support if needed

## 🎯 Next Steps

1. **Start with UTM tracking** - Easiest to implement
2. **Add one calendar integration** - Choose your primary calendar
3. **Test thoroughly** - Ensure data is flowing correctly
4. **Expand gradually** - Add more calendar systems as needed

---

**Need help?** Check the server logs and test webhook endpoints to debug any issues. 
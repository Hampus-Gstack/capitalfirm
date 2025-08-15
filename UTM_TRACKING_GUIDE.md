# UTM Tracking Setup Guide for Zcal Calendar

This guide will help you set up UTM tracking for your Zcal calendar link so that when someone books a meeting, it appears in your dashboard with all the tracking information.

## Overview

The solution uses **UTM parameters** combined with **webhook integration** to track meeting bookings and display them in your dashboard with source attribution.

## Your Zcal Link

**Original Link:** `https://zcal.co/hampusg/discovery-call`

**Tracked Link:** `https://zcal.co/hampusg/discovery-call?utm_source=cursuscapital&utm_medium=dashboard&utm_campaign=client_meeting&utm_content=zcal`

## How It Works

1. **UTM Parameters**: When someone clicks your tracked link, Zcal captures the UTM parameters
2. **Webhook Notification**: When a meeting is booked, Zcal sends a webhook to your application
3. **Data Processing**: Your webhook endpoint extracts UTM data and stores the meeting
4. **Dashboard Display**: The meeting appears in your dashboard with UTM tags

## Setup Steps

### 1. Update Your Dashboard

Your dashboard has been updated to:
- Generate UTM-tracked links automatically
- Display UTM information in the meetings tab
- Handle Zcal webhook data

### 2. Configure Zcal Webhooks

**Note:** Zcal webhook support may require contacting their support team.

1. Contact Zcal support to enable webhook notifications
2. Configure the webhook URL: `https://cursuscapital.co/api/webhooks/calendar`
3. Set up authentication (if required by Zcal)

### 3. Test the Integration

1. Visit `/test-utm` on your site to generate tracked links
2. Use the tracked link to book a test meeting
3. Check your dashboard to see the meeting with UTM data

## API Endpoints

### Webhook Endpoint
- **URL:** `/api/webhooks/calendar`
- **Method:** POST
- **Purpose:** Receives meeting data from Zcal with UTM parameters

### Meetings API
- **URL:** `/api/meetings`
- **Methods:** GET, POST, PUT
- **Purpose:** Manages meeting data with UTM tracking

## UTM Parameters Used

- **utm_source:** `cursuscapital` (your company name)
- **utm_medium:** `dashboard` (where the link was shared)
- **utm_campaign:** `client_meeting` (type of meeting)
- **utm_content:** `zcal` (calendar platform)

## Dashboard Features

### Meeting Display
Meetings in your dashboard now show:
- Meeting title, date, time, and attendee
- Source platform icon (⚡ for Zcal)
- Status badge (scheduled/completed/cancelled)
- UTM parameter tags with color coding:
  - Blue: utm_source
  - Green: utm_medium
  - Purple: utm_campaign
  - Orange: utm_content

### Calendar Integration
- Automatic UTM link generation
- Copy-to-clipboard functionality
- Integration setup instructions

## Webhook Data Structure

When Zcal sends a webhook, it includes:

```json
{
  "event_type": "meeting.created",
  "meeting": {
    "id": "meeting-123",
    "title": "Discovery Call",
    "start_time": "2024-01-20T10:00:00Z",
    "end_time": "2024-01-20T11:00:00Z",
    "attendees": [
      {
        "email": "client@example.com",
        "name": "John Doe"
      }
    ],
    "source": "zcal",
    "booking_url": "https://zcal.co/hampusg/discovery-call?utm_source=cursuscapital&utm_medium=dashboard&utm_campaign=client_meeting&utm_content=zcal",
    "utm_source": "cursuscapital",
    "utm_medium": "dashboard",
    "utm_campaign": "client_meeting",
    "utm_content": "zcal"
  }
}
```

## Alternative Approaches

### Option 1: UTM Tracking Only (Current Implementation)
- ✅ Simple to implement
- ✅ Works with any calendar platform
- ✅ No API dependencies
- ❌ Requires webhook support from calendar provider

### Option 2: API Integration
- ✅ Real-time data sync
- ✅ More detailed meeting information
- ✅ Better error handling
- ❌ Requires API access from calendar provider
- ❌ More complex implementation

## Troubleshooting

### Webhook Not Receiving Data
1. Check if Zcal supports webhooks
2. Verify webhook URL is accessible
3. Test with a simple webhook endpoint

### UTM Parameters Not Showing
1. Ensure webhook includes UTM data
2. Check webhook processing logic
3. Verify dashboard display code

### Meeting Not Appearing in Dashboard
1. Check webhook endpoint logs
2. Verify meetings API is working
3. Test with manual meeting creation

## Next Steps

1. **Contact Zcal Support**: Inquire about webhook capabilities
2. **Test Integration**: Use the test page to verify functionality
3. **Monitor Logs**: Check webhook endpoint for incoming data
4. **Customize UTM Parameters**: Adjust based on your tracking needs

## Files Modified

- `app/dashboard/page.tsx` - Updated with UTM display and link generation
- `app/api/webhooks/calendar/route.ts` - Enhanced webhook processing
- `app/api/meetings/route.ts` - Added UTM content support
- `app/test-utm/page.tsx` - Created test page for UTM generation

## Environment Variables

Add these to your `.env` file:

```env
NEXT_PUBLIC_APP_URL=https://cursuscapital.co
```

## Support

If you need help with:
- Zcal webhook setup
- Custom UTM parameters
- Dashboard customization
- API integration

Contact your development team or refer to the Zcal documentation for webhook configuration. 
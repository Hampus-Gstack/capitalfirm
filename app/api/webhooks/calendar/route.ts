import { NextRequest, NextResponse } from 'next/server';

interface CalendarWebhook {
  event_type: 'meeting.created' | 'meeting.updated' | 'meeting.cancelled';
  meeting: {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    attendees: Array<{
      email: string;
      name: string;
    }>;
    source: 'calendly' | 'hubspot' | 'google' | 'zcal';
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CalendarWebhook = await request.json();
    
    // Verify webhook signature (implement based on your calendar provider)
    // const signature = request.headers.get('x-signature');
    // if (!verifySignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const { event_type, meeting } = body;

    // Parse meeting data
    const startDate = new Date(meeting.start_time);
    const endDate = new Date(meeting.end_time);
    
    const meetingData = {
      id: meeting.id,
      title: meeting.title,
      date: startDate.toISOString().split('T')[0],
      time: startDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      attendee: meeting.attendees.map(a => a.name).join(', '),
      status: event_type === 'meeting.cancelled' ? 'cancelled' : 'scheduled',
      source: meeting.source,
      utm_source: meeting.utm_source,
      utm_medium: meeting.utm_medium,
      utm_campaign: meeting.utm_campaign
    };

    // Store meeting data (replace with your database)
    console.log('Calendar webhook received:', {
      event_type,
      meeting: meetingData
    });

    // You can also forward this to your meetings API
    // await fetch('/api/meetings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(meetingData)
    // });

    return NextResponse.json({ 
      success: true, 
      message: `Meeting ${event_type} processed` 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// Helper function to verify webhook signatures
function verifySignature(payload: any, signature: string | null): boolean {
  // Implement signature verification based on your calendar provider
  // Example for Calendly:
  // const crypto = require('crypto');
  // const expectedSignature = crypto
  //   .createHmac('sha256', process.env.CALENDLY_WEBHOOK_SECRET)
  //   .update(JSON.stringify(payload))
  //   .digest('hex');
  // return signature === expectedSignature;
  
  return true; // Placeholder - implement actual verification
} 
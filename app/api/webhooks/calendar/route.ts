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
    utm_content?: string;
    booking_url?: string; // Zcal specific
    meeting_url?: string; // Zcal specific
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
    
    // Extract UTM parameters from booking URL if available (Zcal specific)
    let utm_source = meeting.utm_source;
    let utm_medium = meeting.utm_medium;
    let utm_campaign = meeting.utm_campaign;
    let utm_content = meeting.utm_content;
    
    if (meeting.booking_url && meeting.source === 'zcal') {
      try {
        const url = new URL(meeting.booking_url);
        utm_source = utm_source || url.searchParams.get('utm_source') || undefined;
        utm_medium = utm_medium || url.searchParams.get('utm_medium') || undefined;
        utm_campaign = utm_campaign || url.searchParams.get('utm_campaign') || undefined;
        utm_content = utm_content || url.searchParams.get('utm_content') || undefined;
      } catch (error) {
        console.log('Could not parse UTM parameters from booking URL');
      }
    }
    
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
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      meeting_url: meeting.meeting_url || meeting.booking_url
    };

    // Store meeting data (replace with your database)
    console.log('Calendar webhook received:', {
      event_type,
      meeting: meetingData,
      utm_data: {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
        content: utm_content
      }
    });

    // Forward to meetings API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData)
      });
      
      if (!response.ok) {
        console.error('Failed to forward meeting to API:', response.statusText);
      }
    } catch (error) {
      console.error('Error forwarding meeting to API:', error);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Meeting ${event_type} processed`,
      utm_tracked: !!(utm_source || utm_medium || utm_campaign)
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
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
    const body = await request.json();
    console.log('Webhook received:', body);

    // Verify webhook signature (implement based on your calendar provider)
    const signature = request.headers.get('x-signature') || request.headers.get('x-hub-signature');
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const webhookData: CalendarWebhook = body;

    if (webhookData.event_type === 'meeting.created') {
      const meeting = webhookData.meeting;
      
      // Extract attendee information
      const attendee = meeting.attendees[0] || { name: 'Unknown', email: 'unknown@example.com' };
      
      // Create meeting data
      const meetingData = {
        title: meeting.title || 'Discovery Call',
        date: new Date(meeting.start_time).toISOString().split('T')[0],
        time: new Date(meeting.start_time).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        attendee: `${attendee.name} (${attendee.email})`,
        source: meeting.source,
        utm_source: meeting.utm_source,
        utm_medium: meeting.utm_medium,
        utm_campaign: meeting.utm_campaign,
        utm_content: meeting.utm_content,
        meeting_url: meeting.meeting_url || meeting.booking_url
      };

      // Automatically create meeting in dashboard
      const meetingResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData)
      });

      if (meetingResponse.ok) {
        console.log('Meeting created automatically:', meetingData);
        
        // Also update booking session if it exists
        const bookingSession = sessionStorage.getItem('booking_session');
        if (bookingSession) {
          const sessionData = JSON.parse(bookingSession);
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/booking-sessions`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              session_id: sessionData.session_id,
              meeting_data: meetingData
            })
          });
        }

        return NextResponse.json({ 
          success: true, 
          message: 'Meeting created automatically',
          meeting: meetingData
        });
      } else {
        console.error('Failed to create meeting:', await meetingResponse.text());
        return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

function verifySignature(payload: any, signature: string | null): boolean {
  // Implement signature verification based on your calendar provider
  // For now, we'll accept all webhooks (you should implement proper verification)
  return true;
} 
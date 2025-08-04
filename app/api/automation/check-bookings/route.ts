import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // This endpoint can be called by a cron job or scheduled task
    // to automatically check for new bookings and create meetings
    
    console.log('Automation: Checking for new bookings...');
    
    // Get the base URL from environment or construct it
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    
    // Check booking sessions for pending bookings
    const bookingSessionsResponse = await fetch(`${baseUrl}/api/booking-sessions`);
    if (bookingSessionsResponse.ok) {
      const { bookingSessions } = await bookingSessionsResponse.json();
      
      // Find pending bookings that need to be converted to meetings
      const pendingBookings = bookingSessions.filter((session: any) => 
        session.status === 'pending' && session.meeting_data
      );

      let createdMeetings = 0;
      
      for (const booking of pendingBookings) {
        try {
          // Create meeting automatically
          const meetingResponse = await fetch(`${baseUrl}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: booking.meeting_data.title || 'Discovery Call',
              date: booking.meeting_data.date || new Date().toISOString().split('T')[0],
              time: booking.meeting_data.time || new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              }),
              attendee: booking.meeting_data.attendee || booking.prospect_name || 'Client',
              source: 'zcal',
              utm_source: booking.utm_source,
              utm_medium: booking.utm_medium,
              utm_campaign: booking.utm_campaign,
              utm_content: booking.utm_content
            })
          });

          if (meetingResponse.ok) {
            createdMeetings++;
            console.log(`Automation: Created meeting for booking session ${booking.session_id}`);
          }
        } catch (error) {
          console.error(`Automation: Error creating meeting for booking session ${booking.session_id}:`, error);
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `Automation completed. Created ${createdMeetings} meetings.`,
        createdMeetings,
        checkedBookings: bookingSessions.length,
        pendingBookings: pendingBookings.length
      });
    } else {
      console.error('Automation: Failed to fetch booking sessions');
      return NextResponse.json({ error: 'Failed to fetch booking sessions' }, { status: 500 });
    }
  } catch (error) {
    console.error('Automation error:', error);
    return NextResponse.json({ error: 'Automation failed' }, { status: 500 });
  }
} 
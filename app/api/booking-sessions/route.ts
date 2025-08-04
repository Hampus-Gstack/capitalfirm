import { NextRequest, NextResponse } from 'next/server';

interface BookingSession {
  id: string;
  session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  prospect_email?: string;
  prospect_name?: string;
  timestamp: string;
  referrer: string;
  status: 'pending' | 'completed' | 'expired';
  calendar_url: string;
  meeting_id?: string;
  meeting_title?: string;
  meeting_date?: string;
  meeting_time?: string;
}

// Mock database - replace with actual database
let bookingSessions: BookingSession[] = [];

export async function GET() {
  try {
    return NextResponse.json({ bookingSessions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch booking sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      prospect_email,
      prospect_name,
      timestamp,
      referrer,
      session_id,
      status,
      calendar_url
    } = body;

    const newBookingSession: BookingSession = {
      id: Date.now().toString(),
      session_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      prospect_email,
      prospect_name,
      timestamp,
      referrer,
      status: status || 'pending',
      calendar_url
    };

    bookingSessions.push(newBookingSession);

    return NextResponse.json({ bookingSession: newBookingSession }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking session' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, meeting_data } = body;

    const sessionIndex = bookingSessions.findIndex(s => s.session_id === session_id);
    if (sessionIndex === -1) {
      return NextResponse.json(
        { error: 'Booking session not found' },
        { status: 404 }
      );
    }

    // Update session with meeting data
    bookingSessions[sessionIndex] = {
      ...bookingSessions[sessionIndex],
      status: 'completed',
      meeting_id: meeting_data.id,
      meeting_title: meeting_data.title,
      meeting_date: meeting_data.date,
      meeting_time: meeting_data.time
    };

    // Automatically create a meeting in the meetings API
    try {
      const meetingResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: meeting_data.title,
          date: meeting_data.date,
          time: meeting_data.time,
          attendee: meeting_data.attendee || bookingSessions[sessionIndex].prospect_name,
          source: 'zcal',
          utm_source: bookingSessions[sessionIndex].utm_source,
          utm_medium: bookingSessions[sessionIndex].utm_medium,
          utm_campaign: bookingSessions[sessionIndex].utm_campaign,
          utm_content: bookingSessions[sessionIndex].utm_content,
          // TODO: Add user_id when authentication is implemented
          user_id: 'default' // This will be replaced with actual user ID
        })
      });

      if (meetingResponse.ok) {
        console.log('Meeting created automatically from booking session');
        const meetingData = await meetingResponse.json();
        return NextResponse.json({ 
          bookingSession: bookingSessions[sessionIndex],
          meeting: meetingData.meeting
        });
      } else {
        console.error('Failed to create meeting automatically');
        return NextResponse.json({ bookingSession: bookingSessions[sessionIndex] });
      }
    } catch (error) {
      console.error('Error creating meeting automatically:', error);
      return NextResponse.json({ bookingSession: bookingSessions[sessionIndex] });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking session' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendee: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  source: 'calendly' | 'hubspot' | 'google' | 'zcal';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  meeting_url?: string;
}

// Mock database - replace with actual database
let meetings: Meeting[] = [
  {
    id: '1',
    title: 'Investment Review Call',
    date: '2024-01-15',
    time: '10:00 AM',
    attendee: 'John Smith',
    status: 'scheduled',
    source: 'calendly',
    utm_source: 'cursuscapital',
    utm_medium: 'dashboard',
    utm_campaign: 'client_meeting'
  },
  {
    id: '2',
    title: 'Due Diligence Meeting',
    date: '2024-01-18',
    time: '2:00 PM',
    attendee: 'Sarah Johnson',
    status: 'scheduled',
    source: 'hubspot',
    utm_source: 'cursuscapital',
    utm_medium: 'dashboard',
    utm_campaign: 'client_meeting'
  }
];

// Function to automatically check for new bookings and create meetings
async function checkForNewBookings() {
  try {
    // Check booking sessions for pending bookings
    const bookingSessionsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/booking-sessions`);
    if (bookingSessionsResponse.ok) {
      const { bookingSessions } = await bookingSessionsResponse.json();
      
      // Find pending bookings that need to be converted to meetings
      const pendingBookings = bookingSessions.filter((session: any) => 
        session.status === 'pending' && session.meeting_data
      );

      for (const booking of pendingBookings) {
        // Create meeting automatically
        const meetingData = {
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
        };

        // Add meeting to list
        const newMeeting: Meeting = {
          id: Date.now().toString(),
          ...meetingData,
          source: 'zcal' as const,
          status: 'scheduled'
        };

        meetings.push(newMeeting);
        console.log('Automatically created meeting:', newMeeting);
      }
    }
  } catch (error) {
    console.error('Error checking for new bookings:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check for new bookings automatically
    await checkForNewBookings();
    
    // In a real app, you would get the user from the session
    // For now, we'll return all meetings (mock data)
    // TODO: Filter by user ID when authentication is implemented
    
    return NextResponse.json({ meetings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, time, attendee, source, utm_source, utm_medium, utm_campaign, utm_content, meeting_url } = body;

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      date,
      time,
      attendee,
      status: 'scheduled',
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      meeting_url
    };

    meetings.push(newMeeting);

    return NextResponse.json({ meeting: newMeeting }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const meetingIndex = meetings.findIndex(m => m.id === id);
    if (meetingIndex === -1) {
      return NextResponse.json(
        { error: 'Meeting not found' },
        { status: 404 }
      );
    }

    meetings[meetingIndex].status = status;

    return NextResponse.json({ meeting: meetings[meetingIndex] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update meeting' },
      { status: 500 }
    );
  }
} 
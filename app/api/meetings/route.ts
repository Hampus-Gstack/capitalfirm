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
    utm_source: 'capitalfirm',
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
    utm_source: 'capitalfirm',
    utm_medium: 'dashboard',
    utm_campaign: 'client_meeting'
  }
];

export async function GET() {
  try {
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
    const { title, date, time, attendee, source, utm_source, utm_medium, utm_campaign } = body;

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
      utm_campaign
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
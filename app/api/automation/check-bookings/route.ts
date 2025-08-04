import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // This endpoint can be called by a cron job or automation service
    // to check for pending booking sessions and process them
    
    // Get all booking sessions
    const sessionsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/booking-sessions`);
    
    if (!sessionsResponse.ok) {
      throw new Error('Failed to fetch booking sessions');
    }
    
    const { bookingSessions } = await sessionsResponse.json();
    
    // Process pending sessions
    const pendingSessions = bookingSessions.filter((session: any) => 
      session.status === 'pending' || session.status === 'pending_booking'
    );
    
    console.log(`Found ${pendingSessions.length} pending booking sessions`);
    
    // For now, just log the sessions
    // In a real implementation, you might:
    // 1. Check if the user actually booked in Zcal
    // 2. Update session status based on external data
    // 3. Create meetings automatically if booking is confirmed
    
    return NextResponse.json({
      success: true,
      message: `Checked ${bookingSessions.length} booking sessions`,
      pendingSessions: pendingSessions.length,
      totalSessions: bookingSessions.length
    });
    
  } catch (error) {
    console.error('Error checking bookings:', error);
    return NextResponse.json(
      { error: 'Failed to check bookings' },
      { status: 500 }
    );
  }
} 
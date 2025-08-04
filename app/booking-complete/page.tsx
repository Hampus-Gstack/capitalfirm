'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookingCompletePage() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [meetingData, setMeetingData] = useState<any>(null);

  useEffect(() => {
    const completeBooking = async () => {
      try {
        // Get booking session from sessionStorage
        const bookingSession = sessionStorage.getItem('booking_session');
        
        if (bookingSession) {
          const sessionData = JSON.parse(bookingSession);
          
          // Extract meeting data from URL parameters (Zcal sends these)
          const meetingTitle = searchParams.get('title') || 'Discovery Call';
          const meetingDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
          const meetingTime = searchParams.get('time') || new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          });
          const attendeeName = searchParams.get('name') || sessionData.prospect_name || 'Client';
          const attendeeEmail = searchParams.get('email') || sessionData.prospect_email;

          const meetingData = {
            title: meetingTitle,
            date: meetingDate,
            time: meetingTime,
            attendee: `${attendeeName}${attendeeEmail ? ` (${attendeeEmail})` : ''}`,
            id: Date.now().toString()
          };

          setMeetingData(meetingData);

          // Complete the booking session
          const response = await fetch('/api/booking-sessions', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: sessionData.session_id,
              meeting_data: meetingData
            })
          });

          if (response.ok) {
            console.log('Booking completed successfully');
            
            // Clear session data
            sessionStorage.removeItem('booking_session');
            
            // Show success message
            setIsProcessing(false);
          } else {
            console.error('Failed to complete booking');
            setIsProcessing(false);
          }
        } else {
          console.log('No booking session found');
          setIsProcessing(false);
        }
      } catch (error) {
        console.error('Error completing booking:', error);
        setIsProcessing(false);
      }
    };

    completeBooking();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Processing Your Booking</h1>
            <p className="text-gray-400">
              Creating your meeting in our system...
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-400 mb-6">
              Your meeting has been successfully scheduled and added to our system.
            </p>
            
            {meetingData && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Meeting Details</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Title:</strong> {meetingData.title}</p>
                  <p><strong>Date:</strong> {meetingData.date}</p>
                  <p><strong>Time:</strong> {meetingData.time}</p>
                  <p><strong>Attendee:</strong> {meetingData.attendee}</p>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              <p>You'll receive a calendar invitation shortly.</p>
              <p>Your meeting will appear in our dashboard automatically.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 
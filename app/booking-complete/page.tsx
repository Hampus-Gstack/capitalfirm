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
        const bookingId = sessionStorage.getItem('current_booking_id');
        
        if (bookingSession) {
          const sessionData = JSON.parse(bookingSession);
          
          // Try to get meeting data from URL parameters (if Zcal sends them)
          let meetingTitle = searchParams.get('title') || 'Discovery Call';
          let meetingDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
          let meetingTime = searchParams.get('time') || new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          });
          let attendeeName = searchParams.get('name') || sessionData.prospect_name || 'Client';
          let attendeeEmail = searchParams.get('email') || sessionData.prospect_email;

          // If no meeting data from URL, create a placeholder meeting
          // This will be updated when the user actually books
          const meetingData = {
            title: meetingTitle,
            date: meetingDate,
            time: meetingTime,
            attendee: `${attendeeName}${attendeeEmail ? ` (${attendeeEmail})` : ''}`,
            id: Date.now().toString(),
            status: 'pending_booking' // Special status to indicate booking in progress
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
              booking_id: bookingId,
              meeting_data: meetingData,
              completion_method: 'redirect' // Indicates this was completed via redirect, not webhook
            })
          });

          if (response.ok) {
            console.log('Booking session completed successfully');
            
            // Clear session data
            sessionStorage.removeItem('booking_session');
            sessionStorage.removeItem('current_booking_id');
            
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
            <h1 className="text-2xl font-bold mb-2">Booking Session Created!</h1>
            <p className="text-gray-400 mb-6">
              Your booking session has been created and tracked in our system.
            </p>
            
            {meetingData && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Session Details</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Title:</strong> {meetingData.title}</p>
                  <p><strong>Attendee:</strong> {meetingData.attendee}</p>
                  <p><strong>Status:</strong> <span className="text-yellow-400">Pending Booking</span></p>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              <p>Your meeting will be tracked when you complete the booking in Zcal.</p>
              <p>You can manually add meeting details in your dashboard.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CalendarBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Capture UTM parameters
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    const utm_content = searchParams.get('utm_content');
    const prospect_email = searchParams.get('email');
    const prospect_name = searchParams.get('name');

    // Store UTM data and create a booking session
    if (utm_source || utm_medium || utm_campaign || utm_content) {
      const utmData = {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        prospect_email,
        prospect_name,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      // Store in localStorage for tracking
      localStorage.setItem('calendar_utm_data', JSON.stringify(utmData));
      
      // Store in sessionStorage for this booking session
      sessionStorage.setItem('booking_session', JSON.stringify(utmData));
      
      // Store a unique identifier for this booking attempt
      const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('current_booking_id', bookingId);
      
      console.log('UTM data captured:', utmData);
      
      // Create a booking session in your system
      createBookingSession(utmData, bookingId);
    }

    // Redirect to actual calendar after a brief delay
    const timer = setTimeout(() => {
      setIsRedirecting(true);
      // Redirect to Zcal with a custom parameter to track the booking
      const bookingId = sessionStorage.getItem('current_booking_id');
      const zcalUrl = `https://zcal.co/hampusg/discovery-call?booking_id=${bookingId}`;
      window.location.href = zcalUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const createBookingSession = async (utmData: any, bookingId: string) => {
    try {
      // Create a booking session that will be completed when they book
      const response = await fetch('/api/booking-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...utmData,
          booking_id: bookingId,
          status: 'pending',
          calendar_url: 'https://zcal.co/hampusg/discovery-call'
        })
      });

      if (response.ok) {
        console.log('Booking session created with ID:', bookingId);
      }
    } catch (error) {
      console.error('Error creating booking session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Calendar</h1>
        <p className="text-gray-400">
          {isRedirecting ? 'Opening your calendar...' : 'Preparing your meeting link...'}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          <p>UTM tracking enabled</p>
          <p>Your booking session is being created...</p>
        </div>
      </div>
    </div>
  );
} 
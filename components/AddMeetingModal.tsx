'use client';

import { useState } from 'react';

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

interface AddMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeeting: (meeting: Meeting) => void;
}

export default function AddMeetingModal({ isOpen, onClose, onAddMeeting }: AddMeetingModalProps) {
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    attendee: '',
    source: 'zcal' as const,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: ''
  });

  const handleSubmit = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time && newMeeting.attendee) {
      const meeting: Meeting = {
        id: Date.now().toString(),
        title: newMeeting.title,
        date: newMeeting.date,
        time: newMeeting.time,
        attendee: newMeeting.attendee,
        status: 'scheduled',
        source: newMeeting.source,
        utm_source: newMeeting.utm_source || undefined,
        utm_medium: newMeeting.utm_medium || undefined,
        utm_campaign: newMeeting.utm_campaign || undefined,
        utm_content: newMeeting.utm_content || undefined
      };
      
      onAddMeeting(meeting);
      
      // Reset form
      setNewMeeting({
        title: '',
        date: '',
        time: '',
        attendee: '',
        source: 'zcal',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: ''
      });
      
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-lg mx-4 border border-gray-600/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Add Meeting</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Meeting Title *</label>
            <input
              type="text"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              placeholder="Discovery Call - Client Name"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Date *</label>
              <input
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Time *</label>
              <input
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Attendee *</label>
            <input
              type="text"
              value={newMeeting.attendee}
              onChange={(e) => setNewMeeting({...newMeeting, attendee: e.target.value})}
              placeholder="Client Name (Company)"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Source</label>
            <select
              value={newMeeting.source}
              onChange={(e) => setNewMeeting({...newMeeting, source: e.target.value as any})}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="zcal">Zcal</option>
              <option value="calendly">Calendly</option>
              <option value="hubspot">HubSpot</option>
              <option value="google">Google Calendar</option>
            </select>
          </div>

          {/* UTM Parameters */}
          <div className="border-t border-gray-600/50 pt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">UTM Tracking (Optional)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">UTM Source</label>
                <input
                  type="text"
                  value={newMeeting.utm_source}
                  onChange={(e) => setNewMeeting({...newMeeting, utm_source: e.target.value})}
                  placeholder="capitalfirm"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">UTM Medium</label>
                <input
                  type="text"
                  value={newMeeting.utm_medium}
                  onChange={(e) => setNewMeeting({...newMeeting, utm_medium: e.target.value})}
                  placeholder="dashboard"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">UTM Campaign</label>
                <input
                  type="text"
                  value={newMeeting.utm_campaign}
                  onChange={(e) => setNewMeeting({...newMeeting, utm_campaign: e.target.value})}
                  placeholder="client_meeting"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">UTM Content</label>
                <input
                  type="text"
                  value={newMeeting.utm_content}
                  onChange={(e) => setNewMeeting({...newMeeting, utm_content: e.target.value})}
                  placeholder="zcal"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!newMeeting.title || !newMeeting.date || !newMeeting.time || !newMeeting.attendee}
            className="px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Meeting
          </button>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddMeetingModal from '@/components/AddMeetingModal';

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

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'in_review' | 'done';
  stage: string;
  assignee: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

interface Stage {
  id: string;
  name: string;
  order: number;
  status: 'not_started' | 'in_progress' | 'completed';
  tasks: Task[];
  color: string;
  icon: string;
}

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  source: string;
  description?: string;
  lastActivity: string;
  createdAt: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
  order: number;
}

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Generate UTM-tracked calendar links
  const generateUTMLink = (baseUrl: string, source: string) => {
    const utmParams = new URLSearchParams({
      utm_source: 'capitalfirm',
      utm_medium: 'dashboard',
      utm_campaign: 'client_meeting',
      utm_content: source
    });
    return `${baseUrl}?${utmParams.toString()}`;
  };
  
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get('tab') || 'overview';
  });
  const [calendarLinks, setCalendarLinks] = useState({
    calendly: 'https://calendly.com/your-calendar',
    hubspot: 'https://meetings.hubspot.com/your-calendar',
    google: 'https://calendar.google.com/your-calendar',
    zcal: generateUTMLink('https://zcal.co/hampusg/discovery-call', 'zcal')
  });

  const [showCalendarSetup, setShowCalendarSetup] = useState(false);
  const [stages, setStages] = useState<Stage[]>([
    {
      id: '1',
      name: 'Stage 1: Onboarding',
      order: 1,
      status: 'not_started',
      color: 'from-blue-500 to-cyan-500',
      icon: '🚀',
      tasks: [
        {
          id: '1',
          title: 'Client Onboarding',
          description: 'Complete client onboarding process and initial setup',
          status: 'not_started',
          stage: '1',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['onboarding', 'setup'],
          estimatedHours: 4,
          actualHours: 0
        },
        {
          id: '2',
          title: 'Requirements Gathering',
          description: 'Collect and document client requirements',
          status: 'not_started',
          stage: '1',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['requirements', 'planning'],
          estimatedHours: 6,
          actualHours: 0
        }
      ]
    },
    {
      id: '2',
      name: 'Stage 2: Setup',
      order: 2,
      status: 'not_started',
      color: 'from-purple-500 to-pink-500',
      icon: '⚙️',
      tasks: [
        {
          id: '3',
          title: 'Technical Setup',
          description: 'Configure technical infrastructure and tools',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['technical', 'setup'],
          estimatedHours: 8,
          actualHours: 0
        },
        {
          id: '4',
          title: 'ICP Definition',
          description: 'Define Ideal Customer Profile and target market',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['marketing', 'strategy'],
          estimatedHours: 4,
          actualHours: 0
        },
        {
          id: '5',
          title: 'Pitch Deck Creation',
          description: 'Create compelling investor pitch deck',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['pitch', 'presentation'],
          estimatedHours: 12,
          actualHours: 0
        },
        {
          id: '6',
          title: 'Investor Materials',
          description: 'Prepare comprehensive investor presentation materials',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['materials', 'presentation'],
          estimatedHours: 10,
          actualHours: 0
        }
      ]
    },
    {
      id: '3',
      name: 'Stage 3: Campaigns',
      order: 3,
      status: 'not_started',
      color: 'from-green-500 to-emerald-500',
      icon: '📈',
      tasks: [
        {
          id: '7',
          title: 'List Scraping',
          description: 'Scrape and compile comprehensive investor lists',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['data', 'research'],
          estimatedHours: 6,
          actualHours: 0
        },
        {
          id: '8',
          title: 'Campaign Setup',
          description: 'Set up automated outreach campaigns',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['automation', 'campaign'],
          estimatedHours: 8,
          actualHours: 0
        },
        {
          id: '9',
          title: 'Campaign Launch',
          description: 'Launch investor outreach campaign',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['launch', 'outreach'],
          estimatedHours: 4,
          actualHours: 0
        }
      ]
    },
    {
      id: '4',
      name: 'Stage 4: Placement',
      order: 4,
      status: 'not_started',
      color: 'from-orange-500 to-red-500',
      icon: '💰',
      tasks: []
    },
    {
      id: '5',
      name: 'Stage 5: Reporting',
      order: 5,
      status: 'not_started',
      color: 'from-indigo-500 to-purple-500',
      icon: '📊',
      tasks: [
        {
          id: '10',
          title: 'Analytics Setup',
          description: 'Set up comprehensive reporting and analytics',
          status: 'not_started',
          stage: '5',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['analytics', 'reporting'],
          estimatedHours: 6,
          actualHours: 0
        },
        {
          id: '11',
          title: 'Performance Reports',
          description: 'Generate campaign performance reports',
          status: 'not_started',
          stage: '5',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          tags: ['reports', 'performance'],
          estimatedHours: 4,
          actualHours: 0
        }
      ]
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    stage: '1',
    assignee: 'Team',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[],
    estimatedHours: 0
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [bookingSessions, setBookingSessions] = useState<any[]>([]);
  const [showBookingSessions, setShowBookingSessions] = useState(false);
  
  // CRM Pipeline State
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'lead',
      name: 'Leads',
      color: 'from-blue-500 to-cyan-500',
      order: 1,
      deals: [
        {
          id: 'deal1',
          title: 'Series A Funding',
          company: 'TechStart Inc.',
          contact: 'John Smith',
          email: 'john@techstart.com',
          phone: '+1 (555) 123-4567',
          value: 2500000,
          stage: 'lead',
          probability: 20,
          closeDate: '2024-03-15',
          source: 'Website',
          description: 'Looking for Series A funding to expand operations.',
          lastActivity: '2024-01-15T10:00:00Z',
          createdAt: '2024-01-10T09:00:00Z',
          tags: ['tech', 'series-a', 'high-growth'],
          priority: 'high'
        },
        {
          id: 'deal2',
          title: 'Growth Capital',
          company: 'DataFlow Analytics',
          contact: 'Sarah Johnson',
          email: 'sarah@dataflow.com',
          value: 1800000,
          stage: 'lead',
          probability: 15,
          closeDate: '2024-04-01',
          source: 'Referral',
          description: 'Seeking growth capital for market expansion.',
          lastActivity: '2024-01-14T14:30:00Z',
          createdAt: '2024-01-08T11:00:00Z',
          tags: ['data', 'growth', 'expansion'],
          priority: 'medium'
        }
      ]
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'from-yellow-500 to-orange-500',
      order: 2,
      deals: [
        {
          id: 'deal3',
          title: 'Bridge Funding',
          company: 'GreenTech Solutions',
          contact: 'Mike Chen',
          email: 'mike@greentech.com',
          value: 750000,
          stage: 'qualified',
          probability: 45,
          closeDate: '2024-02-28',
          source: 'LinkedIn',
          description: 'Bridge funding before Series B round.',
          lastActivity: '2024-01-13T09:15:00Z',
          createdAt: '2024-01-05T16:30:00Z',
          tags: ['cleantech', 'bridge', 'urgent'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'proposal',
      name: 'Proposal',
      color: 'from-purple-500 to-pink-500',
      order: 3,
      deals: [
        {
          id: 'deal4',
          title: 'Seed Round',
          company: 'FinTech Pro',
          contact: 'Emily Davis',
          email: 'emily@fintechpro.com',
          value: 1200000,
          stage: 'proposal',
          probability: 70,
          closeDate: '2024-02-15',
          source: 'Conference',
          description: 'Seed funding for fintech startup.',
          lastActivity: '2024-01-12T15:45:00Z',
          createdAt: '2024-01-01T10:00:00Z',
          tags: ['fintech', 'seed', 'promising'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'from-orange-500 to-red-500',
      order: 4,
      deals: [
        {
          id: 'deal5',
          title: 'Series B Round',
          company: 'HealthTech Inc.',
          contact: 'Alex Rodriguez',
          email: 'alex@healthtech.com',
          value: 5000000,
          stage: 'negotiation',
          probability: 85,
          closeDate: '2024-01-30',
          source: 'Partnership',
          description: 'Series B funding for healthcare technology.',
          lastActivity: '2024-01-11T11:20:00Z',
          createdAt: '2023-12-15T14:00:00Z',
          tags: ['healthtech', 'series-b', 'almost-closed'],
          priority: 'high'
        }
      ]
    },
    {
      id: 'closed',
      name: 'Closed Won',
      color: 'from-green-500 to-emerald-500',
      order: 5,
      deals: [
        {
          id: 'deal6',
          title: 'Expansion Capital',
          company: 'AI Innovations',
          contact: 'Lisa Wang',
          email: 'lisa@aiinnovations.com',
          value: 3200000,
          stage: 'closed',
          probability: 100,
          closeDate: '2024-01-05',
          source: 'Direct',
          description: 'Expansion capital for AI company - CLOSED.',
          lastActivity: '2024-01-05T16:00:00Z',
          createdAt: '2023-11-20T09:30:00Z',
          tags: ['ai', 'expansion', 'closed'],
          priority: 'medium'
        }
      ]
    }
  ]);
  
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    company: '',
    contact: '',
    email: '',
    phone: '',
    value: 0,
    stage: 'lead',
    probability: 10,
    closeDate: '',
    source: '',
    description: '',
    tags: [] as string[],
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Load meetings from API - replace with actual API calls
  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const response = await fetch('/api/meetings');
        if (response.ok) {
          const data = await response.json();
          setMeetings(data.meetings || []);
        }
      } catch (error) {
        console.error('Error loading meetings:', error);
        // Fallback to mock data for now
        const mockMeetings: Meeting[] = [
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
        setMeetings(mockMeetings);
      }
    };

    loadMeetings();

    // Set up real-time automation check
    const automationCheck = async () => {
      try {
        await fetch('/api/automation/check-bookings');
        console.log('Automation check completed');
      } catch (error) {
        console.error('Automation check failed:', error);
      }
    };

    // Run automation check every 30 seconds when dashboard is open
    const automationInterval = setInterval(automationCheck, 30000);
    
    // Initial check
    automationCheck();

    return () => {
      clearInterval(automationInterval);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      // Load booking sessions
      try {
        const sessionsResponse = await fetch('/api/booking-sessions');
        if (sessionsResponse.ok) {
          const sessionsData = await sessionsResponse.json();
          setBookingSessions(sessionsData.bookingSessions || []);
        }
      } catch (error) {
        console.error('Error loading booking sessions:', error);
      }
    };

    loadData();
  }, []);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return; // Prevent unnecessary updates
    
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };

  // Sync URL state on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]); // Remove activeTab dependency to prevent loops

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'calendly': return '📅';
      case 'hubspot': return '🔗';
      case 'google': return '📊';
      case 'zcal': return '⚡';
      default: return '📅';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-500';
      case 'in_progress': return 'bg-blue-500';
      case 'in_review': return 'bg-orange-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 border-green-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        tasks: stage.tasks.map(task => 
          task.id === taskId 
            ? { ...task, status: newStatus as any, updatedAt: new Date().toISOString().split('T')[0] }
            : task
        )
      }))
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a valid droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task being moved
    const allTasks = stages.flatMap(stage => stage.tasks);
    const movedTask = allTasks.find(task => task.id === draggableId);
    
    if (!movedTask) {
      return;
    }

    // Update the task status based on the destination
    const newStatus = destination.droppableId;
    updateTaskStatus(draggableId, newStatus);
  };

  const handleDragStart = (start: any) => {
    // Optional: Add any logic when drag starts
    console.log('Drag started:', start);
  };

  const handleDragUpdate = (update: any) => {
    // Optional: Add any logic during drag
    console.log('Drag update:', update);
  };

  const updateTaskHours = (taskId: string, hours: number) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        tasks: stage.tasks.map(task => 
          task.id === taskId 
            ? { ...task, actualHours: hours, updatedAt: new Date().toISOString().split('T')[0] }
            : task
        )
      }))
    );
  };

  const deleteTask = (taskId: string) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        tasks: stage.tasks.filter(task => task.id !== taskId)
      }))
    );
  };

  const updateStageStatus = (stageId: string, newStatus: string) => {
    setStages(prevStages => 
      prevStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, status: newStatus as any }
          : stage
      )
    );
  };

  const getTasksByStatus = (status: string) => {
    return stages.flatMap(stage => stage.tasks).filter(task => task.status === status);
  };

  const getStageProgress = (stage: Stage) => {
    if (stage.tasks.length === 0) return 0;
    const completedTasks = stage.tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / stage.tasks.length) * 100);
  };

  const getOverallProgress = () => {
    const allTasks = stages.flatMap(stage => stage.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / allTasks.length) * 100);
  };

  const addNewTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'not_started',
      stage: newTask.stage,
      assignee: newTask.assignee,
      priority: newTask.priority,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: newTask.tags,
      estimatedHours: newTask.estimatedHours
    };

    setStages(prevStages => 
      prevStages.map(stage => 
        stage.id === newTask.stage 
          ? { ...stage, tasks: [...stage.tasks, task] }
          : stage
      )
    );

    setNewTask({
      title: '',
      description: '',
      stage: '1',
      assignee: 'Team',
      priority: 'medium',
      tags: [],
      estimatedHours: 0
    });
    setShowNewTaskModal(false);
  };

  const filteredTasks = stages.flatMap(stage => stage.tasks).filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const createMeetingFromSession = async (session: any) => {
    try {
      const meetingData = {
        title: session.meeting_title || 'Discovery Call',
        date: session.meeting_date || new Date().toISOString().split('T')[0],
        time: session.meeting_time || new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        attendee: session.prospect_name || 'Client',
        source: 'zcal',
        utm_source: session.utm_source,
        utm_medium: session.utm_medium,
        utm_campaign: session.utm_campaign,
        utm_content: session.utm_content
      };

      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData)
      });

      if (response.ok) {
        const newMeeting = await response.json();
        setMeetings([newMeeting.meeting, ...meetings]);
        
        // Update the booking session status
        await fetch('/api/booking-sessions', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: session.session_id,
            meeting_data: {
              ...meetingData,
              id: newMeeting.meeting.id,
              status: 'completed'
            },
            completion_method: 'manual'
          })
        });

        // Remove from booking sessions list
        setBookingSessions(bookingSessions.filter(s => s.session_id !== session.session_id));
      }
    } catch (error) {
      console.error('Error creating meeting from session:', error);
    }
  };

  // CRM Pipeline Functions
  const updateDealStage = (dealId: string, newStage: string) => {
    setPipelineStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        deals: stage.deals.map(deal => 
          deal.id === dealId 
            ? { ...deal, stage: newStage, lastActivity: new Date().toISOString() }
            : deal
        ).filter(deal => deal.stage === stage.id)
      })).map(stage => ({
        ...stage,
        deals: [
          ...stage.deals,
          ...prevStages.flatMap(s => s.deals).filter(deal => 
            deal.id === dealId ? deal.stage === stage.id : false
          ).map(deal => ({ ...deal, stage: newStage, lastActivity: new Date().toISOString() }))
        ]
      }))
    );
  };

  const handlePipelineDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a valid droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the deal being moved
    const allDeals = pipelineStages.flatMap(stage => stage.deals);
    const movedDeal = allDeals.find(deal => deal.id === draggableId);
    
    if (!movedDeal) {
      return;
    }

    // Update the deal stage based on the destination
    const newStage = destination.droppableId;
    
    // Update probability based on stage
    let newProbability = movedDeal.probability;
    switch (newStage) {
      case 'lead': newProbability = Math.max(10, newProbability); break;
      case 'qualified': newProbability = Math.max(25, newProbability); break;
      case 'proposal': newProbability = Math.max(50, newProbability); break;
      case 'negotiation': newProbability = Math.max(75, newProbability); break;
      case 'closed': newProbability = 100; break;
    }

    // Create updated stages
    const updatedStages = pipelineStages.map(stage => ({
      ...stage,
      deals: stage.deals.filter(deal => deal.id !== draggableId)
    }));

    // Add the deal to the new stage
    const targetStageIndex = updatedStages.findIndex(stage => stage.id === newStage);
    if (targetStageIndex !== -1) {
      updatedStages[targetStageIndex].deals.push({
        ...movedDeal,
        stage: newStage,
        probability: newProbability,
        lastActivity: new Date().toISOString()
      });
    }

    setPipelineStages(updatedStages);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDealPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const addNewDeal = () => {
    const deal: Deal = {
      id: `deal${Date.now()}`,
      title: newDeal.title,
      company: newDeal.company,
      contact: newDeal.contact,
      email: newDeal.email,
      phone: newDeal.phone,
      value: newDeal.value,
      stage: newDeal.stage,
      probability: newDeal.probability,
      closeDate: newDeal.closeDate,
      source: newDeal.source,
      description: newDeal.description,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      tags: newDeal.tags,
      priority: newDeal.priority
    };

    setPipelineStages(prevStages => 
      prevStages.map(stage => 
        stage.id === newDeal.stage 
          ? { ...stage, deals: [...stage.deals, deal] }
          : stage
      )
    );

    // Reset form
    setNewDeal({
      title: '',
      company: '',
      contact: '',
      email: '',
      phone: '',
      value: 0,
      stage: 'lead',
      probability: 10,
      closeDate: '',
      source: '',
      description: '',
      tags: [],
      priority: 'medium'
    });
    setShowNewDealModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mobile-safe-area">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
              Capital Firm Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                  if (isIOS) {
                    alert(`📱 Install Capital Firm App on iOS:

1. Tap the Share button (square with arrow) at the bottom
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" in the top right
4. The app will appear on your home screen!

💡 Tip: You can also tap "Add to Favorites" for quick access.`);
                  } else {
                    alert(`📱 Install Capital Firm App on Android:

1. Tap the menu (three dots) in the top right
2. Tap "Add to Home screen" or "Install app"
3. Tap "Add" or "Install"
4. The app will appear on your home screen!

💡 Tip: You can also add to your app drawer for quick access.`);
                  }
                }}
                className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📱 Install App
              </button>
              <button
                onClick={() => router.push('/test-utm')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔗 UTM Tools
              </button>
              <button
                onClick={() => router.push('/admin')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                👑 Admin Panel
              </button>
              <span className="text-gray-400">Welcome back,</span>
              <span className="font-semibold">Client Name</span>
              <button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'meetings', name: 'Meetings' },
              { id: 'investments', name: 'Investments' },
              { id: 'documents', name: 'Documents' },
              { id: 'crm', name: 'CRM' },
              { id: 'project-management', name: 'Project Management' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ease-in-out">
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push('/test-utm')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span className="text-xl">🔗</span>
                    <span>Generate UTM Links</span>
                  </button>
                  <button
                    onClick={() => setShowAddMeetingModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span className="text-xl">📅</span>
                    <span>Add Meeting</span>
                  </button>
                  <button
                    onClick={() => router.push('/admin')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span className="text-xl">👑</span>
                    <span>Admin Panel</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 card-hover hover-glow animate-slideIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Investments</h3>
                <span className="text-2xl">💰</span>
              </div>
              <p className="text-3xl font-bold text-blue-400 mb-2">$2.5M</p>
              <p className="text-sm text-gray-400">+12% from last month</p>
              <div className="mt-4 w-full bg-blue-500/20 rounded-full h-1">
                <div className="bg-blue-400 h-1 rounded-full progress-animate" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Deals</h3>
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-3xl font-bold text-green-400 mb-2">8</p>
              <p className="text-sm text-gray-400">3 in due diligence</p>
              <div className="mt-4 w-full bg-green-500/20 rounded-full h-1">
                <div className="bg-green-400 h-1 rounded-full progress-animate" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Scheduled Meetings</h3>
                <span className="text-2xl">📅</span>
              </div>
              <p className="text-3xl font-bold text-purple-400 mb-2">{meetings.filter(m => m.status === 'scheduled').length}</p>
              <p className="text-sm text-gray-400">This week</p>
              <div className="mt-4 w-full bg-purple-500/20 rounded-full h-1">
                <div className="bg-purple-400 h-1 rounded-full progress-animate" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Portfolio Companies</h3>
                <span className="text-2xl">🏢</span>
              </div>
              <p className="text-3xl font-bold text-orange-400 mb-2">15</p>
              <p className="text-sm text-gray-400">+2 this quarter</p>
              <div className="mt-4 w-full bg-orange-500/20 rounded-full h-1">
                <div className="bg-orange-400 h-1 rounded-full progress-animate" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </>
        )}

        {activeTab === 'project-management' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Project Overview */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                    Project Management
                  </h2>
                  <p className="text-gray-400 mt-1">Track your project progress and manage tasks efficiently</p>
                </div>
                <button 
                  onClick={() => setShowNewTaskModal(true)}
                  className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  + New Task
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Tasks</p>
                      <p className="text-2xl font-bold text-blue-400">{stages.flatMap(s => s.tasks).length}</p>
                    </div>
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-green-400">{getTasksByStatus('done').length}</p>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">In Progress</p>
                      <p className="text-2xl font-bold text-orange-400">{getTasksByStatus('in_progress').length}</p>
                    </div>
                    <span className="text-2xl">🔄</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Progress</p>
                      <p className="text-2xl font-bold text-purple-400">{getOverallProgress()}%</p>
                    </div>
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Overall Progress</h3>
                  <span className="text-2xl font-bold text-accent-400">{getOverallProgress()}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-accent-500 to-purple-500 h-4 rounded-full progress-animate"
                    style={{ width: `${getOverallProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Stage Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stages.slice(0, 3).map((stage) => (
                    <div key={stage.id} className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stage.name}</span>
                        <span className="text-xs text-gray-400">{getStageProgress(stage)}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                        <div 
                          className={`bg-gradient-to-r ${stage.color} h-2 rounded-full transition-all duration-500 ease-out`}
                          style={{ width: `${getStageProgress(stage)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{stage.tasks.filter(t => t.status === 'done').length}/{stage.tasks.length} tasks</span>
                        <span className={`w-2 h-2 rounded-full ${getTaskStatusColor(stage.status)}`}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search and Filter */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              {/* Stages Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Project Stages</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {stages.map((stage) => (
                    <div key={stage.id} className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{stage.icon}</span>
                          <span className="text-sm font-medium">{stage.name.split(':')[1]}</span>
                        </div>
                        <span className={`w-3 h-3 rounded-full ${getTaskStatusColor(stage.status)}`}></span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{stage.tasks.length} tasks</p>
                      <div className="space-y-2">
                        {stage.tasks.slice(0, 2).map((task) => (
                          <div key={task.id} className="text-xs text-gray-300 flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${getTaskStatusColor(task.status)}`}></span>
                            <span className="truncate">{task.title}</span>
                          </div>
                        ))}
                        {stage.tasks.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{stage.tasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanban Board */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Task Board</h3>
                <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragUpdate={handleDragUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { status: 'not_started', title: 'Not Started', count: getTasksByStatus('not_started').length, color: 'from-gray-500 to-gray-600' },
                      { status: 'in_progress', title: 'In Progress', count: getTasksByStatus('in_progress').length, color: 'from-blue-500 to-blue-600' },
                      { status: 'in_review', title: 'In Review', count: getTasksByStatus('in_review').length, color: 'from-orange-500 to-orange-600' },
                      { status: 'done', title: 'Done', count: getTasksByStatus('done').length, color: 'from-green-500 to-green-600' }
                    ].map((column) => (
                      <div key={column.status} className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">{column.title}</h4>
                          <span className="text-sm text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full">{column.count}</span>
                        </div>
                        <Droppable droppableId={column.status}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`space-y-3 min-h-[200px] p-2 ${snapshot.isDraggingOver ? 'bg-gray-600/30 rounded-lg' : ''}`}
                              style={{ minHeight: '200px' }}
                            >
                              {filteredTasks.filter(task => task.status === column.status).map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`bg-gray-600/50 rounded-lg p-3 cursor-pointer hover:bg-gray-500/50 transition-all duration-200 border ${getPriorityBgColor(task.priority)} ${
                                        snapshot.isDragging ? 'shadow-lg transform rotate-2 z-50' : ''
                                      }`}
                                      style={{
                                        ...provided.draggableProps.style,
                                        userSelect: 'none'
                                      }}
                                      onClick={() => {
                                        setSelectedTask(task);
                                        setShowTaskModal(true);
                                      }}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium truncate">{task.title}</span>
                                        <div className="flex items-center space-x-2">
                                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)} bg-gray-700/50`}>
                                            {task.priority}
                                          </span>
                                          {task.status !== 'done' && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateTaskStatus(task.id, 'done');
                                              }}
                                              className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full hover:bg-green-500/30 transition-colors"
                                              title="Mark as done"
                                            >
                                              ✓
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-400">{task.assignee}</span>
                                        <span className={`w-2 h-2 rounded-full ${getTaskStatusColor(task.status)}`}></span>
                                      </div>
                                      {task.tags && task.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {task.tags.slice(0, 2).map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300">
                                              {tag}
                                            </span>
                                          ))}
                                          {task.tags.length > 2 && (
                                            <span className="text-xs text-gray-400">+{task.tags.length - 2}</span>
                                          )}
                                        </div>
                                      )}
                                      {task.estimatedHours && task.estimatedHours > 0 && (
                                        <div className="mt-2">
                                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Est: {task.estimatedHours}h</span>
                                            <span>Act: {task.actualHours || 0}h</span>
                                          </div>
                                          <div className="w-full bg-gray-600/50 rounded-full h-1">
                                            <div 
                                              className="bg-accent-500 h-1 rounded-full progress-animate"
                                              style={{ 
                                                width: `${task.actualHours && task.estimatedHours ? Math.min((task.actualHours / task.estimatedHours) * 100, 100) : 0}%` 
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              <button 
                                onClick={() => setShowNewTaskModal(true)}
                                className="w-full text-center text-sm text-gray-400 hover:text-gray-300 py-3 border-2 border-dashed border-gray-600/50 rounded-lg hover:border-gray-500/50 transition-all duration-200 hover:bg-gray-600/20 mt-2"
                              >
                                + Add Task
                              </button>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </div>
                </DragDropContext>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="animate-fadeIn">
            {/* Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                    Meetings
                  </h2>
                  <p className="text-gray-400 mt-1">Track and manage all your client meetings</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => router.push('/test-utm')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>UTM Tools</span>
                  </button>
                  <button 
                    onClick={() => setShowAddMeetingModal(true)}
                    className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Meeting</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Meeting Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Meetings</h3>
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-3xl font-bold text-blue-400">{meetings.length}</p>
                <p className="text-sm text-gray-400">All time</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Scheduled</h3>
                  <span className="text-2xl">⏰</span>
                </div>
                <p className="text-3xl font-bold text-green-400">{meetings.filter(m => m.status === 'scheduled').length}</p>
                <p className="text-sm text-gray-400">Upcoming meetings</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Completed</h3>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-3xl font-bold text-purple-400">{meetings.filter(m => m.status === 'completed').length}</p>
                <p className="text-sm text-gray-400">Past meetings</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">This Week</h3>
                  <span className="text-2xl">🗓️</span>
                </div>
                <p className="text-3xl font-bold text-orange-400">
                  {meetings.filter(m => {
                    const meetingDate = new Date(m.date);
                    const now = new Date();
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return meetingDate >= weekStart && meetingDate <= weekEnd;
                  }).length}
                </p>
                <p className="text-sm text-gray-400">This week</p>
              </div>
            </div>

            {/* Pending Booking Sessions */}
            {bookingSessions.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-yellow-400">
                    📋 Pending Booking Sessions ({bookingSessions.length})
                  </h3>
                  <button
                    onClick={() => setShowBookingSessions(!showBookingSessions)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    {showBookingSessions ? 'Hide' : 'Show'} Sessions
                  </button>
                </div>
                
                {showBookingSessions && (
                  <div className="space-y-3">
                    {bookingSessions.map((session) => (
                      <div key={session.session_id} className="bg-gray-700/50 rounded-lg p-4 border border-yellow-500/30">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-white">
                                {session.prospect_name || 'Unknown Prospect'}
                              </h4>
                              <span className="text-sm text-gray-400">
                                {session.prospect_email}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-xs text-gray-500">UTM:</span>
                              {session.utm_source && (
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                  {session.utm_source}
                                </span>
                              )}
                              {session.utm_medium && (
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                                  {session.utm_medium}
                                </span>
                              )}
                              {session.utm_campaign && (
                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                  {session.utm_campaign}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-400">
                              Created: {formatDate(session.timestamp)}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => createMeetingFromSession(session)}
                            className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Create Meeting
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Meetings List */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">All Meetings</h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {meetings
                  .filter(meeting => {
                    const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus;
                    const matchesSearch = searchTerm === '' || 
                      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      meeting.attendee.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesStatus && matchesSearch;
                  })
                  .map((meeting) => (
                    <div key={meeting.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-600/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{getSourceIcon(meeting.source)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-semibold text-white">{meeting.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                                {meeting.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">
                              📅 {meeting.date} at {meeting.time} • 👤 {meeting.attendee}
                            </p>
                            
                            {/* UTM Tags */}
                            {(meeting.utm_source || meeting.utm_medium || meeting.utm_campaign || meeting.utm_content) && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">Source:</span>
                                {meeting.utm_source && (
                                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                    {meeting.utm_source}
                                  </span>
                                )}
                                {meeting.utm_medium && (
                                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                                    {meeting.utm_medium}
                                  </span>
                                )}
                                {meeting.utm_campaign && (
                                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                    {meeting.utm_campaign}
                                  </span>
                                )}
                                {meeting.utm_content && (
                                  <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                                    {meeting.utm_content}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-white transition-colors p-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-red-400 transition-colors p-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {meetings.filter(meeting => {
                  const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus;
                  const matchesSearch = searchTerm === '' || 
                    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    meeting.attendee.toLowerCase().includes(searchTerm.toLowerCase());
                  return matchesStatus && matchesSearch;
                }).length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No meetings found</h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Try adjusting your search criteria' : 'Add your first meeting to get started'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="bg-gray-800 rounded-xl p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Investment Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Active Investments</h3>
                <p className="text-2xl font-bold text-green-400">$1.8M</p>
                <p className="text-sm text-gray-400">8 companies</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Total Return</h3>
                <p className="text-2xl font-bold text-accent-400">+24.5%</p>
                <p className="text-sm text-gray-400">YTD performance</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Average IRR</h3>
                <p className="text-2xl font-bold text-blue-400">18.2%</p>
                <p className="text-sm text-gray-400">Portfolio average</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-gray-800 rounded-xl p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Document Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Due Diligence</h3>
                <p className="text-2xl font-bold text-yellow-400">12</p>
                <p className="text-sm text-gray-400">Documents pending</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Legal Documents</h3>
                <p className="text-2xl font-bold text-blue-400">8</p>
                <p className="text-sm text-gray-400">Contracts signed</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
                <p className="text-2xl font-bold text-green-400">24</p>
                <p className="text-sm text-gray-400">Reports uploaded</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="animate-fadeIn">
            {/* CRM Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                    Sales Pipeline
                  </h2>
                  <p className="text-gray-400 mt-1">Manage your deals and track progress</p>
                </div>
                <button
                  onClick={() => setShowNewDealModal(true)}
                  className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Deal</span>
                </button>
              </div>
            </div>

            {/* Pipeline Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Deals</h3>
                  <span className="text-2xl">💼</span>
                </div>
                <p className="text-3xl font-bold text-blue-400">{pipelineStages.reduce((acc, stage) => acc + stage.deals.length, 0)}</p>
                <p className="text-sm text-gray-400">Active opportunities</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Pipeline Value</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-green-400">
                  {formatCurrency(pipelineStages.reduce((acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0), 0))}
                </p>
                <p className="text-sm text-gray-400">Total opportunity value</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Weighted Value</h3>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-3xl font-bold text-purple-400">
                  {formatCurrency(pipelineStages.reduce((acc, stage) => 
                    acc + stage.deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0), 0))}
                </p>
                <p className="text-sm text-gray-400">Probability adjusted</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Avg Deal Size</h3>
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-3xl font-bold text-orange-400">
                  {formatCurrency(pipelineStages.reduce((acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0), 0) / 
                    Math.max(1, pipelineStages.reduce((acc, stage) => acc + stage.deals.length, 0)))}
                </p>
                <p className="text-sm text-gray-400">Average opportunity</p>
              </div>
            </div>

            {/* Pipeline Board */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <DragDropContext onDragEnd={handlePipelineDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {pipelineStages.map((stage) => (
                    <div key={stage.id} className="min-h-[600px]">
                      <div className={`bg-gradient-to-r ${stage.color} rounded-lg p-4 mb-4`}>
                        <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
                        <p className="text-white/80 text-sm">
                          {stage.deals.length} deals • {formatCurrency(stage.deals.reduce((sum, deal) => sum + deal.value, 0))}
                        </p>
                      </div>
                      
                      <Droppable droppableId={stage.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-3 min-h-[500px] p-2 rounded-lg transition-all duration-200 ${
                              snapshot.isDraggingOver ? 'bg-gray-700/30 border-2 border-dashed border-gray-500' : ''
                            }`}
                          >
                            {stage.deals.map((deal, index) => (
                              <Draggable key={deal.id} draggableId={deal.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-600/50 transition-all duration-200 border border-gray-600/30 ${
                                      snapshot.isDragging ? 'shadow-lg transform rotate-1 z-50 ring-2 ring-accent-500' : ''
                                    }`}
                                    style={{
                                      ...provided.draggableProps.style,
                                      userSelect: 'none'
                                    }}
                                    onClick={() => {
                                      setSelectedDeal(deal);
                                      setShowDealModal(true);
                                    }}
                                  >
                                    <div className="space-y-3">
                                      <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-white truncate">{deal.title}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDealPriorityColor(deal.priority)}`}>
                                          {deal.priority}
                                        </span>
                                      </div>
                                      
                                      <div className="text-sm text-gray-300">
                                        <p className="font-medium">{deal.company}</p>
                                        <p className="text-gray-400">{deal.contact}</p>
                                      </div>
                                      
                                      <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-green-400">{formatCurrency(deal.value)}</span>
                                        <span className="text-sm text-blue-400">{deal.probability}%</span>
                                      </div>
                                      
                                      <div className="flex justify-between items-center text-xs text-gray-400">
                                        <span>Close: {formatDate(deal.closeDate)}</span>
                                        <span>{deal.source}</span>
                                      </div>
                                      
                                      {deal.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {deal.tags.slice(0, 2).map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-accent-500/20 text-accent-400 rounded-full text-xs">
                                              {tag}
                                            </span>
                                          ))}
                                          {deal.tags.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                                              +{deal.tags.length - 2}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-lg mx-4 border border-gray-600/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Task Details</h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <textarea
                  value={selectedTask.description || ''}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  rows={3}
                  readOnly
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Priority</label>
                  <div className={`px-4 py-3 rounded-lg border ${getPriorityBgColor(selectedTask.priority)}`}>
                    <span className={`text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Assignee</label>
                  <input
                    type="text"
                    value={selectedTask.assignee}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Stage</label>
                  <input
                    type="text"
                    value={stages.find(s => s.id === selectedTask.stage)?.name || ''}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>
              
              {selectedTask.tags && selectedTask.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Estimated Hours</label>
                  <input
                    type="number"
                    value={selectedTask.estimatedHours || 0}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Actual Hours</label>
                  <input
                    type="number"
                    value={selectedTask.actualHours || 0}
                    onChange={(e) => updateTaskHours(selectedTask.id, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this task?')) {
                    deleteTask(selectedTask.id);
                    setShowTaskModal(false);
                  }
                }}
                className="px-6 py-3 text-red-400 hover:text-red-300 transition-colors"
              >
                Delete Task
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-lg mx-4 border border-gray-600/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Create New Task</h3>
              <button 
                onClick={() => setShowNewTaskModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Stage</label>
                  <select
                    value={newTask.stage}
                    onChange={(e) => setNewTask({...newTask, stage: e.target.value})}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    {stages.map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Assignee</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                    placeholder="Enter assignee"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Estimated Hours</label>
                  <input
                    type="number"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({...newTask, estimatedHours: parseInt(e.target.value) || 0})}
                    placeholder="0"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTask.tags.join(', ')}
                  onChange={(e) => setNewTask({...newTask, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="Enter tags separated by commas"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewTask}
                disabled={!newTask.title.trim()}
                className="px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Task</h3>
              <button 
                onClick={() => setShowNewTaskModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="Task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  rows={3}
                  placeholder="Task description (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Stage</label>
                <select
                  value={newTask.stage}
                  onChange={(e) => setNewTask(prev => ({ ...prev, stage: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  {stages.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="Assignee (e.g., Team, John Doe)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTask.tags.join(', ')}
                  onChange={(e) => setNewTask(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '') }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="e.g., onboarding, urgent, research"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estimated Hours</label>
                <input
                  type="number"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-right"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={addNewTask}
                className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Meeting Modal */}
      <AddMeetingModal
        isOpen={showAddMeetingModal}
        onClose={() => setShowAddMeetingModal(false)}
        onAddMeeting={(meeting) => {
          setMeetings([...meetings, meeting]);
        }}
      />

      {/* Booking Sessions Section */}
      {bookingSessions.length > 0 && (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Pending Booking Sessions</h3>
            <button
              onClick={() => setShowBookingSessions(!showBookingSessions)}
              className="text-accent-400 hover:text-accent-300 text-sm"
            >
              {showBookingSessions ? 'Hide' : 'Show'} ({bookingSessions.length})
            </button>
          </div>
          
          {showBookingSessions && (
            <div className="p-6">
              <div className="space-y-4">
                {bookingSessions.map((session) => (
                  <div key={session.id} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">
                          {session.prospect_name || 'Unknown Client'}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {session.prospect_email} • {session.utm_campaign || 'No Campaign'}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {session.utm_source && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                              {session.utm_source}
                            </span>
                          )}
                          {session.utm_medium && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                              {session.utm_medium}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => createMeetingFromSession(session)}
                        className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Create Meeting
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deal Detail Modal */}
      {showDealModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-600/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Deal Details</h3>
              <button 
                onClick={() => setShowDealModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Deal Title</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Company</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Contact Person</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.contact}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Deal Value</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-green-400 font-semibold">{formatCurrency(selectedDeal.value)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Probability</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-blue-400 font-semibold">{selectedDeal.probability}%</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Expected Close</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{formatDate(selectedDeal.closeDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Source</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.source}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Priority</label>
                  <span className={`inline-flex px-3 py-2 rounded-full text-sm font-medium border ${getDealPriorityColor(selectedDeal.priority)}`}>
                    {selectedDeal.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white">{selectedDeal.description || 'No description provided'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedDeal.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Created</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-400">{formatDate(selectedDeal.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Last Activity</label>
                  <p className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-400">{formatDate(selectedDeal.lastActivity)}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDealModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Deal Modal */}
      {showNewDealModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-600/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">Add New Deal</h3>
              <button 
                onClick={() => setShowNewDealModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Deal Title</label>
                  <input
                    type="text"
                    value={newDeal.title}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="e.g., Series A Funding"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Company</label>
                  <input
                    type="text"
                    value={newDeal.company}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Contact Person</label>
                  <input
                    type="text"
                    value={newDeal.contact}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    value={newDeal.email}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Deal Value ($)</label>
                  <input
                    type="number"
                    value={newDeal.value}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Probability (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newDeal.probability}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, probability: parseInt(e.target.value) || 10 }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Expected Close</label>
                  <input
                    type="date"
                    value={newDeal.closeDate}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, closeDate: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Stage</label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    {pipelineStages.map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Source</label>
                  <input
                    type="text"
                    value={newDeal.source}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Website, Referral, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Priority</label>
                  <select
                    value={newDeal.priority}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Phone (optional)</label>
                <input
                  type="tel"
                  value={newDeal.phone}
                  onChange={(e) => setNewDeal(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                <textarea
                  value={newDeal.description}
                  onChange={(e) => setNewDeal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description of the deal..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newDeal.tags.join(', ')}
                  onChange={(e) => setNewDeal(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '') }))}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="e.g., tech, series-a, urgent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewDealModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewDeal}
                className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Add Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
import { NextRequest, NextResponse } from 'next/server'

interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  role: string
  status: 'active' | 'pending' | 'inactive' | 'onboarding'
  stage: 'onboarding' | 'setup' | 'campaigns' | 'placement' | 'reporting'
  progress: number
  totalInvestment: number
  activeDeals: number
  scheduledMeetings: number
  lastActivity: string
  joinedAt: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  notes: string
}

// Mock client data
const mockClients: Record<string, Client> = {
  '1': {
    id: '1',
    name: 'John Smith',
    company: 'TechStart Inc.',
    email: 'john@techstart.com',
    phone: '+1 (555) 123-4567',
    role: 'Founder/CEO',
    status: 'active',
    stage: 'campaigns',
    progress: 65,
    totalInvestment: 2500000,
    activeDeals: 3,
    scheduledMeetings: 5,
    lastActivity: '2024-01-15T10:00:00Z',
    joinedAt: '2024-01-01T00:00:00Z',
    priority: 'high',
    tags: ['tech', 'series-a', 'urgent'],
    notes: 'High potential client, needs immediate attention for Series A round.'
  },
  '2': {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Innovate Co.',
    email: 'sarah@innovate.co',
    phone: '+1 (555) 234-5678',
    role: 'CTO',
    status: 'active',
    stage: 'setup',
    progress: 35,
    totalInvestment: 1800000,
    activeDeals: 2,
    scheduledMeetings: 3,
    lastActivity: '2024-01-14T14:30:00Z',
    joinedAt: '2024-01-05T00:00:00Z',
    priority: 'medium',
    tags: ['fintech', 'growth'],
    notes: 'Fintech startup, good traction, looking for growth capital.'
  },
  '3': {
    id: '3',
    name: 'Mike Chen',
    company: 'GreenTech Solutions',
    email: 'mike@greentech.com',
    phone: '+1 (555) 345-6789',
    role: 'CEO',
    status: 'onboarding',
    stage: 'onboarding',
    progress: 15,
    totalInvestment: 0,
    activeDeals: 0,
    scheduledMeetings: 1,
    lastActivity: '2024-01-13T09:15:00Z',
    joinedAt: '2024-01-10T00:00:00Z',
    priority: 'high',
    tags: ['cleantech', 'new'],
    notes: 'New cleantech client, requires onboarding support.'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication (in a real app, this would verify JWT tokens, etc.)
    const authHeader = request.headers.get('authorization')
    const isAdmin = authHeader?.includes('admin') || request.url.includes('/admin/')
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 401 }
      )
    }

    const clientId = params.id
    const client = mockClients[clientId]

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      client,
      message: 'Admin access granted'
    })

  } catch (error) {
    console.error('Admin client access error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization')
    const isAdmin = authHeader?.includes('admin') || request.url.includes('/admin/')
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 401 }
      )
    }

    const clientId = params.id
    const body = await request.json()
    
    // Update client data (in a real app, this would save to database)
    const updatedClient = {
      ...mockClients[clientId],
      ...body,
      id: clientId,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      client: updatedClient,
      message: 'Client updated successfully'
    })

  } catch (error) {
    console.error('Admin client update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
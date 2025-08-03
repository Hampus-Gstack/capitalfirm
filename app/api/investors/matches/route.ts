import { NextRequest, NextResponse } from 'next/server'

interface Investor {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  title: string
  investmentSize: {
    min: number
    max: number
  }
  preferredSectors: string[]
  preferredStages: string[]
  preferredGeographies: string[]
  notes?: string
  status: 'active' | 'inactive' | 'prospect'
  lastContact?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface Client {
  id: string
  name: string
  company: string
  sector: string
  stage: string
  geography: string
  fundingNeeded: number
  description: string
  status: 'raising' | 'funded' | 'closed'
}

// Mock data - replace with actual database
const clients: Client[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    company: 'AIFlow Solutions',
    sector: 'AI/ML',
    stage: 'Series A',
    geography: 'North America',
    fundingNeeded: 3000000,
    description: 'AI-powered workflow automation platform',
    status: 'raising'
  },
  {
    id: '2',
    name: 'Dr. Emily Watson',
    company: 'BioTech Innovations',
    sector: 'Healthcare',
    stage: 'Seed',
    geography: 'North America',
    fundingNeeded: 1500000,
    description: 'Revolutionary drug delivery system',
    status: 'raising'
  },
  {
    id: '3',
    name: 'Marcus Chen',
    company: 'FinFlow',
    sector: 'Fintech',
    stage: 'Series B',
    geography: 'Europe',
    fundingNeeded: 8000000,
    description: 'Next-generation payment processing platform',
    status: 'raising'
  },
  {
    id: '4',
    name: 'Sarah Kim',
    company: 'EduTech Pro',
    sector: 'EdTech',
    stage: 'Series A',
    geography: 'North America',
    fundingNeeded: 2500000,
    description: 'AI-powered personalized learning platform',
    status: 'raising'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const investorId = searchParams.get('investorId')
  const sector = searchParams.get('sector')
  const stage = searchParams.get('stage')
  const geography = searchParams.get('geography')
  const minInvestment = searchParams.get('minInvestment')
  const maxInvestment = searchParams.get('maxInvestment')

  // If investorId is provided, find matches for that specific investor
  if (investorId) {
    // Mock investor data - replace with actual database lookup
    const investor: Investor = {
      id: investorId,
      name: 'Sarah Johnson',
      email: 'sarah@venturepartners.com',
      company: 'Venture Partners Capital',
      title: 'Managing Partner',
      investmentSize: { min: 500000, max: 5000000 },
      preferredSectors: ['AI/ML', 'SaaS', 'Fintech'],
      preferredStages: ['Series A', 'Series B'],
      preferredGeographies: ['North America', 'Europe'],
      status: 'active',
      tags: ['AI', 'SaaS', 'Active'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    }

    const matches = findMatchesForInvestor(investor, clients)
    
    return NextResponse.json({
      investor,
      matches,
      totalMatches: matches.length
    })
  }

  // If specific criteria are provided, find matches based on those criteria
  if (sector || stage || geography || minInvestment || maxInvestment) {
    const criteria = {
      sector: sector ? [sector] : [],
      stage: stage ? [stage] : [],
      geography: geography ? [geography] : [],
      investmentSize: {
        min: minInvestment ? parseInt(minInvestment) : 0,
        max: maxInvestment ? parseInt(maxInvestment) : 10000000
      }
    }

    const matches = findMatchesByCriteria(criteria, clients)
    
    return NextResponse.json({
      criteria,
      matches,
      totalMatches: matches.length
    })
  }

  return NextResponse.json({
    error: 'Please provide either investorId or specific criteria'
  }, { status: 400 })
}

function findMatchesForInvestor(investor: Investor, clients: Client[]): Client[] {
  return clients.filter(client => {
    // Only consider clients that are actively raising
    if (client.status !== 'raising') return false

    // Check sector match
    const sectorMatch = investor.preferredSectors.includes(client.sector)
    
    // Check stage match
    const stageMatch = investor.preferredStages.includes(client.stage)
    
    // Check geography match
    const geographyMatch = investor.preferredGeographies.includes(client.geography)
    
    // Check investment size match
    const sizeMatch = client.fundingNeeded >= investor.investmentSize.min && 
                     client.fundingNeeded <= investor.investmentSize.max
    
    return sectorMatch && stageMatch && geographyMatch && sizeMatch
  })
}

function findMatchesByCriteria(criteria: any, clients: Client[]): Client[] {
  return clients.filter(client => {
    // Only consider clients that are actively raising
    if (client.status !== 'raising') return false

    // Check sector match
    const sectorMatch = criteria.sector.length === 0 || criteria.sector.includes(client.sector)
    
    // Check stage match
    const stageMatch = criteria.stage.length === 0 || criteria.stage.includes(client.stage)
    
    // Check geography match
    const geographyMatch = criteria.geography.length === 0 || criteria.geography.includes(client.geography)
    
    // Check investment size match
    const sizeMatch = client.fundingNeeded >= criteria.investmentSize.min && 
                     client.fundingNeeded <= criteria.investmentSize.max
    
    return sectorMatch && stageMatch && geographyMatch && sizeMatch
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { investorId, clientId, notes } = body

    // Here you would typically:
    // 1. Create a match record in the database
    // 2. Send notifications to both parties
    // 3. Log the introduction for tracking

    return NextResponse.json({
      success: true,
      message: 'Introduction created successfully',
      match: {
        id: Date.now().toString(),
        investorId,
        clientId,
        notes,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create introduction'
    }, { status: 500 })
  }
} 
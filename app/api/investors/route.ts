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

// Mock database - replace with actual database
let investors: Investor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@venturepartners.com',
    phone: '+1-555-0123',
    company: 'Venture Partners Capital',
    title: 'Managing Partner',
    investmentSize: { min: 500000, max: 5000000 },
    preferredSectors: ['AI/ML', 'SaaS', 'Fintech'],
    preferredStages: ['Series A', 'Series B'],
    preferredGeographies: ['North America', 'Europe'],
    notes: 'Very interested in AI companies with strong technical teams',
    status: 'active',
    lastContact: '2024-01-15',
    tags: ['AI', 'SaaS', 'Active'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@techgrowth.com',
    company: 'TechGrowth Ventures',
    title: 'Investment Director',
    investmentSize: { min: 1000000, max: 10000000 },
    preferredSectors: ['Healthcare', 'Biotech', 'Clean Energy'],
    preferredStages: ['Seed', 'Series A'],
    preferredGeographies: ['North America', 'Asia'],
    notes: 'Focus on breakthrough healthcare technologies',
    status: 'active',
    lastContact: '2024-01-10',
    tags: ['Healthcare', 'Biotech', 'Active'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  }
]

let clients: Client[] = [
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
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const sector = searchParams.get('sector')
  const stage = searchParams.get('stage')
  const geography = searchParams.get('geography')
  const status = searchParams.get('status')

  let filteredInvestors = investors

  if (search) {
    filteredInvestors = filteredInvestors.filter(investor =>
      investor.name.toLowerCase().includes(search.toLowerCase()) ||
      investor.company.toLowerCase().includes(search.toLowerCase()) ||
      investor.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (sector) {
    filteredInvestors = filteredInvestors.filter(investor =>
      investor.preferredSectors.includes(sector)
    )
  }

  if (stage) {
    filteredInvestors = filteredInvestors.filter(investor =>
      investor.preferredStages.includes(stage)
    )
  }

  if (geography) {
    filteredInvestors = filteredInvestors.filter(investor =>
      investor.preferredGeographies.includes(geography)
    )
  }

  if (status) {
    filteredInvestors = filteredInvestors.filter(investor =>
      investor.status === status
    )
  }

  return NextResponse.json({
    investors: filteredInvestors,
    total: filteredInvestors.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newInvestor: Investor = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      title: body.title,
      investmentSize: body.investmentSize,
      preferredSectors: body.preferredSectors,
      preferredStages: body.preferredStages,
      preferredGeographies: body.preferredGeographies,
      notes: body.notes,
      status: body.status || 'prospect',
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    investors.push(newInvestor)

    return NextResponse.json({
      success: true,
      investor: newInvestor
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create investor'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    const investorIndex = investors.findIndex(inv => inv.id === id)
    if (investorIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Investor not found'
      }, { status: 404 })
    }

    investors[investorIndex] = {
      ...investors[investorIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      investor: investors[investorIndex]
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update investor'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Investor ID is required'
      }, { status: 400 })
    }

    const investorIndex = investors.findIndex(inv => inv.id === id)
    if (investorIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Investor not found'
      }, { status: 404 })
    }

    investors.splice(investorIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Investor deleted successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete investor'
    }, { status: 500 })
  }
} 
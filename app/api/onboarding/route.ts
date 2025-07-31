import { NextRequest, NextResponse } from 'next/server'

// In a real application, you'd use a database
// For now, we'll use a simple in-memory storage
let onboardingData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add metadata
    const onboardingRecord = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'completed',
      completionPercentage: 100,
      tags: generateTags(data),
      ...data
    }
    
    // Store the data (in a real app, save to database)
    onboardingData.push(onboardingRecord)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding data saved successfully',
      id: onboardingRecord.id
    })
  } catch (error) {
    console.error('Error saving onboarding data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return all onboarding data
    return NextResponse.json({ 
      success: true, 
      data: onboardingData 
    })
  } catch (error) {
    console.error('Error fetching onboarding data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch onboarding data' },
      { status: 500 }
    )
  }
}

function generateTags(data: any): string[] {
  const tags: string[] = []
  
  // Add type tag
  if (data.type) {
    tags.push(data.type)
  }
  
  // Add stage tag for startups
  if (data.companyStage) {
    tags.push(data.companyStage.toLowerCase().replace(' ', '-'))
  }
  
  // Add deal type tag
  if (data.dealType) {
    tags.push(data.dealType.toLowerCase().replace(' ', '-'))
  }
  
  // Add industry tag
  if (data.industryVertical) {
    const industry = data.industryVertical.split(' - ')[0].toLowerCase()
    tags.push(industry)
  }
  
  // Add priority tags based on capital raise
  if (data.capitalToRaise) {
    const amount = parseInt(data.capitalToRaise.replace(/[^0-9]/g, ''))
    if (amount >= 10) {
      tags.push('high-value')
    } else if (amount >= 5) {
      tags.push('medium-value')
    } else {
      tags.push('low-value')
    }
  }
  
  return tags
} 
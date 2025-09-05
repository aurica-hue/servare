import { NextRequest, NextResponse } from 'next/server'

// This will be your FastAPI backend URL when deployed
// For local development, it points to your local FastAPI server
   const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-7104.up.railway.app'
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to your FastAPI backend
    const response = await fetch(`${BACKEND_URL}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // Return the response from FastAPI with the same status code
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error forwarding to backend:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}

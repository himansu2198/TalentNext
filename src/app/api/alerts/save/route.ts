import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { sendConfirmationEmail } from '@/lib/email-service';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      email,
      internships = false,
      hackathons = false,
      workshops = false,
      codingChallenges = false,
      aiMlEvents = false,
      webDevEvents = false,
      dataScienceEvents = false,
    } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Save to PostgreSQL
    const alertPreference = await prisma.alertPreference.upsert({
      where: { userId },
      update: {
        email,
        internships,
        hackathons,
        workshops,
        codingChallenges,
        aiMlEvents,
        webDevEvents,
        dataScienceEvents,
      },
      create: {
        userId,
        email,
        internships,
        hackathons,
        workshops,
        codingChallenges,
        aiMlEvents,
        webDevEvents,
        dataScienceEvents,
      },
    });

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, {
        internships,
        hackathons,
        workshops,
        codingChallenges,
        aiMlEvents,
        webDevEvents,
        dataScienceEvents,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Alert preferences saved successfully!',
      data: alertPreference
    });

  } catch (error) {
    console.error('Error saving alert preferences:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
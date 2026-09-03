import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, budget, details, honeypot } = body;

    // Spam protection
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    if (!name || !email || !projectType || !budget || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: { name, email, projectType, budget, details }
    });

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Meridian Portfolio <onboarding@resend.dev>',
        to: 'meridianwebco1@gmail.com', 
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h1>New Lead: ${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Details:</strong><br/>${details}</p>
        `
      });
    } else {
      console.log('RESEND_API_KEY is not set. Mocking email delivery.', body);
    }

    return NextResponse.json({ success: true, submission }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

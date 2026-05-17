import { Handler } from '@netlify/functions'
import { Resend } from 'resend'

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || '{}')

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      }
    }

    const apiKey = process.env.RESEND_API_KEY

    // Resilience: If API key is missing, simulate success so the UX doesn't crash
    if (!apiKey || apiKey === 're_your-key-here') {
      console.warn('RESEND_API_KEY not detected. Simulating successful email transmission.')
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: 'Simulation successful. Please add RESEND_API_KEY to your environment variables.',
        }),
      }
    }

    const resend = new Resend(apiKey)

    // 1. Send to Gourav
    const adminEmail = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['gaurav.upadhyay.vasudeva@gmail.com'],
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
      html: `
        <div style="font-family: monospace; background: #020608; color: #F0F4F8; padding: 32px; border-radius: 12px; border: 1px solid #1A2332;">
          <h2 style="color: #00D9FF; margin-bottom: 24px; border-bottom: 1px solid #1A2332; padding-bottom: 12px;">New Portfolio Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="color: #8BA3B8; padding: 8px 0; width: 100px;">From</td><td style="color: #F0F4F8; font-weight: bold;">${name}</td></tr>
            <tr><td style="color: #8BA3B8; padding: 8px 0;">Email</td><td style="color: #00D9FF;">${email}</td></tr>
            <tr><td style="color: #8BA3B8; padding: 8px 0;">Subject</td><td style="color: #F0F4F8;">${subject || '—'}</td></tr>
          </table>
          <div style="background: #0A0F14; border: 1px solid #1A2332; padding: 20px; border-radius: 8px; color: #F0F4F8; line-height: 1.8;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border-color: #1A2332; margin: 24px 0;" />
          <p style="color: #4A6580; font-size: 11px;">Sent via portfolio contact form · gourav.dev</p>
        </div>
      `,
    })

    if (adminEmail.error) {
      throw new Error(adminEmail.error.message)
    }

    // 2. Auto-reply to sender
    await resend.emails.send({
      from: 'Gourav Upadhyay <onboarding@resend.dev>',
      to: [email],
      subject: `Got your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: monospace; background: #020608; color: #F0F4F8; padding: 32px; border-radius: 12px; border: 1px solid #1A2332;">
          <h2 style="color: #00D9FF; margin-bottom: 16px;">Thanks for reaching out!</h2>
          <p style="color: #8BA3B8; line-height: 1.8; font-size: 14px;">
            Hey ${name.split(' ')[0]},<br><br>
            Thanks for dropping a message. This is an automated confirmation to let you know that I have received your transmission.<br><br>
            I will analyze your request and get back to you within 24 hours.<br><br>
            Best regards,<br>
            <strong>Gourav Kumar Upadhyay</strong><br>
            Full Stack &times; AI/ML Systems Builder<br>
            <span style="color: #00D9FF;">gaurav.upadhyay.vasudeva@gmail.com</span>
          </p>
        </div>
      `,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: adminEmail.data?.id }),
    }

  } catch (error: any) {
    console.error('Contact form error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Failed to send message' }),
    }
  }
}

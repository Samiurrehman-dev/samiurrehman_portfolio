import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface ContactFormData {
  fname: string;
  email: string;
  number?: string;
  subject?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { fname, email, number, subject, message }: ContactFormData = req.body;

    // Validation
    if (!fname || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      throw new Error('SMTP configuration error');
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3BB1E5; border-bottom: 3px solid #3BB1E5; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;">
                <strong style="color: #333;">Name:</strong> 
                <span style="color: #666;">${fname}</span>
              </p>
              
              <p style="margin: 10px 0;">
                <strong style="color: #333;">Email:</strong> 
                <a href="mailto:${email}" style="color: #3BB1E5; text-decoration: none;">${email}</a>
              </p>
              
              ${number ? `
                <p style="margin: 10px 0;">
                  <strong style="color: #333;">Phone:</strong> 
                  <span style="color: #666;">${number}</span>
                </p>
              ` : ''}
              
              ${subject ? `
                <p style="margin: 10px 0;">
                  <strong style="color: #333;">Subject:</strong> 
                  <span style="color: #666;">${subject}</span>
                </p>
              ` : ''}
            </div>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #3BB1E5; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <strong style="color: #333; display: block; margin-bottom: 10px;">Message:</strong>
              <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent from your portfolio contact form</p>
              <p>Received on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Email to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3BB1E5; border-bottom: 3px solid #3BB1E5; padding-bottom: 10px;">
              Thank You for Reaching Out!
            </h2>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              Hi <strong style="color: #333;">${fname}</strong>,
            </p>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              Thank you for contacting us! We have received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f0f8ff; border-left: 4px solid #3BB1E5; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <strong style="color: #333; display: block; margin-bottom: 10px;">Your Message:</strong>
              <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              We typically respond within 24-48 hours during business days.
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #3BB1E5 0%, #2a8fbf 100%); border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 14px;">
                <strong>Need immediate assistance?</strong><br>
                Call us at: <a href="tel:+923288028776" style="color: white; text-decoration: none;">+92 328 8028776</a>
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
              <p style="margin: 5px 0;">Best regards,</p>
              <p style="margin: 5px 0; color: #3BB1E5; font-weight: bold;">Sami Ur Rehman</p>
              <p style="margin: 5px 0;">Software Engineer</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    console.log('📧 Sending admin notification email...');
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin email sent');

    console.log('📧 Sending user confirmation email...');
    await transporter.sendMail(userMailOptions);
    console.log('✅ User email sent');

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    });
  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send message. Please try again later.',
    });
  }
}

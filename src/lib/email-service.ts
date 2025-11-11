/**
 * Email service for sending alert confirmations and notifications
 * Currently uses Resend.com - you can replace with your preferred email service
 */

interface AlertPreferences {
  internships: boolean;
  hackathons: boolean;
  workshops: boolean;
  codingChallenges: boolean;
  aiMlEvents: boolean;
  webDevEvents: boolean;
  dataScienceEvents: boolean;
}

export async function sendConfirmationEmail(email: string, preferences: AlertPreferences) {
  // Get the active categories
  const activeCategories = Object.entries(preferences)
    .filter(([_, isActive]) => isActive)
    .map(([category]) => category)
    .map(category => {
      // Format category names for display
      return category
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace('Ai Ml', 'AI/ML');
    });

  const emailContent = {
    from: 'EventAggr <alerts@eventaggr.com>',
    to: email,
    subject: '🎯 Your Smart Alerts Are Active!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .category-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .category-item { padding: 8px 0; border-bottom: 1px solid #eee; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Smart Alerts Activated!</h1>
              <p>We'll notify you about events matching your interests</p>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Your smart alert preferences have been saved successfully. We'll send you email notifications when new events match your selected categories.</p>
              
              <div class="category-list">
                <h3>Your Active Alerts:</h3>
                ${activeCategories.length > 0 
                  ? activeCategories.map(category => `<div class="category-item">✅ ${category}</div>`).join('')
                  : '<p>No categories selected - you will receive all event notifications</p>'
                }
              </div>

              <p><strong>What to expect:</strong></p>
              <ul>
                <li>Timely notifications about new events</li>
                <li>Event details and registration links</li>
                <li>Reminders for upcoming deadlines</li>
              </ul>

              <p>You can update your preferences anytime from your dashboard.</p>
              
              <div class="footer">
                <p>Happy event hunting! 🚀</p>
                <p><strong>The EventAggr Team</strong></p>
                <p><a href="https://yourapp.com">Manage your alerts</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Smart Alerts Activated!

      Hello,

      Your smart alert preferences have been saved successfully. We'll send you email notifications when new events match your selected categories.

      Your Active Alerts:
      ${activeCategories.length > 0 
        ? activeCategories.map(category => `✅ ${category}`).join('\n')
        : 'No categories selected - you will receive all event notifications'
      }

      What to expect:
      • Timely notifications about new events
      • Event details and registration links  
      • Reminders for upcoming deadlines

      You can update your preferences anytime from your dashboard.

      Happy event hunting! 🚀

      The EventAggr Team
      Manage your alerts: https://yourapp.com
    `,
  };

  // TODO: Replace with your actual email service (Resend, SendGrid, etc.)
  console.log('📧 Email would be sent to:', email);
  console.log('Email content:', emailContent);
  
  // Example with Resend.com (uncomment when you set up Resend):
  /*
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const { data, error } = await resend.emails.send(emailContent);
  
  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
  
  return data;
  */

  // For now, simulate successful email send
  return { id: 'simulated-email-id', status: 'sent' };
}

export async function sendEventNotification(email: string, event: any, preferences: AlertPreferences) {
  // This function will be used later to send actual event notifications
  const emailContent = {
    from: 'EventAggr <alerts@eventaggr.com>',
    to: email,
    subject: `🎯 New Event: ${event.title}`,
    html: `
      <div>
        <h2>New Event Matching Your Interests!</h2>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><strong>Platform:</strong> ${event.platform}</p>
        <p><strong>Deadline:</strong> ${new Date(event.deadline).toLocaleDateString()}</p>
        <a href="${event.link}">View Event & Register</a>
      </div>
    `,
  };

  console.log('📧 Event notification would be sent to:', email);
  console.log('Event:', event.title);
  
  // TODO: Implement with your email service
  return { id: 'simulated-event-notification', status: 'sent' };
}
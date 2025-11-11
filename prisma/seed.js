const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create sample events
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Google Summer of Code 2025',
        description: 'A global program focused on bringing student developers into open source software development.',
        type: 'internship',
        platform: 'unstop',
        url: 'https://unstop.com/hackathons/google-summer-of-code-2025-1256789',
        deadline: new Date('2025-04-02'),
        location: 'remote',
        eligibility: ['undergraduate', 'graduate'],
        tags: ['open-source', 'google', 'programming', 'mentorship'],
      },
      {
        title: 'Microsoft Engage 2025 Mentorship Program',
        description: 'Exclusive mentorship program for engineering students with Microsoft experts.',
        type: 'internship', 
        platform: 'unstop',
        url: 'https://unstop.com/internships/microsoft-engage-2025-1256790',
        deadline: new Date('2025-03-15'),
        location: 'remote',
        eligibility: ['undergraduate'],
        tags: ['microsoft', 'mentorship', 'engineering', 'career-growth'],
      },
      {
        title: 'Flipkart Runway Season 4 - Women in Tech',
        description: 'Exclusive hiring challenge for women engineers across India with PPO opportunities.',
        type: 'coding_challenge',
        platform: 'hackerrank', 
        url: 'https://www.hackerrank.com/flipkart-runway-2025',
        deadline: new Date('2025-02-28'),
        location: 'remote',
        eligibility: ['undergraduate', 'graduate'],
        tags: ['flipkart', 'women-in-tech', 'hiring', 'coding'],
      }
    ],
    skipDuplicates: true,
  })

  console.log(`Created ${events.count} events`)
  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
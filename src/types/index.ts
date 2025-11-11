
export interface Event {
  id: string
  title: string
  description: string
  type: 'internship' | 'hackathon' | 'workshop' | 'coding_challenge' | 'festival'
  platform: 'unstop' | 'hackerrank' | 'internshala' | 'other'
  url: string
  deadline: string
  location: 'remote' | 'onsite' | 'hybrid'
  eligibility: string[]
  tags: string[]
  isActive: boolean
  createdAt: string
}

export type EventType = Event['type']
export type PlatformType = Event['platform']

export const APP_NAME = 'Event Aggregator'
export const APP_DESCRIPTION = 'Your single destination for all college events, internships, hackathons, and coding challenges'

// Event types
export const EVENT_TYPES = {
  INTERNSHIP: 'internship',
  HACKATHON: 'hackathon', 
  WORKSHOP: 'workshop',
  CODING_CHALLENGE: 'coding_challenge',
  FESTIVAL: 'festival'
} as const

// Platform types
export const PLATFORM_TYPES = {
  UNSTOP: 'unstop',
  HACKERRANK: 'hackerrank',
  INTERNSHALA: 'internshala',
  OTHER: 'other'
} as const

// Location types
export const LOCATION_TYPES = {
  REMOTE: 'remote',
  ONSITE: 'onsite',
  HYBRID: 'hybrid'
} as const

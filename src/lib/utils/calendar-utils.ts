export function generateGoogleCalendarLink(event: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
}) {
  const start = new Date(event.startTime).toISOString().replace(/-|:|\.\d+/g, '');
  const end = new Date(event.endTime).toISOString().replace(/-|:|\.\d+/g, '');
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || 'Online',
    dates: `${start}/${end}`
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}

export function generateICalFile(event: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  url?: string;
}) {
  const start = new Date(event.startTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, -4) + 'Z';
  const end = new Date(event.endTime).toISOString().replace(/-|:|\.\d+/g, '').slice(0, -4) + 'Z';
  const now = new Date().toISOString().replace(/-|:|\.\d+/g, '').slice(0, -4) + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location || 'Online'}`,
    event.url ? `URL:${event.url}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line !== '').join('\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}

export function downloadICalFile(icsContent: string, filename: string) {
  const link = document.createElement('a');
  link.href = icsContent;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
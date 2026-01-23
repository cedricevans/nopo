
/**
 * Utility functions for generating calendar events
 */

const formatDateForICS = (dateStr, timeStr = '08:30') => {
  // Combine date and time (defaulting to 08:30 AM if no time provided)
  const date = new Date(`${dateStr}T${timeStr}:00`);
  return date.toISOString().replace(/-|:|\.\d+/g, '');
};

const buildEventDetails = (caseData) => {
  const courtDate = caseData.courtDate || '2026-02-10'; // Fallback
  // Default to 8:30 AM for court appearances if not specified
  const startTime = '08:30'; 
  const endTime = '12:00';
  
  const title = `Court Appearance: ${caseData.violationCode || 'Traffic Violation'}`;
  const description = `Case: ${caseData.firstName} ${caseData.lastName}\nViolation: ${caseData.violationCode}\nLocation: ${caseData.courtName}\nNotes: Please arrive 30 minutes early. Bring your citation and driver's license.`;
  const location = caseData.courtName || 'Traffic Court';

  return { title, description, location, courtDate, startTime, endTime };
};

export const getGoogleCalendarUrl = (caseData) => {
  const { title, description, location, courtDate, startTime, endTime } = buildEventDetails(caseData);
  
  const start = formatDateForICS(courtDate, startTime);
  const end = formatDateForICS(courtDate, endTime);
  
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', title);
  url.searchParams.append('details', description);
  url.searchParams.append('location', location);
  url.searchParams.append('dates', `${start}/${end}`);
  
  return url.toString();
};

export const getOutlookCalendarUrl = (caseData) => {
  const { title, description, location, courtDate, startTime, endTime } = buildEventDetails(caseData);
  
  const start = new Date(`${courtDate}T${startTime}:00`).toISOString();
  const end = new Date(`${courtDate}T${endTime}:00`).toISOString();
  
  const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  url.searchParams.append('subject', title);
  url.searchParams.append('body', description);
  url.searchParams.append('location', location);
  url.searchParams.append('startdt', start);
  url.searchParams.append('enddt', end);
  url.searchParams.append('path', '/calendar/action/compose');
  url.searchParams.append('rru', 'addevent');
  
  return url.toString();
};

export const downloadIcsFile = (caseData) => {
  const { title, description, location, courtDate, startTime, endTime } = buildEventDetails(caseData);
  const start = formatDateForICS(courtDate, startTime);
  const end = formatDateForICS(courtDate, endTime);
  const now = new Date().toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Citation Nation//Traffic Defense//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `court_date_${courtDate}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

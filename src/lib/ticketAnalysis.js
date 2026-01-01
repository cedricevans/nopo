const normalizeText = (text) =>
  (text || '')
    .replace(/\r/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const firstMatch = (text, patterns) => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
};

const findLineMatch = (lines, patterns) => {
  for (const line of lines) {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }
  return '';
};

const splitName = (fullName) => {
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

const inferViolationDescription = (textLower) => {
  const keywordMap = [
    { key: 'speed', description: 'Speeding' },
    { key: 'red light', description: 'Red light violation' },
    { key: 'stop sign', description: 'Stop sign violation' },
    { key: 'reckless', description: 'Reckless driving' },
    { key: 'careless', description: 'Careless driving' },
    { key: 'seat belt', description: 'Seat belt violation' },
    { key: 'insurance', description: 'No proof of insurance' },
    { key: 'registration', description: 'Registration issue' },
    { key: 'license', description: 'License issue' },
    { key: 'parking', description: 'Parking citation' }
  ];

  const match = keywordMap.find((entry) => textLower.includes(entry.key));
  return match ? match.description : '';
};

export const parseTicketText = (rawText) => {
  const cleaned = normalizeText(rawText);
  const lines = cleaned.split('\n').map((line) => line.trim()).filter(Boolean);
  const lower = cleaned.toLowerCase();

  const lastFirstMatch = cleaned.match(/([A-Z][A-Za-z'-]+),\s*([A-Z][A-Za-z'-]+)/);
  const lastFirstName = lastFirstMatch ? `${lastFirstMatch[2]} ${lastFirstMatch[1]}` : '';

  const fullName =
    findLineMatch(lines, [
      /(?:defendant|driver|name)\s*[:#]?\s*([A-Z][A-Za-z' -]+(?:\s+[A-Z][A-Za-z' -]+){0,2})/i
    ]) ||
    lastFirstName ||
    '';

  const addressLine = findLineMatch(lines, [
    /(\d{1,5}\s+[A-Za-z0-9.#' -]+(?:Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Court|Ct|Lane|Ln|Way|Wy|Highway|Hwy|Circle|Cir)\b.*)/i
  ]);

  const cityStateZipParts = cleaned.match(/([A-Za-z .'-]+),\s*([A-Z]{2})\s*(\d{5})/);

  const dlNumber = firstMatch(cleaned, [
    /(?:dl|driver'?s?\s*lic(?:ense)?)\s*#?\s*([A-Z0-9-]{4,})/i
  ]);

  const plate = firstMatch(cleaned, [
    /(?:plate|tag)\s*#?\s*([A-Z0-9-]{4,10})/i
  ]);

  const statute = firstMatch(cleaned, [
    /(?:violation|statute|code|vc|section)\s*[:#]?\s*([A-Z]{0,3}\s?\d{2,5}(?:\.\d+)?)/i
  ]);

  const courtDate =
    firstMatch(cleaned, [
      /(?:court|hearing|appearance)\s*date\s*[:#]?\s*([0-9]{1,2}[\/.-][0-9]{1,2}[\/.-][0-9]{2,4})/i
    ]) ||
    findLineMatch(lines, [
      /(?:court|hearing)\s*[:#]?\s*([0-9]{1,2}[\/.-][0-9]{1,2}[\/.-][0-9]{2,4})/i
    ]);

  const courtName = findLineMatch(lines, [/([A-Za-z .'-]*court[ A-Za-z .'-]*)/i]);

  const location = findLineMatch(lines, [
    /(?:location|loc|place of violation|violation location)\s*[:#]?\s*(.+)/i
  ]);

  const actualSpeed = firstMatch(cleaned, [
    /(?:actual speed|speed)\s*[:#=]?\s*(\d{2,3})\s*(?:mph)?/i,
    /(\d{2,3})\s*mph\s*(?:in|at)/i
  ]);

  const speedLimit = firstMatch(cleaned, [
    /(?:limit|posted|zone)\s*(?:speed)?\s*[:#=]?\s*(\d{2,3})\s*(?:mph)?/i,
    /(?:in|at)\s*(\d{2,3})\s*mph\s*zone/i
  ]);

  const year = firstMatch(cleaned, [/\b(19|20)\d{2}\b/]);

  const violationDescription = inferViolationDescription(lower) || 'Traffic citation';

  const driverName = fullName
    ? fullName
    : '';

  const { firstName, lastName } = splitName(driverName);

  return {
    driver: {
      fullName: driverName,
      firstName,
      lastName,
      address: addressLine,
      city: cityStateZipParts?.[1] || '',
      state: cityStateZipParts?.[2] || '',
      zip: cityStateZipParts?.[3] || '',
      dlNumber
    },
    vehicle: {
      make: '',
      model: '',
      year,
      plate
    },
    violation: {
      description: violationDescription,
      statute,
      location,
      actualSpeedMph: actualSpeed,
      postedSpeedMph: speedLimit
    },
    court: {
      courtDate,
      courtName
    },
    rawText: cleaned
  };
};

export const buildAiAnalysis = (caseData) => {
  const strategy = [];
  const flags = [];
  const parkingTips = [];
  const textHints = (caseData.rawText || '').toLowerCase();
  const isParkingTicket =
    (caseData.violation?.description || '').toLowerCase().includes('parking') ||
    textHints.includes('parking') ||
    textHints.includes('no parking') ||
    textHints.includes('parking meter') ||
    textHints.includes('street sweeping') ||
    textHints.includes('permit') ||
    textHints.includes('tow');

  if (!caseData.court?.courtDate) {
    flags.push('Missing court date');
    strategy.push({
      title: 'Confirm court date',
      detail: 'Verify the appearance date on the citation or with the clerk to avoid a missed appearance.'
    });
  }

  if (!caseData.violation?.location) {
    flags.push('Missing violation location');
    strategy.push({
      title: 'Verify location',
      detail: 'Ensure the citation lists the exact street or intersection where the stop occurred.'
    });
  }

  const actualSpeed = Number(caseData.violation?.actualSpeedMph || 0);
  const postedSpeed = Number(caseData.violation?.postedSpeedMph || 0);
  if (actualSpeed && postedSpeed && actualSpeed > postedSpeed) {
    strategy.push({
      title: 'Review speed measurement',
      detail: 'Ask for calibration records and the officer’s method (radar, lidar, pacing).'
    });
    strategy.push({
      title: 'Check roadway signage',
      detail: 'Confirm the posted limit was visible and properly placed where the alleged speed was recorded.'
    });
  }

  strategy.push({
    title: 'Review officer details',
    detail: 'Confirm the officer ID, badge number, and agency are filled in. Missing or incomplete fields can help your defense.'
  });

  strategy.push({
    title: 'Validate citation accuracy',
    detail: 'Cross-check your name, address, vehicle, plate, and statute. Document any errors or typos.'
  });

  strategy.push({
    title: 'Gather evidence early',
    detail: 'Collect photos, dashcam footage, and witness info while details are fresh.'
  });

  strategy.push({
    title: 'Request discovery',
    detail: 'Ask for officer notes, calibration records, and any audio/video evidence before court.'
  });

  strategy.push({
    title: 'Plan your appearance',
    detail: 'Know the court process, deadlines, and whether you can resolve by mail, online, or with a written declaration.'
  });

  if (isParkingTicket) {
    parkingTips.push({
      title: 'Parking ticket tips',
      detail: 'Check signs for time limits, permit rules, street sweeping hours, and meter receipts. Take photos of signage, curb markings, and your vehicle position.'
    });
    parkingTips.push({
      title: 'Parking appeal checklist',
      detail: 'Submit an appeal with clear photos, proof of payment/permit, and a timeline. Note any unclear or missing signage.'
    });
    parkingTips.push({
      title: 'Administrative review',
      detail: 'Many cities allow a first-level written appeal. Meet the deadline to preserve your right to a hearing.'
    });
  }

  strategy.push({
    title: 'Inspect citation details',
    detail: 'Confirm your name, vehicle, and statute number match the ticket to avoid clerical issues.'
  });

  const summaryParts = [];
  if (caseData.violation?.description) summaryParts.push(caseData.violation.description);
  if (caseData.violation?.statute) summaryParts.push(`Code ${caseData.violation.statute}`);
  const speedNote =
    actualSpeed && postedSpeed ? `${actualSpeed} mph in a ${postedSpeed} mph zone` : '';
  if (speedNote) summaryParts.push(speedNote);

  const summary = summaryParts.length
    ? `Detected ${summaryParts.join(', ')}.`
    : 'Ticket details captured from the scan.';

  const confidenceFields = [
    caseData.driver?.fullName,
    caseData.violation?.description,
    caseData.violation?.statute,
    caseData.violation?.location,
    caseData.court?.courtDate
  ];
  const confidence = Math.round(
    (confidenceFields.filter(Boolean).length / confidenceFields.length) * 100
  );

  return {
    quickSummary: summary,
    strategy,
    parkingTips,
    flags,
    confidence
  };
};

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Outcome = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [caseId, setCaseId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('citationNationContact');
    const savedCaseId = localStorage.getItem('citationNationCaseId') || '';
    if (saved) {
      try {
        setContactInfo(JSON.parse(saved));
      } catch {
        setContactInfo(null);
      }
    }
    setCaseId(savedCaseId);
  }, []);

  const buildSummaryLines = () => [
    'Citation Nation Case Summary',
    '',
    `Case ID: ${caseId || 'Pending'}`,
    `Status: Resolved`,
    `Outcome: Dismissed`,
    `Resolution Date: ${new Date().toLocaleDateString()}`,
    '',
    'Contact Information',
    `Name: ${contactInfo?.fullName || 'Not provided'}`,
    `Email: ${contactInfo?.email || 'Not provided'}`,
    `Phone: ${contactInfo?.phone || 'Not provided'}`,
    '',
    'Case Details',
    'Violation: Speeding (Sample)',
    'Jurisdiction: County Court (Sample)',
    'Attorney: Assigned Defense Team',
    'Court Handling: Managed by your attorney',
    '',
    'Documents',
    'Proof of resolution: Court disposition PDF',
    'Final outcome summary: Included',
    'Remaining obligations: None'
  ];

  const handlePrint = () => {
    const pdfContent = buildPdf(buildSummaryLines());
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (!printWindow) {
      return;
    }
    printWindow.addEventListener('load', () => {
      printWindow.focus();
      printWindow.print();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  };

  const sanitizePdfText = (value) => {
    if (!value) return '';
    return String(value).replace(/[^\x20-\x7E]/g, '?');
  };

  const buildPdf = (lines) => {
    const fontSize = 12;
    const lineHeight = 18;
    const startX = 72;
    const startY = 720;
    const contentLines = [
      'BT',
      `/F1 ${fontSize} Tf`,
      `${startX} ${startY} Td`,
      ...lines.map((line, idx) => {
        if (idx === 0) {
          return `(${sanitizePdfText(line)}) Tj`;
        }
        return `0 -${lineHeight} Td (${sanitizePdfText(line)}) Tj`;
      }),
      'ET'
    ];
    const stream = contentLines.join('\n');

    const objects = [];
    objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    objects.push(
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ' +
        '/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n'
    );
    objects.push(
      `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`
    );
    objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((obj) => {
      offsets.push(pdf.length);
      pdf += obj;
    });

    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    offsets.slice(1).forEach((offset) => {
      const padded = String(offset).padStart(10, '0');
      pdf += `${padded} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
    pdf += `startxref\n${xrefStart}\n%%EOF`;
    return pdf;
  };

  const handleDownload = () => {
    const pdfContent = buildPdf(buildSummaryLines());
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `case-summary-${caseId || 'citation-nation'}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Case Outcome - Citation Nation</title>
        <meta name="description" content="Final case outcome and resolution summary." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="bg-white/5 border border-red-400/60 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-[#C6FF4D]">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Outcome — Win</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Case Dismissed</h1>
            <p className="text-white/70 text-lg mb-8">
              No points. No court appearance. You&apos;re all set.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/80 text-sm">
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Final outcome</div>
                  Dismissed
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Remaining obligations</div>
                  None
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Proof of resolution</div>
                  Court disposition PDF
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full">
              <Button
                onClick={handleDownload}
                className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-5 px-8 rounded-full w-full sm:w-auto h-14 justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Case Summary (PDF)
              </Button>
              <Button
                variant="outline"
                onClick={handlePrint}
                className="border-white/30 text-white hover:bg-white/10 font-bold py-5 px-8 rounded-full w-full sm:w-auto h-14 justify-center"
              >
                Print Summary
              </Button>
              <Link
                to="/dashboard"
                className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold py-5 px-8 rounded-full transition-colors w-full sm:w-auto h-14 flex items-center justify-center"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              Case Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/80 text-sm">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Case ID</div>
                {caseId || 'Pending'}
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Status</div>
                Resolved
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Outcome</div>
                Dismissed
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Resolution Date</div>
                {new Date().toLocaleDateString()}
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Contact</div>
                {contactInfo?.fullName || 'Not provided'}
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Email</div>
                {contactInfo?.email || 'Not provided'}
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Phone</div>
                {contactInfo?.phone || 'Not provided'}
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Attorney</div>
                Assigned Defense Team
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              Case Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/80 text-sm">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Violation</div>
                Speeding (Sample)
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Jurisdiction</div>
                County Court (Sample)
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Court Handling</div>
                Managed by your attorney
              </div>
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Risk Level</div>
                Low
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              Documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/80 text-sm">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Disposition</div>
                Court disposition PDF
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Outcome Summary</div>
                Final outcome summary
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Obligations</div>
                None
              </div>
            </div>
          </div>

          <div className="bg-[#0F1E33] border border-[#007BFF]/40 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-[#007BFF]">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Outcome — Partial Win</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Case Resolved</h2>
            <p className="text-white/70 text-lg">
              Your attorney successfully reduced penalties and minimized the overall impact.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">What&apos;s Next?</h2>
            <p className="text-white/70 mb-6">
              Need help or a copy of your records? Choose an option below.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/contact"
                className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold py-4 px-8 rounded-full transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/resources"
                className="bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-colors"
              >
                View Resources
              </Link>
              <Link
                to="/tracker"
                className="bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-colors"
              >
                Check Case Status
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Outcome;

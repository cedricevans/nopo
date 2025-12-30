import React from 'react';
import { Helmet } from 'react-helmet-async';

const CaseResults = () => {
  const results = [
    { caseNo: 'ALG1NNE', date: 'Dec 29, 2026', disposition: '12/29/2026', county: 'MIAMI-DADE', charges: 'LEARNER’S LIC RESTR-ACCOMPANIED DR', result: 'DISMISSED OFFICER' },
    { caseNo: 'AIOD9DE', date: 'Dec 18, 2026', disposition: '12/18/2026', county: 'MIAMI-DADE', charges: 'RAN STOP SIGN', result: 'DISMISSED OFFICER' },
    { caseNo: 'AMIAZNE', date: 'Dec 18, 2026', disposition: '12/17/2026', county: 'MIAMI-DADE', charges: 'SPEED SCH ZONE', result: 'DISMISSED' },
    { caseNo: 'AM1T5HE', date: 'Dec 9, 2026', disposition: '12/09/2026', county: 'MIAMI-DADE', charges: 'SPEEDING MUNICIPAL ROAD', result: 'DISMISSED' },
    { caseNo: '25151971TI10A', date: 'Dec 8, 2026', disposition: '12/04/2026', county: 'BROWARD', charges: 'FAIL TO PROVIDE PROOF OF INSURANCE', result: 'DISMISSED' },
    { caseNo: '25151970TI10A', date: 'Dec 8, 2026', disposition: '12/04/2026', county: 'BROWARD', charges: 'DL NOT CARRIED/EXHIBIT ON DEMAND', result: 'DISMISSED' },
    { caseNo: 'A5LYFYP', date: 'Dec 8, 2026', disposition: '12/02/2026', county: 'MIAMI-DADE', charges: 'IMPROPER U TURN', result: 'DISMISSED' },
    { caseNo: 'ALBQKQE', date: 'Dec 4, 2026', disposition: '12/04/2026', county: 'MIAMI-DADE', charges: 'SPEED/POSTED ZONE (STATE ROAD)', result: 'DISMISSED' },
    { caseNo: '25129710TI30A', date: 'Nov 20, 2026', disposition: '11/20/2026', county: 'BROWARD', charges: 'RAN STOP SIGN', result: 'DISMISSED' },
    { caseNo: 'AL2L77E', date: 'Nov 20, 2026', disposition: '11/20/2026', county: 'MIAMI-DADE', charges: 'CARELESS DRIVING', result: 'DISMISSED' },
    { caseNo: '25149612TI30A', date: 'Nov 20, 2026', disposition: '11/18/2026', county: 'BROWARD', charges: 'CARELESS DRIVING', result: 'DISMISSED' },
    { caseNo: 'AL4RFKE', date: 'Nov 19, 2026', disposition: '11/17/2026', county: 'MIAMI-DADE', charges: 'IMPROPER STOP LOAD/UNLOAD PASSENGER LIMITED ACCESS FACILITY', result: 'DISMISSED' },
    { caseNo: '25126200TI40A', date: 'Nov 14, 2026', disposition: '11/10/2026', county: 'BROWARD', charges: 'DWLS UNKNOWINGLY', result: 'DISMISSED' },
    { caseNo: 'AM667GE', date: 'Nov 5, 2026', disposition: '11/04/2026', county: 'MIAMI-DADE', charges: 'DWLS UNKNOWINGLY', result: 'DISMISSED' },
    { caseNo: 'ALEA5RE', date: 'Oct 30, 2026', disposition: '10/30/2026', county: 'MIAMI-DADE', charges: 'DEFECTIVE EQUIPMENT – OWNER', result: 'DISMISSED' }
  ];

  return (
    <>
      <Helmet>
        <title>Recent Case Results - Citation Nation</title>
        <meta
          name="description"
          content="Recent traffic ticket case results and dismissals."
        />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Case Results
            </h1>
            <p className="text-white/70">
              A snapshot of recent outcomes handled by our defense team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((item) => (
              <div
                key={item.caseNo}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="text-white font-semibold mb-1">
                  Case No.: {item.caseNo}
                </div>
                <div className="text-white/50 text-sm mb-4">{item.date}</div>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>
                    <span className="font-semibold text-white/80">Disposition Date:</span> {item.disposition}
                  </li>
                  <li>
                    <span className="font-semibold text-white/80">County:</span> {item.county}
                  </li>
                  <li>
                    <span className="font-semibold text-white/80">Charges:</span> {item.charges}
                  </li>
                  <li>
                    <span className="font-semibold text-white/80">Result:</span> {item.result}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CaseResults;

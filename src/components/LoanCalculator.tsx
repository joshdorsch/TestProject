import { useState, useMemo } from 'react';
import type { CalculatorInputs, BorrowingRow, StudentType } from '../types';
import { LOAN_LIMITS, REGULATION_NOTES } from '../data/loanLimits';
import { YearByYearTable } from './YearByYearTable';
import { SummaryPanel } from './SummaryPanel';

const STUDENT_TYPE_LABELS: Record<StudentType, string> = {
  'dependent-ug': 'Dependent Undergraduate',
  'independent-ug': 'Independent Undergraduate',
  graduate: 'Graduate / Professional',
};

const CURRENT_AY = 2026; // start year of AY 2026-27

function buildRows(inputs: CalculatorInputs): BorrowingRow[] {
  const schedule = LOAN_LIMITS[inputs.studentType];
  const rows: BorrowingRow[] = [];
  let cumulativeCurrent = inputs.alreadyBorrowed;
  let cumulativeProposed = inputs.alreadyBorrowed;

  for (let i = 0; i < inputs.programLength; i++) {
    const yearIndex = Math.min(i, schedule.byYear.length - 1);
    const limits = schedule.byYear[yearIndex];
    const ayStart = inputs.startYear + i;

    const allowedCurrent = Math.max(
      0,
      Math.min(limits.current.total, schedule.aggregateCurrent - cumulativeCurrent)
    );
    const allowedProposed = Math.max(
      0,
      Math.min(limits.proposed.total, schedule.aggregateProposed - cumulativeProposed)
    );

    cumulativeCurrent = Math.min(cumulativeCurrent + allowedCurrent, schedule.aggregateCurrent);
    cumulativeProposed = Math.min(cumulativeProposed + allowedProposed, schedule.aggregateProposed);

    rows.push({
      academicYear: `${ayStart}–${(ayStart + 1).toString().slice(-2)}`,
      yearInProgram: i + 1,
      annualCurrentTotal: allowedCurrent,
      annualProposedTotal: allowedProposed,
      annualCurrentSubsidized: Math.min(limits.current.subsidized, allowedCurrent),
      annualProposedSubsidized: Math.min(limits.proposed.subsidized, allowedProposed),
      cumulativeCurrent,
      cumulativeProposed,
      remainingAggregateCurrent: Math.max(0, schedule.aggregateCurrent - cumulativeCurrent),
      remainingAggregateProposed: Math.max(0, schedule.aggregateProposed - cumulativeProposed),
      reductionImpact: allowedCurrent - allowedProposed,
    });
  }

  return rows;
}

export function LoanCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    studentType: 'graduate',
    programLength: 3,
    startYear: CURRENT_AY,
    alreadyBorrowed: 0,
  });

  const rows = useMemo(() => buildRows(inputs), [inputs]);
  const schedule = LOAN_LIMITS[inputs.studentType];
  const notes = REGULATION_NOTES[inputs.studentType];

  const totalCurrentBorrowable = Math.min(
    rows.reduce((sum, r) => sum + r.annualCurrentTotal, 0),
    schedule.aggregateCurrent - inputs.alreadyBorrowed
  );
  const totalProposedBorrowable = Math.min(
    rows.reduce((sum, r) => sum + r.annualProposedTotal, 0),
    schedule.aggregateProposed - inputs.alreadyBorrowed
  );

  const startYearOptions = Array.from({ length: 6 }, (_, i) => CURRENT_AY - 1 + i);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Borrower Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.studentType}
              onChange={e => setInputs(p => ({ ...p, studentType: e.target.value as StudentType }))}
            >
              {(Object.keys(STUDENT_TYPE_LABELS) as StudentType[]).map(t => (
                <option key={t} value={t}>{STUDENT_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Length (years)</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.programLength}
              onChange={e => setInputs(p => ({ ...p, programLength: Number(e.target.value) }))}
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'year' : 'years'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Start AY</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.startYear}
              onChange={e => setInputs(p => ({ ...p, startYear: Number(e.target.value) }))}
            >
              {startYearOptions.map(y => (
                <option key={y} value={y}>{y}–{(y + 1).toString().slice(-2)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Already Borrowed ($)</label>
            <input
              type="number"
              min={0}
              step={500}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.alreadyBorrowed}
              onChange={e => setInputs(p => ({ ...p, alreadyBorrowed: Math.max(0, Number(e.target.value)) }))}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <SummaryPanel
        totalCurrentBorrowable={totalCurrentBorrowable}
        totalProposedBorrowable={totalProposedBorrowable}
        aggregateCurrent={schedule.aggregateCurrent}
        aggregateProposed={schedule.aggregateProposed}
        alreadyBorrowed={inputs.alreadyBorrowed}
      />

      {/* Year-by-year table */}
      <YearByYearTable rows={rows} />

      {/* Regulatory notes */}
      {notes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">Regulatory Notes</h3>
          <ul className="space-y-1">
            {notes.map((note, i) => (
              <li key={i} className="text-sm text-amber-700 flex gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

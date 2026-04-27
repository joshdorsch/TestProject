import type { BorrowingRow } from '../types';

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

interface Props {
  rows: BorrowingRow[];
}

export function YearByYearTable({ rows }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Year-by-Year Borrowing Schedule</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Comparison of annual limits and cumulative borrowing under current vs. proposed rules.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">AY</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Year</th>
              <th className="px-4 py-3 text-right font-medium text-blue-700 whitespace-nowrap">Annual (Current)</th>
              <th className="px-4 py-3 text-right font-medium text-orange-600 whitespace-nowrap">Annual (Proposed)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 whitespace-nowrap">Reduction</th>
              <th className="px-4 py-3 text-right font-medium text-blue-700 whitespace-nowrap">Cumulative (Current)</th>
              <th className="px-4 py-3 text-right font-medium text-orange-600 whitespace-nowrap">Cumulative (Proposed)</th>
              <th className="px-4 py-3 text-right font-medium text-blue-700 whitespace-nowrap">Remaining (Current)</th>
              <th className="px-4 py-3 text-right font-medium text-orange-600 whitespace-nowrap">Remaining (Proposed)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.academicYear} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{row.academicYear}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">Year {row.yearInProgram}</td>
                <td className="px-4 py-3 text-right text-blue-700 font-medium whitespace-nowrap">
                  {fmt(row.annualCurrentTotal)}
                </td>
                <td className="px-4 py-3 text-right text-orange-600 font-medium whitespace-nowrap">
                  {fmt(row.annualProposedTotal)}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {row.reductionImpact === 0 ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <span className="text-red-600 font-medium">−{fmt(row.reductionImpact)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-blue-700 whitespace-nowrap">{fmt(row.cumulativeCurrent)}</td>
                <td className="px-4 py-3 text-right text-orange-600 whitespace-nowrap">{fmt(row.cumulativeProposed)}</td>
                <td className="px-4 py-3 text-right text-blue-700 whitespace-nowrap">{fmt(row.remainingAggregateCurrent)}</td>
                <td className="px-4 py-3 text-right text-orange-600 whitespace-nowrap">{fmt(row.remainingAggregateProposed)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

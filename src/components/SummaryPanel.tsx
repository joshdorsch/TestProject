function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

interface Props {
  totalCurrentBorrowable: number;
  totalProposedBorrowable: number;
  aggregateCurrent: number;
  aggregateProposed: number;
  alreadyBorrowed: number;
}

export function SummaryPanel({
  totalCurrentBorrowable,
  totalProposedBorrowable,
  aggregateCurrent,
  aggregateProposed,
  alreadyBorrowed,
}: Props) {
  const gap = totalCurrentBorrowable - totalProposedBorrowable;
  const aggregateGap = aggregateCurrent - aggregateProposed;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Borrowable — Current Rules</p>
        <p className="text-3xl font-bold text-blue-800">{fmt(totalCurrentBorrowable)}</p>
        <p className="text-xs text-blue-600 mt-1">Aggregate cap: {fmt(aggregateCurrent)}</p>
        {alreadyBorrowed > 0 && (
          <p className="text-xs text-blue-600">{fmt(alreadyBorrowed)} already borrowed</p>
        )}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">Borrowable — Proposed Rules</p>
        <p className="text-3xl font-bold text-orange-800">{fmt(totalProposedBorrowable)}</p>
        <p className="text-xs text-orange-600 mt-1">Proposed aggregate cap: {fmt(aggregateProposed)}</p>
        {aggregateGap > 0 && (
          <p className="text-xs text-orange-600">Aggregate reduced by {fmt(aggregateGap)}</p>
        )}
      </div>

      <div className={`rounded-xl p-5 border ${gap > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
          Borrowing Gap
        </p>
        <p className={`text-3xl font-bold ${gap > 0 ? 'text-red-800' : 'text-green-800'}`}>
          {gap > 0 ? `−${fmt(gap)}` : fmt(0)}
        </p>
        <p className={`text-xs mt-1 ${gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {gap > 0
            ? 'Less available under proposed rules'
            : 'No reduction impact for this profile'}
        </p>
      </div>
    </div>
  );
}

import { LoanCalculator } from './components/LoanCalculator';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-start gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Direct Loans Calculator</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Aggregate limit reduction schedule · Year-by-year borrowing plan
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
          <strong>Disclaimer:</strong> Proposed limits are based on ED rulemaking discussions as of early 2026.
          Verify all figures against the applicable final rule before advising borrowers.
        </div>
        <LoanCalculator />
      </main>
    </div>
  );
}

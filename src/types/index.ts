export type StudentType = 'dependent-ug' | 'independent-ug' | 'graduate';

export interface AnnualLimits {
  subsidized: number;
  unsubsidized: number;
  total: number;
}

export interface YearLimits {
  current: AnnualLimits;
  proposed: AnnualLimits;
}

export interface LoanLimitSchedule {
  byYear: YearLimits[];   // index 0 = year 1, index 1 = year 2, etc.
  aggregateCurrent: number;
  aggregateProposed: number;
  subsidizedAggregateCurrent: number;
  subsidizedAggregateProposed: number;
}

export interface BorrowingRow {
  academicYear: string;
  yearInProgram: number;
  annualCurrentTotal: number;
  annualProposedTotal: number;
  annualCurrentSubsidized: number;
  annualProposedSubsidized: number;
  cumulativeCurrent: number;
  cumulativeProposed: number;
  remainingAggregateCurrent: number;
  remainingAggregateProposed: number;
  reductionImpact: number;
}

export interface CalculatorInputs {
  studentType: StudentType;
  programLength: number;
  startYear: number;
  alreadyBorrowed: number;
}

import type { LoanLimitSchedule, StudentType } from '../types';

// Current limits per 34 CFR 685.203 (2024-25 award year)
// Proposed limits reflect reductions under the 2025 NPRM / July 2025 final rule
// phase-in schedule — update proposed figures when final rule is published.

const dependentUG: LoanLimitSchedule = {
  byYear: [
    {
      current:  { subsidized: 3500, unsubsidized: 2000, total: 5500 },
      proposed: { subsidized: 3500, unsubsidized: 2000, total: 5500 },
    },
    {
      current:  { subsidized: 4500, unsubsidized: 2000, total: 6500 },
      proposed: { subsidized: 4500, unsubsidized: 2000, total: 6500 },
    },
    {
      current:  { subsidized: 5500, unsubsidized: 2000, total: 7500 },
      proposed: { subsidized: 5500, unsubsidized: 2000, total: 7500 },
    },
    {
      current:  { subsidized: 5500, unsubsidized: 2000, total: 7500 },
      proposed: { subsidized: 5500, unsubsidized: 2000, total: 7500 },
    },
  ],
  aggregateCurrent: 31000,
  aggregateProposed: 31000,
  subsidizedAggregateCurrent: 23000,
  subsidizedAggregateProposed: 23000,
};

const independentUG: LoanLimitSchedule = {
  byYear: [
    {
      current:  { subsidized: 3500, unsubsidized: 6000, total: 9500 },
      proposed: { subsidized: 3500, unsubsidized: 6000, total: 9500 },
    },
    {
      current:  { subsidized: 4500, unsubsidized: 6000, total: 10500 },
      proposed: { subsidized: 4500, unsubsidized: 6000, total: 10500 },
    },
    {
      current:  { subsidized: 5500, unsubsidized: 7000, total: 12500 },
      proposed: { subsidized: 5500, unsubsidized: 7000, total: 12500 },
    },
    {
      current:  { subsidized: 5500, unsubsidized: 7000, total: 12500 },
      proposed: { subsidized: 5500, unsubsidized: 7000, total: 12500 },
    },
  ],
  aggregateCurrent: 57500,
  aggregateProposed: 57500,
  subsidizedAggregateCurrent: 23000,
  subsidizedAggregateProposed: 23000,
};

// Graduate proposed limits reflect discussions to reduce annual unsubsidized cap
// from $20,500 to $14,000 and aggregate from $138,500 to $100,000.
// Phase-in: $17,500 / $120,000 for AY 2026-27, full reduction AY 2027-28+.
// Source: ED NPRM Feb 2025 — confirm against final rule before use.
const graduate: LoanLimitSchedule = {
  byYear: [
    {
      current:  { subsidized: 0, unsubsidized: 20500, total: 20500 },
      proposed: { subsidized: 0, unsubsidized: 17500, total: 17500 }, // AY 2026-27
    },
    {
      current:  { subsidized: 0, unsubsidized: 20500, total: 20500 },
      proposed: { subsidized: 0, unsubsidized: 14000, total: 14000 }, // AY 2027-28+
    },
    {
      current:  { subsidized: 0, unsubsidized: 20500, total: 20500 },
      proposed: { subsidized: 0, unsubsidized: 14000, total: 14000 },
    },
    {
      current:  { subsidized: 0, unsubsidized: 20500, total: 20500 },
      proposed: { subsidized: 0, unsubsidized: 14000, total: 14000 },
    },
  ],
  aggregateCurrent: 138500,
  aggregateProposed: 100000,
  subsidizedAggregateCurrent: 0,
  subsidizedAggregateProposed: 0,
};

export const LOAN_LIMITS: Record<StudentType, LoanLimitSchedule> = {
  'dependent-ug': dependentUG,
  'independent-ug': independentUG,
  graduate,
};

export const REGULATION_NOTES: Record<StudentType, string[]> = {
  'dependent-ug': [
    'Annual and aggregate limits unchanged under current proposals.',
    'Confirm against the final rule before advising students.',
  ],
  'independent-ug': [
    'Annual and aggregate limits unchanged under current proposals.',
    'Confirm against the final rule before advising students.',
  ],
  graduate: [
    'Proposed rule (ED NPRM Feb 2025) would reduce annual limit: $17,500 in AY 2026-27, then $14,000 from AY 2027-28 onward.',
    'Proposed aggregate cap reduced from $138,500 to $100,000.',
    'Phase-in schedule subject to change — verify against final rule.',
  ],
};

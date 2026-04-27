package com.directloans.model;

public record BorrowingRow(
    String academicYear,
    int yearInProgram,
    int annualCurrentTotal,
    int annualProposedTotal,
    int reductionImpact,
    int cumulativeCurrent,
    int cumulativeProposed,
    int remainingAggregateCurrent,
    int remainingAggregateProposed
) {}

package com.directloans.model;

import java.util.List;

public record LoanLimitSchedule(
    List<YearLimits> byYear,
    int aggregateCurrent,
    int aggregateProposed,
    int subsidizedAggregateCurrent,
    int subsidizedAggregateProposed
) {}

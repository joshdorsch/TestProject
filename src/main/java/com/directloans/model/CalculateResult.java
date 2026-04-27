package com.directloans.model;

import java.util.List;

public record CalculateResult(
    List<BorrowingRow> rows,
    int totalCurrentBorrowable,
    int totalProposedBorrowable,
    int aggregateCurrent,
    int aggregateProposed,
    int alreadyBorrowed,
    List<String> regulationNotes
) {}

package com.directloans.service;

import com.directloans.data.LoanLimitsData;
import com.directloans.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoanCalculatorService {

    public CalculateResult calculate(CalculatorForm form) {
        StudentType type = StudentType.fromValue(form.getStudentType());
        LoanLimitSchedule schedule = LoanLimitsData.LOAN_LIMITS.get(type);

        List<BorrowingRow> rows = new ArrayList<>();
        int cumulativeCurrent = form.getAlreadyBorrowed();
        int cumulativeProposed = form.getAlreadyBorrowed();

        for (int i = 0; i < form.getProgramLength(); i++) {
            int yearIndex = Math.min(i, schedule.byYear().size() - 1);
            YearLimits limits = schedule.byYear().get(yearIndex);
            int ayStart = form.getStartYear() + i;

            int allowedCurrent = Math.max(0,
                Math.min(limits.current().total(), schedule.aggregateCurrent() - cumulativeCurrent));
            int allowedProposed = Math.max(0,
                Math.min(limits.proposed().total(), schedule.aggregateProposed() - cumulativeProposed));

            cumulativeCurrent = Math.min(cumulativeCurrent + allowedCurrent, schedule.aggregateCurrent());
            cumulativeProposed = Math.min(cumulativeProposed + allowedProposed, schedule.aggregateProposed());

            rows.add(new BorrowingRow(
                ayStart + "–" + String.valueOf(ayStart + 1).substring(2),
                i + 1,
                allowedCurrent,
                allowedProposed,
                allowedCurrent - allowedProposed,
                cumulativeCurrent,
                cumulativeProposed,
                Math.max(0, schedule.aggregateCurrent() - cumulativeCurrent),
                Math.max(0, schedule.aggregateProposed() - cumulativeProposed)
            ));
        }

        int totalCurrentBorrowable = rows.stream().mapToInt(BorrowingRow::annualCurrentTotal).sum();
        int totalProposedBorrowable = rows.stream().mapToInt(BorrowingRow::annualProposedTotal).sum();

        return new CalculateResult(
            rows,
            totalCurrentBorrowable,
            totalProposedBorrowable,
            schedule.aggregateCurrent(),
            schedule.aggregateProposed(),
            form.getAlreadyBorrowed(),
            LoanLimitsData.REGULATION_NOTES.get(type)
        );
    }
}

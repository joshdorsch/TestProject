package com.directloans.data;

import com.directloans.model.*;
import java.util.List;
import java.util.Map;

public class LoanLimitsData {

    public static final Map<StudentType, LoanLimitSchedule> LOAN_LIMITS = Map.of(
        StudentType.DEPENDENT_UG, new LoanLimitSchedule(
            List.of(
                new YearLimits(new AnnualLimits(3500, 2000, 5500),  new AnnualLimits(3500, 2000, 5500)),
                new YearLimits(new AnnualLimits(4500, 2000, 6500),  new AnnualLimits(4500, 2000, 6500)),
                new YearLimits(new AnnualLimits(5500, 2000, 7500),  new AnnualLimits(5500, 2000, 7500)),
                new YearLimits(new AnnualLimits(5500, 2000, 7500),  new AnnualLimits(5500, 2000, 7500))
            ), 31000, 31000, 23000, 23000
        ),
        StudentType.INDEPENDENT_UG, new LoanLimitSchedule(
            List.of(
                new YearLimits(new AnnualLimits(3500, 6000, 9500),   new AnnualLimits(3500, 6000, 9500)),
                new YearLimits(new AnnualLimits(4500, 6000, 10500),  new AnnualLimits(4500, 6000, 10500)),
                new YearLimits(new AnnualLimits(5500, 7000, 12500),  new AnnualLimits(5500, 7000, 12500)),
                new YearLimits(new AnnualLimits(5500, 7000, 12500),  new AnnualLimits(5500, 7000, 12500))
            ), 57500, 57500, 23000, 23000
        ),
        // Proposed: annual $17,500 (AY 2026-27) → $14,000 (AY 2027-28+), aggregate $138,500 → $100,000
        // Source: ED NPRM Feb 2025 — verify against final rule before use
        StudentType.GRADUATE, new LoanLimitSchedule(
            List.of(
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 17500, 17500)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 14000, 14000)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 14000, 14000)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 14000, 14000))
            ), 138500, 100000, 0, 0
        )
    );

    public static final Map<StudentType, List<String>> REGULATION_NOTES = Map.of(
        StudentType.DEPENDENT_UG, List.of(
            "Annual and aggregate limits unchanged under current proposals.",
            "Confirm against the final rule before advising students."
        ),
        StudentType.INDEPENDENT_UG, List.of(
            "Annual and aggregate limits unchanged under current proposals.",
            "Confirm against the final rule before advising students."
        ),
        StudentType.GRADUATE, List.of(
            "Proposed rule (ED NPRM Feb 2025) would reduce annual limit: $17,500 in AY 2026-27, then $14,000 from AY 2027-28 onward.",
            "Proposed aggregate cap reduced from $138,500 to $100,000.",
            "Phase-in schedule subject to change — verify against final rule."
        )
    );
}

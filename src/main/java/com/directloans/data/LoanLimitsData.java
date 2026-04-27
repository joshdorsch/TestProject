package com.directloans.data;

import com.directloans.model.*;
import java.util.List;
import java.util.Map;

// Source: One Big Beautiful Bill Act (OBBB, P.L. 119-21), signed July 4, 2025.
// Effective July 1, 2026 for new borrowers. Implementing regs (NPRM 2026-01912)
// published Jan 30, 2026 — pending final rule. Verify before advising borrowers.
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
        // OBBB: annual unchanged at $20,500; aggregate reduced $138,500 → $100,000.
        // Grad PLUS eliminated for new borrowers on/after July 1, 2026.
        StudentType.GRADUATE, new LoanLimitSchedule(
            List.of(
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 20500, 20500)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 20500, 20500)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 20500, 20500)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 20500, 20500))
            ), 138500, 100000, 0, 0
        ),
        // OBBB: new professional degree category for 11 defined fields.
        // Current (pre-OBBB): treated as graduate — $20,500 annual / $138,500 aggregate.
        // OBBB: $50,000 annual / $200,000 aggregate for qualifying new borrowers.
        StudentType.PROFESSIONAL, new LoanLimitSchedule(
            List.of(
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 50000, 50000)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 50000, 50000)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 50000, 50000)),
                new YearLimits(new AnnualLimits(0, 20500, 20500), new AnnualLimits(0, 50000, 50000))
            ), 138500, 200000, 0, 0
        )
    );

    public static final Map<StudentType, List<String>> REGULATION_NOTES = Map.of(
        StudentType.DEPENDENT_UG, List.of(
            "Undergraduate annual and aggregate limits are unchanged under OBBB.",
            "Confirm against the final implementing rule before advising students."
        ),
        StudentType.INDEPENDENT_UG, List.of(
            "Undergraduate annual and aggregate limits are unchanged under OBBB.",
            "Confirm against the final implementing rule before advising students."
        ),
        StudentType.GRADUATE, List.of(
            "OBBB (P.L. 119-21): Annual Direct Unsubsidized limit unchanged at $20,500.",
            "Aggregate cap reduced from $138,500 to $100,000 for new borrowers on/after July 1, 2026.",
            "Graduate PLUS loans eliminated for new borrowers on/after July 1, 2026.",
            "Legacy provision: students enrolled before July 1, 2026 may continue under prior rules for up to 3 additional years or degree completion.",
            "Implementing regulations (NPRM 2026-01912, Jan 30, 2026) pending final rule — verify before advising."
        ),
        StudentType.PROFESSIONAL, List.of(
            "OBBB (P.L. 119-21): New professional degree category effective July 1, 2026 for qualifying new borrowers.",
            "Annual limit increases from $20,500 to $50,000; aggregate increases from $138,500 to $200,000.",
            "Qualifying fields (11 defined): Law (J.D.), Medicine (M.D.), Osteopathic Medicine (D.O.), Dentistry (D.D.S./D.M.D.), Pharmacy (Pharm.D.), Veterinary Medicine (D.V.M.), Optometry (O.D.), Chiropractic (D.C.), Podiatry (D.P.M.), Theology (M.Div./M.H.L.), Clinical Psychology (Psy.D./Ph.D.).",
            "Nursing, PA, PT, OT, social work, public health and many other programs are classified as 'graduate' under OBBB — not professional.",
            "Graduate PLUS eliminated for all graduate/professional new borrowers on/after July 1, 2026.",
            "Confirm program classification against the final implementing rule before advising."
        )
    );
}

package com.directloans.model;

public class CalculatorForm {
    private String studentType = "graduate";
    private int programLength = 3;
    private int startYear = 2026;
    private int alreadyBorrowed = 0;

    public String getStudentType() { return studentType; }
    public void setStudentType(String studentType) { this.studentType = studentType; }

    public int getProgramLength() { return programLength; }
    public void setProgramLength(int programLength) { this.programLength = programLength; }

    public int getStartYear() { return startYear; }
    public void setStartYear(int startYear) { this.startYear = startYear; }

    public int getAlreadyBorrowed() { return alreadyBorrowed; }
    public void setAlreadyBorrowed(int alreadyBorrowed) { this.alreadyBorrowed = alreadyBorrowed; }
}

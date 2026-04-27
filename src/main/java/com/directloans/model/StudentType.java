package com.directloans.model;

public enum StudentType {
    DEPENDENT_UG("dependent-ug", "Dependent Undergraduate"),
    INDEPENDENT_UG("independent-ug", "Independent Undergraduate"),
    GRADUATE("graduate", "Graduate / Professional");

    private final String value;
    private final String label;

    StudentType(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }

    public static StudentType fromValue(String value) {
        for (StudentType t : values()) {
            if (t.value.equals(value)) return t;
        }
        throw new IllegalArgumentException("Unknown student type: " + value);
    }
}

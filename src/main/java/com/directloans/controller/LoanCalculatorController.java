package com.directloans.controller;

import com.directloans.model.CalculateResult;
import com.directloans.model.CalculatorForm;
import com.directloans.model.StudentType;
import com.directloans.service.LoanCalculatorService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.stream.IntStream;

@Controller
public class LoanCalculatorController {

    private final LoanCalculatorService calculatorService;

    public LoanCalculatorController(LoanCalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @GetMapping("/")
    public String index(Model model) {
        CalculatorForm form = new CalculatorForm();
        CalculateResult result = calculatorService.calculate(form);
        populateModel(model, form, result);
        return "index";
    }

    @PostMapping("/api/calculate")
    @ResponseBody
    public CalculateResult calculate(@RequestBody CalculatorForm form) {
        return calculatorService.calculate(form);
    }

    private void populateModel(Model model, CalculatorForm form, CalculateResult result) {
        model.addAttribute("form", form);
        model.addAttribute("result", result);
        model.addAttribute("studentTypes", Arrays.asList(StudentType.values()));
        model.addAttribute("startYearOptions", IntStream.rangeClosed(2025, 2031).boxed().toList());
    }
}

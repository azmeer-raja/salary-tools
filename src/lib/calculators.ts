import { formatCurrency } from "./utils";
export { formatCurrency };

export interface SalaryBreakdown {
  monthlyGross: number;
  monthlyTakeHome: number;
  annualTax: number;
  monthlyTax: number;
  monthlyPF: number;
  monthlyPT: number;
  totalDeductions: number;
}

export interface FinanceResult {
  maturityAmount: number;
  investedAmount: number;
  totalGain: number;
}

export interface HealthResult {
  score: number;
  category: string;
}

export function calculateInHandSalary(
  annualCTC: number,
  bonus: number,
  pfPercentage: number = 12,
  professionalTax: number = 200,
  regime: 'old' | 'new' = 'new'
): SalaryBreakdown {
  const annualFixed = annualCTC - bonus;
  const monthlyGross = (annualFixed / 12);

  // Basic is usually 50% of CTC or fixed part
  const basic = annualFixed * 0.5;
  const monthlyPF = (basic / 12) * (pfPercentage / 100);

  // Simplified Tax calculation for MVP
  // New Regime 2024-25 (Simplified)
  // 0-3L: 0
  // 3-7L: 5%
  // 7-10L: 10%
  // 10-12L: 15%
  // 12-15L: 20%
  // > 15L: 30%
  // Standard Deduction: 75k (New)

  let taxableIncome = annualFixed - (regime === 'new' ? 75000 : 50000);
  let annualTax = 0;

  if (regime === 'new') {
    if (taxableIncome > 1500000) annualTax += (taxableIncome - 1500000) * 0.3 + 150000;
    else if (taxableIncome > 1200000) annualTax += (taxableIncome - 1200000) * 0.2 + 90000;
    else if (taxableIncome > 1000000) annualTax += (taxableIncome - 1000000) * 0.15 + 60000;
    else if (taxableIncome > 700000) annualTax += (taxableIncome - 700000) * 0.1 + 30000;
    else if (taxableIncome > 300000) annualTax += (taxableIncome - 300000) * 0.05;

    // Rebate up to 7L taxable income
    if (taxableIncome <= 700000) annualTax = 0;
  }

  const monthlyTax = annualTax / 12;
  const totalDeductions = monthlyPF + professionalTax + monthlyTax;
  const monthlyTakeHome = monthlyGross - totalDeductions;

  return {
    monthlyGross,
    monthlyTakeHome,
    annualTax,
    monthlyTax,
    monthlyPF,
    monthlyPT: professionalTax,
    totalDeductions
  };
}

export function calculateSIP(monthlyInvestment: number, rate: number, years: number): FinanceResult {
  const i = rate / 100 / 12;
  const n = years * 12;
  const maturityAmount = monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const investedAmount = monthlyInvestment * n;
  return {
    maturityAmount,
    investedAmount,
    totalGain: maturityAmount - investedAmount
  };
}

export function calculateCompoundInterest(principal: number, rate: number, years: number, frequency: number = 1): number {
  return principal * Math.pow(1 + (rate / 100) / frequency, frequency * years);
}

export function calculateBMI(weight: number, heightCm: number): HealthResult {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  let category = "Normal";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
  else if (bmi >= 30) category = "Obese";
  return { score: bmi, category };
}

export function calculatePercentage(total: number, percent: number): number {
  return (total * percent) / 100;
}

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateEMI(principal: number, rate: number, tenureYears: number) {
  const monthlyRate = rate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

export function calculateHRA(basic: number, hraReceived: number, rentPaid: number, isMetro: boolean) {
  const rentExcess = Math.max(0, rentPaid - (basic * 0.1));
  const basicLimit = isMetro ? (basic * 0.5) : (basic * 0.4);
  const exemption = Math.min(hraReceived, rentExcess, basicLimit);
  return exemption;
}

export function calculatePF(basic: number, employeePercent: number = 12, employerPercent: number = 12) {
  const employeeContrib = basic * (employeePercent / 100);
  const employerContrib = basic * (employerPercent / 100);
  return { employeeContrib, employerContrib, total: employeeContrib + employerContrib };
}

export function calculateSalaryHike(current: number, expectedHikePercent: number) {
  const hikeAmount = current * (expectedHikePercent / 100);
  const newSalary = current + hikeAmount;
  return { newSalary, hikeAmount, monthlyIncrease: hikeAmount / 12 };
}

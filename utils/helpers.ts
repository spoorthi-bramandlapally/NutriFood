import { BMIData } from '../types';

export const calculateBMI = (heightCm: number, weightKg: number): BMIData => {
  if (heightCm <= 0 || weightKg <= 0) {
    return { value: 0, category: 'Unknown', color: '#94a3b8' };
  }

  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category = '';
  let color = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#3b82f6'; // blue-500
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal Weight';
    color = '#10b981'; // emerald-500
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = '#f59e0b'; // amber-500
  } else {
    category = 'Obese';
    color = '#ef4444'; // red-500
  }

  return { value: bmi, category, color };
};

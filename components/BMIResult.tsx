import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { BMIData } from '../types';

interface BMIResultProps {
  bmiData: BMIData;
}

const BMIResult: React.FC<BMIResultProps> = ({ bmiData }) => {
  const { value, category, color } = bmiData;

  const chartData = [{
    name: 'BMI',
    value: Math.min(value, 40),
    fill: color
  }];

  return (
    <div className="bmi-card">
      <h3 className="bmi-header">Current BMI Status</h3>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="70%" 
            innerRadius="75%" 
            outerRadius="100%" 
            barSize={24} 
            data={chartData} 
            startAngle={180} 
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 40]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#f1f5f9' }}
              dataKey="value"
              cornerRadius={12}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="chart-overlay">
            <span className="bmi-value" style={{ color }}>{value}</span>
            <span className="bmi-unit">kg/m²</span>
        </div>
      </div>

      <div className="w-full">
        <div className="bmi-category-badge" style={{ backgroundColor: color }}>
          {category}
        </div>
      </div>
      
      <div className="bmi-footer">
         <p>
           Calculated based on your height and weight. <br/>A normal BMI range is 18.5 – 24.9.
         </p>
      </div>
    </div>
  );
};

export default BMIResult;
import React from 'react';
import { RecommendationResponse } from '../types';
import { Utensils, Footprints, Moon, Dumbbell, Droplets, Sparkles, Check, X, Flame } from 'lucide-react';

interface RecommendationsProps {
  plan: RecommendationResponse;
}

const Recommendations: React.FC<RecommendationsProps> = ({ plan }) => {
  return (
    <div className="rec-container animate-fade-in">
      
      {/* Summary Section */}
      <div className="summary-card">
        <div className="summary-bg-blob-1"></div>
        <div className="summary-bg-blob-2"></div>
        
        <div className="summary-content">
            <div className="summary-title-row">
                <div className="icon-box-glass">
                    <Sparkles size={20} className="text-white" />
                </div>
                <h2 className="card-title text-white">AI Health Analysis</h2>
            </div>
            <p className="summary-text">
            "{plan.summary}"
            </p>
        </div>
      </div>

      <div className="rec-grid">
        
        {/* Exercise Card */}
        <div className="rec-card">
            <div className="card-header blue">
                <div className="card-title-group">
                    <div className="icon-box blue">
                        <Dumbbell size={20} />
                    </div>
                    <h3 className="card-title">Exercise</h3>
                </div>
                 <span className="badge blue">{plan.exercise.frequency}</span>
            </div>
            
            <div className="card-body">
                <div>
                    <h4 className="section-title">Your Routine</h4>
                    <ul className="list-group">
                        {plan.exercise.routine.map((item, i) => (
                            <li key={i} className="list-item">
                                <div className="bullet-wrapper blue">
                                    <span className="bullet blue"></span>
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h4 className="section-title">Home Options</h4>
                    <div className="tags-group">
                        {plan.exercise.home_workouts.map((hw, i) => (
                            <span key={i} className="tag">
                                {hw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Nutrition Card */}
        <div className="rec-card">
            <div className="card-header emerald">
                <div className="card-title-group">
                    <div className="icon-box emerald">
                        <Utensils size={20} />
                    </div>
                    <h3 className="card-title">Nutrition</h3>
                </div>
                <div className="badge emerald">
                    <Droplets size={12} />
                    {plan.nutrition.hydration}
                </div>
            </div>
            
            <div className="card-body">
                 <div>
                    <h4 className="section-title">Meal Ideas</h4>
                     <ul className="list-group">
                        {plan.nutrition.meals.map((item, i) => (
                            <li key={i} className="list-item">
                                <div className="bullet-wrapper emerald">
                                    <span className="bullet emerald"></span>
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="nutrition-grid">
                    <div className="nutrition-box good">
                         <h4 className="box-title good">
                            <Check size={14} /> Eat More
                         </h4>
                         <ul className="list-group">
                            {plan.nutrition.foods_to_include.slice(0, 4).map((f, i) => (
                                <li key={i} className="list-item" style={{ fontSize: '0.75rem', gap: '0.25rem' }}>• {f}</li>
                            ))}
                         </ul>
                    </div>
                    <div className="nutrition-box bad">
                         <h4 className="box-title bad">
                            <X size={14} /> Avoid
                         </h4>
                         <ul className="list-group">
                            {plan.nutrition.foods_to_avoid.slice(0, 4).map((f, i) => (
                                <li key={i} className="list-item" style={{ fontSize: '0.75rem', gap: '0.25rem' }}>• {f}</li>
                            ))}
                         </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Walking Card */}
        <div className="rec-card">
             <div className="card-header orange">
                <div className="card-title-group">
                    <div className="icon-box orange">
                        <Footprints size={20} />
                    </div>
                    <h3 className="card-title">Activity</h3>
                </div>
                <div className="badge orange">
                    <Flame size={12} />
                    Active
                </div>
            </div>
            
            <div className="card-body">
                 <div className="steps-highlight">
                     <div className="steps-num">{plan.walking.daily_steps}</div>
                     <div className="steps-label">Steps Goal</div>
                 </div>
                 
                 <h4 className="section-title">Tips</h4>
                 <ul className="list-group">
                    {plan.walking.tips.map((tip, i) => (
                        <li key={i} className="list-item">
                             <div className="bullet-wrapper orange">
                                <span className="bullet orange"></span>
                            </div>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Lifestyle Card */}
        <div className="rec-card">
            <div className="card-header violet">
                <div className="card-title-group">
                    <div className="icon-box violet">
                        <Moon size={20} />
                    </div>
                    <h3 className="card-title">Wellness</h3>
                </div>
                <span className="badge violet">{plan.lifestyle.sleep} Sleep</span>
            </div>
            
            <div className="card-body">
                 <h4 className="section-title">Stress Management</h4>
                 <ul className="list-group">
                    {plan.lifestyle.stress_management.map((tip, i) => (
                        <li key={i} className="list-item">
                            <div className="bullet-wrapper violet">
                                <span className="bullet violet"></span>
                            </div>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Recommendations;
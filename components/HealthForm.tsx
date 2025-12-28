import React, { useState } from 'react';
import { ActivityLevel, Gender, UserProfile } from '../types';
import { Activity, Ruler, Weight, User, ArrowRight, Loader2 } from 'lucide-react';

interface HealthFormProps {
  onSubmit: (data: UserProfile) => void;
  isLoading: boolean;
}

const HealthForm: React.FC<HealthFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    gender: Gender.PreferNotToSay,
    height: 170,
    weight: 70,
    activityLevel: ActivityLevel.Moderate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="health-form-card">
      <div className="card-top-accent"></div>
      
      <div className="mb-8">
        <h2 className="form-title">Build Your Profile</h2>
        <p className="form-desc">Enter your details to generate a personalized health roadmap.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        
        {/* Age & Gender Row */}
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Age</label>
            <div className="input-wrapper">
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                min="10"
                max="100"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Gender</label>
            <div className="input-wrapper">
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="form-select"
              >
                {Object.values(Gender).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <div className="chevron-icon">
                <svg width="100%" height="100%" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Height & Weight Row */}
        <div className="form-grid">
          <div>
            <label className="label">
              Height <span>(cm)</span>
            </label>
            <div className="input-wrapper">
              <Ruler className="input-icon" />
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                min="50"
                max="250"
                className="form-input has-icon"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">
              Weight <span>(kg)</span>
            </label>
            <div className="input-wrapper">
              <Weight className="input-icon" />
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                min="20"
                max="300"
                className="form-input has-icon"
                required
              />
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div className="form-group">
          <label className="label">Activity Level</label>
          <div className="input-wrapper">
            <Activity className="input-icon" />
            <select
              name="activityLevel"
              value={profile.activityLevel}
              onChange={handleChange}
              className="form-select has-icon"
            >
              {Object.values(ActivityLevel).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
             <div className="chevron-icon">
                <svg width="100%" height="100%" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Analyzing Profile...</span>
            </>
          ) : (
            <>
              <span>Generate Health Plan</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default HealthForm;
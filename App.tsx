import React, { useState, useRef } from 'react';
import Header from './components/Header';
import HealthForm from './components/HealthForm';
import BMIResult from './components/BMIResult';
import Recommendations from './components/Recommendations';
import { UserProfile, BMIData, RecommendationResponse } from './types';
import { calculateBMI } from './utils/helpers';
import { generateHealthPlan } from './services/gemini';
import { AlertCircle, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [plan, setPlan] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    setPlan(null);
    setBmiData(null);

    try {
      const calculatedBMI = calculateBMI(profile.height, profile.weight);
      setBmiData(calculatedBMI);

      const generatedPlan = await generateHealthPlan(profile, calculatedBMI.value, calculatedBMI.category);
      setPlan(generatedPlan);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main className="container" style={{ flexGrow: 1, paddingBottom: '4rem' }}>
        
        {/* Hero Section */}
        <div className="hero-section">
          
          <div className="hero-content animate-fade-in">
            <div>
                <span className="hero-tag">
                    ✨ AI-Powered Fitness
                </span>
                <h1 className="hero-title">
                Your Health, <br />
                <span className="gradient-text">Reimagined.</span>
                </h1>
            </div>
            <p className="hero-subtitle">
              Get an instant, personalized nutrition and workout plan tailored to your body type and lifestyle.
            </p>
            
            <div className="hero-features">
                <div className="feature-item">
                    <div className="dot green"></div>
                    Science-backed
                </div>
                 <div className="feature-item">
                    <div className="dot blue"></div>
                    100% Free
                </div>
                 <div className="feature-item">
                    <div className="dot purple"></div>
                    Instant Results
                </div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 10 }}>
             <HealthForm onSubmit={handleFormSubmit} isLoading={loading} />
          </div>
          
        </div>

        {/* Error Message */}
        {error && (
            <div className="error-alert animate-fade-in">
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <p>{error}</p>
            </div>
        )}

        {/* Results Section */}
        {(bmiData && plan) && (
            <div ref={resultsRef} className="animate-slide-up scroll-mt">
                <div className="section-header">
                     <div className="scroll-indicator animate-bounce">
                        <ChevronDown size={24} className="text-secondary" />
                     </div>
                    <h2 className="section-title-main">Your Personal Roadmap</h2>
                </div>

                <div className="results-section">
                    {/* BMI Sidebar */}
                    <div className="sidebar">
                        <BMIResult bmiData={bmiData} />
                    </div>

                    {/* Main Recommendations */}
                    <div className="main-content">
                        <Recommendations plan={plan} />
                    </div>
                </div>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
             <div className="footer-logo">
                 <div className="footer-icon"></div>
                 <span>NutriFood</span>
             </div>
            <p className="footer-text">
                Empowering healthier lives through intelligence and data.
            </p>
            <p className="footer-disclaimer">
                Disclaimer: NutriFood provides information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="footer-copyright">
                © {new Date().getFullYear()} NutriFood AI
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
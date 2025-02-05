import React, { useState, useEffect } from 'react';
import BudgetSelector from './BudgetSelector';
import BuildComponents from './BuildComponents';
import { generateBuildOptions } from '../utils/generateBuild';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

const ConfigurationForm = ({ onSubmit }) => {
  const [budget, setBudget] = useState(3000);
  const [useCase, setUseCase] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (useCase && budget > 0) {
      setLoading(true);
      try {
        const buildOptions = generateBuildOptions(useCase, budget);
        setBuilds(buildOptions);
      } catch (err) {
        setError('Failed to generate builds.');
      }
      setLoading(false);
    }
  }, [useCase, budget]);

  return (
    <ErrorBoundary>
      <div className="p-6 bg-carbon-black/90 rounded-lg shadow-2xl">
        <h2 className="text-3xl text-light-gray text-center mb-8 font-bold">
          🛠️ Configuración Inteligente
        </h2>

        <BudgetSelector useCase={useCase} budget={budget} onBudgetChange={setBudget} />
        
        {loading ? <LoadingSpinner /> : <BuildComponents builds={builds} />}
      </div>
    </ErrorBoundary>
  );
};

export default ConfigurationForm;

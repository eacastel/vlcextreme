import React, { useState } from 'react';
import { USE_CASE_PROFILES } from '../utils/generateBuild';

const BudgetSelector = ({ useCase, budget, onBudgetChange }) => {
  const tiers = USE_CASE_PROFILES[useCase]?.tiers || {};
  const [min, max] = Object.values(tiers).reduce(([min, max], tier) => [
    Math.min(min, tier.min),
    Math.max(max, tier.max)
  ], [800, 50000]);

  return (
    <div className="flex flex-col items-center w-full mb-8">
      <input 
        type="range"
        min={min}
        max={max}
        value={budget}
        onChange={e => onBudgetChange(parseInt(e.target.value))}
        className="w-full accent-neon-cyan cursor-pointer"
      />
      <div className="text-neon-cyan text-lg font-bold mt-2">
        {budget.toLocaleString()}€
      </div>
    </div>
  );
};

export default BudgetSelector;

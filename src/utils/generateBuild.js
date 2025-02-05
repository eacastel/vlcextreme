import componentsData from '../data/components.json';

const USE_CASE_PROFILES = {
  Gaming: {
    componentPriority: ['GPU', 'CPU', 'RAM', 'Storage', 'PSU', 'Cooling', 'Motherboard'],
    performanceWeights: {
      GPU: 0.4,
      CPU: 0.3,
      RAM: 0.15,
      Storage: 0.1,
      PSU: 0.05
    },
    tiers: {
      Basic: { min: 800, max: 1500, performanceThreshold: 60 },
      Balanced: { min: 1500, max: 3000, performanceThreshold: 75 },
      Premium: { min: 3000, max: 6000, performanceThreshold: 90 }
    }
  },
  AI: {
    componentPriority: ['CPU', 'GPU', 'RAM', 'Storage', 'PSU', 'Motherboard'],
    performanceWeights: {
      CPU: 0.5,
      GPU: 0.3,
      RAM: 0.15,
      Storage: 0.05
    },
    tiers: {
      Starter: { min: 5000, max: 10000, performanceThreshold: 65 },
      Pro: { min: 10000, max: 25000, performanceThreshold: 80 },
      Cluster: { min: 25000, max: 50000, performanceThreshold: 95 }
    }
  }
};

const generateSmartBuild = (useCase, budget) => {
  const profile = USE_CASE_PROFILES[useCase];
  if (!profile) return null;

  const tier = Object.entries(profile.tiers).find(([_, range]) => 
    budget >= range.min && budget <= range.max
  )?.[0] || 'Custom';

  const componentBudgets = {};
  let remainingBudget = budget;

  profile.componentPriority.forEach(component => {
    const allocation = remainingBudget * (profile.performanceWeights[component] || 0.1);
    componentBudgets[component] = allocation;
    remainingBudget -= allocation;
  });

  const build = {};
  const substitutes = {};

  for (const component of profile.componentPriority) {
    const candidates = componentsData[component]
      ?.filter(c => c.category.includes(useCase))
      .sort((a, b) => b.performanceScore - a.performanceScore) || [];

    const main = candidates.find(c => c.price <= componentBudgets[component]);
    const substitute = candidates.find(c => c.price <= componentBudgets[component] * 0.8);

    if (main) {
      build[component] = main;
      if (substitute) substitutes[component] = substitute;
    }
  }

  const requiredComponents = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU'];
  const isValid = requiredComponents.every(c => build[c]);

  const totalScore = Object.entries(build).reduce((sum, [comp, data]) => {
    return sum + (data.performanceScore * (profile.performanceWeights[comp] || 0.1));
  }, 0);

  return isValid ? {
    tier,
    totalScore: Math.round(totalScore),
    mainComponents: build,
    substitutes,
    totalPrice: Object.values(build).reduce((sum, c) => sum + c.price, 0)
  } : null;
};

export const generateBuildOptions = (useCase, budget) => {
  const options = [];

  const idealBuild = generateSmartBuild(useCase, budget);
  if (idealBuild) options.push(idealBuild);

  const perfBuild = generateSmartBuild(useCase, budget * 1.1);
  if (perfBuild) options.push(perfBuild);

  const budgetBuild = generateSmartBuild(useCase, budget * 0.9);
  if (budgetBuild) options.push(budgetBuild);

  return options.filter(b => 
    b.totalPrice >= budget * 0.85 && 
    b.totalPrice <= budget * 1.15
  ).slice(0, 3);
};

export default generateSmartBuild;

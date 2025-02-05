export const USE_CASE_PROFILES = {
    Gaming: {
      componentPriority: ['GPU', 'CPU', 'RAM', 'Storage', 'PSU', 'Motherboard', 'Cooling'],
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
  
  export const MINIMUM_BUDGET = 500;
  export const BUDGET_TOLERANCE = 0.15; // ±15%
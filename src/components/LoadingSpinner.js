// src/components/LoadingSpinner.js
import React from 'react';

export default function LoadingSpinner() {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan"></div>
      </div>
    );
  }
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-carbon-black/90 rounded-lg shadow-2xl text-center">
          <h2 className="text-vivid-red text-xl mb-4">⚠️ Configuration Error</h2>
          <p className="text-light-gray mb-4">
            Something went wrong with the configuration tool. Please refresh the page.
          </p>
          <button
            className="bg-neon-cyan text-carbon-black px-6 py-2 rounded-md hover:bg-[#00a4c4] transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
import React, { Component } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Met à jour l'état pour afficher un fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Tu peux également loguer l'erreur ici
    console.error("Erreur capturée par Error Boundary", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interface de secours si une erreur est capturée
      return <div>Quelque chose s'est mal passé. Veuillez réessayer plus tard.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

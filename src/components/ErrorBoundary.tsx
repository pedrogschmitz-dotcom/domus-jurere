import React, { ErrorInfo } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro não tratado na interface", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <h1 className="font-display text-3xl text-[var(--gold)]">Algo saiu do previsto</h1>
            <p className="mt-4 text-sm text-[var(--cream-dk)]">
              Houve uma falha ao renderizar esta tela. Recarregue a pagina para tentar novamente.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-cta-primary mt-8"
            >
              Recarregar pagina
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
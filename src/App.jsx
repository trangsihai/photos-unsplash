import ErrorBoundary from "./ErrorBoundary";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ErrorBoundary>
      <div>
        <Dashboard />
      </div>
    </ErrorBoundary>
  );
}

export default App;

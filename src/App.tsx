import { ItemProvider, useItemContext } from './context/ItemContext';
import { ErrorBoundary } from './shared/ErrorBoundary';
import { Suspense, lazy } from 'react';
import { Loading } from './shared/Loading';
import './App.scss';

const RoutesPages = lazy(() => import('./routes'));
const Header = lazy(() => import('./components/Header'));
const App = () => {
  const { state } = useItemContext();

  return (
    <ItemProvider>
      <ErrorBoundary>
        <div className="app-container">
          {state.loading && <Loading />}
          <Suspense fallback={<Loading />}>
            <Header />
            <RoutesPages />
          </Suspense>
        </div>
      </ErrorBoundary>
    </ItemProvider>
  );
};

export default App;

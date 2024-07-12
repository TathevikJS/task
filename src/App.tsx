import { ItemProvider } from './context/ItemContext';
import { ErrorBoundary } from './shared/ErrorBoundary';
import { Suspense } from 'react';
import { Loading } from './shared/Loading';
import { Header } from './components/Header';
import { RoutesPages } from './routes';
import './App.scss';

const App: React.FC = () => {
 
  return (
    <ItemProvider >
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Header />
          <RoutesPages />
        </Suspense>
      </ErrorBoundary>
    </ItemProvider>
  );
};

export default App;

import React from 'react'
import DataFetchComponent from './assets/Components/DataFetchComponent/DataFetchComponent'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtoolsPanel } from 'react-query-devtools';


const queryClient= new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataFetchComponent />
    </QueryClientProvider>
  )
}

export default App
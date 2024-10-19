import './App.css'
import '@fontsource/inter';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RootLayout, Home } from './_root';
import SignUp from './auth/sign-up';
import SignIn from './auth/sign-in';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App

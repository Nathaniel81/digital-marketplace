import './App.css'
import '@fontsource/inter';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RootLayout, Home } from './_root';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

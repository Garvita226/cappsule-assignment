import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MedicineList from './components/MedicineList';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='medicines' element={<MedicineList />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

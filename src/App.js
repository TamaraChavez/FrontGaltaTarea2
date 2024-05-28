
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';
import Principal from './screens/Principal';
import crearCredencial from './screens/CrearCredenciales';




function AppWrapper() {
  const location = useLocation();

  return (
    <div>
      {/* Condición para no mostrar Navbar en la ruta de login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
          <Route path="/" element={localStorage.getItem('userToken') ? <Navigate replace to="/Principal" /> : <Navigate replace to="/login" />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Principal' element={<Principal/>} />  
          <Route path='/Usuarios' element={<Usuarios/>} />
          <Route path='/CrearCredenciales' element={<crearCredencial/>} />
      </Routes>
      {<Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

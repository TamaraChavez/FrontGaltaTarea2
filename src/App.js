
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/footer';
import AdmClientes from './screens/AdmClientes'; 
import AdmVehiculos from './screens/AdmVehiculos';
import AdmColores from './screens/AdmColores';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';
import FormColor from './screens/FormColor';
import Alquileres from './screens/Alquileres';
import AdmAlquileresActivos from './screens/AdmAlquileresActivos';
import AdmHistorialAlquileres from './screens/AdmHistorialAlquileres';
import AdmMarcas from './screens/AdmMarcas';
import FormMarca from './screens/FormMarca';
import AdmPaisResidencia from './screens/AdmPaisResidencia';
import FormPaisResidencia from './screens/FormPaisResidencia';
import AdmCombustibles from './screens/AdmCombustibles';
import FormCombustible from './screens/FormCombustible';
import Catalogos from './screens/Catalogos';
import AdmTipoVehiculo from './screens/AdmTipoVehiculo';
import AdmTransmision from './screens/AdmTransmision';
import FormTransmision from './screens/FormTransmision';
import AdmSeguro from './screens/AdmSeguro';
import FormSeguro from './screens/FormSeguro';
import AdmTipoCliente from './screens/AdmTipoCliente';
import FormTipoCliente from './screens/FormTipoCliente';
import AdmTipoTarjeta from './screens/AdmTipoTarjeta';
import FormTipoTarjeta from './screens/FormTipoTarjeta';
import AdmTarjetas from './screens/AdmTarjetas';
import FormTarjeta from './screens/FormTarjeta';

 import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import FormCliente from './screens/FormCliente';
import FormClienteModificar from './screens/FormClienteModificar';
import Principal from './screens/Principal';
import FormVehiculo from './screens/FormVehiculo';
import FormVehiculoModificar from './screens/FormVehiculoModificar';
import FormColorModificar from './screens/FormColorModificar';
import FormMarcaModificar from './screens/FormMarcaModificar';
import FormPaisModificar from './screens/FormPaisModificar';
import FormCombustibleModificar from './screens/FormCombustibleModificar';
import FormAlquiler from './screens/FormAlquiler';
import FormTipoVehiculo from './screens/FormTipoVehiculo';
import FormTipoVehiculoModificar from './screens/FormTipoVehiculoModificar';
import FormTransmisionModificar from './screens/FormTransmisionModificar';
import FormSeguroModificar from './screens/FormSeguroModificar';
import FormTipoClienteModificar from './screens/FormTipoClienteModificar';
import FormTipoTarjetaModificar from './screens/FormTipoTarjetaModificar';
import FormTarjetaModificar from './screens/FormTarjetaModificar';


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
          <Route path='/Catalogos' element={<Catalogos/>} />
          <Route path='/Alquileres' element={<Alquileres/>} />
          <Route path='/Alquileres/AdmAlquileresActivos' element={<AdmAlquileresActivos/>} />
          <Route path='/Alquileres/AdmHistorialAlquileres' element={<AdmHistorialAlquileres/>} />
          <Route path='/AdmClientes' element={<AdmClientes/>} />
          <Route path="/AdmClientes/FormCliente" element={<FormCliente/>} />
          <Route path="/AdmClientes/FormClienteModificar/:idCliente" element={<FormClienteModificar/>} />
          <Route path="/AdmClientes/AdmTarjetas/:idCliente" element={<AdmTarjetas/>} />
          <Route path='/AdmColores' element={<AdmColores/>} />
          <Route path='/AdmColores/FormColor' element={<FormColor/>} />
          <Route path='/AdmColores/FormColorModificar/:idColor' element={<FormColorModificar/>}/>
          <Route path='/AdmVehiculos' element={<AdmVehiculos/>} />
          <Route path="/AdmVehiculos/FormVehiculo" element={<FormVehiculo/>} />
          <Route path="/AdmVehiculos/FormVehiculoModificar/:id" element={<FormVehiculoModificar/>} />
          <Route path="/AdmVehiculos/FormAlquiler/:idVehiculo" element={<FormAlquiler/>} />
          <Route path="/AdmMarcas" element={<AdmMarcas/>} />
          <Route path="/AdmMarcas/FormMarca" element={<FormMarca/>} />
          <Route path="/AdmMarcas/FormMarcaModificar/:idMarca" element={<FormMarcaModificar/>} />
          <Route path="/AdmPaisResidencia" element={<AdmPaisResidencia/>} />
          <Route path="/AdmPaisResidencia/FormPaisResidencia" element={<FormPaisResidencia/>} />
          <Route path="/AdmPaisResidencia/FormPaisModificar/:idPais" element={<FormPaisModificar/>}/>
          <Route path="/AdmCombustibles" element={<AdmCombustibles/>} />
          <Route path="/AdmCombustibles/FormCombustible" element={<FormCombustible/>} />
          <Route path="/AdmCombustibles/FormCombustibleModificar/:idCombustible" element={<FormCombustibleModificar/>}/>
          <Route path="/AdmTipoVehiculo" element={<AdmTipoVehiculo/>} />
          <Route path="/AdmTipoVehiculo/FormTipoVehiculo" element={<FormTipoVehiculo/>} />
          <Route path="/AdmTipoVehiculo/FormTipoVehiculoModificar/:idTipo" element={<FormTipoVehiculoModificar/>}/>\
          <Route path="/AdmTransmision" element={<AdmTransmision/>} />
          <Route path="/AdmTransmision/FormTransmision" element={<FormTransmision/>} />
          <Route path="/AdmTransmision/FormTransmisionModificar/:idTransmision" element={<FormTransmisionModificar/>}/>
          <Route path="/AdmSeguro" element={<AdmSeguro/>} />
          <Route path="/AdmSeguro/FormSeguro" element={<FormSeguro/>} />
          <Route path="/AdmSeguro/FormSeguroModificar/:idSeguro" element={<FormSeguroModificar/>}/>
          <Route path="/AdmTipoCliente" element={<AdmTipoCliente/>} />
          <Route path="/AdmTipoCliente/FormTipoCliente" element={<FormTipoCliente/>} />
          <Route path="/AdmTipoCliente/FormTipoClienteModificar/:idTipoCliente" element={<FormTipoClienteModificar/>}/>
          <Route path="/AdmTipoTarjeta" element={<AdmTipoTarjeta/>} />
          <Route path="/AdmTipoTarjeta/FormTipoTarjeta" element={<FormTipoTarjeta/>} />
          <Route path="/AdmTipoTarjeta/FormTipoTarjetaModificar/:idTipoTarjeta" element={<FormTipoTarjetaModificar/>}/>
          <Route path="/AdmTarjetas" element={<AdmTarjetas/>} />
          <Route path="/AdmTarjetas/FormTarjeta/:idCliente" element={<FormTarjeta/>} />
          <Route path="/AdmTarjetas/FormTarjetaModificar/:idCliente/:NumeroTarjeta" element={<FormTarjetaModificar/>} />


          
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

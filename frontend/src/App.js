
import './App.css';
import Home from './Home';
import About from './About';
import Services from './Services';
import Navbar from './Navbar';
import {Routes,Route} from 'react-router-dom';
import Admin from './component/Admin';
import CreateCase from './component/CreateCase';
import Client from './component/Client';
import Attorney from './component/Attorney';
function App() {
  
  return (
    <div>
    <Navbar/> 
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='client' element={<Client></Client>}/>
      <Route path='/admin/register' element={<CreateCase/>} />
      <Route path='/attorney' element={<Attorney></Attorney>}/>
    </Routes>
    
    </div>
  );
}

export default App;

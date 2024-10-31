import './App.scss';
import Header from './components/Header/header';
import { Link, Outlet } from 'react-router-dom';




const App = () => {


  return (

    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container' >
          <a href='https://www.youtube.com/'>click me</a>
        </div>
        <div className='app-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

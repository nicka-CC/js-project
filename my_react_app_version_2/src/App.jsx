import logo from './logo.svg';
import './App.css';
import { PageLayout } from './compontents/Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { Home } from './compontents/Home/Home';

// import { useSelector } from 'react-redux'

function App() {

  const isAdmin = (element) => element //(user.role == 'admin' ? element : <PageError />)
  // const isAuth = (element) => (user.role == 'admin' ? element : <PageError />)
  return (

    <Routes>

      <Route path='/*' element={isAdmin(<PageLayout />)} >
        <Route index element={<Home />} />
        <Route path='user' element={<>user</>} />
        <Route path='*' />
      </Route>

      <Route path='/auth/'  >
        {/* <Route index element={<HomeCompnonent posts={data || []} />} /> */}
        <Route path='login' element={<LoginPage />} />
        <Route path='reg' element={<RegisterPage />} />
        {/* <Route path='resetpassword' element={<>user</>} /> */}
      </Route>

      <Route path='/error/' element={<PageLayout />} >
        <Route index element={<>У вас нет роли администратора</>} />
      </Route>

    </Routes>
  );
}

export default App;

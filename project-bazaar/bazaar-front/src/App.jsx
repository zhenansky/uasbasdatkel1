import Content from './component/Content';
import './App.css'
import React from 'react';
import Login from './component/login/Login';
import Register from './component/register/Register'
import Bazaar from './component/bazaar/Bazaar_home'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Additem from './component/bazaar/add_items';
import Edititem from './component/bazaar/edit_items';
import Homeadmin from './component/admin/Home_admin';
import Formdaftar from './component/bazaar/form_daftar';
import Cetakpdf from './component/bazaar/Cetakpdf';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Content/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/bazaar",
    element:<Bazaar/>
  },
  {
    path:"/addItem",
    element:<Additem/>
  },
  {
    path:"/edit/:id",
    element:<Edititem/>
  },
  {
    path:"/homeadmin",
    element:<Homeadmin/>
  },
  {
    path:"/form-daftar",
    element:<Formdaftar/>
  },
  {
    path:"/cetakpdf",
    element:<Cetakpdf/>
  }
  

])


function App() {
  return (
    <div className="page h-screen flex flex-col">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

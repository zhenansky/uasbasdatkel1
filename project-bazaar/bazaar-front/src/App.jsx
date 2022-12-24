import Content from './component/Content';
import './App.css'
import React from 'react';
import Login from './component/login/Login';
import Register from './component/register/Register'
import Bazaar from './component/bazaar/Bazaar_home'
import formDaftar from './component/bazaar/formDaftar'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Additem from './component/bazaar/add_items';
import Edititem from './component/bazaar/edit_items';

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
    path:"/bazaar-daftar",
    element:<formDaftar/>
  },
  {
    path:"/addItem",
    element:<Additem/>
  },
  {
    path:"/edit/:id",
    element:<Edititem/>
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

import React from 'react';
import './login.css';
import {Link} from "react-router-dom";
export default function login() {
  return (
  <div className="page-login flex flex-col h-screen w-screen ">
    <div className="page-form flex justify-center mt-44 lg:mt-32 lg:h-3/5">
      <div className="form flex flex-col h-fit w-3/5 p-8 bg-beige rounded-lg shadow-lg lg:w-2/5">
        <div className="icon-form-login mb-2 flex justify-center">
          <i className="fa-solid fa-right-to-bracket text-blue-600 text-6xl mb-5"></i>
        </div>
        <div className="pembungkus-form gap-7 h-20">
          <div className="form-username">
            <div className="icon-username">
              <i class="fa-solid fa-user text-blue-600"></i>
            </div>
            <div className="input-username">
              <label htmlFor=""></label>
              <input type="text" placeholder="Username" className='outline-none' />
            </div>
          </div>
          <div className="form-password flex">
            <div className="icon-password align-center mr-1">
              <i class="fa-solid fa-key text-blue-600"></i>
            </div>
            <div className="input-password w-full">
              <label htmlFor=""></label>
              <input type="password" name="" id="" placeholder="Password" className='outline-none' />
            </div>
          </div>
        </div>
        <Link to="/">
        <div className="form-button-login bg-blue-600 text-beige rounded-none">
          <a href="">Login</a>
        </div>
        </Link>
        <div className="form-forgot text-blue-600 mt-1">
          <a href="#">Forgot your password</a>
        </div>
        <div className='belum-akun text-blue-600 mt-1'>
          <Link to='/Register'>
          <p>Belum Punya Akun?</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

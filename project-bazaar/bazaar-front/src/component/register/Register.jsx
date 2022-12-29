import React from 'react';
import '../login/login.css';
import { Link } from 'react-router-dom';
export default function login() {
  return (
  <div className="page-register flex flex-col h-screen w-screen">
    <div className="page-form flex justify-center mt-32">
      <div className="form flex-col w-3/5 p-8 bg-beige rounded-lg shadow-lg">
        <div className="icon-form-login mb-2 flex justify-center">
          <i class="fa-regular fa-address-card text-blue-600 text-6xl mb-7"></i>
        </div>
        
        <div className="pembungkus-form gap-7">
          
          <div className="form-name flex">
            <div className="icon-name flex mt-1 mr-1">
              <i className="fa-solid fa-diamond text-blue-600"></i>
            </div>
            <div className="input-name flex w-full">
              <label htmlFor=""></label>
              <input className='w-full' type="text" placeholder='Masukkan nama anda' />
            </div>
          </div>

          <div className="form-username">
            <div className="icon-username">
              <i className="fa-solid fa-user text-blue-600"></i>
            </div>
            <div className="input-username">
              <label htmlFor=""></label>
              <input type="text" placeholder="Username" />
            </div>
          </div>

          <div className="form-password flex">
            <div className="icon-password align-center mr-1">
              <i className="fa-solid fa-key text-blue-600"> </i>
            </div>
            <div className="input-password w-full">
              <label htmlFor=""></label>
              <input type="password" name="" id="" placeholder="Password" />
            </div>  
          </div>

          <div className="form-confirm flex">
            <div className="icon-confirm flex mt-1 mr-1">
              <i className="fa-solid fa-check-double text-blue-600"></i>
            </div>
            <div className="input-confirm w-full mb-5">
              <label htmlFor=""></label>
              <input type="password" placeholder='Confirm password' />
            </div>
          </div>
        </div>
        <div className="form-button-register flex justify-center rounded-md border-5px mt-3 bg-blue-600 text-beige">
          <a href="">Register</a>
        </div>
        <div className="form-forgot text-blue-600 mt-1">
          <Link to='/Login'>
          <p>Sudah Punya Akun?</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
    

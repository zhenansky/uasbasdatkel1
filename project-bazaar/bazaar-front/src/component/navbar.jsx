import React from 'react';
import {Link} from "react-router-dom";
import {BsFillPersonFill} from 'react-icons/bs'


export default function Navbar() {
  return (
    <div className="navbar flex flex-col text-3xl w-full h-28 text-white bg-biru drop-shadow-xl">
      <div className="nav-atas flex flex-row justify-between">
        <div className='karta04 ml-2 mt-3'>
          <p>Karta 04</p>
        </div>
        <div className='text-4xl mt-2 mr-2'>
          <Link to='/login'>
          <BsFillPersonFill/>
          </Link>
        </div>
      </div>
      <div className="nav-bawah flex flex-row mt-2 mb-1 justify-evenly ">
        <Link to="/homeadmin">
        <div className='bazaar'>
          <p>Bazaar</p>
        </div>
        </Link>
        <div className='baskopat'>
          <Link to='/form-daftar'>
          <p>Baskopat</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
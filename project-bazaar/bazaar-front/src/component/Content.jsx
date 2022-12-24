import React from 'react';
import '../App.css'
import Navbar from './navbar';
import Ilshome from '../data/img/bro.svg';

export default function Content() {
  return (
    <>
    <Navbar />
      <div className='content-dashboard flex flex-row mx-20 my-36 lg:flex lg:flex-row lg:justify-center lg:items-center'>
        <img src={Ilshome} alt="Illustration" />
      </div>
      <div className='footer mt-8 fixed bottom-0'>
        <p>Karta 04,</p>
        <p>Rw 04 Antapani, Bandung, Jawa Barat. Indonesia</p>
      </div>
    </>

  );
}

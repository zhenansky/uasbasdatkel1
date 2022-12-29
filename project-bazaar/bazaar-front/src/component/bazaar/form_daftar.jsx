import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Form_daftar() {
  const [username, setUsername] = useState('');
  const [namaBazaar, setNamaBazaar] = useState('');
  const [namaPemilik, setNamaPemilik] = useState('');
  const navigate = useNavigate();

  const hostname = '192.168.1.30';
  // const hostname = "192.168.100.10";

  const saveBazaar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://${hostname}:5000/bazaars`, {
        username,
        namaBazaar,
        namaPemilik,
      });
      navigate('/homeadmin');
    } catch (error) {
      await axios.post(`http://localhost:5000/bazaars`, {
        username,
        namaBazaar,
        namaPemilik,
      });
      navigate("/homeadmin");
      console.log(error);
      }
    };
  

  return (
    <>
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className='mt-4 ml-3 text-3xl'>
          <Link to="/">
          <BiArrowBack/>
          </Link>
        </div>
        <div className="bazaar-04 mt-4 mr-3 lg:mt-3">
          <p>Bazaar 04</p>
        </div>
      </div>
      <div className="h-screen w-screen bg-gray-300 flex">
        <div className="card h-96 w-4/5 mx-12 mt-8 bg-beige rounded-3xl shadow-xl lg:mx-44">
          <div className='card-content flex flex-col '>
            <form action="" onSubmit={saveBazaar}>
              <div className='flex justify-center items-center text-2xl mt-4'>
                <p>Daftar Bazaar</p>
              </div>
              <div className='flex ml-3 mt-8 lg:ml-8'>
                <span className="p-float-label">
                  <InputText onChange={(e) => setUsername(e.target.value)} value={username} style={{width: '68vw'}} id="username"/>
                  <label htmlFor="username">Nama Pengguna</label>
                </span>
              </div>
              <div className='flex ml-3 mt-8 lg:ml-8'>
                <span className="p-float-label">
                  <InputText onChange={(e) => setNamaBazaar(e.target.value)} value={namaBazaar} style={{width: '68vw'}} id="nambaz" />
                  <label htmlFor="nambaz">Nama Bazaar</label>
                </span>
              </div>
              <div className='flex ml-3 mt-8 lg:ml-8'>
                <span className="p-float-label">
                  <InputText onChange={(e) => setNamaPemilik(e.target.value)} value={namaPemilik} style={{width: '68vw'}} id="nampek"  />
                  <label htmlFor="nampek">Nama Pemilik</label>
                </span>
              </div>
              <div className='button flex justify-center items-center mt-4'>
                <Button label="Daftar" className="p-button-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

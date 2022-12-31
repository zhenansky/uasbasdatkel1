import React from 'react';
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import { useAtom } from 'jotai';
import { bazaarById, itemsByIdBaazar } from '../../globalTv';

function Additem() {
  const [nama, setNama] = useState('');
  const [price, setPrice] = useState('');
  const [stok, setStok] = useState('');
  const navigate = useNavigate();
  // const hostname = '192.168.1.30';
  const hostname = "192.168.100.10";

  const [bazaarByIdState, setBazaarByIdState] = useAtom(bazaarById);
  const id_bazaar = bazaarByIdState._id;


  const saveItems = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://${hostname}:5000/items`, {
        id_bazaar,
        nama,
        price,
        stok,
      });
      navigate('/bazaar');
    } catch (error) {
      await axios.post(`http://localhost:5000/items`, {
        id_bazaar,
        nama,
        price,
        stok,
      });
      navigate("/bazaar");
      console.log(error);
      }
    };

  return (
    <>
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className='mt-4 ml-3 text-3xl'>
          <Link to="/bazaar">
          <BiArrowBack/>
          </Link>
        </div>
        <div className="bazaar-04 mt-4 mr-3">
          <p>Tambah Item</p>
        </div>
      </div>
      <div className='px-8'>
        <div className="mt-12 lg:pr-56">
          <form className="lg:w-full lg:mx-24" onSubmit={saveItems}>
            <div className="">
              <label className="text-xl font-bold">Nama Barang</label>
              <input onChange={(e) => setNama(e.target.value)} value={nama} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
            </div>
            <div className="">
              <label className="text-xl font-bold">Stok</label>
              <input onChange={(e) => setStok(e.target.value)} value={stok} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="number" />
            </div>
            <div className="flex flex-row gap-8">
              <div className="w-full">
                <label className="text-xl font-bold">Harga Jual</label>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="number" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button label="Add Items" type="submit" icon="pi pi-plus" ></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Additem;

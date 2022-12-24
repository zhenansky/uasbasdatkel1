import React from 'react';
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Additem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stok, setStok] = useState('');
  const navigate = useNavigate();

  const saveItems = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/items`, {
        name,
        price,
        stok,
      });
      navigate('/bazaar');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className="bazaar-04 ml-3 mt-3">
          <p>Bazaar 04</p>
        </div>
      </div>
      <div className='border-2 border-red-500 pl-80 pr-80'>
        <div className="mt-12 lg:pr-56">
          <form class="lg:w-full lg:mx-24" onSubmit={saveItems}>
            <div className="">
              <label className="text-xl font-bold">Nama Barang</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
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
              <Button label="Add Items" type="submit" icon="pi pi-plus"></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Additem;

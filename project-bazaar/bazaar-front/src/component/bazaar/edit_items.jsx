import React from 'react';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Edititem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stok, setStok] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getItemsById();
  }, []);

  const getItemsById = async () => {
    const response = await axios.get(`http://localhost:5000/items/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setStok(response.data.stok);
  };

  const updateItems = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/items/${id}`, {
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
      <div className="lg:pr-56">
        <form class="lg:w-full lg:mx-24" onSubmit={updateItems}>
          <div className="">
            <label className="text-xl font-bold">Nama Barang</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
          </div>
          <div className="">
            <label className="text-xl font-bold">Stok</label>
            <input onChange={(e) => setStok(e.target.value)} value={stok} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
          </div>
          <div className="flex flex-row gap-8">
            <div className="w-full">
              <label className="text-xl font-bold">Harga Jual</label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button label="Ubah Item" type="submit" icon="pi pi-plus"></Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Edititem;

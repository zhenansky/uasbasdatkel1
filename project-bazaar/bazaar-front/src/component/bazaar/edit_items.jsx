import React from 'react';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom';

function Edititem() {
  const [nama, setNama] = useState('');
  const [price, setPrice] = useState('');
  const [stok, setStok] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // const hostname = '192.168.1.30';
  const hostname = "192.168.100.10";

  useEffect(() => {
    getItemsById();
  }, []);

  const getItemsById = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items/${id}`);
      setNama(response.data.nama);
      setPrice(response.data.price);
      setStok(response.data.stok);
    } catch (error) {
      const response = await axios.get(`http://localhost:5000/items/${id}`);
      setNama(response.data.nama);
      setPrice(response.data.price);
      setStok(response.data.stok);
    }
  };

  const updateItems = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://${hostname}:5000/items/${id}`, {
        nama,
        price,
        stok,
      });
      navigate("/bazaar");
    } catch (error) {
      await axios.patch(`http://localhost:5000/items/${id}`, {
        nama,
        price,
        stok,
      });
      console.log(error);
      navigate("/bazaar");
    };
  }
  return (
    <>
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className='mt-4 ml-3 text-3xl'>
          <Link to="/bazaar">
          <BiArrowBack/>
          </Link>
        </div>
        <div className="bazaar-04 mt-4 mr-3">
          <p>Ubah Item</p>
        </div>
      </div>
      <div className='px-8'>
        <div className="mt-12 lg:pr-56">
          <form class="lg:w-full lg:mx-24" onSubmit={updateItems}>
            <div className="">
              <label className="text-xl font-bold">Nama Barang</label>
              <input onChange={(e) => setNama(e.target.value)} value={nama} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" />
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
              <Button label="Ubah Item" type="submit" icon="pi pi-file-edit"></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Edititem;

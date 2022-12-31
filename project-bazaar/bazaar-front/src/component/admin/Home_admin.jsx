import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import '../bazaar/Bazaar_home.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useAtom } from 'jotai';
import { bazaarById, itemsByIdBaazar } from '../../globalTv';

export default function Home_admin() {
  const [bazaars, setBazaars] = useState([]);
  const [bazaarByIdState, setBazaarByIdState] = useAtom(bazaarById); 
  const [itemsByIdBazaarState, setItemsByIdBazaarState] = useAtom(itemsByIdBaazar)

  useEffect(() => {
    getBazaars();
    getItems();
  }, [bazaars]);
 

  const getItems = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    }
  };


  // const hostname = '192.168.1.30';
  const hostname = '192.168.100.10';
  const getBazaars = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/bazaars`);
      setBazaars(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/bazaars`);
      setBazaars(response.data);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://${hostname}:5000/items/${id}`);
      getItems();
    } catch (error) {
      await axios.delete(`http://localhost:5000/items/${id}`);
    }
  };

  const deleteBazaar = async () => {
    try {
      await axios.delete(`http://${hostname}:5000/items/milik/${bazaarByIdState._id}`);
      getItems();
    } catch (error) {
      await axios.delete(`http://localhost:5000/items/milik/${bazaarByIdState._id}`);
    }
  };



  return (
    <>
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className="mt-4 ml-3 text-3xl">
          <Link to="/">
            <BiArrowBack />
          </Link>
        </div>
        <div className="bazaar-04 ml-3 mt-3">
          <p>Bazaar 04</p>
        </div>
        <div className="text-4xl my-3 mr-2">
          <Link to="/homeadmin">
            <BsFillPersonFill />
          </Link>
        </div>
      </div>
      <div className="page-admin h-screen w-screen flex flex-col">
        <div className="judul-page mt-4 ml-3 text-2xl">
          <p>List Bazaar</p>
        </div>
        <div className="tabel-admin flex flex-col w-screen mx-2 mt-4 lg:w-full lg:mx-0">
          <table>
            <thead>
              <tr>
                <th scope="col" className='w-8'>No</th>
                <th scope="col" className='w-1/5'>Nama Bazaar</th>
                <th scope="col">Pemilik</th>
                <th scope="col" colSpan='2' className='w-0'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bazaars.map((bazaarr, index) => (
                <tr key={bazaarr._id}>
                  <td>{index + 1}</td>
                  <td>{bazaarr.namaBazaar}</td>
                  <td>{bazaarr.namaPemilik}</td>
                  <td className=''>
                    <Link to="/bazaar">
                     <Button label="" icon="pi pi-cart-plus" className="fit w-28 h-8" onClick={() => {
                      setBazaarByIdState(bazaarr)
                     }}/>
                    </Link>
                  </td>
                  <td className=''>
                  <Button onClick={() => {deleteItem(); deleteBazaar();}} icon="pi pi-trash" className="p-button-danger fit w-28 h-8"></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-4 right-4 ">
          <Link to="/form-daftar">
            <Button
              icon="pi pi-plus"
              style={{
                width: '70px',
                height: '70px',
                backgroundColor: 'blue',
                borderRadius: '100%',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              }}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

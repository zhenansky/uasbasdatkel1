import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import '../bazaar/Bazaar_home.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useAtom } from 'jotai';
import { bazaarById } from '../../globalTv';

export default function Home_admin() {
  const [bazaars, setBazaars] = useState([]);
  const [bazaarByIdState, setBazaarByIdState] = useAtom(bazaarById); 
  useEffect(() => {
    getBazaars();
  }, [bazaars]);
 

  const hostname = '192.168.1.30';
  // const hostname = '192.168.100.10';
  const getBazaars = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/bazaars`);
      setBazaars(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/bazaars`);
      setBazaars(response.data);
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
        <div className="tabel-admin w-screen mt-2">
          <table>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Bazaar</th>
                <th scope="col">Pemilik</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bazaars.map((bazaarr, index) => (
                <tr key={bazaarr._id}>
                  <td>{index + 1}</td>
                  <td>{bazaarr.namaBazaar}</td>
                  <td>{bazaarr.namaPemilik}</td>
                  <td>
                    <Link to="/bazaar">
                     <Button label="Tangani" className="p-button-rounded" onClick={() => {
                      setBazaarByIdState(bazaarr)
                     }}/>
                    </Link>
                  </td>
                  <td>
                  {/* <Button
                        onClick={() => {
                          confirm2();
                        }}
                        icon="pi pi-trash"
                        className="p-button-danger fit w-28 h-8"
                  ></Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

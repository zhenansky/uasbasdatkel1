import React from 'react';
import './Bazaar_home.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'primeicons/primeicons.css';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { BsFillPersonFill } from 'react-icons/bs';
import convertRupiah from 'rupiah-format';
import { BiArrowBack } from 'react-icons/bi';
import { useAtom } from 'jotai';
import { bazaarById, itemsByIdBaazar } from '../../globalTv';

export default function Bazaar_home() {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');
  const [bazaarByIdState, setBazaarByIdState] = useAtom(bazaarById);
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
        <Link to="/cetakpdf">
        <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </Link>
      </div>
    );
  };

  const [Items, setItems] = useState([]);
  const [itemtotal, setItemtotal] = useState(0); 
  const [itemhasil, setItemhasil] = useState(0);
  const [itemsByIdBazaarState, setItemsByIdBazaarState] = useAtom(itemsByIdBaazar)

  useEffect(() => () => {
      getItems();
      let total = 0;
      let hasil = 0;
      itemsByIdBazaarState.forEach((i) => {
        total = total + i.price * i.stok
      });
      itemsByIdBazaarState.forEach((j => {
        hasil = total * 80 / 100
      }))
      setItemtotal(total);
      setItemhasil(hasil);
    },[itemsByIdBazaarState])  

    
    
  const hostname = '192.168.1.30';
  // const hostname = '192.168.100.10';
  const getItems = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    }
  };

  // console.log(itemsByIdBazaarState);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://${hostname}:5000/items/${id}`);
      getItems();
    } catch (error) {
      await axios.delete(`http://localhost:5000/items/${id}`);
    }
  };

  const toast = useRef(null);

  const accept = (itemmid) => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted',
      life: 3000,
    });
    deleteItem(itemmid);
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    });
  };

  const confirm2 = (itemmid) => {
    confirmDialog({
      message: 'Apa anda ingin menghapus item ini?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => accept(itemmid),
      reject,
    });
  };




  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
        <div className="mt-4 ml-3 text-3xl">
          <Link to="/homeadmin">
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
      <div className="page-bazaar flex flex-col h-screen w-screen bg-white">
        <div className='info flex w-screen justify-between'>
          <div className="mt-2 ml-3 text-lg">
            <p>Bazaar: {bazaarByIdState.namaBazaar}</p>
          </div>
          <div className="mt-2 mr-3 text-lg">
            <p>Pemilik: {bazaarByIdState.namaPemilik}</p>
          </div>
        </div>
        <div className="page-konten-bazaar flex">
          <div className="konten-bazaar flex flex-col w-screen mx-2 mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Barang</th>
                  <th className="w-3/5" scope="col">
                    Harga
                  </th>
                  <th scope="col">Stok</th>
                  <th scope="col" colSpan="2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsByIdBazaarState.map((itemm, index) => (
                  <tr key={itemm._id}>
                    <td>{index + 1}</td>
                    <td>{itemm.nama}</td>
                    <td className="harga">{convertRupiah.convert(itemm.price)}</td>
                    <td>{itemm.stok}</td>
                    <td className="">
                      <Link to={`/edit/${itemm._id}`}>
                        <Button label="" icon="pi pi-file-edit" className="w-28 h-8" />
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          confirm2(itemm._id);
                        }}
                        icon="pi pi-trash"
                        className="p-button-danger fit w-28 h-8"
                      ></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="tombol-submit flex fixed bottom-4 left-4">
          <Button
            style={{
              width: '70px',
              height: '70px',
              backgroundColor: 'green',
              borderRadius: '100%',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
            className="w-fit h-8"
            icon="pi pi-check-square"
            onClick={() => onClick('displayResponsive')}
          />
          <Dialog header="Hasil Penjualan" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{}} footer={renderFooter('displayResponsive')}>
            <div className="lg:pr-56">
              <form class="lg:w-full lg:mx-24">
                <div className="">
                  <label className="text-xl font-bold">Hasil :</label>
                  <input value={convertRupiah.convert(itemtotal)} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" readOnly />
                </div>
                <div className="">
                  <label className="text-xl font-bold">Hasil (Dipotong Fee Admin 20%)</label>
                  <input value={convertRupiah.convert(itemhasil)} className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" readOnly placeholder="80000" />
                </div>
              </form>
            </div>
          </Dialog>
        </div>
        <div className="fixed bottom-4 right-4 ">
          <Link to="/addItem">
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

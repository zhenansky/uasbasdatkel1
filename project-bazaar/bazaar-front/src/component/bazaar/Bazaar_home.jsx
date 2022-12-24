import React from 'react';
import './Bazaar_home.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'primeicons/primeicons.css';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {BsFillPersonFill} from 'react-icons/bs'
import convertRupiah from 'rupiah-format';


export default function Bazaar_home() {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');
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
        <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
      </div>
    );
  };

  const [Items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    setItems(response.data);
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      getItems();
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useRef(null);

  const accept = (itemmid) => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    deleteItem(itemmid);
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm2 = (itemmid) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(itemmid),
      reject,
    });
  };

  


  return (
    <>
    <Toast ref={toast} />
    <ConfirmDialog />
    <div className='flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between'>
      <div className='bazaar-04 ml-3 mt-3'>
        <p>Bazaar 04</p>
      </div>
      <div className='text-4xl my-3 mr-2'>
        <BsFillPersonFill/>
      </div>
    </div>
    <div className="page-bazaar flex flex-col h-screen w-screen bg-white">
      <div className="page-tambah flex flex-col">
        <div className="button-tambah flex">
          <div className="flex flex-col mt-32 mx-8 mb-3">
            <Link to="/AddItem">
            <Button label="Items" icon="pi pi-plus" className="w-28 h-8 " onClick={() => onClick('displayMaximizable')} />
            </Link>
          </div>
        </div>
      </div>
      <div className="page-konten-bazaar flex">
        <div className="konten-bazaar flex flex-col w-screen mx-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Harga</th>
                <th scope="col">Stok</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Items.map((itemm, index) => (
                <tr key={itemm._id}>
                  <td>{index + 1}</td>
                  <td>{itemm.name}</td>
                  <td>{convertRupiah.convert(itemm.price)}</td>
                  <td>{itemm.stok}</td>
                  <td className="flex flex-row justify-center gap-3">
                    <Link to={`/edit/${itemm._id}`}>
                      <Button label="" icon="pi pi-file-edit" className="w-28 h-8"/>
                    </Link>
                    <Button onClick={ () => {confirm2(itemm._id)}} icon="pi pi-trash" className='p-button-danger fit w-28 h-8'></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="tombol-submit flex mt-32 justify-end mr-8">
        <Button className="w-fit h-8" label="Submit" icon="pi pi-external-link" onClick={() => onClick('displayResponsive')} />
        <Dialog header="Hasil Penjualan" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter('displayResponsive')}>
          <div className="lg:pr-56">
            <form class="lg:w-full lg:mx-24">
              <div className="">
                <label className="text-xl font-bold">Hasil :</label>
                <input className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" readOnly placeholder="100000" />
              </div>
              <div className="">
                <label className="text-xl font-bold">Hasil (Dipotong Fee Admin 20%)</label>
                <input className="w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray" type="text" readOnly placeholder="80000" />
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  </>
  );
}

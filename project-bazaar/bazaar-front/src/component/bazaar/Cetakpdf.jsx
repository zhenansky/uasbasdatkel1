import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useState, useEffect } from 'react';
import axios from 'axios';
import convertRupiah from 'rupiah-format';
import { Button } from 'primereact/button';
import { bazaarById, itemhasil, itemsByIdBaazar, itemtotal } from '../../globalTv';
import { useAtom } from 'jotai';

export default function Cetakpdf() {
  const createPDF = async () => {
    const pdf = new jsPDF('portrait', 'pt', 'tabloid');
    const data = await html2canvas(document.querySelector('#pdf'));
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`cetak_bazaar.pdf`);
  };

  const [bazaarByIdState, setBazaarByIdState] = useAtom(bazaarById);
  const [itemtotalState, setItemtotalState] = useAtom(itemtotal); 
  const [itemhasilState, setItemhasilState] = useAtom(itemhasil);
  const [itemsByIdBazaarState, setItemsByIdBazaarState] = useAtom(itemsByIdBaazar)
  useEffect(() => {
    getItems();
  }, [itemsByIdBazaarState]);


  // const hostname = '192.168.1.30';
  const hostname = '192.168.100.10';
  const getItems = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/items/milik/${bazaarByIdState._id}`);
      setItemsByIdBazaarState(response.data);
    }
  };

  return (
    <>
      <div className="shipping h-screen bg-gray-300">
        <h1 className="flex justify-center items-center text-xl mt-3">Cetak Hasil Bazaar</h1>
        <div id="pdf" className='lg:flex lg:justify-center lg:items-center'>
          <div className="carad w-4/5 mx-12 mt-8 bg-beige rounded-3xl shadow-xl h-96 lg:w-80 lg:shadow-none lg:rounded-none">
            <div className='mx-4 lg:mt-4'>
              <label className="text-xl font-bold">Nama Stand :</label>
              <div className=' w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray'>
                <p>{bazaarByIdState.namaBazaar}</p> 
              </div>
            </div>
            <div className='mx-4'>
              <label className="text-xl font-bold">Pemilik Stand :</label>
              <div className=' mt- 2w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray'>
                <p>{bazaarByIdState.namaPemilik}</p> 
              </div>
            </div>
            <div className="mx-4">
              <label className="text-xl font-bold">Total :</label>
              <div className=' mt-2 w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray'>
                <p>{convertRupiah.convert(itemtotalState)}</p> 
              </div>
            </div>
            <div className="mx-4">
              <label className="text-xl font-bold">Hasil (Dipotong Fee Admin 20%):</label>
              <div className=' mt-2 w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray'>
                <p>{convertRupiah.convert(itemhasilState)}</p> 
              </div>
            </div>
          </div>
        </div>
        <div className="flex row justify-center items-center mt-8">
          <button onClick={createPDF} type="button" className="px-8 text-white bg-green-600 rounded-md">
            Download
          </button>
        </div>
      </div>
    </>
  );
}

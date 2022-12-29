import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useState, useEffect } from 'react';
import axios from 'axios';
import convertRupiah from 'rupiah-format';
import { Button } from 'primereact/button';

export default function Cetakpdf() {
  const createPDF = async () => {
    const pdf = new jsPDF('portrait', 'pt', 'tabloid');
    const data = await html2canvas(document.querySelector('#pdf'));
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cetak_bazaar.pdf');
  };

  const [Items, setItems] = useState([]);
  const [itemtotal, setItemtotal] = useState(0);
  const [itemhasil, setItemhasil] = useState(0);
  // useState(0);
  useEffect(() => {
    // Items.forEach(e => setItemtotal(sebelumnya => sebelumnya + e.price * e.stok))
    getItems();
    let total = 0;
    let hasil = 0;
    Items.forEach((i) => {
      total = total + i.price * i.stok;
    });
    Items.forEach((j) => {
      hasil = (total * 80) / 100;
    });
    setItemtotal(total);
    setItemhasil(hasil);
  }, [Items]);


  const hostname = '192.168.1.30';
  // const hostname = '192.168.100.10';
  const getItems = async () => {
    try {
      const response = await axios.get(`http://${hostname}:5000/items`);
      setItems(response.data);
    } catch (err) {
      const response = await axios.get(`http://localhost:5000/items`);
      setItems(response.data);
    }
  };

  return (
    <>
      <div className="shipping ">
        <h1 className="flex justify-center items-center text-xl mt-3">Cetak Hasil Bazaar</h1>
        <div id="pdf">
          <div className="h-36">
            <div className="flex flex-col jusftify-center items-center">
              <label className="text-xl font-bold">Hasil :</label>
              <p>{convertRupiah.convert(itemtotal)}</p>
            </div>
            <div className="flex flex-col jusftify-center items-center">
              <label className="text-xl font-bold">Hasil (Dipotong Fee Admin 20%):</label>
              <p>{convertRupiah.convert(itemhasil)}</p>
            </div>
          </div>
        </div>
        <div className="flex row justify-center items-center mt-8">
          <button onClick={createPDF} type="button">
            Download
          </button>
        </div>
      </div>
    </>
  );
}

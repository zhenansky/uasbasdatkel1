import React from 'react';
import {BsFillPersonFill} from 'react-icons/bs'


export default function formDaftar() {
  return (
    <>
      <div>
        <div className="flex flex-row h-16 w-screen text-3xl text-white bg-biru drop-shadow-xl justify-between">
          <div className="bazaar-04 ml-3 mt-3">
            <p>Bazaar 04</p>
          </div>
          <div className="text-4xl my-3 mr-2">
            <BsFillPersonFill />
          </div>
        </div>
      </div>
    </>
  );
}

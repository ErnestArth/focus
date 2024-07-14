'use client';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';


 type CardType = 'admin' | 'driver';


function Page() {
  const [changeBorder, setChangeBorder] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleBorderChange = (card: CardType) => {
    setChangeBorder(!changeBorder);
    setSelectedCard(card);
  };

 

  return (
    <section className="flex flex-col justify-center items-center h-screen max-w-md mx-auto">
      <h1 className="font-bold text-white text-3xl mb-4">FOCUS</h1>
       <div className='max-w-md'>
       </div>
      <h1 className="my-8 font-semibold text-white sm:text-xl">Which user type do you prefer ?</h1>
      <div className="flex gap-4 my-3 w-[80%]">
        <div
          className={`flex flex-col border ${
            selectedCard === 'driver' ? 'border-purple-1' : 'border-black/20'
          } px-4 py-2 rounded cursor-pointer hover:border-purple-1/60 shadow-sm w-[50%]`}
          onClick={() => handleBorderChange('driver')}
        >
          <FaUser className={`${selectedCard === 'driver' ? 'text-purple-1' : 'text-white'} mb-4`} />
          <h1 className="font-semibold text-white">Driver</h1>
          <p className="text-[14px] text-white">Drive safe and monitor </p>
        </div>
        <div
          className={`flex flex-col text-white border ${
            selectedCard === 'admin' ? 'border-purple-1' : 'border-black/20'
          } px-4 py-2 rounded cursor-pointer hover:border-purple-1/60 shadow-sm w-[50%]`}
          onClick={() => handleBorderChange('admin')}
        >
          <FaUser className={`${selectedCard === 'admin' ? 'text-purple-1' : 'text-white'} mb-4`} />
          <h1 className="font-semibold">Admin</h1>
          <p className="text-[14px]">Manage your transportation  </p>
        </div>
      </div>
      
      {selectedCard && (
         <Link href={`/profile/${selectedCard}`}
         
             className='bg-purple-1 py-2 rounded text-center w-[80%] text-white mt-5 hover:bg-dark-4 transition-all'>
            Continue
        </Link>
      )}
      
    </section>
  );
};

export default Page;
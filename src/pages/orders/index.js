import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const fetchData = async ()=> {
    await fetch("api/myOrdersData", {
    method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({email: localStorage.getItem("userEmail")}),
}).then(async (res) =>{
  let response = await res.json();
  setOrderData(response?.order_data?.order_data);
});
};

  useEffect(()=>{
    fetchData()
  }, []);

  return (
    <>
    {
      orderData.length > 0 ?
    <div className='lg:w-[80%] my-4 mx-auto'>
    {
      orderData?.map((orders) =>{
        return <>
          {
            orders.map((data)=>{
              return <>
              {data.order_date 
              ? 
              <div className='font-bold text-xl mb-2'>{" "}{data.order_date} <hr />{" "}</div>: 
              <div className='my-4 max-w-96 border p-4 border-gradient border-black dark:border-white rounded-lg'>
                <div className='relative w-full h-72 rounded-lg'>
                <Image src={data.img} layout='fill' objectFit='cover' alt='card-image' className='rounded-lg'></Image>
            </div>
                <div className='font-bold text-xl'>{data.name}</div>
                <div className='flex justify-between items-center'>
                  <div>{data.qty}</div>
                  <div>{data.size}</div>
                  <div className='font-semibold'>{data.price}/-</div>
                </div>
                </div>
              }
              </>
            })
          }
        </>
      })
    }
    </div> : (
    <div className='flex w-screen flex-col items-center justify-center h-screen'>
      <h1>No Previous Orders 😅</h1>
      <Link href="/" className='text-violet-500 text-xl hover:font-bold mt-8'>
      Go back to home
      </Link>
    </div>
    )
    }
  </>

  )
}

export default Orders
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CartContext } from '@/utils/ContextReducer';
import Link from 'next/link';

const Card = (props) => {
    const data = props.foodData;
    const {state, dispatch} = useContext(CartContext);
    const prizeOptions = Object.keys(data.price);
    const [size, setSize] = useState(prizeOptions[0]);
    const [qty, setQty] = useState(1);

    const handleQty = (e) =>{
        setQty(e.target.value)
    }

    const handleSize = (e) =>{
        setSize(e.target.value)
    }

    let finalPrize = qty * parseInt(data.price[size]);

    const handleAddToCart = async () =>{

        const updateItem = await state.find((item)=> item.tempId === data["_id"] + size);

        if(!updateItem){

            dispatch({
                type: "ADD",
                id: data["_id"],
                tempId: data["_id"]+size,
                name: data.name,
                price: finalPrize,
                qty: qty,
                priceOption: size,
                img: data.img
            });
        }

        if(updateItem){
            dispatch({
                type: "UPDATE",
                tempId: data["_id"]+size,
                price: finalPrize,
                qty: qty,
            });
        }
    }

  return (
    <div className='box'>
        <div className='w-80 rounded-lg bg-white dark:bg-black border-gradient overflow-hidden'>
            <Link href={{pathname: "/Item/[item]"}} as={`Item/${data["_id"]}`}>
            <div className='relative w-full h-80'>
                <Image src={data.img} layout='fill' objectFit='cover' alt='card-image'></Image>
            </div>
            <div className='p-4'>
                <div className='font-bold mb-2 text-xl uppercase'>
                    {data.name}
                </div>
                <p className='short_description text-gray-700 dark:text-gray-400 text-base'>
                    {data.description}
                </p>
            </div>
            </Link>
            <div className='flex px-4 justify-between'>
                <select className='h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded' onChange={handleQty}>
                    {Array.from(Array(6),(e,i)=>{
                        return <option key={i+1} value={i+1}>{i+1}</option>
                    })}
                </select>
                <select className='h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded' onChange={handleSize}>
                {
                    prizeOptions.map(options =>{
                        return(
                            <option className='uppercase' value={options} key={options}>
                                {options}
                            </option>
                        )
                    })
                }
                </select>
            </div>
            <div className='flex p-4 justify-between'>
                <button className='border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100'
                onClick={handleAddToCart}>Add to Cart</button>

                <p className='p-2 text-xl'>₹{finalPrize}/-</p>
            </div>
        </div>
    </div>
  )
}

export default Card
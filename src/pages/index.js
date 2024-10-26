import Card from "@/components/layouts/home/Card";
import CarouselComponent from "@/components/layouts/home/Carousel";
import localFont from "next/font/local";
import {  useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({data}) {
  let categories = new Set()
  const foodData = []
  const [typeFilter, setTypeFilter] = useState(false);

  const handleData = ()=>{
    data?.map((data)=>{
      return foodData.push(data), categories.add(data.category);
    });
  };

    handleData();
    const  categoryArray = [...categories]
    
  return (
    <>
    <Head>
      <title>PizzaHub</title>
    </Head>
      <CarouselComponent />
      <div className="container lg:w-[80%] w-[80%] md:w-[90%] mx-auto">
        <div className="my-6 space-x-5">
        <button onClick = {()=>setTypeFilter(false)}
           className = {`borber-black rounded-full dark:border-white border-2 py-1 px-3 ${!typeFilter && "bg-slate-300 dark:bg-slate-600"}`}>
            All
            </button>
        <button 
        onClick = {()=> setTypeFilter("Veg")}
        className = {`borber-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"}`}>
        <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
        <button onClick = {()=> setTypeFilter("Non-Veg")}
           className = {`borber-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter==="Non-Veg" && "bg-slate-300 dark:bg-slate-600"}`}>
        <span
              className={
                "lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"
              }
            >
              ●
            </span>
            Non Veg
          </button>
          </div>

        {categoryArray.map((category)=>{
            return <>
            <div key={category} className="text-4xl mt-10 mb-3 uppercase font-bold">
              {category}
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">

              <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                {foodData
                ?.filter((foodData) => category === foodData.category)
                ?.filter((foodData) => typeFilter?typeFilter===foodData.foodType: foodData)
                ?.map((data)=>{
                  return <Card key={data.name} foodData={data}/>
                })}
              </div>

            </div>
            </>
          })}
        </div>
    </>
  );
}


export async function getStaticProps(){
  let data;
  try{
    const pizzaData = await fetch(baseUrl + "api/foodData", {method: "GET"})
    .then((response)=>response.json()).catch((error)=>error.message);

    data = await JSON.parse(JSON.stringify(pizzaData))  // step required during deployment in static props.

  }
  catch(error){
    console.log(error.message);
  }

  return {
    props: {
      data: data.data || null,
    }

    //revalidation
  }
}

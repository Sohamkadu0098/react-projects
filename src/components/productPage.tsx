import axios from 'axios';
import loading from 'C:\\PI\\study\\practice-ecom\\src\\assets\\200.gif';

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


interface Product{
    id: number,
    title:string,
    description:string,
    price:number,
    rating:number,
    images:string[];
}

const ProductPage = () => {
        const {id} = useParams<{id:string}>();
        const navigate = useNavigate();
        const [product,setProduct] = useState<Product | null>(null);
    
    useEffect(() =>{
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then((Response) =>{
                setProduct(Response.data);
            }
    ).catch((error) => {
        console.error(`error fetching product data${error}`);
    });}
    },[id]);


    if(!product){
        return<div className='flex justify-self-center'>
            <img src={loading}/>
        </div>
        
    }

  return (
    <div className='p-5 w-[60%]'>
      <button onClick={() => navigate(-1)}
       className=' absolute mb-5 px-4 bg-black text-white border-amber-50  rounded' 
        >Back</button>
        <img src={product.images[0]} alt={product.title} className='w-[50%] h-auto mb-5' 
        />
        <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
        <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
        <div className="flex">

            <p >Price: ₹{product.price}</p>
            <p className="ml-10">Rating:{product.rating}</p>
        </div>
    </div>

  )
};

export default ProductPage

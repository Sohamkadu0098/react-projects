import { Link } from "react-router-dom";
import React from 'react'
import MainContent from "./MainContent";

interface BookCardProps{
    id:string;
    title:string;
    image:string;
    price:number;
}

const BookCard: React.FC<BookCardProps> = ({id,title,price,image}) => {
  return (
    <div className="border p-4 rounded">
        <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
        </Link>

        <h2 className="font-bold">{title}</h2>
        <p>₹{price.toFixed(2)}</p>



    </div>
  )
}

export default BookCard

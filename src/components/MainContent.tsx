import { Tally3 } from 'lucide-react';
import { useState, useEffect } from 'react'
import { useFilter } from './FilterContext';
import axios from 'axios';
import BookCard from './BookCard.tsx';



const MainContent = () => {
  const {

      searchQuery, 
      selectedCategory, 
      minPrice, 
      maxPrice,
      keyword, } = useFilter(); 

    const [products,setProducts] = useState<any[]>([]);  
    const [filter,setFilter] = useState('all');
    const [currentPage,setCurrentPage] = useState(1);
    const [dropdownOpen,setDropDownOpen] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
     let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage -1) * itemsPerPage}`

     if(keyword){
      url = `https://dummyjson.com/products/search?q=${keyword}`
     }

     axios.get(url).then(Response =>{
      setProducts(Response.data.products);
      

     })
     .catch((error)=>{
      console.error("error fetching data",error);
     });
    }, [currentPage,keyword]);

    const getFilteredProducts =() =>{
      let filteredProducts= products
    if(selectedCategory){
      filteredProducts.filter((product) => product.category === selectedCategory);
     
       
    }

    if(minPrice  !== undefined ){
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
    }

    if(maxPrice  !== undefined ){
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
    }
    if(searchQuery){
      filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    switch(filter){
      case"expensive":
       return filteredProducts.sort((a,b) => b.price-a.price)
      case"cheap":
       return filteredProducts.sort((a,b) => a.price-b.price)
      case"popular":
       return filteredProducts.sort((a,b) => b.rating-a.rating)
      default:
        return filteredProducts;


    }
    };


    const filteredProducts = getFilteredProducts() 


    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts/itemsPerPage)
    const handlePageChange = (page:number) =>{
      if(page > 0 && page <= totalPages){
        setCurrentPage(page);
      }

    }


    const getPaginationButtons = () => {
      const buttons: number[] = []
      let startpage = Math.max(1,currentPage - 2)
      let endPage = Math.min(totalPages,currentPage + 2)

      if(currentPage -2 < 1){
        endPage = Math.min(totalPages,endPage + (2 - currentPage - 1));
      }

      if(currentPage +2 > totalPages){
        startpage = Math.min(totalPages,startpage - (2- totalPages - currentPage));  
      } 

      for(let page = startpage; page <= endPage; page++){
        buttons.push(page);
      }

      return buttons; 

    }




    return (
    <section className="w-full min-w-0 p-5 sm:max-w-40rem lg:max-w-55rem xl:max-w-55rem">
        <div className='mb-5'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <div className='relative mb-5 mt-5'>
                <button className='border px-4 py-2 rounded-full items-center flex' onClick={() => setDropDownOpen(!dropdownOpen)}>
                    <Tally3 className='mr-2'/>
                   

                    {filter === "all" ? 'Filter': filter.charAt(0).toLowerCase() + filter.slice(1)}
                </button>

                {dropdownOpen && (
                  <div className="absolute bg-white  border-gray-300 rounded mt-2 w-full sm:w-40 ">
                    <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200" >
                      low to high

                    </button>
                    <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200" >
                      high to low

                    </button>
                    <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200" >
                      popular

                    </button>



                  </div>
                )}
            </div>
            </div>


            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filteredProducts.map((product) =>(
                <BookCard  key={product.id} id={product.id} title={product.title}  image={product.thumbnail} price={product.price} />
              ))}

              </div>  
              <div className="flex flex-col sm:flex-row jsutify-bteween items-center mt-5">
                <button onClick={()=>handlePageChange(currentPage - 1)}  
                disabled = {currentPage === 1}
                className="border px-4 py-2 mx-2 rounded-full">Previous</button>
                <div className="flex flex-wrap justify-center">
                 {getPaginationButtons().map((page) =>(
                  <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ?  "bg-black text-white":""}`}>{page}</button>
                 ))}
                </div>


                <button   
                onClick={() =>{
                  handlePageChange(currentPage + 1)

                }}
                disabled={currentPage === totalPages}
                className="border px-4 py-2 mx-2 rounded-full">Next</button>
              </div>



        </div>
        
        
      
       
    </section>
  )
}

export default MainContent

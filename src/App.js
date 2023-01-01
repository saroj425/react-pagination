
import { useEffect, useState } from 'react';
import './App.css';

function App() {
   const [products,setProducts] = useState();
   const [page,setPage] = useState(1);
   const[totalpages,setTotalpage] = useState(0);

  const fetchProduct = async()=>{
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data = await res.json();
    console.log(data);
    if(data && data.products){      
      setProducts(data.products);
      setTotalpage(data.total/10);
    }
  }
  const selectPageHandler = (selectedPage)=>{
    if(selectedPage >= 1 && selectedPage <= totalpages && selectedPage !== page){
      setPage(selectedPage);
    }
    
  }

  console.log(products);

  useEffect(()=>{
    fetchProduct();
  },[page]);
  
  return (
    <>
      {
        products?.length >0 && (
          <div className='products'>
            {
              products.map((prod)=>{
                return (
                  <span className='products_single' key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title}/>
                    <span>{prod.title}</span>
                  </span>
                )
              })
            }
        </div>
        )}
        {
          products?.length >0 && <div className='pagination'>
            <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>&larr;</span>
            {
              [...Array(totalpages)].map((_,index)=>{
                return <span key={index} onClick={()=>selectPageHandler(index + 1)} className={page === index + 1 ? "pagination_selected":""}>{index + 1}</span>
              })
            }
            <span onClick={()=>selectPageHandler(page + 1)} className={page < totalpages ? "" : "pagination__disable"}>&rarr;</span>
          </div>
        }
    </>
  );
}

export default App;

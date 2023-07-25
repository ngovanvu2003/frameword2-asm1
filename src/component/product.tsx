import React from 'react'
import {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'

import axios from 'axios'

const product = () => {
    const dispatch = useDispatch()
    const { products }  = useSelector((state :any) => state.product)
    useEffect(() => {
      const getProducts = async () => {
          try {
              // call api
              const { data } = await axios.get(`http://localhost:3000/product`);
              // rerender
              dispatch({ type: "product/getProducts", payload: data });
          } catch (error: any) {
          } finally {
          }
      };
      getProducts();
  }, []);

  const addProduct = async (product: any) => {
        const {data} = await await axios.post(`http://localhost:3000/product`,product);
        dispatch({ type: "product/addProduct", payload: data });
  };

  const removeProduct = async (product: any) => {
        await axios.delete(`http://localhost:3000/product/${product.id}`);
        dispatch({ type: "product/deleteProduct", payload: product.id });
      console.log(product.id);
  };

  const update = async (product: any) => {
    const {data} = await axios.put(`http://localhost:3000/product/${product.id}`,product)
    dispatch({type:"product/updateProduct" , payload : data})
  }

  return (
    <>
            {products?.map((item: any) => {
                return <div key={item.id}>{item.name}</div>;
            })}
   <div>
            <button onClick={() => addProduct({ name: "Product 4" })}>them</button>
            <button onClick={() => removeProduct({ id: 4 })}>
                Delete
            </button>
            <button onClick={() => update({id:4 , name:"update"})} >sua</button>
   </div>
    </>
  )
}

export default product
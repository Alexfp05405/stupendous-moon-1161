import React, { useCallback, useEffect, useState } from "react";
import "./Products.css";
import { getProducts, getTodayDeals } from "../../redux/App/AppAction";
import { useDispatch, useSelector } from "react-redux";

const TodayDeals = ({ title }) => {

  const [cart,setCart]=useState([]);
  const {Appreducer, Authreducer}=useSelector((store)=>store);
  const {products}=Appreducer
  const dispatch=useDispatch()

  const options = {
    method: 'GET',
    url: 'https://amazon24.p.rapidapi.com/api/product',
    params: {categoryID: 'aps', keyword: 'todays deal', country: 'IN', page: '2'},
    headers: {
      'X-RapidAPI-Key': '76963a5aeemshdd00dc1b23cca2ep1ae61djsn2c41dd257435',
      'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
    }
  };

  const HandleAddToCart=(el)=>{
    const {cart}=Authreducer
    cart.push(el)
    dispatch()
  }

 
  useEffect(() => {
    dispatch(getTodayDeals(options))
  }, []);

  return (
    <div>
      <h1>
        {title}
      </h1>
      <div className="product">
        {products.length > 0 &&
          products.map((ele, index) =>
            <div key={index} className="product1">
              <div id="imgdiv"><img src={ele.product_main_image_url} alt={ele.product_title} /></div>
             
              <p>
                {ele.product_title}
              </p>
              <p>
                {ele.app_sale_price_currency} {ele.app_sale_price}
              </p>
              {/* <button className="rating" disabled>
                {ele.evaluate_rate}
              </button> */}
              <button onClick={()=> HandleAddToCart(ele)} className="cart">Add To Cart</button>
            </div>
          )}
      </div>
    </div>
  );
};

export default TodayDeals;

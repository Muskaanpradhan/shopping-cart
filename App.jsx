import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("https://www.course-api.com/react-useReducer-cart-project")
      .then((response) => response.json())
      .then(result => {
        const initialProducts = result.map(product => ({
          ...product,
          quantity: 1 // Ensure each product has a quantity property
        }));
        setProducts(initialProducts);
        setCart(initialProducts); 
      });
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  function clear() {
    setCart([]);
  }

  function removeProduct(id) {
    const newItems = cart.filter((product) => product.id !== id);
    setCart(newItems);
  }

  const changeQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct(id); 
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const truncate = (title) => {
    if (title.length > 5) {
      title = title.slice(0, 5) + "...";
    }
    return title;
  };

  return (
    <>
      <header>
        <div className="header">
          <h2>
            UseReducer
            <span>
              <FontAwesomeIcon icon={faCartShopping} className="Icon" />
            </span>
          </h2>
          <span className="cart-total">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
      </header>
      <div className="mainDiv">
        <h1>Your Bag</h1>
        <main>
          {cart.map((product, index) => (
            <div className="wrapper" key={index}>
              <img src={product.img} width={"300px"} height={"300px"} alt="" className="wrapperimage" />
              <h2>{truncate(product.title)}</h2>
              <h3>
                Price: {product.price} <br />
                <button onClick={() => { removeProduct(product.id) }}>Remove Item</button>
              </h3>
              <div className="icons">
                <button onClick={() => changeQuantity(product.id, product.quantity + 1)}>
                  <FontAwesomeIcon icon={faAngleUp} className="icon" />
                </button>
                <br />
                {product.quantity}
                <div className="icon2">
                  <button onClick={() => changeQuantity(product.id, product.quantity - 1)}>
                    <FontAwesomeIcon icon={faAngleDown} className="icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => clear()}>clearAll</button>
        </main>
      </div>
      <footer>
        <div className="footer">
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
      </footer>
    </>
  );
}

export default App;

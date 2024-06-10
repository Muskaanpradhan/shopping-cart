import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from './CartContext';

const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="header">
        <h2>
          UseReducer
        <span className="cart-total">{totalItems}</span>
          <span>
            <FontAwesomeIcon icon={faCartShopping} className="Icon" />
          </span>
        </h2>
      </div>
    </header>
  );
};

export default Header;

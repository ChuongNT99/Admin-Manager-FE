import React from "react";
import { useState } from "react";
import "./App.css";

const cartList = [
  {
    id: 0,
    name: "ice cream",
    img: "🍦",
    count: 1,
  },
  {
    id: 1,
    name: "Cheese",
    img: "🧀",
    count: 1,
  },
  {
    id: 2,
    name: "Candy",
    img: "🍭",
    count: 1,
  },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(cartList);
  const [total, setTotal] = useState();
//   const totalItemCount = cartList.reduce((total, product) => total + product.count);
 
  function handleIncreaseClick(productId) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            count: product.count + 1,
        //   totalItemCount : totalItemCount + 1

          };
        } else {
          return product;
        }
      })
    );
  }

  function handleDecreaseClick(productId) {
    let nextProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1,
        //   totalItemCount : totalItemCount - 1

        };
      } else {
        return product;
      }
    });
    nextProducts = nextProducts.filter((p) => p.count > 0);
    setProducts(nextProducts);
  }

  return (
    <div className="wrapper">
      {/* <h3>Tổng số sản phẩm trong giỏ hàng: {totalItemCount} </h3> */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div className="product">
              <span role="img">{product.img}</span>
            </div>
            {product.name}
            <button
              onClick={() => {
                handleIncreaseClick(product.id);
              }}
            >
              +
            </button>
            <b> {product.count} </b>
            <button
              onClick={() => {
                handleDecreaseClick(product.id);
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

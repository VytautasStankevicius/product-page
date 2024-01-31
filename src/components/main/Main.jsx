import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import * as service from "../../services/ProductServices";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [url, SetUrl] = useState("");
 

  useEffect(() => {
    const getProducts = () => {
      service.fetchProducts(setProducts, setPages, url);
    };
    getProducts();
  }, []);

  function max100Symbols(text) {
    if (text && text.length > 100) {
      return text.slice(0, 100);
    } else {
      return text;
    }
  }
  return (
    <>
      <div className="my-5 container d-flex flex-wrap gap-5">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image_url={product.image_url}
            description={max100Symbols(product.description)}
            price={product.price}
            id={product.id}
            index={(index % 4) + 1}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pages.slice(1, pages.length - 1).map((page) => (
              <li className="page-item" key={page.label}>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => {
                    SetUrl(page.url),
                      service.fetchProducts(setProducts, setPages, url);
                  }}
                >
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

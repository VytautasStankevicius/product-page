import React, { useEffect, useState } from "react";
import * as service from "../../services/ProductServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductGallery.scss"

export default function ProductGallery() {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.data.access_token;

  useEffect(() => {
    const getProduct = () => {
      service.fetchProduct(setProduct, id, token);
    };
    getProduct();
  }, []);
  return (
    <>
      {product ? (
        <div>
          <div className="border-end border-dark border-2">
            <img
              src={
                product.image_url ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoE0zLabFrxYyaVJ-BZsuUdFNCo2iOTnGKyVFfGr_AYQ&s"
              }
              alt=""
              style={{ width: "18rem" }}
            />
          </div>
          <div className="" style={{}}>
            <h3 className="align-middle">
              {product.title}
            </h3>
            <p>
              <span className="fw-bold">Price -</span> {product.price}
            </p>
            <p>
              <span className="fw-bold">Info about product - </span>{" "}
              {product.description}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductCard.scss"

export default function (props) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className= {`card border border-dark rounded ${props.index}`}
      style={{ width: "25rem", height: "28rem", overflow: "auto" }}
    >
      <div style={{ width:"100%", height:"17rem", overflow:"hidden"}}>
      <img
        src={
          props.image_url ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoE0zLabFrxYyaVJ-BZsuUdFNCo2iOTnGKyVFfGr_AYQ&s"
        }
        className="card-img-top"
        alt={props.title}
        style={{     objectPosition: "top",
          minHeight: "100%",
          minWidth: "100%",
          objectFit: "cover" }}
      ></img>
      </div>
     
      <div className="card-body">
        <h1 style={{textAlign:"center"}}>{props.title}</h1>
        <h2 style={{textAlign:"center"}}><b>Price:</b> {props.price} <b>eu</b></h2>
        {currentUser && (
          <Link style={{ display:"block", textAlign:"center"}} to={`/product-page/${props.id}`} className="card-link">
            Click for more...
          </Link>
        )}
      </div>
    </div>
  );
}

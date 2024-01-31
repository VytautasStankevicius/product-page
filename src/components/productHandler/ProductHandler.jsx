import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import * as service from "../../services/ProductServices";

export default function ProductHandler() {
  const { currentUser } = useSelector((state) => state.user);
  const [ourProducts, setOurProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productIdToEdit, setProductIdToEdit] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });
  const [pages, setPages] = useState([]);
  const [url, SetUrl] = useState("");
  const token = currentUser.data.access_token;

  const handleDeleteProduct = () => {
    service.handleDeleteProduct(productIdToDelete, token, setOurProducts);
  };

  useEffect(() => {
    const getOurProducts = () => {
      service.fetchOurProducts(token, setOurProducts, setPages, url);
    };
    getOurProducts();
  }, []);

  const addProduct = (e) => {
    service.handleSubmit(
      token,
      formData.title,
      formData.price,
      formData.image,
      formData.description
    );
    service.fetchOurProducts(token, setOurProducts, setPages, url);
  };

  const editProduct = (e) => {
    e.preventDefault();
    service.editSubmit(
      token,
      editedProduct.title,
      editedProduct.price,
      editedProduct.image,
      editedProduct.description,
      productIdToEdit
    );
  };
  return (
    <div className="container">
      {currentUser ? (
        <button
          type="button"
          className="btn btn-light mt-5"
          data-bs-toggle="modal"
          data-bs-target="#pridejimoModalas"
        >
          Add product
        </button>
      ) : (
        <></>
      )}
      {currentUser && ourProducts.length > 0 ? (
        <table className="table my-5 table-grey">
          <thead>
            <tr>
              <th scope="col">Product ID Nr.</th>
              <th scope="col">Product name</th>
              <th scope="col">Product pricing</th>
              <th scope="col">Product description</th>
            </tr>
          </thead>
          {ourProducts.map((ourProduct) => (
            <tbody key={ourProduct.id}>
              <tr>
                <td scope="row">{ourProduct.id}</td>
                <td scope="row">{ourProduct.title}</td>
                <td scope="row">{ourProduct.price}</td>
                <td scope="row">{ourProduct.description}</td>
                <td scope="row">
                  <button
                    className="btn btn-secondary underline:cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#atnaujinimoModalas"
                    onClick={() => {
                      setProductIdToEdit(ourProduct.id);
                    }}
                  >
                    Update(unavailable)
                  </button>
                </td>
                <td scope="row">
                  <button
                    className="btn btn-danger underline:cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#trinimoModalas"
                    onClick={() => {
                      setProductIdToDelete(ourProduct.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className="my-5 mx-auto">Your product list is empty.Add some by clicking the "Add product" button!</p>
      )}
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
                      service.fetchProducts(setOurProducts, setPages, url);
                  }}
                >
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="modal fade"
        id="trinimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to delete this product?</div>
            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleDeleteProduct}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="pridejimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={addProduct}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product price"
                    id="price"
                    name="price"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Product photo"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product description"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Add product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="atnaujinimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update product info
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={editProduct}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product price"
                    id="price"
                    name="price"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Product photo"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        image: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product description"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Update product info
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

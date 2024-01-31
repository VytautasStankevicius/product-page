// import axios from "axios";

// const privateAPI = axios.create({
//   headers: {'Authorization': 'Bearer '+ token}
// });

// export const setToken = (token) =>{
//   privateAPI.headers = {'Authorization': 'Bearer '+ token}
// }


// export const fetchOurProducts = (token, setOurProducts) => {
//   console.log('we got here')
//   privateAPI.get(`https://demo-api.ideabridge.lt/api/products`)
//     .then((res)=>{
//       console.log(res.data)
//     })
// };



export const fetchProduct = async (setProduct, id, token) => {
  try {
    const res = await fetch(
      `https://demo-api.ideabridge.lt/api/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setProduct(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProducts = async (setProducts, setPages, url) => {
  try {
    const res = await fetch(
      url || `https://demo-api.ideabridge.lt/api/products/view/all`
    );
    const data = await res.json();
    if (res.ok) {
      setProducts(data.data.data);
      setPages(data.data.links);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchOurProducts = async (
  token,
  setOurProducts,
  setPages,
  url
) => {
  try {
    const res = await fetch(
      url || `https://demo-api.ideabridge.lt/api/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setOurProducts(data.data.data);
      setPages(data.data.links);
    }
  } catch (error) {
    console.log(error.message);
  }
};


export const handleSubmit = async (token, title, price, image, description) => {
  const formData = new FormData();
  formData.set("title", title);
  formData.set("price", parseFloat(price));
  formData.set("description", description);
  formData.set("image", image);
  try {
    const res = await fetch(`https://demo-api.ideabridge.lt/api/products`, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
      },
      body: formData,
    });
    return await data(res);
  } catch (error) {}
};

export const editSubmit = async (
  token,
  title,
  price,
  image,
  description,
  productIdToEdit
) => {
  const formData = new URLSearchParams();
  formData.append("title", title);
  formData.append("price", parseFloat(price));
  formData.append("description", description);
  try {
    const res = await fetch(
      `https://demo-api.ideabridge.lt/api/products/${productIdToEdit}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: "Bearer" + token,
        },
        body: formData,
      }
    );
    return await data(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleDeleteProduct = async (
  productIdToDelete,
  token,
  setOurProducts
) => {
  try {
    const res = await fetch(
      `https://demo-api.ideabridge.lt/api/products/${productIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await res.json();
    setOurProducts((prev) =>
      prev.filter((ourProduct) => ourProduct.id !== productIdToDelete)
    );
  } catch (error) {
    console.log(error);
  }
};


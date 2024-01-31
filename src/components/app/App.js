import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from "../header/Header";
import SignIn from "../signIn/SignIn";
import Main from "../main/Main";
import Register from "../register/Register";
import ProductHandler from "../productHandler/ProductHandler";
import ProductGallery from "../productGallery/ProductGallery";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ourProductList" element={<ProductHandler />} />
          <Route path="/product-page/:id" element={<ProductGallery />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signInStart,signInSuccess,signInFailure} from "../../redux/user/UserSlice.js";
import * as service from "../../services/Auth.js";

export default function SignInPage() {
  const [formData, setFormData] = useState({});
  const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const signIn = (e) => {
    e.preventDefault();
    service.signInSubmit(
      formData,
      dispatch,
      signInStart,
      signInSuccess,
      signInFailure
    );
    navigate("/");
  };
  return (
    <div className="container">
      <h2 className="mt-3 text-center">Log-in</h2>
      <form className="form" onSubmit={signIn}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Jūsų elektroninis paštas"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="********"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Log-in
          </button>
        </div>
        <div className="mb-3">
          <p>
            Not a member? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </form>
      {errorMessage && (
        <p className="mt-5" color="failure">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

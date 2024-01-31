import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as service from "../../services/Auth";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  console.log(formData.name);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const registrationSubmission = (e) => {
    e.preventDefault();
    service.registration(formData);
    navigate("/sign-in");
  };
  return (
    <div className="container">
      <h2 className="mt-3 text-center">Register</h2>
      <form className="form" onSubmit={registrationSubmission}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            id="email"
            name="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password confirmation"
            id="password_confirmation"
            name="password_confirmation"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-light">
            Register
          </button>
        </div>
        <div className="mb-3">
          <p>
            Already a member? <Link to={"/sign-in"}>Log-In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

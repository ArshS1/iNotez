import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [creds, setcreds] = useState({
    email: "",
    password: "",
  });

  let history = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:2000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    if (json.success) {
      // redirect to home page after successful login
      localStorage.setItem("token", json.authData);
      props.showAlert("Logged in!", "success");
      history("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login to use iNotez</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          value={creds.email}
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={creds.password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

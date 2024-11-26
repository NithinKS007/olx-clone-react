import React, { useState } from "react";
import { registerUser, signInUser } from "../../fireBase/fireBaseAuth";

const AuthForm = () => {
  const [signState, setSignState] = useState("Sign In");
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("this is the form values", formValue);

  const handleUserAuth = async (event) => {
    event.preventDefault();

    const { email, password, name, phone } = formValue;

    if (signState === "Sign In") {
      await signInUser(email, password);
    } else {
      await registerUser(name, email, phone, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {signState === "Sign In" ? "Sign In" : "Sign Up"}
        </h2>
        <form className="space-y-4">
          {signState === "Sign Up" && (
            <input
              type="text"
              value={formValue.name}
              name="name"
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="email"
            value={formValue.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {signState === "Sign Up" && (
            <input
              type="text"
              value={formValue.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="password"
            value={formValue.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            onClick={handleUserAuth}
            className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            {signState}
          </button>
          <div className="flex items-center mt-4">
            <input type="checkbox" className="mr-2 leading-tight" />
            <label className="text-sm text-gray-600">Remember Me</label>
          </div>
          {signState === "Sign Up" ? (
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account ?
              <span
                className="ml-2 font-medium cursor-pointer"
                onClick={() => setSignState("Sign In")}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-sm text-center text-gray-600 mt-4">
              New User ?
              <span
                className="ml-2 font-medium cursor-pointer"
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

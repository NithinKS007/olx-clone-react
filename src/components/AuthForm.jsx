import React, { useState } from "react";
import { registerUser, signInUser } from "../fireBase/fireBaseAuth";
import { validateUserAuthForm } from "../utils/validateForms";

const AuthForm = () => {
  const [signState, setSignState] = useState("Sign In");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserAuth = async (event) => {
    event.preventDefault();

    const validationErrors = validateUserAuthForm(formData, signState);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    const { email, password, name, phone } = formData;

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
            <div>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          {signState === "Sign Up" && (
            <div>
              <input
                type="text"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
          )}
          <div>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
          </div>
          <button
            type="submit"
            onClick={handleUserAuth}
            className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            {signState}
          </button>
          <div className="flex items-center mt-4">
            <input type="checkbox" className="mr-2 leading-tight" />

            <label className="text-sm  text-gray-600">Remember Me</label>
          </div>

          {signState === "Sign Up" ? (
            <span className=" text-gray-600 mt-8">
              Already have an account?
              <span
                className="ml-2 font-medium cursor-pointer"
                onClick={() => setSignState("Sign In")}
              >
                Sign In
              </span>
            </span>
          ) : (
            <span className=" text-gray-600 mt-4">
              New User?
              <span
                className="ml-2 font-medium cursor-pointer"
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up
              </span>
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

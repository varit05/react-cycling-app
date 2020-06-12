import React, { useState } from "react";
import { navigate, useTitle } from "hookrouter";
import { USER_DETAILS } from "../constants/constants";

function Login() {
  useTitle("Login");
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      localStorage.setItem(USER_DETAILS, username);
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
              (submitted && !username ? " border-red-500" : "")
            }
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
          />
          {submitted && !username && (
            <p className="text-red-500 text-xs italic">
              Please enter a username.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
              (submitted && !password ? " border-red-500" : "")
            }
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="******************"
          />
          {submitted && !password && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/login"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;

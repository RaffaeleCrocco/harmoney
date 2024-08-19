import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import harmoneyLogo from "../assets/harmoney-logo.svg";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";

const Signup = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/auth/register`, user)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center my-10">
        <img src={harmoneyLogo} className="w-72" />
        <p className="font-semibold text-xl leading-none">
          Money, with harmony.
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-80 mt-7 bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Hai già un account?
                <Link
                  to="/"
                  className="ms-1 text-zinc-600 decoration-2 cursor-pointer hover:underline focus:outline-none focus:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm mb-2">Username</label>
                  <div className="relative">
                    <input
                      name="username"
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-zinc-500 focus:ring-zinc-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2">
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <div>
                  <div>
                    <label className="block text-sm mb-2">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      name="password"
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-zinc-500 focus:ring-zinc-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2">
                    8+ characters required
                  </p>
                </div>

                <button
                  onClick={() => handleSignup()}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-zinc-800 text-white hover:bg-zinc-900 focus:outline-none focus:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

import React, { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [useOTP, setUseOTP] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";

    if (isLogin) {
      if (useOTP) {
        if (!formData.otp) newErrors.otp = "OTP is required";
      } else {
        if (!formData.password) newErrors.password = "Password is required";
      }
    } else {
      if (useOTP) {
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords do not match";
      } else {
        if (!formData.otp) newErrors.otp = "OTP is required";
      }
    }

    if (Object.keys(newErrors).length !== 0) {
      setError(newErrors);
    } else {
      setError({});
      console.log(formData);
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto mt-[8%] px-4">
      <div className="flex md:flex-row  lg:flex-row  xl:flex-row flex-col">
        <div className="basis-[40%]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            WELCOME TO UBUY
          </h2>

          <div className="flex mb-6">
            <button
              className={`flex-1 py-3 font-semibold rounded-l-md ${
                isLogin
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`flex-1 py-3 font-semibold rounded-r-md ${
                !isLogin
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          {isLogin && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
              />
              {error.email && (
                <p className="text-red-500 text-sm mb-2">{error.email}</p>
              )}

              <div className="flex items-center gap-2 mb-4 mt-3">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setUseOTP(false)}
                    className={`px-4 py-2 rounded-l-md font-semibold ${
                      !useOTP
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseOTP(true)}
                    className={`px-4 py-2 rounded-r-md font-semibold ${
                      useOTP
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    OTP
                  </button>
                </div>
                <input
                  name={useOTP ? "otp" : "password"}
                  type={useOTP ? "text" : "password"}
                  value={useOTP ? formData.otp : formData.password}
                  onChange={handleChange}
                  placeholder={useOTP ? "Enter OTP" : "Enter Password"}
                  className="flex-1 px-3 py-2 border border-gray-400 rounded-md"
                />
              </div>

              {error.password && (
                <p className="text-red-500 text-sm mb-2">{error.password}</p>
              )}
              {error.otp && (
                <p className="text-red-500 text-sm mb-2">{error.otp}</p>
              )}

              {!useOTP && (
                <div className="text-right mb-4">
                  <a
                    href="#"
                    className="text-sm text-gray-600 underline hover:underline font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded font-semibold"
              >
                Login
              </button>
            </form>
          )}
          {!isLogin && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address*"
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
              />
              {error.email && (
                <p className="text-red-500 text-sm mb-2">{error.email}</p>
              )}

              <div className="flex items-center gap-2  mb-4">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setUseOTP(false)}
                    className={`px-4 py-2 rounded-l-md font-semibold ${
                      !useOTP
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseOTP(true)}
                    className={`px-4 py-2 rounded-r-md font-semibold ${
                      useOTP
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Password
                  </button>
                </div>
                <input
                  name={useOTP ? "password" : "otp"}
                  type={useOTP ? "password" : "text"}
                  value={useOTP ? formData.password : formData.otp}
                  onChange={handleChange}
                  placeholder={useOTP ? "Password *" : "Enter OTP"}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {error.password && (
                <p className="text-red-500 text-sm mb-2">{error.password}</p>
              )}
              {error.otp && (
                <p className="text-red-500 text-sm mb-2">{error.otp}</p>
              )}

              {useOTP && (
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password *"
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">
                  {error.confirmPassword}
                </p>
              )}

              <div className="text-right mb-4">
                {useOTP ? (
                  <a
                    href="#"
                    className="text-sm text-gray-600 underline hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                ) : (
                  <a
                    href="#"
                    className="text-sm text-gray-600  underline hover:underline font-medium"
                  >
                    Get OTP?
                  </a>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-md font-semibold"
              >
                Sign Up
              </button>
            </form>
          )}
          <div className="border flex items-center justify-center mb-3 mt-6 p-4  gap-3 border-gray-300 rounded-md">
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              x="0px"
              y="0px"
              className=" my-2 rounded-lg shadow-xl"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>{" "}
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>{" "}
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>{" "}
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>{" "}
            </svg>{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              role="img"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              className="my-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"></path>{" "}
            </svg>{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              className="my-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.025-1.154-.229-1.729-.764-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"></path>{" "}
            </svg>{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="20px"
              width="20px"
              className="my-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42 10.72 10.72 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83 14.24-90 .91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32 7-35.8 3.38-65.69-15.16-86.72a72.27 72.27 0 0 0-20.73-15.82z"></path>{" "}
              <path d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22 12.58 12.58 0 0 0 1.94.15h89.76l22.54-142.29-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8.57-2.9 1.05-5.72 1.49-8.48 5.7-36.22-.05-60.87-19.72-83.19z"></path>{" "}
            </svg>{" "}
            <span className="px-3 text-gray-700 text-sm font-semibold whitespace-nowrap">
              Login with Social Accounts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

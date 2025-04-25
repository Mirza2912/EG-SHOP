import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetching state from redux store
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d{5}$/.test(paste)) return;
    const newOtp = paste.split("");
    setOtp(newOtp);
    newOtp.forEach((digit, i) => {
      inputsRef.current[i].value = digit;
    });
    inputsRef.current[4].focus();
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const finalOtp = otp.join("");
  //     const data = {
  //       otp: finalOtp,
  //       email: tempUser?.data?.email,
  //       phone: tempUser?.data?.phone,
  //     };

  //     // dispatch(verifyUser(data));

  //     if (isVerified) {
  //       setOtp(new Array(6).fill("")); // Clear the OTP input fields
  //     }
  //   };

  //   useEffect(() => {
  //     if (error) {
  //       toast.error(error.message); //show error message
  //       Dispatch(clearError());
  //     }

  //     //if user already verified
  //     if (isVerified) {
  //       Navigate("/user/profile", { replace: true }); //redirect to user profile page
  //       toast.success(user?.message);
  //     }
  //   }, [error, tempUser, Navigate, Dispatch, isVerified]);
  return (
    <section className="container pt-20 pb-16 mx-auto flex justify-center flex-col items-center">
      <div className="rounded-xl shadow-2xl md:w-[50%] lg:w-[40%] w-[100%] px-9 py-5 mb-5">
        <form className="mx-auto mt-4" onPaste={handlePaste}>
          <div className="w-[100%]">
            <p className="text-3xl font-semibold text-center ">
              Otp Verification
            </p>
            <p className="text-sm text-center mt-2">
              Enter the 6-digit code sent to your email to verify your identity.
            </p>

            <div className="flex justify-center gap-3 my-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="w-12 h-12 text-center rounded-lg bg-white/20  font-bold text-xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`text-white mt-5 bg-[#f96822] hover:bg-[#f0824a] rounded-lg text-lg w-full px-5 py-6 text-center shadow-xl ${
              isLoading && isLoading === true && "opacity-50 cursor-not-allowed"
            }`}
          >
            submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default OtpVerification;

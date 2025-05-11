import React from "react";
import { Link } from "react-router-dom";
import innerBannr from "../../assets/inner-banner.jpg";
import aboutBg from "../../assets/about-bg.jpg";
import about1 from "../../assets/about1.svg";
import about2 from "../../assets/about2.svg";
import Services from "../../components/Services/Services";

const AboutUs = () => {
  return (
    <>
      <section>
        {/* Banner */}
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <p className="text-4xl text-center text-white font-bold pt-28">
            About Us
          </p>
          {/* Breadcrumbs */}
          <div className="pb-28">
            <nav class="text-center font-bold mt-4" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                  <Link
                    to={"/"}
                    href="#"
                    class="inline-flex items-center text-white hover:text-gray-300 duration-300"
                  >
                    <svg
                      class="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={"/about"}
                      class="ms-1 text-white hover:text-gray-300 duration-300"
                    >
                      About Us
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* AboutUs Description */}
        <div className="w-full flex justify-center my-12 px-4">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Image */}
            <div className="w-full">
              <img
                src={aboutBg}
                alt="About Us"
                className="rounded-xl w-full h-auto max-h-[370px] object-cover object-center"
              />
            </div>

            {/* Right Text Box */}
            <div className="bg-[#F0F2F5] rounded-2xl shadow-md p-6 sm:p-8">
              <p className="text-gray-500 text-sm mb-1">Welcome to EG Shop</p>
              <h2 className="text-2xl font-semibold text-gray-900 leading-snug mb-4">
                What can a great About Us page do{" "}
                <br className="hidden sm:block" /> for your business?
              </h2>
              <p className="text-gray-700 text-sm mb-3">
                An About Us page helps your company make a good first
                impression, and is key to building customer trust. It should
                tell your story, values, and what makes you different.
              </p>
              <p className="italic text-gray-600 text-sm mb-4">
                "Ius ferri velit sanctus cu, sed at soleat accusata. Ut placerat
                legendos interpre. Donec vitae sapien ut libero venenatis
                faucibus."
              </p>

              <div className="flex gap-3 mb-5">
                <img
                  src={about1}
                  alt="Social 1"
                  className="w-12 h-12 object-cover rounded-md"
                />
                <img
                  src={about2}
                  alt="Social 2"
                  className="w-12 h-12 object-cover rounded-md"
                />
              </div>

              <button
                type="button"
                className="bg-[#f96822] hover:bg-[#ff9763] text-white text-sm rounded-3xl px-6 py-2 transition-all duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}

      <section>
        <Services />
      </section>
    </>
  );
};

export default AboutUs;

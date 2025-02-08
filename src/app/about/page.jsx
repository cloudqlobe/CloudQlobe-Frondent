import React from "react";
import aboutContent from "../../Strings/en_strings.json"; // Import the JSON file
import CustomizedQuotesForm from "../components/DIDQuotation";
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16 hidden md:block">
          <img
            src={aboutContent["ABOUT_BANNER_IMAGE_SRC"]}
            alt={aboutContent["ABOUT_BANNER_IMAGE_ALT"]}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="block md:hidden text-center  mt-24">
          <p className="text-black text-3xl font-serif font-bold">About Us</p>
        </div>

        <div className="bg-white">
          {/* Section 1 */}
          <section className="max-w-screen-xl mx-auto py-10 mt-2 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4">
              <div className="flex-1">
                <img
                  src={aboutContent["ABOUT_SECTION_1_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_1_IMAGE_ALT"]}
                  className="w-full max-w-[490px] h-auto"
                  width={700}
                  height={500}
                />
              </div>

              <div className="flex-1 ">
                <p className="text-gray-600 text-justify leading-6">
                  {aboutContent["ABOUT_SECTION_1_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="max-w-screen-xl mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 pb-12 ">
              <div className="flex-1 order-last md:order-first flex items-center ">
                <p className="text-gray-600 text-justify leading-[1.6]">
                  {aboutContent["ABOUT_SECTION_2_DESCRIPTION"]}
                </p>
              </div>

              <div className="flex-1 order-first md:order-last">
                <img
                  src={aboutContent["ABOUT_SECTION_2_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_2_IMAGE_ALT"]}
                  className="w-full max-w-[450px] h-auto"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="max-w-screen-xl mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 pb-12">
              <div className="flex-1">
                <img
                  src={aboutContent["ABOUT_SECTION_3_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_3_IMAGE_ALT"]}
                  className="w-full max-w-[450px] h-auto"
                  width={500}
                  height={300}
                />
              </div>

              <div className="flex-1  flex items-center">
                <p className="text-gray-600 text-justify leading-[1.6]">
                  {aboutContent["ABOUT_SECTION_3_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>
        </div>
        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default About;

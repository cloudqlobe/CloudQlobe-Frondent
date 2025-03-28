import React from "react";
import CustomizedQuotesForm from "../../components/DIDQuotation";
import didVoiceSolutionsContent from "../../../Strings/en_strings.json"; // Import the JSON file
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const DID_Voice_Solutions = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_BANNER_IMAGE_SRC"]}
            alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_BANNER_IMAGE_ALT"]}
            className="w-full h-auto object-contain"
            width={1920}
            height={1080}
          />
        </div>

        <div className="bg-white">
          {/* First section */}
          <section className="max-w-5xl mx-auto p-8 bg-white text-justify">
            <div className="grid gap-8 md:grid-cols-2 grid-cols-1 items-center md:mt-[1.5rem]">
              <div className="flex-1">
                <img
                  style={{ marginRight: '4em' }}
                  src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_SRC"]}
                  alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_ALT"]}
                  className="w-full h-auto max-w-[450px]"
                  width={500}
                  height={300}
                />
              </div>

              <div className="flex-1">
                <p className="text-gray-600 md:leading-6">
                  {didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_1_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>

          {/* Second section */}
          <section className="max-w-5xl mx-auto p-8 bg-white text-justify">
            <div className="grid gap-8 md:grid-cols-2 grid-cols-1 items-center ">
              <div className="flex-1 md:order-first order-last">
                <p className="text-gray-600 md:leading-6">
                  {didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_2_DESCRIPTION"]}
                </p>
              </div>

              <div className="flex-1 order-first md:order-last">
                <img
                  src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_SRC"]}
                  alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_ALT"]}
                  className="w-full h-auto max-w-[450px]"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Customized Form */}
        <div>
          <CustomizedQuotesForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DID_Voice_Solutions;

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomizedQuotesForm from "../../components/DIDQuotation";
import cliVoiceTerminationContent from "../../../Strings/en_strings.json"; // Import the JSON file

const CLI_Voice_Termination = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_BANNER_IMAGE_SRC"]}
            alt={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_BANNER_IMAGE_ALT"]}
            className="w-full h-auto object-contain"
            width={1920}
            height={1080}
          />
        </div>

        <div className="bg-white">
          {/* First section */}
          <section className="max-w-5xl mx-auto p-8 bg-white text-justify">
            <div className="grid gap-8 md:grid-cols-2 grid-cols-1 items-center md:mt-[3]" >
              <div className="flex-1">
                <img
                  src={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_1_IMAGE_SRC"]}
                  alt={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_1_IMAGE_ALT"]}
                  className="w-full h-auto max-w-[450px]"
                  width={500}
                  height={300}
                />
              </div>

              <div className="flex-1">
                <p className="text-gray-600 leading-6">
                  {cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_1_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>

          {/* Second section */}
          <section className="max-w-5xl mx-auto p-8 bg-white text-justify">
            <div className="grid gap-8 md:grid-cols-2 grid-cols-1 items-center md:mt-[3]" >
              <div className="flex-1 md:order-first order-last">
                <p className="text-gray-600 leading-6">
                  {cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_2_DESCRIPTION"]}
                </p>
              </div>

              <div className="flex-1 order-first md:order-last">
                <img
                  src={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_2_IMAGE_SRC"]}
                  alt={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_2_IMAGE_ALT"]}
                  className="w-full h-auto max-w-[400px] md:ml-[3em]"
                  width={500}
                  height={300}
                />
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

export default CLI_Voice_Termination;

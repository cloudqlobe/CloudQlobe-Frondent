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

        <div className="min-h-screen w-full bg-white px-12 py-10 overflow-hidden">
          {/* CLI Voice Termination Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_SRC"]}
                alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[-200px]"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CLI <span className="text-orange-400">Voice Termination</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                Cloud Qlobe offers comprehensive Direct Inward Dialing (DID) solutions designed to simplify and enhance business communication through dedicated phone numbers. These services allow organizations to assign unique numbers to specific departments, teams, or individual employees, making it easier for customers to reach the right contact directly. By providing a clear and efficient calling pathway, our DID solutions help reduce the frustration of misrouted calls and ensure that inquiries are handled promptly, improving the overall customer experience.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                Leveraging Cloud Qlobe’s robust and scalable platform, clients gain the ability to manage their DID services with ease and flexibility. This enables faster call routing, reduces call handling times, and optimizes resource allocation within call centers or corporate environments. Additionally, our solution supports seamless integration with existing telephony infrastructure, allowing businesses to maintain operational continuity while upgrading their communication capabilities. Ultimately, our DID offerings help organizations improve efficiency, boost customer satisfaction, and enhance the effectiveness of their communication systems.              </p>
            </div>
          </div>

          {/* CC Voice Solutions Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CC <span className="text-orange-400">Voice Solutions</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                As a leading provider of VoIP services, Cloud Qlobe offers high-quality Direct Inward Dialing (DID) solutions tailored to meet the diverse needs of a global customer base. Our extensive portfolio includes a wide range of international virtual numbers such as mobile, geographic, non-geographic, toll-free, and Universal International Freephone Numbers (UIFN). These options provide businesses with the flexibility to establish a strong local presence in multiple countries, enabling customers worldwide to connect easily and affordably. By delivering reliable and scalable DID services, we help clients enhance their communication strategies and improve customer engagement across different markets.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                Cloud Qlobe is committed to maintaining a secure and dependable platform that supports seamless connectivity and excellent call quality. Our clients benefit from competitive pricing models and continuous platform improvements, ensuring they stay ahead in a rapidly evolving telecommunications landscape. Beyond just connectivity, our DID solutions empower businesses to unlock new revenue streams while upholding the highest standards of service performance. Whether expanding internationally or optimizing existing communication channels, companies can rely on Cloud Qlobe to deliver efficient, cost-effective, and future-ready DID services that align with their growth objectives.              </p>
            </div>
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_SRC"]}
                alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[200px]"
              />
            </div>
          </div>
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

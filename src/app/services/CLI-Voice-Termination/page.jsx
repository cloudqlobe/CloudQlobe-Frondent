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

        <div className="min-h-screen w-full bg-white px-12 py-10 overflow-hidden">
          {/* CLI Voice Termination Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_1_IMAGE_SRC"]}
                alt={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_1_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[-200px]"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CLI <span className="text-orange-400">Voice Termination</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                Cloud Qlobe empowers wholesale VoIP service providers and carriers to manage and scale their operations efficiently from anywhere in the world. Our feature-rich platform enables seamless connectivity, allowing users to buy, sell, and deliver premium VoIP termination services with full operational control in real time. Whether you're a growing VoIP business or an established carrier, our solution provides the flexibility and accessibility needed to stay competitive in today’s fast-paced telecommunications environment. With no dependency on physical infrastructure, businesses can expand globally, respond quickly to market demands, and maintain uninterrupted service delivery.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                In addition to its global reach, our platform offers powerful monitoring, analytics, and reporting tools that give service providers deep visibility into their network performance. These insights include real-time data on call quality, traffic flow, usage trends, and customer behaviors, enabling providers to make informed decisions and fine-tune their service offerings. By identifying patterns and potential issues early, clients can ensure high-quality service, reduce downtime, and increase customer satisfaction. With Cloud Qlobe, telecom providers are equipped with the tools they need to deliver reliable, scalable, and data-driven VoIP services in an increasingly competitive market.              </p>
            </div>
          </div>

          {/* CC Voice Solutions Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CC <span className="text-orange-400">Voice Solutions</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                Beyond reliable connectivity, Cloud Qlobe’s wholesale VoIP and intelligent routing solutions empower clients to tap into new revenue opportunities within a secure, stable, and scalable environment. Our platform supports a comprehensive suite of telecom services that enable businesses to expand into untapped markets, diversify their offerings, and attract a broader customer base. With built-in tools for efficient call routing and high-quality voice transmission, clients can deliver consistent service performance while maintaining compliance with global telecom standards. This level of reliability is key for providers looking to build trust and long-term relationships with their customers.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                In addition to superior call handling, Cloud Qlobe offers advanced features such as end-to-end encryption, seamless infrastructure integration, and real-time system monitoring. These capabilities help reduce operational overhead, improve security, and support long-term profitability. The flexibility of our platform makes it easy to adapt to evolving business needs, whether the goal is to streamline day-to-day operations or support large-scale market expansion. By combining performance, security, and cost-efficiency, Cloud Qlobe gives service providers the foundation they need to grow sustainably and deliver high-quality VoIP services in a competitive global landscape.              </p>
            </div>
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_2_IMAGE_SRC"]}
                alt={cliVoiceTerminationContent["CLI_VOICE_TERMINATION_SECTION_2_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[200px]"
              />
            </div>
          </div>
        </div>
        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default CLI_Voice_Termination;

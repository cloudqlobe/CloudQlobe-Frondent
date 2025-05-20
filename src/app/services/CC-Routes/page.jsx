import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomizedQuotesForm from "../../components/DIDQuotation";
import ccRoutesContent from "../../../Strings/en_strings.json"; // Import the JSON file

const CC_Routes = () => {
  return (
    <>
      <Header />

      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={ccRoutesContent["CC_ROUTES_BANNER_IMAGE_SRC"]}
            alt={ccRoutesContent["CC_ROUTES_BANNER_IMAGE_ALT"]}
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
                src={ccRoutesContent["CC_ROUTES_SECTION_1_IMAGE_SRC"]}
                alt="CLI Voice Termination"
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[-200px]"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CLI <span className="text-orange-400">Voice Termination</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                CC (Call Center) traffic refers to the use of advanced routing techniques designed to efficiently manage high volumes of inbound and outbound calls within a call center environment. These techniques incorporate intelligent systems for call distribution, resource optimization, and load balancing to maintain smooth and uninterrupted operations. Whether handling customer support, technical assistance, or sales inquiries, the goal is to direct each call to the most appropriate agent or department with minimal delay. These systems are essential for maintaining productivity, especially in high-demand settings where response time and call accuracy directly impact customer satisfaction.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                A core component of effective CC traffic management involves analyzing call flow patterns and identifying peak hours or high-traffic periods. By leveraging real-time analytics and historical data, businesses can fine-tune their routing strategies, reallocate resources proactively, and ensure optimal staffing levels. This not only reduces customer wait times but also enhances overall service quality and operational efficiency. As customer expectations for fast, reliable support continue to rise, smart CC traffic management becomes a critical tool for delivering consistent, high-performance call center services.              </p>
            </div>
          </div>

          {/* CC Voice Solutions Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-4xl font-default text-gray-800 mb-2">
                CC <span className="text-orange-400">Voice Solutions</span>
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                One of the most effective strategies in call center operations is skills-based routing, which intelligently directs calls to agents with the specific expertise needed to address a customer’s issue. This ensures faster and more accurate problem resolution, as customers are connected directly to specialists—whether for technical support, billing inquiries, or product information. This targeted approach not only boosts first-call resolution rates but also enhances customer satisfaction by minimizing call transfers and wait times. When customers reach the right person the first time, it leads to smoother interactions and a more professional experience.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                Other essential techniques include priority routing and automated call distribution (ACD). Priority routing allows high-value or VIP customers to bypass regular queues and receive immediate attention, reinforcing loyalty and improving service for critical accounts. Meanwhile, ACD systems automatically distribute incoming calls evenly among available agents, helping balance workloads and reduce agent fatigue. Time-based routing further enhances efficiency by adapting to call volume fluctuations throughout the day—ensuring that the right number of agents are available during peak hours. Together, these advanced routing methods optimize resource allocation and deliver a higher standard of service across all customer interactions.              </p>
            </div>
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={ccRoutesContent["CC_ROUTES_SECTION_2_IMAGE_SRC"]}
                alt="CC Voice Solutions"
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

export default CC_Routes;

import React from "react";

const imageCLI = "https://img.freepik.com/free-vector/customer-service-concept-illustration_114360-20680.jpg?uid=R194683811&ga=GA1.1.2056278707.1743484874&semt=ais_hybrid&w=740";
const imageCC = "https://img.freepik.com/free-vector/call-center-design_24877-49640.jpg?uid=R194683811&ga=GA1.1.2056278707.1743484874&semt=ais_hybrid&w=740";
const imageDID = "https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?uid=R194683811&ga=GA1.1.2056278707.1743484874&semt=ais_hybrid&w=740";

const VoipContents = () => {
  return (
    <div className="min-h-screen w-full bg-white px-12 py-10 overflow-hidden">
      <h1 className="text-4xl font-default text-center text-black mb-14 mt-[-30px]">
        Empowering Communication with <span className="text-blue-800">Global VoIP Solutions</span>
      </h1>


      {/* CLI Voice Termination Section */}
      <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
        <div className="relative flex justify-center items-center w-full p-2">
          <img
            src={imageCLI}
            alt="CLI Voice Termination"
            className="w-[450px] h-[450px] object-cover rounded-lg ml-[-200px]"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-4xl font-default text-gray-800 mb-2">
            CLI <span className="text-orange-400">Voice Termination</span>
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
            Cloud Qlobe empowers telecom businesses with high-quality CLI Voice Termination services that ensure crystal-clear call quality across global networks. With our extensive partnerships and routing infrastructure, clients benefit from direct interconnections and stable CLI routes, enabling them to deliver premium calling experiences to end-users. Our focus on high ACD (Average Call Duration) and low ASR (Answer Seizure Ratio) ensures better profitability and reliability for voice carriers.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
            Whether you're a wholesale VoIP provider, reseller, or call center operator, our CLI termination solution supports your expansion into international markets with robust billing, monitoring, and route management tools. We prioritize compliance and quality, offering redundant paths and real-time analytics so you can maintain superior service while minimizing operational challenges.
          </p>
        </div>
      </div>

      {/* CC Voice Solutions Section */}
      <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-4xl font-default text-gray-800 mb-2">
            CC <span className="text-orange-400">Voice Solutions</span>
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
            Our CC Voice Solutions are tailored to meet the growing demands of high-volume contact centers and business process outsourcing (BPO) operations. Through intelligent call routing, load balancing, and IVR integrations, we help enterprises efficiently manage thousands of concurrent calls without quality degradation. This solution is ideal for customer service hubs, telemarketing firms, and international sales teams who need scalable, carrier-grade performance.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
            Cloud Qlobe's CC routing ensures maximum uptime and reliability, providing real-time control over call distribution, failover mechanisms, and reporting dashboards. We help businesses optimize operational costs while delivering personalized communication strategies based on analytics and call behavior. By leveraging our CC solutions, your business can ensure consistent service, improve customer satisfaction, and reduce abandonment rates during high-traffic periods.
          </p>
        </div>
        <div className="relative flex justify-center items-center w-full p-2">
          <img
            src={imageCC}
            alt="CC Voice Solutions"
            className="w-[450px] h-[450px] object-cover rounded-lg ml-[200px]"
          />
        </div>
      </div>

      {/* DID Services Section */}
      <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
        <div className="relative flex justify-center items-center w-full p-2">
          <img
            src={imageDID}
            alt="DID Services"
            className="w-[450px] h-[450px] object-cover rounded-lg ml-[-180px]"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-4xl font-default text-gray-800 mb-2">
            Premium <span className="text-orange-400">DID Services</span>
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
            Cloud Qlobe offers extensive DID (Direct Inward Dialing) services that allow businesses to establish a local presence across countries without physically operating in each region. Our inventory includes mobile, geographic, toll-free, and UIFN numbers covering over 70 countries. These numbers can be activated instantly via our self-service portal, enabling businesses to receive calls globally as if they were local to the customer.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
            Our DID solutions are backed by high-availability servers and support both SIP and PSTN connectivity. With advanced routing and API integration on the horizon, we ensure seamless number provisioning and management. Whether you’re a UCaaS provider, enterprise, or virtual office solution, our DID services enhance global accessibility, reduce operational costs, and provide unmatched flexibility in call routing and reception.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoipContents;
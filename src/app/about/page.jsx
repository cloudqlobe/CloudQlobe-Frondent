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

        <div className="min-h-screen w-full bg-white px-12 py-10 overflow-hidden">

          {/* CLI Voice Termination Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={aboutContent["ABOUT_SECTION_1_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_1_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[-200px]"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                We are global leaders in delivering high-quality call center and wholesale VoIP termination services, supported by over a decade of proven expertise in the telecommunications industry. Our skilled team has developed a robust and scalable Carrier Platform designed specifically for telecom operators, carriers, and service providers. This platform enables Mobile Network Operators (MNOs), Tier 1 carriers, and enterprise clients to manage their networks more efficiently, ensure high availability through built-in redundancy, and implement advanced routing strategies that improve call quality while controlling operational costs.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                Through our extensive wholesale VoIP traffic network, we offer businesses the ability to secure competitive pricing and negotiate better terms with telecom operators worldwide. This volume advantage allows our clients to access bulk VoIP traffic at reduced rates, resulting in significant cost savings. Combined with our global partnerships and deep industry knowledge, we help businesses scale with confidence, maintain service quality, and stay ahead in a rapidly evolving telecom landscape.
              </p>
            </div>
          </div>

          {/* CC Voice Solutions Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="flex flex-col justify-center w-full">
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                The advantages of our services go beyond cost efficiency and strong network management—our platform also creates new revenue opportunities through wholesale and call center VoIP route trading. Built for performance and reliability, our secure Carrier Platform enables clients to engage in real-time VoIP route trading with access to a vast network of global telecom partners. This allows carriers, service providers, and telecom operators to buy and sell routes based on market trends, creating an additional, profitable revenue stream. With real-time analytics, monitoring tools, and a transparent trading environment, businesses can make smart decisions, respond to demand shifts, and ensure service quality.              </p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                In addition, our platform supports a broad range of telecom services, giving clients the flexibility to diversify their offerings and enter new or emerging markets. Whether expanding into new regions or adding complementary services, the system is designed to adapt quickly to business needs. Participating in VoIP route trading allows clients to capitalize on price fluctuations, optimize margins, and remain agile in a competitive landscape. With the right tools and infrastructure in place, businesses can turn market dynamics into profitable growth while maintaining the high reliability and performance expected in today’s telecom industry.              </p>
            </div>
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={aboutContent["ABOUT_SECTION_2_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_2_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[200px]"
              />
            </div>
          </div>

          {/* DID Services Section */}
          <div className="grid md:grid-cols-2 items-center gap-6 mb-12 max-w-7xl mx-auto">
            <div className="relative flex justify-center items-center w-full p-2">
              <img
                src={aboutContent["ABOUT_SECTION_3_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_3_IMAGE_ALT"]}
                className="w-[450px] h-[450px] object-cover rounded-lg ml-[-180px]"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <p className="text-gray-600 mt-3 leading-relaxed text-lg text-justify">
                To facilitate seamless and efficient transactions, Cloud Qlobe offers its members dedicated client accounts that provide direct access to a dynamic and active trading community. Through our secure, web-based portal, users can participate in anonymous trading, ensuring complete privacy and transactional security. This feature not only safeguards sensitive business information but also encourages open and confident participation in the wholesale VoIP market. With intuitive navigation and real-time access, our platform is designed to simplify the trading process while maintaining the highest standards of data protection and reliability.</p>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg text-justify">
                Our user-friendly interface empowers clients to manage their accounts with ease, track performance, and leverage valuable market insights through built-in analytics tools. These insights help users make informed trading decisions and stay ahead of shifting market trends. At Cloud Qlobe, we are committed to ongoing innovation—regularly enhancing our platform’s capabilities to meet the evolving needs of telecom professionals. By equipping our clients with robust tools and continuous support, we ensure they have every opportunity to succeed and grow in the fast-paced and competitive telecommunications landscape.</p>
            </div>
          </div>
        </div>

        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default About;

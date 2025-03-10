import Header from "../../../components/Header";
import Footer from "../../customer/pages/auth/HeaderAndFooter/Footer";
import MultiStepForm from "./MultiLevelForm";

const SignUpPage = () => {

  return (
    <>
    <div>
      <Header/>
    </div>
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] md:p-8 rounded-lg shadow-md max-w-6xl mx-auto mt-24 mb-8">
      {/* Left Column */}
      <div className="md:w-1/2 hidden md:flex flex-col w-full justify-between px-16 mt-20">
        <h1 className="text-3xl font-bold mb-6 ">Sign Up</h1>

        {/* Centered Image */}
        <div className="md:flex hidden flex-1 items-center ">
          <img
            src="/images/SignUp.png"
            alt="Sign In Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 mt-10 md:ml-[50%] md:-mt-[49%] ">
        <MultiStepForm />
      </div>
    </div>
          <Footer />
          </>
  );
};

export default SignUpPage;
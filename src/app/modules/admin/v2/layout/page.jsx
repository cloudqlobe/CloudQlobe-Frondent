import Topbar from '../Sidebar/page';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
      </div>
      
      {/* Main Content */}
      <div className="pt-16 md:pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

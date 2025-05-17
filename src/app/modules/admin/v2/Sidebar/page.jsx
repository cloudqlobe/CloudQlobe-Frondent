import React, { useContext, useEffect, useState } from "react";
import '../Dashboard/dashboard.css';
import {
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChevronRightIcon,
  LifebuoyIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  DocumentCurrencyBangladeshiIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import adminContext from "../../../../../context/page";
import UserDropdown from "../auth/logOut/page";
import axiosInstance from "../utils/axiosinstance";

const Topbar = () => {
  const { adminDetails } = useContext(adminContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  console.log(customers);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("api/customers");
        const data = response.data.customer;
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);


  // Add this search handler function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredCustomers([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = customers.filter(customer => {
      // Check company name
      if (customer.companyName?.toLowerCase().includes(query)) {
        return true;
      }

      // Check IP addresses if they exist
      if (customer.switchIps) {
        try {
          const ips = JSON.parse(customer.switchIps);
          if (Array.isArray(ips)) {
            return ips.some(ipObj =>
              ipObj.ip && ipObj.ip.toLowerCase().includes(query)
            );
          }
        } catch (e) {
          console.error("Error parsing switchIps:", e);
        }
      }
      return false;
    });

    setFilteredCustomers(results);
    setShowSearchResults(true);
  };

  // Add this to your existing search input and button
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Check if user is a member or admin (not superAdmin)
  const shouldShowSearchBar = adminDetails?.role &&
    !['superAdmin'].includes(adminDetails.role) &&
    adminDetails.role.endsWith('Member') ||
    ['carrier', 'lead', 'account', 'sale', 'support'].includes(adminDetails?.role);

  // Navigation items data
  const navItems = [
    {
      id: 'dashboard',
      icon: <ChartBarSquareIcon className="w-10 h-10 text-yellow-600 mr-14" />,
      href: "/admin/dashboard",
      roles: ['all'],
      mobileOnly: true
    },
    {
      id: 'leads',
      icon: <ClipboardDocumentListIcon className="w-8 h-8 mr-3 text-indigo-500" />,
      label: "Leads",
      roles: ["carrier", "lead", "leadMember", "superAdmin"],
      subItems: [
        { label: "New Leads", href: "/admin/newLeads" },
        { label: "Follow Up", href: "/admin/notification" },
        { label: "Emails", href: "/admin/leads/email" },
        { label: "Reports", href: "/admin/leads/report" },
        { label: "Messages", href: "/admin/leads/messages" },
        { label: "Internal Assistance", href: "/admin/leads/assistance" }
      ]
    },
    {
      id: 'sales',
      icon: <ChartBarIcon className="w-8 h-8 mr-3 text-blue-500" />,
      label: "Sales",
      roles: ['sale', 'superAdmin', "saleMember"],
      subItems: [
        { label: "Leads", href: "/admin/sale/leads" },
        { label: "Customers", href: "/admin/sale/customer" },
        { label: "Followups", href: "/admin/sale/followups" },
        { label: "Emails", href: "/admin/sale/email" },
        { label: "Reports", href: "/admin/sale/report" },
        { label: "Messages", href: "/admin/sale/messages" },
        { label: "Internal Assistance", href: "/admin/sale/assistance" }
      ]
    },
    {
      id: 'carriers',
      icon: <UserGroupIcon className="w-8 h-8 mr-3 text-green-500" />,
      label: "Carriers",
      roles: ["sale", "carrier", "superAdmin", "carrierMember"],
      subItems: [
        { label: "Leads", href: "/admin/carrier/leads" },
        { label: "Carriers", href: "/admin/carrier/carrier" },
        { label: "Followups", href: "/admin/carrier/followup" },
        { label: "Emails", href: "/admin/carrier/email" },
        { label: "Reports", href: "/admin/carrier/report" },
        { label: "Messages", href: "/admin/carrier/messages" },
        { label: "Internal Assistance", href: "/admin/carrier/assistance" }
      ]
    },
    {
      id: 'accounts',
      icon: <DocumentCurrencyBangladeshiIcon className="w-8 h-8 mr-3 text-yellow-500" />,
      label: "Accounts",
      roles: ["account", "carrier", "sale", "superAdmin", "accountMember", "saleMember", "carrierMember"],
      subItems: [
        {
          label: "Rates",
          subMenu: true,
          items: [
            { label: "CC Rates", href: "/admin/ccrates" },
            { label: "CLI Rates", href: "/admin/clirates" },
            { label: "Special Rates", href: "/admin/specialrates" },
            { label: "Targeted Rates", href: "/admin/targetedrates" }
          ]
        },
        {
          label: "Recharge",
          subMenu: true,
          items: [
            { label: "Recharge Form", href: "/admin/recharge" },
            { label: "Payment Form", href: "/admin/vendor_form" }
          ]
        },
        ...(["account", "superAdmin", "accountMember"].includes(adminDetails?.role) ? [
          {
            label: "Requests",
            subMenu: true,
            items: [
              { label: "Recharge Requests", href: "/admin/recharge_requests" },
              { label: "Payment Requests", href: "/admin/vendorpayment" },
              { label: "Over Draft Requests", href: "/admin/overdraft_requests" },
              { label: "Private Rate Requests", href: "/admin/privaterate_requests" }
            ]
          },
          { label: "Reports", href: "/admin/account/report" },
          { label: "Email", href: "/admin/account/email" },
          { label: "My Tickets", href: "/admin/account/myticket" },
          { label: "Follow-Ups", href: "/admin/account/followup" },
          { label: "Messages", href: "/admin/account/messages" },
          { label: "Internal Assistance", href: "/admin/account/assistance" }
        ] : [])
      ]
    },
    {
      id: 'support',
      icon: <LifebuoyIcon className="w-8 h-8 mr-3 text-red-500" />,
      label: "Support",
      roles: ["superAdmin", "support", "supportMember"],
      subItems: [
        { label: "Trouble Tickets", href: "/admin/support/troubleTickets" },
        { label: "Testing", href: "/admin/support/testing" },
        { label: "Follow-Ups", href: "/admin/support/followups" },
        { label: "Tasks", href: "/admin/support/task" },
        { label: "My Tickets", href: "/admin/support/myTickets" },
        { label: "Email", href: "/admin/support/email" },
        { label: "Messages", href: "/admin/support/messages" },
        { label: "Internal Assistance", href: "/admin/support/internalassistence" }
      ]
    },
    {
      id: 'communications',
      icon: <EnvelopeIcon className="w-8 h-8 mr-3 text-purple-500" />,
      label: "Communications",
      roles: ["superAdmin", "lead", "leadMember"],
      subItems: [
        { label: "Enquires", href: "/admin/communication/enquiry" },
        { label: "DID Numbers", href: "/admin/communication/didEnquiry" },
        { label: "My Tickets", href: "/admin/communication/myTickets" },
        { label: "Emails", href: "/admin/communication/email" },
        { label: "Chat Panel", href: "/admin/communication/chatpanel" },
        { label: "Messages", href: "/admin/communication/messages" },
        { label: "Internal Assistance", href: "/admin/communication/assistance" }
      ]
    },
    {
      id: 'settings',
      icon: <Cog6ToothIcon className="w-8 h-8 mr-3 text-gray-500" />,
      label: "Settings",
      roles: ["superAdmin", "carrier", "lead", "account", "sale", "support"],
      subItems: [
        ...(["superAdmin"].includes(adminDetails?.role) ? [
          { label: "User Management", href: "/admin/settings_page" },
          { label: "CRM Management", href: "/admin/customermanagement" },
          { label: "Staff Management", href: "/admin/allstaffmanagement" }
        ] : []),
        ...(["carrier", "lead", "account", "sale", "support"].includes(adminDetails?.role) ? [
          { label: "Staff Management", href: "/admin/staffmanagement" }
        ] : [])
      ]
    }
  ];

  // Filter items based on user role
  const filteredItems = navItems.filter(item =>
    item.roles.includes('all') ||
    item.roles.some(role => adminDetails?.role === role)
  );

  // Render desktop navigation item
  const renderDesktopItem = (item) => {
    if (item.href) {
      return (
        <div key={item.id}>
          <a href={item.href}>
            {item.icon}
          </a>
        </div>
      );
    }

    return (
      <div key={item.id} className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          {item.icon}
          {item.label}
        </a>
        {item.subItems && (
          <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
            {item.subItems.map((subItem, index) => (
              subItem.href ? (
                <a key={index} href={subItem.href} className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                  {subItem.label}
                </a>
              ) : subItem.subMenu ? (
                <div key={index} className="relative group">
                  <div
                    className="flex justify-between items-center px-6 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const subMenu = document.getElementById(`${item.id}-${index}-submenu`);
                      subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span>{subItem.label}</span>
                    <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500" />
                  </div>
                  <div
                    id={`${item.id}-${index}-submenu`}
                    className="absolute right-0 mt-0 bg-white border border-orange-500 shadow-lg rounded-lg w-56 hidden"
                    style={{
                      right: '-100%',
                      bottom: index === 0 ? '-120px' : '-40px'
                    }}
                  >
                    {subItem.items.map((menuItem, menuIndex) => (
                      <a
                        key={menuIndex}
                        href={menuItem.href}
                        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                      >
                        {menuItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render mobile navigation item
  const renderMobileItem = (item) => {
    if (item.href) {
      return (
        <a
          href={item.href}
          className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center">
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </div>
        </a>
      );
    }

    return (
      <details key={item.id} className="group">
        <summary className="flex justify-between items-center px-6 py-3 text-gray-600 hover:bg-gray-100 cursor-pointer list-none">
          <div className="flex items-center">
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </div>
          <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500 group-open:rotate-90 transform transition" />
        </summary>
        <div className="pl-6">
          {item.subItems?.map((subItem, index) => (
            subItem.href ? (
              <a
                key={index}
                href={subItem.href}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {subItem.label}
              </a>
            ) : subItem.subMenu ? (
              <details key={index} className="group">
                <summary className="flex justify-between items-center px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer list-none">
                  {subItem.label}
                  <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500 group-open:rotate-90 transform transition" />
                </summary>
                <div className="pl-3">
                  {subItem.items.map((menuItem, menuIndex) => (
                    <a
                      key={menuIndex}
                      href={menuItem.href}
                      className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {menuItem.label}
                    </a>
                  ))}
                </div>
              </details>
            ) : null
          ))}
        </div>
      </details>
    );
  };

  const SearchResultsDropdown = () => {
    if (!showSearchResults || filteredCustomers.length === 0) return null;

    return (
      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
        {filteredCustomers.map(customer => (
          <a
            key={customer.id}
            href={`/admin/customer/${customer.id}`} // Adjust this URL as needed
            className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
          >
            <div className="font-medium">{customer.companyName}</div>
            {customer.switchIps && (
              <div className="text-xs text-gray-500">
                IPs: {JSON.parse(customer.switchIps).map(ip => ip.ip).filter(ip => ip).join(', ')}
              </div>
            )}
          </a>
        ))}
      </div>
    );
  };


  return (
    <header className="w-full p-4 bg-white shadow-xl border-b-4 border-gray-300 flex items-center justify-between">
      {/* Hamburger Button (Mobile) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-700 focus:outline-none"
      >
        <Bars3Icon className="w-8 h-8" />
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 items-left">
        {filteredItems.map(item => renderDesktopItem(item))}
      </nav>

      {/* Search Bar (Desktop) - Only for members and admins */}
      {shouldShowSearchBar && (
        <div className="hidden md:flex items-center mx-4 flex-1" style={{ maxWidth: '600px', position: 'relative' }}>
          <div className="relative w-full mr-3">
            <input
              type="text"
              placeholder="Search by company name or IP..."
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
            <MagnifyingGlassIcon
              className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 cursor-pointer"
              onClick={handleSearch}
            />
            <SearchResultsDropdown />
          </div>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="w-5 h-6 mr-2" />
            <span className="text-sm">SEARCH</span>
          </button>
        </div>
      )}
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 top-full w-auto bg-white shadow-lg border-b border-gray-300 z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium">Menu</h3>
            <button onClick={() => setIsMenuOpen(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {/* Search Bar (Mobile) - Only for members and admins */}
          {/* {shouldShowSearchBar && (
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
          )} */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredItems.map(item => (
              <div key={item.id} className="border-b last:border-b-0">
                {renderMobileItem(item)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Dropdown */}
      <div className="relative group">
        <UserDropdown />
      </div>
    </header>
  );
};

export default Topbar;
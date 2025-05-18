import {
  // Existing icons
  SiWebmoney,
  SiDevexpress,
  IoAppsSharp,
  GiCloudRing,
  GiSurroundedEye,
  BsLifePreserver,
  
  // New icons
  FaChartLine,
  FaUsers,
  FaBell,
  FaEnvelope,
  FaFileAlt,
  FaComments,
  FaHandsHelping,
  FaTruck,
  FaShippingFast,
  FaMoneyBillWave,
  FaCreditCard,
  FaStar,
  FaBullseye,
  FaWallet,
  FaFileInvoiceDollar,
  FaTools,
  FaTicketAlt,
  FaFlask,
  FaTasks,
  FaHeadset,
  FaPhoneAlt,
  FaHashtag,
  FaUserCog,
  FaUsersCog,
  FaCog
} from 'react-icons/fa';

const iconStyle = {
  height: "30px",
  width: "30px",
  margin: "10px",
  color: "#4F46E5" // indigo-600
};

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
    label: "Leads",
    roles: ["carrier", "lead", "leadMember", "superAdmin"],
    subItems: [
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <SiWebmoney style={iconStyle} />
            </div>
            <span>New Leads</span>
          </div>
        ),
        href: "/admin/newLeads"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <SiDevexpress style={iconStyle} />
            </div>
            <span>Follow Up</span>
          </div>
        ),
        href: "/admin/notification"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <IoAppsSharp style={iconStyle} />
            </div>
            <span>Emails</span>
          </div>
        ),
        href: "/admin/leads/email"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <GiCloudRing style={iconStyle} />
            </div>
            <span>Reports</span>
          </div>
        ),
        href: "/admin/leads/report"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <GiSurroundedEye style={iconStyle} />
            </div>
            <span>Messages</span>
          </div>
        ),
        href: "/admin/leads/messages"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <BsLifePreserver style={iconStyle} />
            </div>
            <span>Internal Assistance</span>
          </div>
        ),
        href: "/admin/leads/assistance"
      }
    ]
  },
  {
    id: 'sales',
    label: "Sales",
    roles: ['sale', 'superAdmin', "saleMember"],
    subItems: [
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaChartLine style={iconStyle} />
            </div>
            <span>Leads</span>
          </div>
        ),
        href: "/admin/sale/leads"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaUsers style={iconStyle} />
            </div>
            <span>Customers</span>
          </div>
        ),
        href: "/admin/sale/customer"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaBell style={iconStyle} />
            </div>
            <span>Followups</span>
          </div>
        ),
        href: "/admin/sale/followups"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaEnvelope style={iconStyle} />
            </div>
            <span>Emails</span>
          </div>
        ),
        href: "/admin/sale/email"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaFileAlt style={iconStyle} />
            </div>
            <span>Reports</span>
          </div>
        ),
        href: "/admin/sale/report"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaComments style={iconStyle} />
            </div>
            <span>Messages</span>
          </div>
        ),
        href: "/admin/sale/messages"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaHandsHelping style={iconStyle} />
            </div>
            <span>Internal Assistance</span>
          </div>
        ),
        href: "/admin/sale/assistance"
      }
    ]
  },
  {
    id: 'carriers',
    label: "Carriers",
    roles: ["sale", "carrier", "superAdmin", "carrierMember"],
    subItems: [
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaTruck style={iconStyle} />
            </div>
            <span>Leads</span>
          </div>
        ),
        href: "/admin/carrier/leads"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaShippingFast style={iconStyle} />
            </div>
            <span>Carriers</span>
          </div>
        ),
        href: "/admin/carrier/carrier"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaBell style={iconStyle} />
            </div>
            <span>Followups</span>
          </div>
        ),
        href: "/admin/carrier/followup"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaEnvelope style={iconStyle} />
            </div>
            <span>Emails</span>
          </div>
        ),
        href: "/admin/carrier/email"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaFileAlt style={iconStyle} />
            </div>
            <span>Reports</span>
          </div>
        ),
        href: "/admin/carrier/report"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaComments style={iconStyle} />
            </div>
            <span>Messages</span>
          </div>
        ),
        href: "/admin/carrier/messages"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaHandsHelping style={iconStyle} />
            </div>
            <span>Internal Assistance</span>
          </div>
        ),
        href: "/admin/carrier/assistance"
      }
    ]
  },
  {
    id: 'accounts',
    label: "Accounts",
    roles: ["account", "carrier", "sale", "superAdmin", "accountMember", "saleMember", "carrierMember"],
    subItems: [
      {
        label: "Rates",
        subMenu: true,
        items: [
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaMoneyBillWave style={iconStyle} />
                </div>
                <span>CC Rates</span>
              </div>
            ),
            href: "/admin/ccrates"
          },
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaCreditCard style={iconStyle} />
                </div>
                <span>CLI Rates</span>
              </div>
            ),
            href: "/admin/clirates"
          },
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaStar style={iconStyle} />
                </div>
                <span>Special Rates</span>
              </div>
            ),
            href: "/admin/specialrates"
          },
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaBullseye style={iconStyle} />
                </div>
                <span>Targeted Rates</span>
              </div>
            ),
            href: "/admin/targetedrates"
          }
        ]
      },
      {
        label: "Recharge",
        subMenu: true,
        items: [
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaWallet style={iconStyle} />
                </div>
                <span>Recharge Form</span>
              </div>
            ),
            href: "/admin/recharge"
          },
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaFileInvoiceDollar style={iconStyle} />
                </div>
                <span>Payment Form</span>
              </div>
            ),
            href: "/admin/vendor_form"
          }
        ]
      },
      ...(["account", "superAdmin", "accountMember"].includes(adminDetails?.role) ? [
        {
          label: "Requests",
          subMenu: true,
          items: [
            {
              label: (
                <div className="flex items-center">
                  <div style={{
                    border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                  }}>
                    <FaWallet style={iconStyle} />
                  </div>
                  <span>Recharge Requests</span>
                </div>
              ),
              href: "/admin/recharge_requests"
            },
            {
              label: (
                <div className="flex items-center">
                  <div style={{
                    border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                  }}>
                    <FaFileInvoiceDollar style={iconStyle} />
                  </div>
                  <span>Payment Requests</span>
                </div>
              ),
              href: "/admin/vendorpayment"
            },
            {
              label: (
                <div className="flex items-center">
                  <div style={{
                    border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                  }}>
                    <FaMoneyBillWave style={iconStyle} />
                  </div>
                  <span>Over Draft Requests</span>
                </div>
              ),
              href: "/admin/overdraft_requests"
            },
            {
              label: (
                <div className="flex items-center">
                  <div style={{
                    border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                  }}>
                    <FaStar style={iconStyle} />
                  </div>
                  <span>Private Rate Requests</span>
                </div>
              ),
              href: "/admin/privaterate_requests"
            }
          ]
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaFileAlt style={iconStyle} />
              </div>
              <span>Reports</span>
            </div>
          ),
          href: "/admin/account/report"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaEnvelope style={iconStyle} />
              </div>
              <span>Email</span>
            </div>
          ),
          href: "/admin/account/email"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaTicketAlt style={iconStyle} />
              </div>
              <span>My Tickets</span>
            </div>
          ),
          href: "/admin/account/myticket"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaBell style={iconStyle} />
              </div>
              <span>Follow-Ups</span>
            </div>
          ),
          href: "/admin/account/followup"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaComments style={iconStyle} />
              </div>
              <span>Messages</span>
            </div>
          ),
          href: "/admin/account/messages"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaHandsHelping style={iconStyle} />
              </div>
              <span>Internal Assistance</span>
            </div>
          ),
          href: "/admin/account/assistance"
        }
      ] : [])
    ]
  },
  {
    id: 'support',
    label: "Support",
    roles: ["superAdmin", "support", "supportMember"],
    subItems: [
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaTools style={iconStyle} />
            </div>
            <span>Trouble Tickets</span>
          </div>
        ),
        href: "/admin/support/troubleTickets"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaFlask style={iconStyle} />
            </div>
            <span>Testing</span>
          </div>
        ),
        href: "/admin/support/testing"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaBell style={iconStyle} />
            </div>
            <span>Follow-Ups</span>
          </div>
        ),
        href: "/admin/support/followups"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaTasks style={iconStyle} />
            </div>
            <span>Tasks</span>
          </div>
        ),
        href: "/admin/support/task"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaTicketAlt style={iconStyle} />
            </div>
            <span>My Tickets</span>
          </div>
        ),
        href: "/admin/support/myTickets"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaEnvelope style={iconStyle} />
            </div>
            <span>Email</span>
          </div>
        ),
        href: "/admin/support/email"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaComments style={iconStyle} />
            </div>
            <span>Messages</span>
          </div>
        ),
        href: "/admin/support/messages"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaHeadset style={iconStyle} />
            </div>
            <span>Internal Assistance</span>
          </div>
        ),
        href: "/admin/support/internalassistence"
      }
    ]
  },
  {
    id: 'communications',
    label: "Communications",
    roles: ["superAdmin", "lead", "leadMember"],
    subItems: [
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaPhoneAlt style={iconStyle} />
            </div>
            <span>Enquires</span>
          </div>
        ),
        href: "/admin/communication/enquiry"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaHashtag style={iconStyle} />
            </div>
            <span>DID Numbers</span>
          </div>
        ),
        href: "/admin/communication/didEnquiry"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaTicketAlt style={iconStyle} />
            </div>
            <span>My Tickets</span>
          </div>
        ),
        href: "/admin/communication/myTickets"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaEnvelope style={iconStyle} />
            </div>
            <span>Emails</span>
          </div>
        ),
        href: "/admin/communication/email"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaComments style={iconStyle} />
            </div>
            <span>Chat Panel</span>
          </div>
        ),
        href: "/admin/communication/chatpanel"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaComments style={iconStyle} />
            </div>
            <span>Messages</span>
          </div>
        ),
        href: "/admin/communication/messages"
      },
      {
        label: (
          <div className="flex items-center">
            <div style={{
              border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
            }}>
              <FaHeadset style={iconStyle} />
            </div>
            <span>Internal Assistance</span>
          </div>
        ),
        href: "/admin/communication/assistance"
      }
    ]
  },
  {
    id: 'settings',
    label: "Settings",
    roles: ["superAdmin", "carrier", "lead", "account", "sale", "support"],
    subItems: [
      ...(["superAdmin"].includes(adminDetails?.role) ? [
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaUserCog style={iconStyle} />
              </div>
              <span>User Management</span>
            </div>
          ),
          href: "/admin/settings_page"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaUsersCog style={iconStyle} />
              </div>
              <span>CRM Management</span>
            </div>
          ),
          href: "/admin/customermanagement"
        },
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaUsers style={iconStyle} />
              </div>
              <span>Staff Management</span>
            </div>
          ),
          href: "/admin/allstaffmanagement"
        }
      ] : []),
      ...(["carrier", "lead", "account", "sale", "support"].includes(adminDetails?.role) ? [
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaUsers style={iconStyle} />
              </div>
              <span>Staff Management</span>
            </div>
          ),
          href: "/admin/staffmanagement"
        }
      ] : [])
    ]
  }
];
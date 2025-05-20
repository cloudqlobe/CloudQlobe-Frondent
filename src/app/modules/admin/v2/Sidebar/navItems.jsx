import {
  // FontAwesome icons
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
} from 'react-icons/fa';

import { SiWebmoney, SiDevexpress } from 'react-icons/si';
import { IoAppsSharp } from 'react-icons/io5';
import { GiCloudRing, GiSurroundedEye } from 'react-icons/gi';
import { BsLifePreserver } from 'react-icons/bs';
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";

// Color definitions
const iconColors = {
  primary: "#3B82F6",    // Blue
  secondary: "#10B981",  // Emerald
  accent: "#F59E0B",     // Amber
  danger: "#EF4444",     // Red
  purple: "#8B5CF6",     // Purple
  indigo: "#6366F1",     // Indigo
  pink: "#EC4899",       // Pink
  teal: "#14B8A6",       // Teal
  cyan: "#06B6D4",       // Cyan
  dark: "#1F2937",       // Dark gray
  light: "#6B7280"       // Light gray
};

const iconStyle = (colorKey = 'primary') => ({
  color: iconColors[colorKey] || iconColors.primary,
  fontSize: "25px",
  marginLeft: "12px", 
  marginTop: "12px"
});

export const getNavItems = (adminRole) => {
  return [
    {
      id: 'dashboard',
      icon: <HomeIcon className="h-8 w-8 text-orange-400" />
,
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
                <SiWebmoney style={iconStyle('primary')} />
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
                <SiDevexpress style={iconStyle('secondary')} />
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
                <IoAppsSharp style={iconStyle('accent')} />
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
                <GiCloudRing style={iconStyle('purple')} />
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
                <GiSurroundedEye style={iconStyle('indigo')} />
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
                <BsLifePreserver style={iconStyle('danger')} />
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
                <FaChartLine style={iconStyle('primary')} />
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
                <FaUsers style={iconStyle('secondary')} />
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
                <FaBell style={iconStyle('accent')} />
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
                <FaEnvelope style={iconStyle('purple')} />
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
                <FaFileAlt style={iconStyle('indigo')} />
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
                <FaComments style={iconStyle('pink')} />
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
                <FaHandsHelping style={iconStyle('danger')} />
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
      roles: ["sale", "carrier", "superAdmin","saleMember", "carrierMember"],
      subItems: [
        {
          label: (
            <div className="flex items-center">
              <div style={{
                border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
              }}>
                <FaTruck style={iconStyle('primary')} />
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
                <FaShippingFast style={iconStyle('secondary')} />
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
                <FaBell style={iconStyle('accent')} />
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
                <FaEnvelope style={iconStyle('purple')} />
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
                <FaFileAlt style={iconStyle('indigo')} />
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
                <FaComments style={iconStyle('pink')} />
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
                <FaHandsHelping style={iconStyle('danger')} />
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
                    <FaMoneyBillWave style={iconStyle('primary')} />
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
                    <FaCreditCard style={iconStyle('secondary')} />
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
                    <FaStar style={iconStyle('accent')} />
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
                    <FaBullseye style={iconStyle('purple')} />
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
                    <FaWallet style={iconStyle('teal')} />
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
                    <FaFileInvoiceDollar style={iconStyle('cyan')} />
                  </div>
                  <span>Payment Form</span>
                </div>
              ),
              href: "/admin/vendor_form"
            }
          ]
        },
        ...(["account", "superAdmin", "accountMember"].includes(adminRole) ? [
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
                      <FaWallet style={iconStyle('teal')} />
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
                      <FaFileInvoiceDollar style={iconStyle('cyan')} />
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
                      <FaMoneyBillWave style={iconStyle('primary')} />
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
                      <FaStar style={iconStyle('accent')} />
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
                  <FaFileAlt style={iconStyle('indigo')} />
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
                  <FaEnvelope style={iconStyle('purple')} />
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
                  <FaTicketAlt style={iconStyle('pink')} />
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
                  <FaBell style={iconStyle('accent')} />
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
                  <FaComments style={iconStyle('dark')} />
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
                  <FaHandsHelping style={iconStyle('danger')} />
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
                <FaTools style={iconStyle('primary')} />
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
                <FaFlask style={iconStyle('secondary')} />
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
                <FaBell style={iconStyle('accent')} />
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
                <FaTasks style={iconStyle('purple')} />
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
                <FaTicketAlt style={iconStyle('pink')} />
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
                <FaEnvelope style={iconStyle('indigo')} />
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
                <FaComments style={iconStyle('dark')} />
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
                <FaHeadset style={iconStyle('danger')} />
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
                <FaPhoneAlt style={iconStyle('primary')} />
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
                <FaHashtag style={iconStyle('secondary')} />
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
                <FaTicketAlt style={iconStyle('accent')} />
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
                <FaEnvelope style={iconStyle('purple')} />
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
                <FaComments style={iconStyle('indigo')} />
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
                <FaComments style={iconStyle('pink')} />
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
                <FaHeadset style={iconStyle('danger')} />
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
        ...(["superAdmin"].includes(adminRole) ? [
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaUserCog style={iconStyle('primary')} />
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
                  <FaUsersCog style={iconStyle('secondary')} />
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
                  <FaUsers style={iconStyle('accent')} />
                </div>
                <span>Staff Management</span>
              </div>
            ),
            href: "/admin/allstaffmanagement"
          }
        ] : []),
        ...(["carrier", "lead", "account", "sale", "support"].includes(adminRole) ? [
          {
            label: (
              <div className="flex items-center">
                <div style={{
                  border: "1px solid", height: "50px", width: "50px", borderRadius: "7px", marginRight: "13px"
                }}>
                  <FaUsers style={iconStyle('primary')} />
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
};
// import React, { useState, useEffect, useContext } from "react";
// import Layout from "../../layout/page";
// import { FaReply, FaUserCircle, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import adminContext from "../../../../../../context/page";
// import axiosInstance from "../../utils/axiosinstance";

import Layout from "../../layout/page";

// const LeadsMessage = () => {
//   const { adminDetails } = useContext(adminContext);
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isReplying, setIsReplying] = useState(false);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [replyToMessage, setReplyToMessage] = useState(null);
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const [confirmationMessage, setConfirmationMessage] = useState(null);
//   const [viewedMessage, setViewedMessage] = useState(null);

//   const openMessagePopup = (msg) => {
//     setViewedMessage(msg);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     if (selectedContact) {
//       markMessagesAsRead(selectedContact)
//       fetchMessages();
//     }
//   }, [selectedContact]);

//   const fetchMessages = async () => {
//     try {
//       const res = await axiosInstance.get("api/member/getLeadsMessage");
//       const allMessages = res.data;
//       setMessages(allMessages);

//       const uniqueRoles = new Map(); // Map to store unique roles and last messages
//       const unreadCountsMap = {}; // Track unread message counts

//       allMessages.forEach((msg) => {
//         const contactRole = msg.chat_from === "Marketing" ? msg.chat_to : msg.chat_from;

//         // Store the last message per contact
//         if (!uniqueRoles.has(contactRole) || new Date(msg.timestamp) > new Date(uniqueRoles.get(contactRole).timestamp)) {
//           uniqueRoles.set(contactRole, msg);
//         }

//         // Count unread messages
//         if (!msg.read_status && msg.chat_to === "Marketing") {
//           unreadCountsMap[contactRole] = (unreadCountsMap[contactRole] || 0) + 1;
//         }
//       });

//       setContacts([...uniqueRoles.keys()].map((role) => ({ role: role, ...uniqueRoles.get(role) })));
//       setUnreadCounts(unreadCountsMap);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };


//   const filteredMessages = messages.filter(
//     (msg) =>
//       selectedContact &&
//       (msg.chat_from == selectedContact.role || msg.chat_to == selectedContact.role)
//   );

//   const markMessagesAsRead = async (contactId) => {
//     const id = contactId.sender_id

//     try {
//       await axiosInstance.put("api/member/markAsRead", { id });
//       setUnreadCounts((prev) => ({ ...prev, [contactId.role]: 0 }));
//     } catch (error) {
//       console.error("Error marking messages as read:", error);
//     }
//   };

//   const openReplyModal = (msg) => {
//     setReplyToMessage(msg);
//     setReplyMessage("");
//     setIsReplying(true);
//   };

//   const openConfirmationPopup = (msg) => {
//     if (msg.chat_from === "Marketing") {
//       setConfirmationMessage(msg);
//     }
//   };

//   const confirmMessage = async () => {
//     if (!confirmationMessage) return;
//     try {
//       await axiosInstance.delete(`api/member/deleteMessage/${confirmationMessage.id}`);
//       setMessages(messages.filter((msg) => msg.id !== confirmationMessage.id));
//       setConfirmationMessage(null);
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     }
//   }

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       sender: adminDetails.name,
//       sender_id: adminDetails.id,
//       receiver: selectedContact.sender,
//       receiver_id: selectedContact.id,
//       message: newMessage,
//       chat_from: "Marketing",
//       chat_to: selectedContact.role,
//       timestamp: new Date().toISOString(), // Add system timestamp
//     };

//     try {
//       await axiosInstance.post("api/member/createMessage", messageData);

//       setMessages([...messages, messageData]); // Update UI
//       setNewMessage(""); // Clear input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const sendReply = async () => {
//     if (!replyMessage.trim() || !replyToMessage) return;

//     const replyData = {
//       receiver: adminDetails.name,
//       receiver_id: adminDetails.id,
//       reply_of_message: replyMessage,
//       reply_timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
//       message_id: replyToMessage.id,
//     };

//     try {
//       await axiosInstance.put("api/member/messageReply", replyData);
//       setMessages(
//         messages.map((msg) =>
//           msg.id === replyToMessage.id ? { ...msg, reply_of_message: replyMessage, reply_timestamp: replyData.reply_timestamp } : msg
//         )
//       );
//       setIsReplying(false);
//     } catch (error) {
//       console.error("Error sending reply:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-100 py-4">
//         <div className="max-w-7xl mx-auto px-3">
//           <h1 className="text-4xl font-bold text-gray-600 mb-3 text-center flex items-center justify-center">
//             <MdMessage className="mr-2 text-blue-500" /> Message Box
//           </h1>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             {/* Contacts List */}
//             <div className="bg-white shadow-2xl p-4 lg:col-span-1 rounded-lg">
//               <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center">
//                 Chats <FaPlus className="ml-2 text-blue-500 cursor-pointer" title="Add Contact" />
//               </h2>
//               <ul>
//                 {contacts.length > 0 ? (
//                   contacts
//                     .filter((contacts) => contacts.role !== "Marketing")
//                     .map((contact) => (
//                       <li
//                         key={contact.id}
//                         onClick={() => setSelectedContact(contact)}
//                         className={`p-3 mb-2 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center space-x-3 transition-colors ${selectedContact?.id === contact.id ? "bg-blue-100" : "bg-gray-50"
//                           }`}
//                       >
//                         <FaUserCircle className="text-gray-500 text-3xl" />
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-800">{contact.role}</h3>
//                           <p className="text-sm text-gray-500 truncate">{contact.message}</p>
//                         </div>
//                         {unreadCounts[contact.role] > 0 && (
//                           <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                             {unreadCounts[contact.role]}
//                           </span>
//                         )}
//                       </li>
//                     ))
//                 ) : (
//                   <p className="text-gray-500">No contacts available</p>
//                 )}
//               </ul>
//             </div>

//             {/* Chat Area */}
//             <div className="bg-white shadow-2xl p-4 lg:col-span-2 flex flex-col h-[600px] rounded-lg">
//               {selectedContact ? (
//                 <>
//                   {/* Message Header */}
//                   <div className="border-b pb-3 mb-3 flex items-center">
//                     <FaUserCircle className="text-gray-500 text-3xl mr-3" />
//                     <div>
//                       <h3 className="font-medium text-gray-800">{selectedContact.role}</h3>
//                       <p className="text-xs text-gray-500">Online</p>
//                     </div>
//                   </div>

//                   {/* Messages Container */}
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4"> {/* Increased padding and spacing */}
//   {filteredMessages.map((msg, index) => {
//     const isSent = msg.chat_from === "Marketing";
//     const isSameSender = index > 0 && filteredMessages[index - 1].chat_from === msg.chat_from;
//     const isLastMessage = index === filteredMessages.length - 1;

//     return (
//       <div
//         key={index}
//         className={`flex ${isSent ? "justify-end" : "justify-start"} ${
//           isSameSender ? "mb-1" : "mb-4" // More space between different senders
//         } ${isLastMessage ? "mb-0" : ""}`} // Remove bottom margin for last message
//       >
//         <div className={`flex max-w-[80%] ${!isSent && "items-end"}`}>
//           {/* Avatar or spacer */}
//           {!isSent && !isSameSender && (
//             <div className="flex-shrink-0 mr-3 self-end"> {/* Increased right margin */}
//               <FaUserCircle className="text-gray-400 text-2xl" />
//             </div>
//           )}
//           {!isSent && isSameSender && <div className="w-10 mr-2"></div>} {/* Increased spacer width */}

//           {/* Message bubble */}
//           <div
//             className={`p-4 rounded-lg ${ // Increased padding
//               isSent
//                 ? "bg-green-100 rounded-br-none"
//                 : "bg-white rounded-bl-none border border-gray-200"
//             } ${
//               isSameSender
//                 ? isSent
//                   ? "rounded-tr-lg"
//                   : "rounded-tl-lg"
//                 : ""
//             } relative shadow-sm`}
//           >

            
//             <p className="text-gray-800">{msg.message}</p>
            
//             {msg.reply_of_message && (
//               <div className="mt-3 p-2 bg-gray-100 rounded-lg border-l-4 border-gray-300"> {/* Increased top margin */}
//                 <p className="text-xs text-gray-600">{msg.reply_of_message}</p>
//               </div>
//             )}
            
//             <div className="flex items-center justify-end mt-2 space-x-3"> {/* Increased top margin and spacing */}
//               <span className="text-xs text-gray-500">
//                 {new Date(msg.timestamp).toLocaleTimeString([], { 
//                   hour: '2-digit', 
//                   minute: '2-digit' 
//                 })}
//               </span>
              
//               {!msg.reply_of_message && msg.chat_to === "Marketing" && (
//                 <FaReply 
//                   className="text-gray-400 hover:text-gray-600 cursor-pointer" 
//                   size={14}
//                   onClick={() => openReplyModal(msg)} 
//                 />
//               )}
//             </div>
            
//             {msg.reply_of_message && msg.chat_from === "Marketing" && (
//               <button
//                 className="absolute -bottom-5 right-0 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs shadow-md hover:bg-blue-600 transition-colors"
//                 onClick={() => openMessagePopup(msg)}
//               >
//                 View
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>

//                   {/* Message Input */}
//                   <div className="mt-3 flex items-center space-x-2">
//                     <textarea
//                       rows={1}
//                       placeholder={`Message ${selectedContact?.role}...`}
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       className="flex-1 p-3 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     />
//                     <button
//                       onClick={sendMessage}
//                       className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
//                     >
//                       <FaReply />
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex-1 flex items-center justify-center">
//                   <p className="text-gray-500">Select a contact to start chatting</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Reply Modal */}
//         {isReplying && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//               <h2 className="text-xl font-semibold mb-4">Reply to message</h2>
//               <p className="mb-3 p-2 bg-gray-100 rounded">{replyToMessage.message}</p>
//               <textarea
//                 className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={replyMessage}
//                 onChange={(e) => setReplyMessage(e.target.value)}
//                 rows={3}
//                 placeholder="Type your reply..."
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsReplying(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={sendReply}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Send Reply
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {viewedMessage && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//               <h2 className="text-xl font-semibold mb-4">Message Details</h2>
//               <div className="mb-4 p-3 bg-gray-100 rounded">
//                 <p className="font-medium">Original Message:</p>
//                 <p className="mt-1">{viewedMessage.message}</p>
//               </div>
//               {viewedMessage.reply_of_message && (
//                 <div className="mb-4 p-3 bg-gray-100 rounded">
//                   <p className="font-medium">Your Reply:</p>
//                   <p className="mt-1">{viewedMessage.reply_of_message}</p>
//                 </div>
//               )}
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => setViewedMessage(null)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     setConfirmationMessage(viewedMessage);
//                     setViewedMessage(null);
//                   }}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Confirmation Popup */}
//         {confirmationMessage && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
//               <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
//               <p className="mb-6">Are you sure you want to confirm this message?</p>
//               <div className="flex justify-center space-x-6">
//                 <button
//                   onClick={() => setConfirmationMessage(null)}
//                   className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
//                 >
//                   <FaTimes className="mr-2" /> Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     confirmMessage();
//                     setConfirmationMessage(null);
//                   }}
//                   className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
//                 >
//                   <FaCheck className="mr-2" /> Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>


//     </Layout>
//   );
// };


const LeadsMessage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">Page under development</h1>
      </div>
    </Layout>
  );
};
export default LeadsMessage;

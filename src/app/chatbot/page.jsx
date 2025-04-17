import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare, Sparkles } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../modules/admin/v2/utils/axiosinstance";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [cid, setCid] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [faqQuestions, setFaqQuestions] = useState([]);
    const [customer, setCustomer] = useState();
    const [showFAQAfterAnswer, setShowFAQAfterAnswer] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
console.log(isAuthenticated);
console.log(customer);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showFAQAfterAnswer]);

    // Authentication check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    const decoded = jwtDecode(storedToken);
                    const customerId = decoded.id;
                    console.log(customerId);
                    
                    const response = await axiosInstance.get(`api/customer/${customerId}`);
                    console.log(response.data.customer, "data profile");
                    
                    setCustomer(response.data.customer)
                    setCid(customerId);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking authentication", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Fetch FAQ questions when component mounts
    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                const response = await axiosInstance.get(`api/member/chatbot/faq`);
                if (response.data && response.data.chatbot_faq) {
                    setFaqQuestions(response.data.chatbot_faq);
                }
            } catch (error) {
                console.error("Error fetching FAQ:", error);
            }
        };
        fetchFAQ();
    }, []);

    const handleDefaultQuestionClick = (question, answer) => {
        const newMessage = { type: "user", content: question };
        setMessages((prev) => [...prev, newMessage]);
        setShowFAQAfterAnswer(false);
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = {
                type: "bot",
                content: answer,
                time: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 500);
    };

    const handleShowFAQ = () => {
        setShowFAQAfterAnswer(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (inputMessage.trim()) {
            const newMessage = { type: "user", content: inputMessage };
            setMessages((prev) => [...prev, newMessage]);
            setShowFAQAfterAnswer(false);

            try {
                await axiosInstance.post("api/member/chat/create", {
                    customer_id: cid,
                    customer_name: customer.username,
                    message: inputMessage,
                    sender_type: "user",
                    status: "sent",
                });

                // if (response.data && response.data.data && response.data.data.msg) {
                //     const botResponse = {
                //         type: "bot",
                //         content: response.data.data.msg,
                //         time: response.data.data.time,
                //     };
                //     setMessages((prev) => [...prev, botResponse]);
                // }
            } catch (error) {
                console.error("Error sending message:", error);
            }

            setInputMessage("");
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-1 right-0 z-50">
            {/* Animated Bot Button */}
            <div className="chat-button" onClick={toggleChatbot}>
                <svg viewBox="0 0 200 200" className="bot-icon">
                    <circle className="bot-head" cx="100" cy="100" r="50" fill="#4A90E2" />
                    <circle className="bot-eye left" cx="80" cy="90" r="10" fill="white" />
                    <circle className="bot-eye right" cx="120" cy="90" r="10" fill="white" />
                    <circle className="bot-pupil" cx="80" cy="90" r="5" fill="#333" />
                    <circle className="bot-pupil" cx="120" cy="90" r="5" fill="#333" />
                    <path className="bot-smile" d="M75 110 Q100 130 125 110" stroke="white" strokeWidth="5" fill="none" />
                    <line className="antenna" x1="100" y1="50" x2="100" y2="30" stroke="#333" strokeWidth="4" />
                    <circle className="antenna-tip" cx="100" cy="25" r="5" fill="#333" />
                </svg>
            </div>

            {/* Chat Interface */}
            {isOpen && (
                <div className="relative w-80 md:w-96 h-[500px] group">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg opacity-50" />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000" />

                    {/* Main chat container */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl flex flex-col h-full border border-blue-100">
                        {/* Header */}
                        <div className="bg-[#323F3F] text-white p-3 rounded-t-lg flex justify-between items-center">
                            <div className="flex items-center gap-3 animate-fade-in">
                                <MessageSquare className="h-5 w-5 text-orange-300" />
                                <h3 className="font-semibold">Support Chat Assistance</h3>
                                <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />
                            </div>
                            <button 
                                onClick={toggleChatbot}
                                className="hover:bg-white/20 p-1.5 rounded-full transition-colors duration-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 text-center">Hi there! How can I help you today?</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {faqQuestions.map((faq, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDefaultQuestionClick(faq.question, faq.answer)}
                                                className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors duration-200"
                                            >
                                                {faq.question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {messages.map((message, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        className={`flex ${message.type === "bot" ? "justify-start" : "justify-end"} animate-slide-in`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl p-3 transition-all duration-200 hover:scale-[1.02] ${
                                                message.type === "bot"
                                                    ? "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800 shadow-sm"
                                                    : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                    {/* Show FAQ questions after last message if showFAQAfterAnswer is true */}
                                    {index === messages.length - 1 && message.type === "bot" && (
                                        <div className="flex justify-start">
                                            <button
                                                onClick={handleShowFAQ}
                                                className="text-sm text-blue-600 hover:text-blue-800 underline mt-1 ml-2"
                                            >
                                                Ask more questions
                                            </button>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}

                            {/* Show FAQ questions below all messages when showFAQAfterAnswer is true */}
                            {showFAQAfterAnswer && (
                                <div className="space-y-2 mt-4">
                                    <p className="text-sm text-gray-500 text-center">What else can I help you with?</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {faqQuestions.map((faq, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDefaultQuestionClick(faq.question, faq.answer)}
                                                className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors duration-200"
                                            >
                                                {faq.question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input form */}
                        <form onSubmit={handleSubmit} className="p-4 flex border-t border-blue-50">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder={isAuthenticated ? "Type your message..." : "Please login to chat"}
                                className="flex-1 p-2 border border-blue-100 rounded-full bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="ml-2 p-2 bg-gradient-to-r from-gray-600 to-[#323F3F] text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Animations and styles */}
            <style jsx>{`
                .chat-button {
                    width: 120px;
                    height: 120px;
                    cursor: pointer;
                    transform-origin: center;
                    animation: float 2s ease-in-out infinite;
                    margin-bottom: 4em;
                }

                .bot-icon {
                    width: 100%;
                    height: 100%;
                }

                .bot-head {
                    animation: pulse 2s ease-in-out infinite;
                }

                .bot-eye {
                    animation: blink 4s infinite;
                }

                .antenna-tip {
                    animation: glow 1.5s ease-in-out infinite;
                }

                .bot-smile {
                    animation: smile 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes blink {
                    0%, 96%, 100% { transform: scaleY(1); }
                    98% { transform: scaleY(0.1); }
                }

                @keyframes glow {
                    0%, 100% { fill: #fff; }
                    50% { fill: #FFD700; }
                }

                @keyframes smile {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default Chatbot;
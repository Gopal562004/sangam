import React, { useState, useEffect } from 'react';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import ChatHeader from './components/ChatHeader';
const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      type: "mentor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "online",
      lastMessage: "Great progress on your project! Let\'s schedule a review session.",
      lastMessageSender: null,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isTyping: false,
      isPinned: true,
      isMuted: false,
      lastMessageStatus: "read",
      lastSeen: new Date(Date.now() - 60000),
      memberCount: null
    },
    {
      id: 2,
      name: "Alex Chen",
      type: "mentee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "away",
      lastMessage: "Thank you for the feedback on my resume. I\'ll make those changes.",
      lastMessageSender: null,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      lastMessageStatus: "delivered",
      lastSeen: new Date(Date.now() - 900000),
      memberCount: null
    },
    {
      id: 3,
      name: "Frontend Developers",
      type: "group",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=center",
      status: null,
      lastMessage: "Has anyone worked with React 18 concurrent features?",
      lastMessageSender: "Mike",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 5,
      isTyping: true,
      isPinned: false,
      isMuted: false,
      lastMessageStatus: null,
      lastSeen: null,
      memberCount: 12
    },
    {
      id: 4,
      name: "Prof. Michael Rodriguez",
      type: "mentor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "busy",
      lastMessage: "I\'ll review your thesis chapter by tomorrow evening.",
      lastMessageSender: null,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      isTyping: false,
      isPinned: false,
      isMuted: true,
      lastMessageStatus: "read",
      lastSeen: new Date(Date.now() - 3600000),
      memberCount: null
    },
    {
      id: 5,
      name: "Emma Wilson",
      type: "mentee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "offline",
      lastMessage: "Could we reschedule our meeting to next week?",
      lastMessageSender: null,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 1,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      lastMessageStatus: "sent",
      lastSeen: new Date(Date.now() - 43200000),
      memberCount: null
    },
    {
      id: 6,
      name: "Data Science Study Group",
      type: "group",
      avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop&crop=center",
      status: null,
      lastMessage: "Don\'t forget about tomorrow\'s Python workshop!",
      lastMessageSender: "Sarah",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
      isTyping: false,
      isPinned: false,
      isMuted: false,
      lastMessageStatus: null,
      lastSeen: null,
      memberCount: 8
    }
  ];

  // Mock messages for selected conversation
  const getMessagesForConversation = (conversationId) => {
    const messageData = {
      1: [
        {
          id: 1,
          text: "Hi Dr. Johnson! I\'ve completed the first draft of my project proposal.",
          sender: "You",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
          status: "read",
          avatar: null
        },
        {
          id: 2,
          text: "That's excellent! I'm looking forward to reviewing it. Could you send me the document?",
          sender: "Dr. Sarah Johnson",
          timestamp: new Date(Date.now() - 3300000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 3,
          text: "project_proposal_v1.pdf",
          sender: "You",
          timestamp: new Date(Date.now() - 3000000),
          type: "file",
          status: "read",
          fileName: "project_proposal_v1.pdf",
          fileSize: 2048576,
          avatar: null
        },
        {
          id: 4,
          text: "Perfect! I've reviewed your proposal and it looks very promising. The research methodology is solid.",
          sender: "Dr. Sarah Johnson",
          timestamp: new Date(Date.now() - 1800000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 5,
          text: "Great progress on your project! Let\'s schedule a review session.",
          sender: "Dr. Sarah Johnson",
          timestamp: new Date(Date.now() - 300000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
      ],
      2: [
        {
          id: 1,
          text: "Hi Alex! How\'s your job search going?",
          sender: "You",
          timestamp: new Date(Date.now() - 7200000),
          type: "text",
          status: "read",
          avatar: null
        },
        {
          id: 2,
          text: "It\'s going well! I\'ve had a few interviews this week. Could you help me review my resume one more time?",
          sender: "Alex Chen",
          timestamp: new Date(Date.now() - 5400000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 3,
          text: "Of course! Send it over and I\'ll take a look.",
          sender: "You",
          timestamp: new Date(Date.now() - 5100000),
          type: "text",
          status: "read",
          avatar: null
        },
        {
          id: 4,
          text: "Thank you for the feedback on my resume. I\'ll make those changes.",
          sender: "Alex Chen",
          timestamp: new Date(Date.now() - 1800000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
      ],
      3: [
        {
          id: 1,
          text: "Welcome to the Frontend Developers group! Feel free to ask questions and share resources.",
          sender: "Admin",
          timestamp: new Date(Date.now() - 86400000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=center"
        },
        {
          id: 2,
          text: "Thanks! I\'m excited to be here. I\'m currently learning React and would love to connect with other developers.",
          sender: "You",
          timestamp: new Date(Date.now() - 82800000),
          type: "text",
          status: "read",
          avatar: null
        },
        {
          id: 3,
          text: "Has anyone worked with React 18 concurrent features?",
          sender: "Mike",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
          status: null,
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
      ]
    };
    
    return messageData?.[conversationId] || [];
  };

  useEffect(() => {
    if (selectedConversation) {
      setMessages(getMessagesForConversation(selectedConversation?.id));
    }
  }, [selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 lg:pt-5 pb-16 lg:pb-0">
        <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)] flex">
          {/* Mobile Chat Header */}
          <ChatHeader
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            className="absolute top-16 lg:top-32 left-0 right-0 z-30"
          />

          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Conversation List Sidebar */}
          <div
            className={`
            fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-full
            w-80 lg:w-80 bg-card border-r border-border z-30 lg:z-0
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
          >
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              className="h-full"
            />
          </div>

          {/* Chat Window */}
          <div className="flex-1 pt-16 lg:pt-0">
            <ChatWindow
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
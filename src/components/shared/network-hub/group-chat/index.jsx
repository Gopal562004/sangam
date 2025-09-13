import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GroupHeader from "./components/GroupHeader";
import MemberSidebar from "./components/MemberSidebar";
import GroupMessage from "./components/GroupMessage";
import MessageInput from "./components/MessageInput";
import TypingIndicator from "./components/TypingIndicator";
import AnnouncementBanner from "./components/AnnouncementBanner";

const GroupChatPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);

  // Mock data
  const currentUserId = "user-1";

  const groupData = {
    id: "group-1",
    name: "React Developers Community",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=face",
    memberCount: 156,
    onlineCount: 23,
    isActive: true,
    description:
      "A community for React developers to share knowledge, ask questions, and collaborate on projects.",
  };

  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      type: "announcement",
      content:
        "Welcome to the React Developers Community! Please read our community guidelines and introduce yourself.",
      timestamp: new Date(Date.now() - 86400000),
      sender: {
        id: "admin-1",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        role: "admin",
      },
    },
    {
      id: "msg-2",
      type: "text",
      content:
        "Hey everyone! I'm working on a new React project and could use some advice on state management. Should I go with Redux Toolkit or Zustand?",
      timestamp: new Date(Date.now() - 7200000),
      sender: {
        id: "user-2",
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
      reactions: [
        { emoji: "🤔", count: 3, hasReacted: false },
        { emoji: "👍", count: 5, hasReacted: true },
      ],
    },
    {
      id: "msg-3",
      type: "text",
      content:
        "For smaller projects, I'd recommend Zustand. It's much simpler to set up and has less boilerplate. Redux Toolkit is great for larger, more complex applications.",
      timestamp: new Date(Date.now() - 7000000),
      sender: {
        id: "user-3",
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        role: "moderator",
      },
      replyTo: {
        id: "msg-2",
        sender: { name: "Mike Chen" },
        content: "Should I go with Redux Toolkit or Zustand?",
      },
    },
    {
      id: "msg-4",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      caption: "Here's a diagram showing the component architecture I'm using",
      timestamp: new Date(Date.now() - 6800000),
      sender: {
        id: "user-2",
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
    },
    {
      id: "msg-5",
      type: "text",
      content:
        "That looks like a solid architecture! Have you considered using React Query for your API calls? It pairs really well with Zustand.",
      timestamp: new Date(Date.now() - 6600000),
      sender: {
        id: "user-4",
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
    },
    {
      id: "msg-6",
      type: "file",
      content: "#",
      fileName: "react-best-practices.pdf",
      fileSize: "2.3 MB",
      timestamp: new Date(Date.now() - 6400000),
      sender: {
        id: "user-3",
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        role: "moderator",
      },
    },
    {
      id: "msg-7",
      type: "text",
      content:
        "Thanks everyone! This is exactly the kind of feedback I was looking for. I'll go with Zustand and React Query for this project.",
      timestamp: new Date(Date.now() - 6200000),
      sender: {
        id: "user-2",
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
      reactions: [
        { emoji: "🎉", count: 8, hasReacted: false },
        { emoji: "👏", count: 4, hasReacted: true },
      ],
    },
    {
      id: "msg-8",
      type: "text",
      content:
        "Happy to help! Feel free to share your progress as you build it out. We love seeing what the community creates!",
      timestamp: new Date(Date.now() - 300000),
      sender: {
        id: currentUserId,
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
    },
  ]);

  const members = [
    {
      id: "admin-1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      role: "admin",
      isOnline: true,
      status: "Managing community",
    },
    {
      id: "user-3",
      name: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      role: "moderator",
      isOnline: true,
      status: "Available for help",
    },
    {
      id: currentUserId,
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: true,
      status: "Online",
    },
    {
      id: "user-2",
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: true,
      status: "Working on React project",
    },
    {
      id: "user-4",
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: false,
      status: "Last seen 2 hours ago",
    },
    {
      id: "user-5",
      name: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: true,
      status: "Online",
    },
    {
      id: "user-6",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: false,
      status: "Last seen yesterday",
    },
    {
      id: "user-7",
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      role: "member",
      isOnline: true,
      status: "Learning React hooks",
    },
  ];

  const announcement = {
    id: "ann-1",
    content:
      "🎉 We've reached 150+ members! Thank you all for making this community amazing. New React 18 resources have been added to our shared drive.",
    timestamp: new Date(Date.now() - 3600000),
    author: {
      name: "Sarah Johnson",
      role: "admin",
    },
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing users
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUsers = members?.filter(
        (m) => m?.isOnline && m?.id !== currentUserId
      );
      if (Math.random() > 0.8 && randomUsers?.length > 0) {
        const typingUser =
          randomUsers?.[Math.floor(Math.random() * randomUsers?.length)];
        setTypingUsers([typingUser]);
        setTimeout(() => setTypingUsers([]), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [members, currentUserId]);

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...messageData,
      timestamp: new Date(),
      sender: {
        id: currentUserId,
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
        role: "member",
      },
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReaction = (messageId, emoji) => {
    setMessages((prev) =>
      prev?.map((msg) => {
        if (msg?.id === messageId) {
          const reactions = msg?.reactions || [];
          const existingReaction = reactions?.find((r) => r?.emoji === emoji);

          if (existingReaction) {
            if (existingReaction?.hasReacted) {
              // Remove reaction
              return {
                ...msg,
                reactions:
                  existingReaction?.count === 1
                    ? reactions?.filter((r) => r?.emoji !== emoji)
                    : reactions?.map((r) =>
                        r?.emoji === emoji
                          ? { ...r, count: r?.count - 1, hasReacted: false }
                          : r
                      ),
              };
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: reactions?.map((r) =>
                  r?.emoji === emoji
                    ? { ...r, count: r?.count + 1, hasReacted: true }
                    : r
                ),
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [...reactions, { emoji, count: 1, hasReacted: true }],
            };
          }
        }
        return msg;
      })
    );
  };

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const handleMention = (user) => {
    console.log("Mention user:", user);
    // Could open user profile or start direct message
  };

  const handleDirectMessage = (member) => {
    console.log("Direct message to:", member);
    navigate("/chat");
  };

  const handleTyping = () => {
    // Simulate typing indicator for current user
    console.log("User is typing...");
  };

  const handleGroupSettings = () => {
    console.log("Open group settings");
  };

  const handleAnnouncementDismiss = (announcementId) => {
    console.log("Dismiss announcement:", announcementId);
  };

  const shouldShowAvatar = (message, index) => {
    if (index === 0) return true;
    const prevMessage = messages?.[index - 1];
    return (
      prevMessage?.sender?.id !== message?.sender?.id ||
      new Date(message.timestamp) - new Date(prevMessage.timestamp) > 300000
    ); // 5 minutes
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 lg:pt-5 pb-16 lg:pb-0">
        <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Group Header */}
            <GroupHeader
              group={groupData}
              onToggleMemberSidebar={() =>
                setIsMemberSidebarOpen(!isMemberSidebarOpen)
              }
              isMemberSidebarOpen={isMemberSidebarOpen}
              onGroupSettings={handleGroupSettings}
              isAdmin={
                members?.find((m) => m?.id === currentUserId)?.role === "admin"
              }
            />

            {/* Announcement Banner */}
            <AnnouncementBanner
              announcement={announcement}
              onDismiss={handleAnnouncementDismiss}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-1">
                {messages?.map((message, index) => (
                  <GroupMessage
                    key={message?.id}
                    message={message}
                    isOwn={message?.sender?.id === currentUserId}
                    showAvatar={shouldShowAvatar(message, index)}
                    onReaction={handleReaction}
                    onReply={handleReply}
                    onMention={handleMention}
                    currentUserId={currentUserId}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Typing Indicator */}
              <TypingIndicator typingUsers={typingUsers} />
            </div>

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              replyTo={replyTo}
              onCancelReply={() => setReplyTo(null)}
            />
          </div>

          {/* Member Sidebar */}
          <MemberSidebar
            members={members}
            isOpen={isMemberSidebarOpen}
            onClose={() => setIsMemberSidebarOpen(false)}
            onDirectMessage={handleDirectMessage}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';

const ChatBotIcon = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: #0961F5;
  color: white;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #074bbf;
  }
`;

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: #0961F5;
  color: white;
  padding: 10px;
  border-radius: 16px 16px 0 0;
  text-align: center;
  font-weight: bold;
`;

const ChatContent = styled.div`
  padding: 10px;
  height: 250px;
  overflow-y: auto;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  .message-icon {
    margin-right: 10px;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 0 0 16px 16px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  background-color: #0961F5;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #074bbf;
  }
`;

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);

    const toggleChat = () => {
        setIsChatOpen(prevState => !prevState);
    };

    const handleSendMessage = async () => {
        if (chatInput.trim() !== '') {
            const newMessage = { sender: 'user', text: chatInput };
            setMessages(prevMessages => [...prevMessages, newMessage]);

            let responseData;
            if (chatInput === "안녕하세요") {
                responseData = "안녕하세요! 무엇을 도와드릴까요?";
            } else if (chatInput === "정보처리기사 시험을 준비하려고 하는데 어떤 강의를 추천하세요?") {
                responseData = "정보처리기사 필기(기본편)부터 학습하시는 것을 추천드립니다.";
            } else if (chatInput === "정보처리기사 기본편을 이미 학습했다면 그 다음은 어떤 강의를 추천하시나요?") {
                responseData = "정보처리기사 필기(심화편)을 학습하시면서 기출문제 풀이를 하실 것을 추천드립니다.";
            } else {
                responseData = "죄송합니다, 이해하지 못했습니다.";
            }

            await typeMessage(responseData);

            setChatInput('');
        }
    };

    const typeMessage = async (message) => {
        setMessages(prevMessages => [...prevMessages, { sender: 'gpt', text: '' }]);

        for (let i = 0; i < message.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setMessages(prevMessages => {
                const lastMessageIndex = prevMessages.length - 1;
                const lastMessage = prevMessages[lastMessageIndex];

                if (lastMessage && lastMessage.text !== undefined) {
                    const updatedMessage = lastMessage.text + message[i];

                    const updatedMessages = [...prevMessages];
                    updatedMessages[lastMessageIndex] = {
                        ...lastMessage,
                        text: updatedMessage
                    };

                    return updatedMessages;
                }
                return prevMessages;
            });
        }
    };

    return (
        <>
            <ChatBotIcon onClick={toggleChat}>
                <FaRobot size={24} />
            </ChatBotIcon>

            <ChatBotContainer isOpen={isChatOpen}>
                <ChatHeader>AI Chatbot</ChatHeader>
                <ChatContent>
                    {messages.map((msg, index) => (
                        <ChatMessage key={index}>
                            {msg.sender === 'user' ? (
                                <>
                                    <FaUser className="message-icon" size={18} />
                                    <span>{msg.text}</span>
                                </>
                            ) : (
                                <>
                                    <FaRobot className="message-icon" size={18} />
                                    <span>{msg.text}</span>
                                </>
                            )}
                        </ChatMessage>
                    ))}
                </ChatContent>
                <ChatInputContainer>
                    <ChatInput
                        placeholder="무엇을 도와드릴까요?"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <SendButton onClick={handleSendMessage}>
                        <FaPaperPlane />
                    </SendButton>
                </ChatInputContainer>
            </ChatBotContainer>
        </>
    );
};

export default ChatBot;

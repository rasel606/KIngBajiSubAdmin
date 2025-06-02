import React, { useState } from "react";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";
import { Col, Container, Row } from "react-bootstrap";
import { useChat } from "../../Component/ChatContext";

const ChatLayout = () => {
  // const [selectChat, setSelectChat] = useState(null);
    const { contacts,
          activeChat,
          messages,
          isConnected,
          sendMessage,
          selectChat,
          loadContacts } = useChat();

  return (
    <Container >
      <Row className="h-100 g-0" style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        <Col md={12} lg={12} className="d-none d-md-block border-end" >
        <ChatList selectChat={selectChat} />
      
      </Col>
        {selectChat && (
          <Col xs={12} md={12} lg={12}>
          <MessageBox  />
          </Col>
        ) }
      </Row >
    </Container>
  );
};

export default ChatLayout;

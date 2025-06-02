import React, { useEffect, useState } from "react";
import axios from "axios";
import { getNewChatList } from "../../AdminApi/AxiosAPIService";
import { useAuth } from "../../Component/AuthContext";
import { useChat } from "../../Component/ChatContext";

import { ListGroup, Form, Badge, Container, Row, Col } from "react-bootstrap";
import { PersonCircle, Search } from "react-bootstrap-icons";

const ChatList = () => {
  const { contacts, activeChat, selectChat } = useChat();

  const { user } = useAuth();

  return (
    <Container className="p-0 h-100">
      <Row className="h-100">
        <Col className="p-0">
          <div className="chat-list-container border-end h-100 d-flex flex-column">
            <div className="p-3 border-bottom">
              <h4 className="mb-3">Chats</h4>
              <Form.Group className="mb-3 position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search contacts..."
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted" />
              </Form.Group>
            </div>
             {/* key={contact.userId} 
            className={activeChat?.userId === contact.userId ? 'active' : ''}
            onClick={() => selectChat(contact)} */}

            <ListGroup variant="flush" className="overflow-auto flex-grow-1">
              {contacts.map((contact) => (
                <ListGroup.Item
                  key={contact.userId}
                  action
                  active={activeChat?.userId === contact.userId}
                  onClick={() => selectChat(contact)}
                  className="d-flex justify-content-between align-items-start py-3"
                >
                  <div className="d-flex align-items-center">
                    <PersonCircle size={32} className="me-3 text-primary" />
                    <div>
                      <div className="fw-bold">{contact.userId}</div>
                      {/* <small className="text-muted">{contact.role}</small> */}
                    </div>
                  </div>
                  {contact.unreadCount > 0 && (
                    <Badge pill bg="primary">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatList;

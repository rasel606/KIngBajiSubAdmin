// import React, { useState, useEffect, useRef } from 'react';
// import { useChat } from '../../Component/ChatContext';
// import { 
//   Container, 
//   Row, 
//   Col, 
//   Form, 
//   InputGroup, 
//   Button, 
//   Badge,
//   Card,
//   ListGroup
// } from 'react-bootstrap';
// import { 
//   ArrowLeft, 
//   Send, 
//   PersonCircle,
//   ThreeDotsVertical
// } from 'react-bootstrap-icons';

// export default ({selectChat}) => {
//   const { contacts,
//         activeChat,
//         messages,
//         isConnected,
//         sendMessage,
//         loadContacts } = useChat();
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [message]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
// console.log(message);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(activeChat,messages);
//     if (!message.trim() || !activeChat) return;
    
//     try {
//       await sendMessage(activeChat.userId, message);
//       setMessage('');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

// //   if (activeChat) {
// //     return (
// //       <Container className="h-100 d-flex align-items-center justify-content-center">
// //         <Card className="text-center border-0 shadow-sm">
// //           <Card.Body>
// //             <div className="display-4 mb-3">💬</div>
// //             <h4 className='text-White'>Select a chat to start messaging</h4>
// //             <p className="text-black-50">Choose a contact from the list to begin your conversation</p>
// //           </Card.Body>
// //         </Card>
// //       </Container>
// //     );
// //   }
// console.log(activeChat);

//   return (
//     <div className="chat-window">
//       <Row className="h-100">
//         <Col className="p-0 d-flex flex-column">
//           {/* Chat Header */}
//           <div className="chat-header p-3 border-bottom d-flex align-items-center">
//             <Button 
//               variant="link" 
//               className="d-md-none me-2"
//               onClick={() => selectChat(null)}
//             >
//               <ArrowLeft size={20} />
//             </Button>
//             <PersonCircle size={32} className="me-2 text-primary" />
//             <div className="flex-grow-1">
//               {/* <h5 className="mb-0">{activeChat.userId}</h5>
//               <small className="text-muted">
//                 {activeChat.userId} • {activeChat.isOnline ? (
//                   <span className="text-success">Online</span>
//                 ) : (
//                   <span>Last seen {activeChat.lastSeen}</span>
//                 )}
//               </small> */}
//             </div>
//             <Button variant="link" className="text-muted">
//               <ThreeDotsVertical />
//             </Button>
//           </div>
          
//           {/* Messages */}
//           <div className="messages-container p-3 flex-grow-1 overflow-auto">
//             {messages.map((msg, index) => (
//               <div 
//                 key={index} 
//                 className={`d-flex mb-3 ${msg.sender === activeChat.userId ? 'justify-content-start' : 'justify-content-end'}`}
//               >
//                 <div 
//                   className={`message-bubble p-3 rounded-3 ${msg.sender === activeChat.userId ? 'bg-light' : 'bg-primary text-white'}`}
//                   style={{ maxWidth: '70%' }}
//                 >
//                   <div className="message-content">{msg.content}</div>
//                   <div 
//                     className={`message-time small ${msg.sender === activeChat.userId ? 'text-muted' : 'text-white-50'} text-end`}
//                   >
//                     {msg.createdAt}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
          
//           {/* Message Input */}
//           <div className="message-input p-3 border-top">
//             <Form onSubmit={handleSubmit}>
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="border-0 py-2"
//                 />
//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   disabled={!message.trim()}
//                 >
//                   <Send />
//                 </Button>
//               </InputGroup>
//             </Form>


//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };


## 📌 Chat App (Real-Time Messaging)

A real-time chat application built using Node.js, Express, Socket.IO, and MongoDB that enables users to communicate instantly with each other.

## 🚀 Features
🔐 User Authentication (JWT-based)
💬 Real-time messaging using Socket.IO
🎯 One-to-one chat (private messaging)
📦 Message persistence with MongoDB
⚡ Instant UI updates without page reload
📱 Responsive chat interface
🔄 Auto-scroll to latest messages
## 🧠 How It Works
Each user joins a Socket.IO room using their userId

Messages are sent using:

io.to(receiverId).emit("receivedMessage")

Chat history is fetched from MongoDB using:

{ $or: [{ sender: A, receiver: B }, { sender: B, receiver: A }] }
Real-time + database ensures state synchronization

## 🛠️ Tech Stack
Backend: Node.js, Express.js
Real-time: Socket.IO
Database: MongoDB
Templating: EJS
Auth: JWT + Cookies
## 📂 Project Structure
├── models/
├── routes/
├── views/
├── public/
├── middlewares/
├── services/
├── index.js
## ⚙️ Installation
git clone https://github.com/hepisonii/chat-app
cd chat-app
npm install
🔑 Environment Variables

Create a .env file:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
▶️ Run Locally
npm start

Visit:

http://localhost:8000
🔥 Key Learnings
Real-time communication using WebSockets
Room-based message targeting
State synchronization between multiple clients
Handling authentication with cookies & JWT
Debugging cross-device (mobile vs desktop) issues
🚀 Future Improvements
🟢 Online/offline status
✍️ Typing indicator
✔️ Message seen/delivered status
🖼️ Image/file sharing (Multer integration)
👥 Group chat (chatId-based rooms)
👨‍💻 Author

Hepi Soni

⭐ If you like this project

Give it a star ⭐ on GitHub!
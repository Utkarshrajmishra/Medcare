import Message from "@/components/Message";
import NavBar from "@/components/NavBar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "@/firebase";

const Chat = () => {
  const location = useLocation();
  const id = location.state;
  const auth = JSON.parse(sessionStorage.getItem("auth"));
  const [message, setMessage] = useState({
    isDoctor: auth.isDoctor,
    msg: "",
  });
  const [data, setData] = useState([]);

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messageRef = doc(db, "userMessage", `${id}`);
        const msgDoc = await getDoc(messageRef);
        if (msgDoc.exists()) {
          setData(msgDoc.data().msg || []); // Assuming `msg` is an array in Firestore
        } else {
          setData([]); // Initialize with an empty array if no messages exist
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [id]); // Runs only when `id` changes

  // Handle sending a new message
  const handleSubmit = async () => {
    if (!message.msg.trim()) return;

    try {
      const newMessage = {
        isDoctor: message.isDoctor,
        msg: message.msg,
        timestamp: new Date().toISOString(),
      };

      const updatedData = [...data, newMessage]; // Add new message to the existing array
      const messageRef = doc(db, "userMessage", `${id}`);
      await setDoc(messageRef, { msg: updatedData }); // Save updated array to Firestore

      setData(updatedData); // Update local state to re-render
      setMessage({ ...message, msg: "" }); // Clear input field
      console.log("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section>
      <NavBar />
      <section className="h-[88vh] py-4 bg-zinc-100 flex justify-center">
        <section className="w-[480px] bg-white ">
          {/* Render messages */}
          <div className="p-4 overflow-y-auto h-[75vh]">
            {data.map((msg, index) => (
              <div key={index}>
                <Message isDoctor={msg.isDoctor} text={msg.msg} />
              </div>
            ))}
          </div>
          <div className="flex ">
            <input
              type="text"
              value={message.msg}
              onChange={(e) => setMessage({ ...message, msg: e.target.value })}
              name="message"
              id="message"
              className="outline w-[87%] outline-1 outline-zinc-800 py-2 px-4"
            />
            <button
              onClick={handleSubmit}
              className="py-2 px-4 text-sm bg-blue-500 text-white"
            >
              Send
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Chat;

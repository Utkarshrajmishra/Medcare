import Message from "@/components/Message";
import NavBar from "@/components/NavBar";

const Chat = () => {
  return (
    <section>
      <NavBar />
      <section className="h-[88vh] py-4 bg-zinc-100 flex justify-center">
        <section className="w-[480px] bg-white ">
          <Message />
          <div className="flex ">
            <input
              type="text"
              name="message"
              id="message"
              className="outline w-[87%] outline-1 outline-zinc-800 py-2 px-4"
            />
            <button className="py-2 px-4 text-sm bg-blue-500 text-white">
              Send
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Chat;

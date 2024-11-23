const message = [
  {
    isDoctor: true,
    message: "Hello",
  },
  {
    isDoctor: false,
    message: "Hey",
  },
];

const Message = () => {
  return (
    <section className="h-[78vh]  overflow-y-scroll">
      <div>
        {message.map((item, index) => (
          <div
            className={`flex ${
              item.isDoctor ? "justify-end" : "justify-start"
            } p-3`}
          >
            <div className="flex-col">
              <p className="text-[0.7rem] rounded-xl text-zinc-600">
                {" "}
                {item.isDoctor ? "Doctor" : "User"}
              </p>
              <p className="text-md text-neutral-800 bg-zinc-200 rounded p-2">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Message;

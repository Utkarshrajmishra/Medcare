

const Message = ({isDoctor, text}) => {
  return (
    <section className="  overflow-y-scroll">
      <div>
          <div
            className={`flex ${
              isDoctor ? "justify-end" : "justify-start"
            } p-3`}
          >
            <div className="flex-col">
              <p className="text-[0.7rem] rounded-xl text-zinc-600">
                {" "}
                {isDoctor ? "Doctor" : "User"}
              </p>
              <p className="text-md text-neutral-800 bg-zinc-200 rounded p-2">{text}</p>
            </div>
          </div>
    
      </div>
    </section>
  );
};

export default Message;

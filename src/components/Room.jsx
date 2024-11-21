const Room = ({setID,id}) => {

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-bold ">Create /Join Message Room</p>
        <p className="text-sm text-zinc-500">
          Create a room and start chatting ans starting sharing important medicial docs.
        </p>
      </div>
      <section className="flex flex-col gap-4">
               <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Room ID
          </label>
          <input
           value={id}
           onChange={(e)=>setID(e.target.value)}
            type="text"
            name="room"
            id="room"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input your Room ID"
          />
        </div>
      </section>
    </section>
  );
};

export default Room;

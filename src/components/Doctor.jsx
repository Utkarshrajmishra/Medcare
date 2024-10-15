import React from "react";

const Doctor = ({ info }) => {
  return (
    <section className="flex flex-col items-center gap-3 rounded-md bg-zinc-100 border p-4 w-64">
      <img
        src={info.imageUrl}
        alt="doctor image"
        height={240}
        width={240}
        className="object-cover rounded-md"
      />
      <div className="w-full">
        <p className="text-[0.7rem] bg-pink-400 rounded-xl w-fit px-2 text-white">
          {info.specialty.toUpperCase()}
        </p>
      </div>
      <div className="text-center w-full">
        <p className="font-semibold">{`Dr. Utkarsh Raj Mishra`}</p>
        <p className="text-sm text-zinc-600">{info.about}</p>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 font-semibold px-3 text-[0.9rem] text-white py-2 rounded-md">
        $40 per consultation
      </button>
    </section>
  );
};

export default Doctor;

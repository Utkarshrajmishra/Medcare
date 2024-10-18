import { createContext, useState } from "react";

export const DoctorContext = createContext({
  isDoctor: {
    doctorEmail:"",
    doctorLogin:false
  },
  setIsDoctor: () => {},
});

export const DoctorProvider = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState({
    doctorEmail:'',
    doctorLogin:false,
  });

  return (
    <DoctorContext.Provider value={{ isDoctor, setIsDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

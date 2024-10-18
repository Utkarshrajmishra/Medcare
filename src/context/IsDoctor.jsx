import { createContext, useState } from "react";

export const DoctorContext = createContext({
  isDoctor: false,
  setIsDoctor: () => {},
});

export const DoctorProvider = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <DoctorContext.Provider value={{ isDoctor, setIsDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

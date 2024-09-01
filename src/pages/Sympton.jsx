import { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import { RxCross2 } from "react-icons/rx";
import { Disease } from "../constants/ Diseases";
import { Dialog } from "../components/Dialog";

const Sympton = () => {
  const [sympton, setSymptons] = useState(Disease);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const addItem = (index) => {
    const disease = sympton[index];
    if (!selectedDisease.some((item) => item.ID === disease.ID)) {
      setSelectedDisease((prevState) => [...prevState, disease]);
    }
  };

  const onSearch = (searchText) => {
    const filteredSymptons = Disease.filter((sympton) =>
      sympton.Name.toLowerCase().includes(searchText.toLowerCase())
    );

    setSymptons((prev) => filteredSymptons);
  };

  const removeItem = (index) => {
    const disease = [...selectedDisease];
    disease.splice(index, 1);
    setSelectedDisease(disease);
  };

  const handleContinueClick = () => {
    setDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <section>
      <NavBar />
      <section className="md:px-20 px-5  py-8">
        <SearchBox onChange={onSearch} />
        {/* Selected Diseases Section */}
        {selectedDisease.length > 0 && (
          <section className="mt-8">
            <p className="text-xl font-semibold mb-4">Selected Diseases</p>
            <div className="flex overflow-x-auto space-x-4 py-2 px-1">
              {selectedDisease.map((item, index) => (
                <p
                  key={item.ID}
                  onClick={() => removeItem(index)}
                  className="py-2 cursor-pointer px-2 bg-blue-100 text-blue-600 outline outline-1 outline-blue-700 text-sm rounded-3xl flex items-center justify-center h-full"
                >
                  {item.Name} <RxCross2 className="ml-2 text-xl" />
                </p>
              ))}
            </div>
            <button
              className="bg-blue-500 font-bold h-10 w-full rounded-md text-white"
              onClick={handleContinueClick} // Handle continue click
            >
              Continue
            </button>
          </section>
        )}
        {/* All Diseases Section */}
        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sympton?.map((item, index) => (
              <div
                key={item.ID}
                onClick={() => addItem(index)}
                className="py-2 px-1 bg-gray-50 outline outline-1 text-gray-600 outline-blue-100 text-sm rounded-3xl flex items-center justify-center h-full"
              >
                <p className="text-center cursor-pointer">{item.Name}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Dialog Component */}
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </section>
  );
};

export default Sympton;

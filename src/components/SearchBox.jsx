const SearchBox = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <section>
      <div className="relative mt-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          onChange={handleChange}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm font-inter outline-1 outline-blue-100 outline  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  d dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search problems by name"
          required
        />
      </div>
    </section>
  );
};

export default SearchBox;

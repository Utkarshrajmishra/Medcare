const Table = ({ disease }) => {
  return (
    <div className="relative overflow-x-auto outline outline-1 outline-blue-100 rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Disease Name
            </th>
            <th scope="col" className="px-6 py-3">
              Accuracy
            </th>

            <th scope="col" className="px-6 py-3">
              Prof. Name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {disease?.map((item, index) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.Issue.Name}
              </th>
              <td className="px-6 py-4">{item.Issue.Accuracy}%</td>

              <td className="px-6 py-4">{item.Issue.ProfName}</td>
              <td className="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 hover:underline">
                  Know More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

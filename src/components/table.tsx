"use client";

interface TableProps {
  data: { number: number; name: string }[];
  onDelete?: (index: number) => void;
  onView?: (index: number) => void;
  options?: boolean;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onView, options }) => {
  return (
    <table className="table-auto w-full text-black">
      <thead>
        <tr className="text-left">
          <th className="px-4 py-2">Número</th>
          <th className="px-4 py-2">Nome</th>
          {options && <th className="px-4 py-2">Ação</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{item.number}</td>
            <td className="border px-4 py-2">{item.name}</td>
            {options && (
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 focus:outline-none focus:ring focus:ring-blue-400"
                  onClick={() => onView?.(item.number)}
                >
                  Visualizar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:ring-red-400"
                  onClick={() => onDelete?.(item.number)}
                >
                  Excluir
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

// app/dashboard/customers/page.jsx
export default function CustomersPage() {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-02-20" },
    { id: 3, name: "Michael Lee", email: "mike@example.com", joined: "2024-03-10" },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Joined</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.joined}</td>
              <td className="p-3 space-x-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded">View</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// components/OrdersTable.jsx
const OrdersTable = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">#1234</td>
            <td className="p-2">John Doe</td>
            <td className="p-2 text-green-600">Completed</td>
            <td className="p-2">$120</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">#1235</td>
            <td className="p-2">Jane Smith</td>
            <td className="p-2 text-yellow-600">Pending</td>
            <td className="p-2">$85</td>
          </tr>
          <tr>
            <td className="p-2">#1236</td>
            <td className="p-2">Michael Lee</td>
            <td className="p-2 text-red-600">Cancelled</td>
            <td className="p-2">$60</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

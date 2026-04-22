// app/dashboard/settings/page.jsx
export default function SettingsPage() {
  return (
   <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
     <div className="w-[500px]">
      <form className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Admin Name" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full border rounded-lg p-2" placeholder="admin@example.com" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" className="w-full border rounded-lg p-2" placeholder="********" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
   </div>
  );
}

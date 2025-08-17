export default function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Movies</h3>
          <p className="text-gray-500 mt-2">Manage all movies and series</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-gray-500 mt-2">Manage registered users</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-gray-500 mt-2">Configure site preferences</p>
        </div>
      </div>
    </div>
  );
}

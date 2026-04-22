// components/StatsCard.jsx
const StatsCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 hover:scale-105 transition">
      <Icon className={`w-8 h-8 ${color}`} />
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;

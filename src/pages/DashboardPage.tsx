import { useUser } from '@clerk/clerk-react';
import { useDataList } from '@/hooks';

export default function DashboardPage() {
  const { user } = useUser();
  const { data: dataList, isLoading, error } = useDataList({ page: 1, pageSize: 10 });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">
            This is your protected dashboard. Only authenticated users can see this.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Items"
            value={dataList?.total || 0}
            icon="📊"
            color="bg-blue-500"
          />
          <StatCard
            title="Active Projects"
            value="12"
            icon="🚀"
            color="bg-green-500"
          />
          <StatCard
            title="Pending Tasks"
            value="5"
            icon="⏰"
            color="bg-yellow-500"
          />
        </div>

        {/* Data List Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Data</h2>
            <p className="text-sm text-gray-600 mt-1">
              Example data fetched from your Python backend
            </p>
          </div>

          <div className="p-6">
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="text-gray-600 mt-2">Loading data...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-500 mb-2">❌</div>
                <p className="text-gray-700 font-medium">Failed to load data</p>
                <p className="text-sm text-gray-500 mt-1">
                  Make sure your Python backend is running on http://localhost:8000
                </p>
              </div>
            )}

            {!isLoading && !error && dataList?.items && (
              <>
                {dataList.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No data available yet</p>
                    <p className="text-sm mt-1">Start by creating some items in your backend</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dataList.items.map((item) => (
                      <DataItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* API Info Card */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
            🔗 API Connection Status
          </h3>
          <p className="text-indigo-700 text-sm mb-3">
            This page demonstrates API calls to your Python backend using:
          </p>
          <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
            <li>Automatic Clerk token attachment</li>
            <li>React Query for caching and state management</li>
            <li>Type-safe API client with error handling</li>
            <li>Loading and error states</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function DataItemCard({ item }: { item: any }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button className="ml-4 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

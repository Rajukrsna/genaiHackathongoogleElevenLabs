import { useUser } from '@clerk/clerk-react';
import { useProfile, useUpdateProfile } from '@/hooks';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useUser();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || '');

  const handleSave = async () => {
    if (!user) return;
    
    try {
      await updateProfile.mutateAsync({
        userId: user.id,
        data: { bio },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end -mt-16 mb-4">
              <img
                src={user?.imageUrl || 'https://via.placeholder.com/150'}
                alt={user?.fullName || 'User'}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="ml-6 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.fullName || 'User Name'}
                </h1>
                <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <InfoRow label="User ID" value={user?.id || 'N/A'} />
            <InfoRow
              label="Email"
              value={user?.primaryEmailAddress?.emailAddress || 'N/A'}
            />
            <InfoRow
              label="Joined"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'
              }
            />
            <InfoRow
              label="Last Sign In"
              value={
                user?.lastSignInAt
                  ? new Date(user.lastSignInAt).toLocaleDateString()
                  : 'N/A'
              }
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="p-6">
            {isEditing ? (
              <div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us about yourself..."
                />
                <button
                  onClick={handleSave}
                  disabled={updateProfile.isPending}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {updateProfile.isPending ? 'Saving...' : 'Save Bio'}
                </button>
              </div>
            ) : (
              <p className="text-gray-700">
                {profile?.bio || 'No bio added yet. Click Edit to add one.'}
              </p>
            )}
          </div>
        </div>

        {/* Clerk Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🔐 Authentication Info
          </h3>
          <p className="text-blue-700 text-sm">
            This profile is powered by Clerk authentication. All user data is securely
            managed and synchronized automatically.
          </p>
          <ul className="mt-3 list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Session management handled automatically</li>
            <li>Auth tokens attached to all API requests</li>
            <li>Profile updates sync with backend via API</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

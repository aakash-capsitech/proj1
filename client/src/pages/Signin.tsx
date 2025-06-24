import React, { useState, useEffect } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';

interface User {
  token: string;
  role: string;
  username: string;
  email: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const API_BASE = 'http://localhost:5083/api'; // Replace with your API URL

const Signin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setFormData({ username: '', email: '', password: '' });
      } else {
        const errorData = await response.text();
        setError(errorData || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Make sure your API is running.');
    }

    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setMessage('Logged out successfully');
  };

  const testProtectedEndpoint = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/test/protected`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // setMessage(`Protected data: ${JSON.stringify(data)}`);
        setMessage(`Protected data:\n${JSON.stringify(data, null, 2)}`);

      } else {
        setError('Failed to access protected endpoint');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const testAdminEndpoint = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/test/admin`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // setMessage(`Admin data: ${JSON.stringify(data)}`);
        setMessage(`Admin data:\n${JSON.stringify(data, null, 2)}`);

      } else {
        setError('Access denied or failed to access admin endpoint');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome, {user.username}!
          </h1>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={testProtectedEndpoint}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Test Protected Endpoint
            </button>
            
            <button
              onClick={testAdminEndpoint}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Test Admin Endpoint
            </button>
            
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>

          {message && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password (min 6 chars)"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>

          <GoogleLoginButton />
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setMessage('');
              setFormData({ username: '', email: '', password: '' });
            }}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

      {message && (
        <pre className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded whitespace-pre-wrap break-words max-w-full overflow-auto">
            {message}
        </pre>
        )}


        {error && (
        <pre className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded whitespace-pre-wrap break-words max-w-full overflow-auto">
            {error}
        </pre>
        )}

      </div>
    </div>
  );
};

export default Signin;
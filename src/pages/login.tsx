import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoundPen } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName && window.location.pathname !== '/login') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!name || !password) {
      setError('Please enter both username and password.');
      return;
    }

    localStorage.setItem('name', name);
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 rounded">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="flex gap-2 text-sm font-medium text-gray-700" htmlFor="username"><span><UserRoundPen/></span>Username</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="flex gap-2 text-sm font-medium text-gray-700" htmlFor="password"> <KeyRound />Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button 
          onClick={handleLogin} 
          className="w-full flex gap-2 text-center bg-blue-500 text-white px-[100px] py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          <LogIn />Login
        </button>
        {name && <h2 className="mt-4 text-lg text-center text-green-600">Welcome, {name}!</h2>}
      </div>
    </div>
  );
}
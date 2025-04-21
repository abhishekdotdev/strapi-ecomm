import { Mail, Lock, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function LoginPage({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-1/2 h-full">
        <img
          src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-full bg-gray-100 w-1/2 overflow-auto">
        <h1 className="text-3xl font-semibold mb-1">Log in</h1>
        <p className="text-lg text-gray-500">Welcome back! Please log in.</p>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 mt-4 w-[500px] border p-4 rounded border-gray-50 shadow-md"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 shadow-sm">
              <Mail className="text-gray-400 mr-2" size={20} />
              <input
                type="email"
                name="email"
                className="w-full outline-none"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 shadow-sm">
              <Lock className="text-gray-400 mr-2" size={20} />
              <input
                type="password"
                name="password"
                className="w-full outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>

          <div className="text-center w-full">
            {/* <button className="border w-full px-4 py-2 mb-4 cursor-pointer hover:bg-blue-600 rounded bg-blue-500 text-white">
              Log in
            </button> */}

            <button
              className={`border w-full px-4 py-2 mb-4 rounded text-white flex items-center justify-center gap-2 transition 
                ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                }`}
              disabled={loading}
            >
              {loading && <LoaderCircle className="w-5 h-5 animate-spin" />}
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <span className="text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

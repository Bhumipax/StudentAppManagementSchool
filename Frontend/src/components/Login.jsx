import React from 'react';
import Detail from './Detial';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 ">
      <h1 className="absolute -top-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 mt-32 rounded-full text-yellow-50">เข้าสู่ระบบ</h1>
      <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id">เลขประจำตัว</label>
            <input
              type="text"
              id="id"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200" onClick={Detail}>
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

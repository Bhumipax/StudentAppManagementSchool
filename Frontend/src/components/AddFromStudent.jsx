import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFromStudent() {
  
   const navigate = useNavigate();

  const [studentid, setstudentid] = useState("");
  const [sfname, setsfname] = useState("");
  const [slname, setslname] = useState("");
  const [sgender, setsgender] = useState("");
  const [sage, setsage] = useState(0);
  const [sphonenumber, setsphonenumder] = useState("");
  const [saddress, setsaddress] = useState("");

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:5000/student', {
        studentid: studentid,
        sfname: sfname,
        slname: slname,
        sgender: sgender,
        sage: sage,
        sphonenumber: sphonenumber,
        saddress: saddress,
      });
      alert('Student data added successfully');
      navigate('/studentdata');
    } catch (error) {
      console.error('Error adding student data:', error);
      alert('Failed to add student data');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 mt-12 rounded-lg shadow-md w-80">
        <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 rounded-full text-yellow-50">
          กรอกข้อมูลนักเรียน
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id">เลขประจำตัว</label>
            <input
              type="text"
              id="id"
              value={studentid}
              onChange={(e) => setstudentid(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">ชื่อ</label>
            <input
              type="text"
              id="name"
              value={sfname}
              onChange={(e) => setsfname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">นามสกุล</label>
            <input
              type="text"
              id="name"
              value={slname}
              onChange={(e) => setslname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">อายุ</label>
            <input
              type="number"
              id="age"
              value={sage}
              onChange={(e) => setsage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">เพศ (1:ชาย, 2:หญิง, 3:อื่นๆ)</label>
            <input
              type="number"
              id="gender"
              value={sgender}
              onChange={(e) => setsgender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              value={saddress}
              onChange={(e) => setsaddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone"
              value={sphonenumber}
              onChange={(e) => setsphonenumder(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='flex justify-center ...'>
          <button
            type="button"
            className=" bg-pink-400 ml-2 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded "
            onClick={handleClick}
          >
            Save
          </button>

          <button
            type="button"
            className="bg-blue-500 ml-2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded "
            onClick={() => navigate('/studentdata' )}
          >
            Back
          </button>

          </div>
          

        </form>
      </div>
    </div>
  );
}

export default AddFromStudent;

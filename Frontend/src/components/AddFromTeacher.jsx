import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFromTeacher() {

   const navigate = useNavigate();

  const [teacherid, setteacherid] = useState("");
  const [tfname, settfname] = useState("");
  const [tlname, settlname] = useState("");
  const [tgender, settgender] = useState("");
  const [tage, settage] = useState(0);
  const [tphonenumder, settphonenumder] = useState("");
  const [tposition, settposition] = useState("");
  const [address, setaddress] = useState("");

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:5000/teacher', {
       teacherid:teacherid,
       tfname:tfname,
       tlname:tlname,
       tgender:tgender,
       tage:tage,
       tposition:tposition,
       tphonenumber:tphonenumder,
       address:address
      });
      alert('Teacher data added successfully');
      navigate('/teacherdata');
    } catch (error) {
      console.error('Error adding teacher data:', error);
      alert('Failed to add teacher data');
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 mt-12 rounded-lg shadow-md w-80">
        <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 rounded-full text-yellow-50">
          กรอกข้อมูลคุณครู
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id">เลขประจำตัว</label>
            <input
              type="text"
              id="id"
              value={teacherid}
              onChange={(e) => setteacherid(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">ชื่อ</label>
            <input
              type="text"
              id="name"
              value={tfname}
              onChange={(e) => settfname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">นามสกุล</label>
            <input
              type="text"
              id="name"
              value={tlname}
              onChange={(e) => settlname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">อายุ</label>
            <input
              type="number"
              id="age"
              value={tage}
              onChange={(e) => settage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="position">ตำแหน่ง</label>
            <input
              type="text"
              id="position"
              value={tposition}
              onChange={(e) => settposition(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">เพศ (1:ชาย, 2:หญิง, 3:อื่นๆ)</label>
            <input
              type="number"
              id="gender"
              value={tgender}
              onChange={(e) => settgender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone"
              value={tphonenumder}
              onChange={(e) => settphonenumder(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
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
            onClick={() => navigate('/teacherdata' )}
          >
            Back
          </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFromTeacher;

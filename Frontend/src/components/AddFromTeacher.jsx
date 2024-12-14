import React, { useState } from 'react';
import Detail from './Detial';
import axios from 'axios';

function AddFromTeacher() {

  const [teacherid,setteacherid] = useState("");
  const [tfname,settfname] = useState("");
  const [tlname,settlname] = useState("");
  const [tgender,settgender] = useState("");
  const [tage,settage] = useState(0);
  const [tphonenumder,settphonenumder] = useState("");
  const [tposition,settposition] = useState("");
  const [address,setaddress] = useState("");

  const [tescherList, setTeacherList] = useState([]);

  const teacherList = () => {
    axios.get('http://localhost:5000/teacher').then((response) => {
      setTeacherList(response.data);
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 mt-12 rounded-lg shadow-md w-80 ">
      <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 rounded-full text-yellow-50">
        กรอกข้อมูลคุณครู
      </h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">ชื่อ</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">นามสกุล</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">อายุ</label>
            <input
              type="int"
              id="age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="position">ตำแหน่ง</label>
            <input
              type="text"
              id="position"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">เพศ ( 1:ชาย,2:หญิง,3:อื่นๆ )</label>
            <input
              type="int"
              id="gender"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">เบอร์โทศัพท์</label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200" onClick={Detail}>
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFromTeacher;

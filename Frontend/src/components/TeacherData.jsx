import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentData = () => {
  const [schedule, setSchedule] = useState([]); // เก็บข้อมูลตารางสอน
  const [teacher, setTeacher] = useState([]); // เก็บข้อมูลครู
  const [inputTeacherId, setInputTeacherId] = useState(""); // สำหรับกรอก Teacher ID
  const [teacherId, setTeacherId] = useState(); // เก็บ Teacher ID ที่ใช้ค้นหา

  const handleSearch = () => {
    setTeacherId(inputTeacherId); // กำหนดค่า teacherId เมื่อกดปุ่มค้นหา
  };

  // ดึงข้อมูลครูตาม teacherId
  useEffect(() => {
    if (!teacherId) return;

    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/teacher/${teacherId}`);
        setTeacher(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        setTeacher([]);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  // ดึงข้อมูลตารางสอน (schedule) พร้อมข้อมูลที่เกี่ยวข้อง
  useEffect(() => {
    if (!teacherId) return;

    const fetcheducate = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/schedule/${teacherId}`);
        if (Array.isArray(data.data)) {
          setSchedule(data.data);
        } else {
          setSchedule([data.data]);
        }
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching schedule data", error);
      }
    };

    fetcheducate();
  }, [teacherId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 mt-[60px] rounded-lg shadow-md w-[800px] h-auto relative ">
        <h1 className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center text-white mb-4">ข้อมูลคุณครู</h1>

        <div className="flex justify-center mb-6">
          <input
            className="border p-2 w-96"
            type="text"
            placeholder="กรอก Teacher ID..."
            value={inputTeacherId}
            onChange={(e) => setInputTeacherId(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ค้นหา
          </button>
        </div>

        {/* ข้อมูลครู */}
        <div className="mb-4">
          {teacher.length > 0 ? (
            teacher.map((item, index) => (
              <div key={index} className="mb-4">
                <p>ชื่อ: {item.tfname} {item.tlname}</p>
                <p>ตำแหน่ง: {item.tposition}</p>
                <p>เพศ: {item.tgender === 1 ? "ชาย" : item.tgender === 2 ? "หญิง" : "อื่น ๆ"}</p>
                <p>เบอร์โทรศัพท์: {item.tphonenumber}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">ไม่มีข้อมูลคุณครู</p>
          )}
        </div>

        {/* ข้อมูลตารางสอน */}
        <div>
          {schedule.length > 0 ? (
            schedule.map((item, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <p>วันที่สอน: {item.day}</p>
                <p>เวลา: {item.starttime} - {item.endtime}</p>
                <p>วิชา: {item.subjectid}</p>
                <p>ห้องเรียน: {item.room}</p>
                <p>เทอม: {item.semester}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">ไม่มีข้อมูลตารางสอน</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentData;

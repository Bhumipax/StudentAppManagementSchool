import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StudentData = () => {
  
  const navigate = useNavigate();

  const [education, seteducation] = useState([]);
  const [inputname, setinputname] = useState("");
  const [name, setName] = useState([]);
  const [studentid, setstudentid] = useState();

  const handleClicked = () => {
    setstudentid(inputname);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/student/${studentid}`);
        if (Array.isArray(data.data)) {
          setName(data.data);
        } else {
          setName([data.data]);
        }
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    if (studentid) {
      fetchData();
    }
  }, [studentid]);

  useEffect(() => {
    const fetcheducate = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/educationdata/${studentid}`);
        if (Array.isArray(data.data)) {
          seteducation(data.data);
        } else {
          seteducation([data.data]);
        }
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching education data", error);
      }
    };

    if (studentid) {
      fetcheducate();
    }
  }, [studentid]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/student/${studentid}`);
      alert('Student deleted successfully!');
      // เปลี่ยนเส้นทางไปยังหน้ารายการนักเรียน
      navigate('/'); // เปลี่ยนเส้นทางไปที่หน้ารายการนักเรียน
    } catch (error) {
      console.error("Error deleting student data", error);
      alert('Failed to delete student');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="bg-white p-6 mt-[60px] rounded-lg shadow-md w-[800px] h-auto relative ">
        <h1 className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center text-white mb-4">
          ข้อมูลนักเรียน
        </h1>
        <div className="flex justify-center mb-6">
          <input
            className="border p-2 w-96"
            type="text"
            placeholder="กรอก Student ID..."
            value={inputname}
            onChange={(e) => {
              setinputname(e.target.value);
            }}
          />
          <button
            onClick={handleClicked}
            className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>

        <div className="mb-4">
          {name.length > 0 ? (
            name.map((item, index) => (
              <div key={index}>
                <p>เลขประจำตัว: {item.studentid}</p>
                <p>ชื่อ: {item.sfname} {item.slname}</p>
                <p>อายุ: {item.sage}</p>
                <p>เพศ: {item.sgender === 1 ? "ชาย" : item.sgender === 2 ? "หญิง" : "อื่น ๆ"}</p>
                <p>เบอร์โทรศัพท์: {item.sphonenumber}</p>
                <p>ที่อยู่: {item.saddress}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">ไม่มีข้อมูลนักเรียน</p>
          )}
        </div>
        <div>
          {education.length > 0 ? (
          education.map((item, index) => (
              <div key={index}>
                <p>ปีการศึกษา: {item.academicyear}</p>
                <p>เกรดเฉลี่ย: {item.gpa}</p>
                <p>ภาคเรียน: {item.semester}</p>
                <p>หน่วยกิต: {item.totalcredit}</p>
                <p>หน่วยกิตที่ได้: {item.passedcredit}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">ไม่มีข้อมูลผลการเรียน</p>
          )}
        </div>
        
        <br />

        <div className="flex justify-end ...">
          <button
            onClick={() => navigate('/addstudent')}
            className="bg-teal-600 ml-2 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded  ">
            Add
          </button>

          <button
            type="button"
            className="bg-sky-600 ml-2 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => navigate('/' )}
          >
            Back
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 ml-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  ">
            Delete
          </button>
          </div>
      </div>
    </div>
  );
};

export default StudentData;

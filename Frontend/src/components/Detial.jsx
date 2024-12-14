import React from "react";
import { useNavigate } from 'react-router-dom';

function Detail(){

    const navigate = useNavigate();
    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-pink-400 ">
            <div className="bg-white p-6 rounded-lg shadow-md w-80  ">
                <h1 className="absolute -top-[-50px] left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 mt-14 rounded-full text-yellow-50 " >โรงเรียนสาธิตธุรกิจบัณฑิตย์</h1>
                <button
                type="submit"
                onClick={() => navigate('/studentdata')}
                className="w-full bg-pink-400 text-white py-3 px-4  mt-3  rounded-lg hover:bg-pink-600 transition duration-200 " >
                นักเรียน
                </button>
                <button
                type="submit"
                onClick={() => navigate('/teacherdata')}
                className="w-full bg-pink-400 text-white py-3 px-4 mt-5 rounded-lg hover:bg-pink-600 transition duration-200 ">
                คุณครู
                </button>
            </div>
        </div>
        </>
    )
}

export default Detail
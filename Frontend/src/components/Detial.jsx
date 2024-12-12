import React from "react";

function Detail(){
    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-pink-400">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 ้ h-96 ">
                <h1 className="absolute -top-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-center px-4 py-1 mt-14 rounded-full text-yellow-50">โรงเรียนสาธิต</h1>
                <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-4  mt-5  rounded-lg hover:bg-pink-600 transition duration-200 " >
                ตารางเรียน
                </button>
                <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-4 mt-5 rounded-lg hover:bg-pink-600 transition duration-200 ">
                เช็คสถานะการเข้าเรียน
                </button>
                <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-4 mt-5 rounded-lg hover:bg-pink-600 transition duration-200 ">
                ข้อมูลผลการเรียน
                </button>
                <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-4 mt-5 rounded-lg hover:bg-pink-600 transition duration-200">
                ข้อมูลนักเรียน
                </button>
            </div>
        </div>
        </>
    )
}

export default Detail
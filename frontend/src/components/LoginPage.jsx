import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi, sendOtp } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

export const LoginPage = () => {

    const [detail, setDetail] = useState({
      roomId: "",
      email: "",
    });

    const { roomId, currentUser, setRoomId, setCurrentUser, setConnected } =
    useChatContext();
    const navigate = useNavigate();

    function handleFormInputChange(event) {
      setDetail({
        ...detail,
        [event.target.name]: event.target.value,
      });
    }

    function validateForm() {
      if (detail.email === "" ) {
        toast.error("Invalid Input !!");
        return false;
      }
      return true;
    }

    async function sendOtptoEmail() {
      if (validateForm()) {
        //join chat
  
        try {
          
          toast.success("OTP sent !!");
          setCurrentUser(detail.email);
          // setRoomId(room.roomId);
          setConnected(true);
          navigate("/verify");
          const room = await sendOtp(detail.email);
        } catch (error) {
          if (error.status == 400) {
            toast.error(error.response.data);
          } else {
            toast.error("Error in joining room");
          }
          console.log(error);
        }
      }
    }



  return (
    // <div className="max-h-screen flex items-center justify-center justify px-10 py-10 border-x-white">
    //     <h1>Check</h1>
    // </div>
     <div className="min-h-screen flex items-center justify-center ">
          <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
            {/* <div>
              <img src={chatIcon} className="w-24 mx-auto" />
            </div> */}
    
            <h1 className="text-2xl font-semibold text-center ">
              ChatApp
            </h1>
            {/* name div */}
            <div className="">
              <label htmlFor="name" className="block font-medium mb-2">
                Email
              </label>
              <input
                onChange={handleFormInputChange}
                value={detail.email}
                type="text"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* room id div */}
            {/* <div className="">
              <label htmlFor="name" className="block font-medium mb-2">
                OTP
              </label>
              <input
                name="roomId"
                // onChange={handleFormInputChange}
                // value={detail.roomId}
                type="text"
                id="name"
                placeholder="Enter Password"
                className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
    
            {/* button  */}
            <div className="flex justify-between gap-5 mt-4">
              <button
                onClick={sendOtptoEmail}
                className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"
              >
               Send OTP
              </button>
              {/* <button
                // onClick={createRoom}
                className="px-3 py-2 dark:bg-green-500 hover:dark:bg-green-800 rounded-full "
              >
                Register
              </button> */}
            </div>

          </div>
        </div>
    
  )
}

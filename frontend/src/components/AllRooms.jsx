import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess, getUserDetails, joinChatApi } from "../services/RoomService";
import { timeAgo } from "../config/helper";
export const AllRooms = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  const [rooms, setRooms] = useState([]);

  //page init:
  //messages ko load karne honge

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const messages = await getMessagess(roomId);
//         // console.log(messages);
//         setMessages(messages);
//       } catch (error) {}
//     }
//     if (connected) {
//       loadMessages();
//     }
//   }, []);

  useEffect(() => {
    async function loadRooms() {
      try {
        const userDetails = await getUserDetails(currentUser);
       // console.log(userDetails);
        if(userDetails["uname"] === null){
            navigate("/joinChat")
        }
        console.log(userDetails["roomId"]);
        setRooms(userDetails["roomId"]);
        console.log(rooms);
      } catch (error) {
        console.log(error)
      }
    }
    if (connected) {
        loadRooms();
    }
  }, []);

  //scroll down

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scroll({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

  //stompClient ko init karne honge
  //subscribe

//   useEffect(() => {
//     const connectWebSocket = () => {
//       ///SockJS
//       const sock = new SockJS(`${baseURL}/chat`);
//       const client = Stomp.over(sock);

//       client.connect({}, () => {
//         setStompClient(client);

//         toast.success("connected");

//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           console.log(message);

//           const newMessage = JSON.parse(message.body);

//           setMessages((prev) => [...prev, newMessage]);

//           //rest of the work after success receiving the message
//         });
//       });
//     };

//     if (connected) {
//       connectWebSocket();
//     }

//     //stomp client
//   }, [roomId]);

//   //send message handle

//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       console.log(input);

//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };

//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//     }

//     //
//   };

//   function handleLogout() {
//     stompClient.disconnect();
//     setConnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   }

  function handleNewRoom() {
    // stompClient.disconnect();
    // setConnected(false);
    // setRoomId("");
    // setCurrentUser("");
    navigate("/joinChat");
  }




  async function joinChat (currentRoom) {

      //join chat

      try {
        console.log("current room is: " ,currentRoom);
        setRoomId(roomId => currentRoom);
        console.log("pass room: ",roomId);
        //const room = await joinChatApi(currentRoom);
        toast.success("joined..");
        // setCurrentUser(detail.userName);
        //setRoomId(currentRoom);
        // setConnected(true);
        //console.log("current room id is: " ,roomId);
        navigate("/chat");
 
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    
  }

  return (
    <div>
       
            <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
            {/* room name container */}
          
            {/* username container */}

            <div>
            <h1 className="text font-semibold">
                User : <span>{currentUser}</span>
            </h1>
            </div>
          
            {/* button: leave room */}
            <div>
            <button
                //onClick={handleLogout}
                className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
            >
                Log Out
            </button>
            </div>
          
        </header>
       
    
      <div>
        <main className="py-20 px-10   w-2/3  mx-auto h-screen overflow-auto ">
        {/* <div className="p-1"> </div> */}
        <div className="p-3 flex justify-center">
            <div>
            <button
                onClick={handleNewRoom}
                className="dark:bg-green-500 dark:hover:bg-green-700 px-3 py-2 rounded-full"
            >
                Create New Room
            </button>
            </div>
        </div>
        {/* <p className="text-center items-center">Your Rooms</p> */}
        {rooms.map((room, index) => (
            <div key={index}>
                <div className="p-5 rounded-2xl border flex justify-between items-center">
                    <span>Room: {room}</span>
                    <button onClick={() => {joinChat(room)}} className="dark:bg-green-500 dark:hover:bg-green-900 border px-3 py-2 rounded-lg">
                          Join  
                    </button>
                </div>
                <div className="p-3"> </div>
            </div>
        ))}
        </main>
      </div>
    </div>
    
    // <div className="">
    //   {/* this is a header */}
    //   <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
    //     {/* room name container */}
    //     <div>
    //       <h1 className="text-xl font-semibold">
    //         Room : <span>{roomId}</span>
    //       </h1>
    //     </div>
    //     {/* username container */}

    //     <div>
    //       <h1 className="text-xl font-semibold">
    //         User : <span>{currentUser}</span>
    //       </h1>
    //     </div>
    //     {/* button: leave room */}
    //     <div>
    //       <button
    //         onClick={handleLogout}
    //         className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
    //       >
    //         Leave Room
    //       </button>
    //     </div>
    //   </header>

    //   <main
    //     ref={chatBoxRef}
    //     className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto "
    //   >
    //     {messages.map((message, index) => (
    //       <div
    //         key={index}
    //         className={`flex ${
    //           message.sender === currentUser ? "justify-end" : "justify-start"
    //         } `}
    //       >
    //         <div
    //           className={`my-2 ${
    //             message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
    //           } p-2 max-w-xs rounded`}
    //         >
    //           <div className="flex flex-row gap-2">
    //             <img
    //               className="h-10 w-10"
    //               src={"https://avatar.iran.liara.run/public/43"}
    //               alt=""
    //             />
    //             <div className="flex flex-col gap-1">
    //               <p className="text-sm font-bold">{message.sender}</p>
    //               <p>{message.content}</p>
    //               <p className="text-xs text-gray-400">
    //                 {timeAgo(message.timeStamp)}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </main>
    //   {/* input message container */}
    //   <div className=" fixed bottom-4 w-full h-16 ">
    //     <div className="h-full  pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
    //       <input
    //         value={input}
    //         onChange={(e) => {
    //           setInput(e.target.value);
    //         }}
    //         onKeyDown={(e) => {
    //           if (e.key === "Enter") {
    //             sendMessage();
    //           }
    //         }}
    //         type="text"
    //         placeholder="Type your message here..."
    //         className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  "
    //       />

    //       <div className="flex gap-1">
    //         <button className="dark:bg-purple-600 h-10 w-10  flex   justify-center items-center rounded-full">
    //           <MdAttachFile size={20} />
    //         </button>
    //         <button
    //           onClick={sendMessage}
    //           className="dark:bg-green-600 h-10 w-10  flex   justify-center items-center rounded-full"
    //         >
    //           <MdSend size={20} />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};


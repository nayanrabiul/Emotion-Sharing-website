
 import React, { useState } from 'react';
 import {Link, Navigate} from "react-router-dom";

 function Dropdown({user,setUser}) {
     const [isOpen, setIsOpen] = useState(false);
     const toggleDropdown = () => {
         setIsOpen(!isOpen);
     };

     return (
         <div className="relative">
             <button
                 className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
                 onClick={toggleDropdown}
             >
                 Dropdown
             </button>
             {isOpen && (
                 <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                     <div><Link to={`/user/${user}`}>Profile</Link>  </div>
                     <div onClick={() => {
                         setUser(null);
                         localStorage.removeItem('user');
                         return <Navigate to="/"></Navigate>;
                     }}>logout</div>
                 </div>
             )}
         </div>
     );
 }

 export  default  Dropdown;

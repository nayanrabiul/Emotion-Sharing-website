import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [id]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-xl mx-auto bg-[#B9e0FF] p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-center text-[#E49393]">{user.name}</h1>
            <div className="flex justify-center items-center mb-8">
                <div className="h-1 bg-[#E49393] mr-2 flex-grow"></div>
                <div className="text-gray-500 text-lg font-semibold">{user.username}</div>
                <div className="h-1 bg-[#E49393] ml-2 flex-grow"></div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="bg-white p-4 rounded-lg mb-4 lg:mb-0 lg:mr-4 flex-grow">
                    <h2 className="text-2xl font-bold mb-4 text-[#E49393]">{user.email}</h2>
                    <p className="text-lg mb-2"><span className="text-[#E49393] font-bold">Phone:</span> {user.phone}</p>
                    <p className="text-lg"><span className="text-[#E49393] font-bold">Website:</span> {user.website}</p>
                </div>
                <div className="bg-white p-4 rounded-lg lg:ml-4 flex-grow">
                    <h2 className="text-2xl font-bold mb-4 text-[#E49393]">Address</h2>
                    <p className="text-lg mb-2"><span className="text-[#E49393] font-bold">Street:</span> {user.address.street}, {user.address.suite}</p>
                    <p className="text-lg mb-2"><span className="text-[#E49393] font-bold">City:</span> {user.address.city}</p>
                    <p className="text-lg"><span className="text-[#E49393] font-bold">Zipcode:</span> {user.address.zipcode}</p>
                    <p className="text-lg mt-4"><span className="text-[#E49393] font-bold">Geolocation:</span> {user.address.geo.lat}, {user.address.geo.lng}</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg mt-8">
                <h2 className="text-2xl font-bold mb-4 text-[#E49393]">Company</h2>
                <p className="text-lg mb-2"><span className="text-[#E49393] font-bold">Name:</span> {user.company.name}</p>
                <p className="text-lg mb-2"><span className="text-[#E49393] font-bold">Catchphrase:</span> {user.company.catchPhrase}</p>
                <p className="text-lg"><span className="text-[#E49393] font-bold">Business:</span> {user.company.bs}</p>
            </div>
        </div>
    );
};

export default User;
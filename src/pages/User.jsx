import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import HeroSection from "../../components/home_page/HeroSection.jsx";
import {Col, Row} from "antd";
import Posts from "../../components/home_page/Posts.jsx";
import {fetchPosts, fetchUsers} from "../../helpers/backend_helper.js";
import TrendingPost from "../../components/home_page/TrendingPost.jsx";
import {useFetch} from "../../helpers/hooks.js";

const User = () => {
    const {id} = useParams();
    const [user, setUser, {loading}] = useFetch(fetchUsers, {id})

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <HeroSection/>
            <Row gutter={10}>
                <Col span={16}><Posts
                    url={{fetch: fetchPosts, query: {userId: id}, _paginationFromHeader: false}}/></Col>
                <Col span={8}>
                    <TrendingPost/>
                    <div className="max-w-xl mx-auto bg-[#B9e0FF] p-8 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold mb-4 text-center text-[#E49393]">{user[0]?.name}</h1>
                        <div className="flex justify-center items-center mb-8">
                            <div className="h-1 bg-[#E49393] mr-2 flex-grow"></div>
                            <div className="text-gray-500 text-lg font-semibold">{user[0]?.username}</div>
                            <div className="h-1 bg-[#E49393] ml-2 flex-grow"></div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-center">
                            <div className="bg-white p-4 rounded-lg mb-4 lg:mb-0 lg:mr-4 flex-grow">
                                <h2 className="text-2xl font-bold mb-4 text-[#E49393]">{user[0]?.email}</h2>
                                <p className="text-lg mb-2"><span
                                    className="text-[#E49393] font-bold">Phone:</span> {user[0]?.phone}</p>
                                <p className="text-lg"><span
                                    className="text-[#E49393] font-bold">Website:</span> {user[0]?.website}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg lg:ml-4 flex-grow">
                                <h2 className="text-2xl font-bold mb-4 text-[#E49393]">Address</h2>
                                <p className="text-lg mb-2"><span
                                    className="text-[#E49393] font-bold">Street:</span> {user[0]?.address.street}, {user[0]?.address.suite}
                                </p>
                                <p className="text-lg mb-2"><span
                                    className="text-[#E49393] font-bold">City:</span> {user[0]?.address.city}</p>
                                <p className="text-lg"><span
                                    className="text-[#E49393] font-bold">Zipcode:</span> {user[0]?.address.zipcode}</p>
                                <p className="text-lg mt-4"><span
                                    className="text-[#E49393] font-bold">Geolocation:</span> {user[0]?.address.geo.lat}, {user[0]?.address.geo.lng}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg mt-8">
                            <h2 className="text-2xl font-bold mb-4 text-[#E49393]">Company</h2>
                            <p className="text-lg mb-2"><span
                                className="text-[#E49393] font-bold">Name:</span> {user[0]?.company.name}</p>
                            <p className="text-lg mb-2"><span
                                className="text-[#E49393] font-bold">Catchphrase:</span> {user[0]?.company.catchPhrase}</p>
                            <p className="text-lg"><span
                                className="text-[#E49393] font-bold">Business:</span> {user[0]?.company.bs}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>

    );
};

export default User;
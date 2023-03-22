import React, {useState} from 'react';
import {Modal, Form, Input, Button} from 'antd';
import axios from 'axios';

const HeroSection = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        try {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: values.title,
                    body: values.body,
                    userId: values.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then(async (json) => {
                        const fresponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${json.id}`);
                        console.log(fresponse.data);

                    }
                );


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="mt-4 rounded-lg bg-gradient-to-r from-pink-100 via-red-200 to-pink-300  flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white">
                    Share Your Feeling
                </h1>
                <button
                    className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded"
                    onClick={showModal}
                >
                    Share Your Feeling
                </button>
                <Modal
                    title="Make a Post"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {required: true, message: 'Please input the title!'},
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Body"
                            name="body"
                            rules={[
                                {required: true, message: 'Please input the body!'},
                            ]}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                            label="User ID"
                            name="userId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the user ID!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default HeroSection;
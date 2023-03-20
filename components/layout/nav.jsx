import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";
import {AuthContext} from "../../contexts/AuthProvider.jsx";

const Nav = () => {
    const {user} = useContext(AuthContext);
    return (<nav>
        <Row justify={'center'}>
            <Col span={3}>
                <Link to={`/`}>
                    <img className={'h-8 w-8'} src={'logo.svg'} alt={'logo'}/>
                </Link>
            </Col>
            <Col span={18}>
                <div className="w-full py-1 flex justify-center space-x-8 items-center">
                    <Link to={`/post`}>post</Link>
                    <Link to={`/login`}>login</Link>
                    <Link to={`/user/${user.id}`}>user</Link>
                </div>
            </Col>
            <Col span={3}>
                {user ? <Link to={`/user/${user.id}`}>user</Link> : <Link to={`/login`}>login</Link>}
            </Col>
        </Row>
    </nav>)

};

export default Nav;

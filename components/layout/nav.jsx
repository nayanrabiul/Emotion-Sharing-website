import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {Col, Row} from "antd";
import {AuthContext} from "../../contexts/AuthProvider.jsx";
import Dropdown from "../common/Dropdown.jsx";

const Nav = () => {
    const {user, setUser} = useContext(AuthContext);

    return (<nav>
        <Row justify={'center'}>
            <Col span={3}>
                <Link to={`/`}>
                    <img className={'h-8 w-8'} src={'/logo.svg'} alt={'logo'}/>
                </Link>
            </Col>
            <Col span={18}>
                <div className="w-full py-1 flex justify-center space-x-8 items-center">

                    {/*here goes other menu*/}

                </div>
            </Col>
            <Col span={3}>
                {user ? <div>
                    <Dropdown user={user} setUser={setUser}/>
                    </div> : <Link to={`/login`}>login</Link>}
            </Col>
        </Row>
    </nav>)

};

export default Nav;









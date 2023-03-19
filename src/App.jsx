import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";

const App = () => {

    return (<div>
        <h1>App</h1>
        <div className={'text-2xl flex flex-col'}>
            <Link to={`/`}>root</Link>
            <Link to={`/post`}>post</Link>
            <Link to={`/login`}>login</Link>
            <Link to={`/user/1`}>user</Link>
        </div>
    </div>);
}

export default App;
import {useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider';

const CheckLogin = ({children}) => {
    const {user} = useContext(AuthContext);

        console.log("here")
    if (user) {
        return <Navigate to={`/user/${user}`}></Navigate>;
    }
    else{
        return children;
    }


};

export default CheckLogin;
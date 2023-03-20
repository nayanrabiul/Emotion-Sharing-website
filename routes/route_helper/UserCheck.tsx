import {useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider';

const UserCheck = ({children}) => {
    const {user} = useContext(AuthContext);

    if (user) {
        console.log("here")
        return <Navigate to={`/user/${user}`}></Navigate>;
    }
    else{
        return <Navigate to="/login"></Navigate>;
    }


};

export default UserCheck;
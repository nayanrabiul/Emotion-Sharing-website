import {useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider';

const CheckUser = ({children}) => {
    const {user} = useContext(AuthContext);
    console.log("fasdfasd",user)

    if (user) {
        return children;
    }
    else{
        return <Navigate to="/login"></Navigate>;
    }


};

export default CheckUser;
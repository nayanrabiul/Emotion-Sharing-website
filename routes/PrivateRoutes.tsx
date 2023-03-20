import {useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const param = useParams()

    console.log(param.id, user,'param.id, user')
    if (param.id !== user) {
        return <Navigate to="/login"></Navigate>;
    }

    if (user) {
        return children;
    }

};

export default PrivateRoute;
import {useContext} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider';

const CheckLogin = ({children}) => {
    const {user} = useContext(AuthContext);
    if (user) {
        console.log(user,"fkasjlkdjfajsdf")
        return <Navigate to={`/user/${user.id}`}/>;
    }
    else{
        return children;
    }


};

export default CheckLogin;
import {useEffect, useState} from 'react';
import swalAlert from "../components/common/alert";

export const useFetch = (func, query, load = true) => {
    const [data, setData] = useState();
    const [params, setParams] = useState({
        ...query
    })

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, []);

    const getData = (query) => {
        setParams({...params, ...query})
        func({...params, ...query}).then((data) => {
            setData(data)
        }).catch(e => {
            console.log(e)
        })
    }
    return [data, getData];
}

export const useAction = async (func, data, reload, alert = true) => {

    const {error, msg, data: d} = await func({...data})
    if (error === false) {
        if (reload) {
            reload(d)
        }
        if (alert) {
            await swalAlert.success(msg)
        }
    } else {
        await swalAlert.error(msg)
    }
}





import { useEffect, useState } from "react";

export const useFetch = (func, query, load = true) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [params, setParams] = useState({
    ...query,
  });

  useEffect(() => {
    if (load) {
      getData(params);
    }
  }, []);

  const getData = (query) => {
    setParams({ ...params, ...query });
    func({ ...params, ...query })
      .then((response) => {
        setLoading(false);
        setHeaders(response?.headers);
        setData(response?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return [data, getData, { loading, headers }];
};

export const useAction = async (func, data, reload, alert = true) => {
  const res = await func({ ...data });

  if (reload) {
    reload(res);
  }
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCustomHook(api) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);

    async function fetchFunction() {
        setErr(null);
        setIsLoading(true);
        try {
            const res = await axios.get(api);
            setData(res.data.results);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFunction();
    }, []);

    return {data, isLoading, err};
}

//https://api.abhishekshivale45.workers.dev/recent/${count} Recent wala api
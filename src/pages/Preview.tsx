import {useEffect, useState} from "react";
function Preview(){
    const [data, setData] = useState(null);
    const API_KEY = "c3bf1d91c4009118a9aec39e8e3af3dc611eea6e3cf730f9a81a9ed18d243c01";
    const ENDPOINT = "https://api.nasa.gov/planetary/apod";
    const params = {
        date : "2024-06-01"
    }

    useEffect(() => {
        const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        const url = `${ENDPOINT}?${queryString}`

        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{data.title}</h1>
            <img src={data.url} width="400"/>
            <p>{data.explanation}</p>
        </div>
    )
}
export default Preview;
import {useEffect, useState} from "react";

interface AppResult {
    title: string;
    original: string;
    source: string;
}
interface SerpApiRespooense {
  app_highlight: AppResult[];
}


function Preview(){
    // const [data, setData] = useState(null);
    const [data, setData] = useState<SerpApiRespooense | null>(null);
    // const API_KEY = "c3bf1d91c4009118a9aec39e8e3af3dc611eea6e3cf730f9a81a9ed18d243c01";
    // const ENDPOINT = "https://serpapi.com/search";
    const params = {
        engine : "google_play",
        q : "honkai", 
        hl : "id", 
        gl : "us",
        store : "apps",
    }

    useEffect(() => {
        // const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        // const serpUrl = `${ENDPOINT}?${queryString}`
        // fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
        const queryString = new URLSearchParams(params).toString()
        fetch('/api/search?${queryString}')
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
    <div className="container">

      <div className="header">

        <img
          className="app-icon"
          src={data.app_highlight.thumbnail}
          alt=""
        />

        <div className="app-info">

          <h1>{data.app_highlight.title}</h1>

          <p>
            {data.app_highlight.author}
          </p>
          <p>
            ⭐ {data.app_highlight.rating}
          </p>

          <button className="download-btn">
            Install
          </button>

        </div>

      </div>
      <iframe
        width="100%"
        height="500"
        src="https://play.google.com/video/lava/web/player/yt:movie:2aCze-I8Tew?autoplay=1&embed=play"
        title="YouTube video"
        allowFullScreen
        style={{
          borderRadius: "20px",
          border: "none",
          marginTop: "20px"
        }}
      ></iframe>
      
      <h2 className="section-title">
        Screenshots
      </h2>

      <div className="image-list">

        {data.app_highlight.images.map(
          (img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              onClick={() =>
                setSelectedImage(img)
              }
            />

          )
        )}

      </div>
      <p className="description">
        {data.app_highlight.description}
      </p>
        {selectedImage && (

        <div
          className="modal"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <img
            className="modal-image"
            src={selectedImage}
            alt=""
          />

        </div>

      )}

    </div>  
        
  );
}
export default Preview;
import axios from "axios";
// import React from "react";
import { useEffect, useState } from "react";

type dataType = {
  first: string;
  last: string;
  email: string;
};

const url = "https://randomuser.me/api";

function DisplayData() {
  const [data, setData] = useState<dataType[] | any>([]);
  const [load, setLoad] = useState(false);
  const [start, setStart] = useState(true);
  const [save, setSave] = useState<dataType[] | any>([]);

  const getData = async () => {
    console.log("RRRRRRRRRR", start);
    setLoad(true);
    try {
      const res = await axios.get(url);

      const {
        email,
        name: { title, first, last },
      } = res.data.results[0];
      setLoad(false);

      const getUser = localStorage.getItem("api-data");
      const userData = getUser !== null ? JSON.parse(getUser) : [];
      setData(userData);

      localStorage.setItem(
        "api-data",
        JSON.stringify({ email, title, first, last })
      );

      localStorage.setItem("saved-data", JSON.stringify(save));
      setSave([...save, { email, title, first, last }]);

      console.log("Random Data Details: ", email + "|" + title, first, last);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="content">
        {start ? (
          <p className="start">Click to get random data</p>
        ) : (
          <>
            {load ? (
              <p className="loading">Loading...</p>
            ) : (
              <>
                <h1 className="name">{`${data.title} ${data.first} ${data.last}`}</h1>
                <p className="email">{`${data.email} `}</p>
              </>
            )}
          </>
        )}
      </div>
      <button
        className="btn"
        onClick={() => {
          getData();
          setStart(false);
        }}
      >
        Get Random Name
      </button>
    </div>
  );
}

export default DisplayData;

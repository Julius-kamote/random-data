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

  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(url);

      console.log("LLLLLLLLLLLLLL", load);
      const {
        email,
        name: { title, first, last },
      } = res.data.results[0];
      setLoad(false);

      localStorage.setItem(
        "person-data",
        JSON.stringify({ email, title, first, last })
      );

      const getUser = localStorage.getItem("person-data");
      const userData = getUser !== null ? JSON.parse(getUser) : [];
      setData(userData);

      console.log("Random Data Details: ", email + "|" + title, first, last);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => getData();
  }, []);

  return (
    <div>
      <div className="content">
        {load ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <h1 className="name">{`${data.title} ${data.first} ${data.last}`}</h1>
            <p className="email">{`${data.email} `}</p>
          </>
        )}
      </div>
      <button
        className="btn"
        onClick={() => {
          getData();
        }}
      >
        Get Random Name
      </button>
    </div>
  );
}

export default DisplayData;

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

  const getData = async () => {
    try {
      const res = await axios.get(url);
      const {
        email,
        name: { title, first, last },
      } = res.data.results[0];

      localStorage.setItem(
        "person-data",
        JSON.stringify({ email, title, first, last })
      );

      const getUser = localStorage.getItem("person-data");
      const userData = getUser !== null ? JSON.parse(getUser) : [];
      setData(userData);

      console.log("Data Details: ", email + "|" + title, first, last);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content">
      {data == null ? "loading" : "yes"}
      <h1 className="name">{`${data.title} ${data.first} ${data.last}`}</h1>
      <p className="email">{`${data.email} `}</p>
      <button
        className="btn"
        onClick={() => {
          getData();
        }}
      >
        Random Name
      </button>
    </div>
  );
}

export default DisplayData;

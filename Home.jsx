import React from "react";
import axios from "axios";

const Home = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = null;
    await axios({
      url: "http://172.27.1.2:5000/api/otp/",
      method: "get",
      withCredentials: true,
    })
      .then((resp) => (result = resp))
      .catch((err) => (result = err.response));
    console.log(result);
    return;
  };
  return (
    <section>
      <h1>Welcome!</h1>
      <a href="OTP">
        <button onClick={handleSubmit}>Get OTP</button>
      </a>

      <a href="Balance">
        <button>Balance</button>
      </a>
      <a href="/">
        <button>Logout</button>
      </a>
    </section>
  );
};

export default Home;

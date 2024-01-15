import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrMsg] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("Invalid Credentials");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    console.log(1);
    e.preventDefault();
    let result = null;
    await axios({
      url: "http://172.27.1.2:5000/api/login/",
      method: "post",

      data: {
        registration_mode: false,
        user: user,
        pass: pwd,
      },
      withCredentials: true,
    })
      .then((resp) => (result = resp))
      .catch((err) => (result = err.response));
    if (result.status === 200) {
      setSuccess(true);
      console.log(result);

      // Debug
      let asd = null;
      await axios({
        url: "http://172.27.1.2:5000/api/session/",
        method: "get",

        // data: {
        //   registration_mode: false,
        //   user: user,
        //   pass: pwd,
        // },
        withCredentials: true,
      })
        .then((resp) => (asd = resp))
        .catch((err) => (asd = err.response));

      console.log(asd);
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="Home">
              <button>Go to Home</button>
            </a>
          </p>
        </section>
      ) : (
        <section>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={user}
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <button>
              <b> Login</b>
            </button>
          </form>
          <p>
            <center>
              Need an Account? <space></space>
              <span className="line">
                <a href="Register"> Sign Up</a>
              </span>
            </center>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;

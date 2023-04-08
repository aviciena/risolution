import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";
import loginIcon from '../../../assets/login-icon.webp';

export default function Login() {
  const router = useRouter();
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  const onLoginClickHandler = () => {
    setError({ email: email.length === 0, password: password.length === 0 });

    if (email.length > 0 && password.length > 0) {
      router.replace("/");
      cookies.set("authorized", true);
    }
  }

  const onChangeHandler = (e) => {
    const { value, type } = e.target;
    if (type === "email") {
      setEmail(value);
      setError(prevState => ({ ...prevState, email: value.length === 0 }));
    }
    if (type === "password") {
      setPassword(value);
      setError(prevState => ({ ...prevState, password: value.length === 0 }));
    }
  }

  const onClickRegisterHandler = () => {
    router.push("register");
  }

  return (
    <section className="pt-5" style={{ background: "#f5f5f6", minHeight: "100vh" }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Image src={loginIcon}
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="form-outline mb-3">
              <input type="email" className="form-control form-control-lg"
                placeholder="Email address" value={email} onChange={onChangeHandler} />
              <p className="small text-danger mt-1" style={{ height: "1rem" }}>{error.email ? "Silahkan isi email  terlebih dahulu!" : ""}</p>
            </div>

            <div className="form-outline mb-5">
              <input type="password" className="form-control form-control-lg"
                placeholder="Password" value={password} onChange={onChangeHandler} />
              <p className="small text-danger mt-1" style={{ height: "1rem" }}>{error.password ? "Silahkan isi password  terlebih dahulu!" : ""}</p>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <button type="button" className="btn btn-primary btn-lg w-50" onClick={onLoginClickHandler}>Login</button>
              <a style={{ cursor: "pointer" }}>Forgot password?</a>
            </div>
            <p className="small fw-bold mt-2 pt-1 mb-3">Don't have an account? <a
              className="link-danger" onClick={onClickRegisterHandler} style={{ cursor: "pointer" }}>Register</a></p>
          </div>
        </div>
      </div>
      <div
        className="fixed-bottom py-3 px-3 px-xl-5 bg-primary text-white">
        Copyright © 2023. All rights reserved.
      </div>
    </section>
  );
}
import { Api } from "@/pages/api/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Register() {
  const router = useRouter();
  const cookies = new Cookies();
  const [state, setState] = useState([]);
  const [cityResp, setCityResp] = useState([]);
  const [city, setCity] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [urban, setUrban] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [postBody, setPostBody] = useState({});

  const onClickLogin = () => {
    router.replace("login");
    cookies.set("authorized", true);
  }

  const onSignUpHandler = () => {
    router.replace("/");
  }

  useEffect(() => {
    const api = new Api();
    api.getState().then(response => {
      setState(response);
    }).catch(() => {
      setState([]);
    });
    api.getCityPostalCode().then(response => {
      setCityResp(response);
    }).catch(() => {
      setCityResp([]);
    });
  }, []);

  const onChangehandler = (e, type) => {
    const value = e.target.value;
    let filter = [];
    let selected = [];
    switch (type) {
      case "state":
        //Provinsi selected
        filter = cityResp.filter(el => el.province_code === value);
        selected = filter.filter((tag, index, array) => array.findIndex(t => t.city === tag.city) == index);
        setCity(selected);
        setSubDistrict([]);
        setUrban([]);
        setPostalCode([]);
        const selectedIdx = state.findIndex((item) => item.id === value);
        setPostBody(prevState => ({ ...prevState, stateName: state[selectedIdx].name, state: value }));
        break;
      case "city":
        //Kota selected
        filter = cityResp.filter(el => el.city === value);
        selected = filter.filter((tag, index, array) => array.findIndex(t => t.sub_district === tag.sub_district) == index);
        setSubDistrict(selected);
        setUrban([]);
        setPostalCode([]);
        setPostBody(prevState => ({ ...prevState, city: value }));
        break;
      case "subDistrict":
        //Kecamatan selected
        filter = cityResp.filter(el => el.sub_district === value);
        selected = filter.filter((tag, index, array) => array.findIndex(t => t.urban === tag.urban && t.city == postBody.city) == index);
        setUrban(selected);
        setPostBody(prevState => ({ ...prevState, subDistrict: value }));
        setPostalCode([]);
        break;
      case "urban":
        //Kelurahan selected
        filter = cityResp.filter(el => el.urban === value);
        selected = filter.filter((tag, index, array) => array.findIndex(t => t.postal_code === tag.postal_code) == index);
        setPostalCode(selected);
        setPostBody(prevState => ({ ...prevState, urban: value, postalCode: selected[0].postal_code }));
        break;
      default:
        setPostBody(prevState => {
          const newObj = { ...prevState };
          newObj[type] = value;
          return newObj;
        });
        break;
    }
  }

  return (
    <section>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ "backgroundColor": "#f5f5f6", minHeight: "100vh" }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ "color": "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          className="form-control"
                          onChange={(e) => onChangehandler(e, "firstName")}
                        />
                        <label className="form-label">Nama Depan</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" className="form-control" onChange={(e) => onChangehandler(e, "lastName")} />
                        <label className="form-label">Nama Belakang</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <select
                          className="form-select"
                          aria-label="Provinsi"
                          onChange={(e) => onChangehandler(e, "state")}
                          value={postBody.state}>
                          <option defaultValue>Pilih...</option>
                          {state.map((data, index) =>
                            <option value={data.id} key={index.toString()}>{data.name}</option>
                          )}
                        </select>
                        <label className="form-label">Provinsi</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <select
                          className="form-select"
                          aria-label="Kota"
                          onChange={(e) => onChangehandler(e, "city")}
                          value={postBody.city}>
                          <option defaultValue>Pilih...</option>
                          {city.map((data, index) =>
                            <option value={data.city} key={index.toString()}>{data.city}</option>
                          )}
                        </select>
                        <label className="form-label">Kota</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <select
                          className="form-select"
                          aria-label="Kecamatan"
                          onChange={(e) => onChangehandler(e, "subDistrict")}
                          value={postBody.subDistrict}>
                          <option defaultValue>Pilih...</option>
                          {subDistrict.map((data, index) =>
                            <option value={data.sub_district} key={index.toString()}>{data.sub_district}</option>
                          )}
                        </select>
                        <label className="form-label">Kecamatan</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <select
                          className="form-select"
                          aria-label="Kelurahan"
                          onChange={(e) => onChangehandler(e, "urban")}
                          value={postBody.urban}>
                          <option defaultValue>Pilih...</option>
                          {urban.map((data, index) =>
                            <option value={data.urban} key={index.toString()}>{data.urban}</option>
                          )}
                        </select>
                        <label className="form-label">Kelurahan</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <select
                          className="form-select"
                          aria-label="Kode Pos"
                          onChange={(e) => onChangehandler(e, "postalCode")}
                          value={postBody.postalCode}>
                          <option defaultValue>Pilih...</option>
                          {postalCode.map((data, index) =>
                            <option value={data.postal_code} key={index.toString()}>{data.postal_code}</option>
                          )}
                        </select>
                        <label className="form-label">Kode Pos</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" className="form-control" onChange={(e) => onChangehandler(e, "phoneNumber")} />
                        <label className="form-label">Mobile Phone Number</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <textarea className="form-control" onChange={(e) => onChangehandler(e, "address")} />
                    <label className="form-label">Alamat</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" className="form-control" onChange={(e) => onChangehandler(e, "email")} />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" className="form-control" onChange={(e) => onChangehandler(e, "password")} />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" className="form-control" />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <button className="btn btn-primary btn-block mb-4" onClick={onSignUpHandler}>
                    Sign up
                  </button>

                  <p className="small fw-bold mt-2 pt-1 mb-3">I have an account? <a
                    className="link-danger" onClick={onClickLogin} style={{ cursor: "pointer" }}>Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
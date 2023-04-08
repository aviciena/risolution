import CustomChart from '@/components/custom_chart';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import { useRouter } from 'next/router';
import Cookies from "universal-cookie";

export default function Home() {
  const router = useRouter();
  const cookies = new Cookies();

  return (
    <div className='wrapper'>
      <Sidebar />
      <div className="content-wrapper d-flex flex-column">
        <div className="content">
          <TopBar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Shipper Cisaranten Endah 2</h1>
              <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                Buat Order Baru <i className="fas fa-plus fa-sm text-white-50"></i>
              </a>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Saldo Balance</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">Rp 215.000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-rupiah-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Total Pickup hari ini</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">8 Pickup</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-box fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Status Pickup hari ini</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">18 Pickup Terjadwal</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-box fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                          </div>
                          <div className="col">
                            <div className="progress progress-sm mr-2">
                              <div className="progress-bar bg-info" role="progressbar"
                                style={{
                                  width: "50%", ariaValuenow: "50", ariaValuemin: "0",
                                  ariaValuemax: "100"
                                }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-7">
                <CustomChart />
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
      <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                cookies.remove('authorized');
                router.replace("/account/login");
              }}>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

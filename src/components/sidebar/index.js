import { useState } from "react"

export default function Sidebar() {
  const [toggled, setToggled] = useState("");

  const showHideNavHandler = () => {
    setToggled(toggled === "" ? "toggled" : "");
  }

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggled}`} id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">RiSolution</div>
      </a>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>
      <hr className="sidebar-divider" />

      <li className="nav-item">
        <a className="nav-link" href="">
          <i className="fa fa-thin fa-boxes-stacked"></i>
          <span>Order</span></a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fa fa-calendar-day"></i>
          <span>Pickup</span></a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-table"></i>
          <span>Laporan</span></a>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" onClick={showHideNavHandler} id="sidebarToggle"></button>
      </div>
    </ul >
  )
}
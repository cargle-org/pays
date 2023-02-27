import React from "react";
import Header from "../components/header/header";

function HomePage() {
  return (
    <div className="">
      <Header />
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col">
              <h1>Create Vouchers & gift, Cashout your Vouchers</h1>
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum
              </h6>
              <div className="buttons">
                <button className="btn">Create Vouchers</button>
                <button className="btnTwo">Cash a gift</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

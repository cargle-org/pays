import React from "react";
import CreateIcon from "../../assets/create.svg";

function DashboardBody() {
  return (
    <div>
      <div className="title">
        <h3>Vouchers</h3>
        <div className="action">
          <button>
            <CreateIcon /> Create Voucher
          </button>
        </div>
      </div>
        <div className="tabs">
          <div className="tab">All Vouchers</div>
          <div className="tab">Active</div>
          <div className="tab">History</div>
        </div>
        <div className="cearch"></div>
    </div>
  );
}

export default DashboardBody;

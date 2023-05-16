import { useState } from "react";
import { IMyOrder } from "../../types";
import { rejectOrder } from "../../services/itemsServices";
import PopperComponent from "../../components/Popper";

type MyOrderProps = {
  myOrder: IMyOrder;
};

function MyOrder({ myOrder }: MyOrderProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopup = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onReject = async () => {
    await rejectOrder(myOrder.id);
    setAnchorEl(null);
  };

  const str = `Are you sure you want to reject this order?`;
  return (
    <div className="item-row extend">
      <span className="ProductNameColumn">{myOrder.productName}</span>
      <span className="ProductQtyColumn">{myOrder.qty}</span>
      <span className="ProductPriceColumn">{myOrder.price} BGN</span>
      <span className="ProductDateColumn">{myOrder.date}</span>
      <span className="status">{myOrder.status}</span>
      {myOrder.status == "Pending" && (
        <a className="deleteIcon" onClick={handlePopup}>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
              fill="#ED1C25"
            />
          </svg>
        </a>
      )}

      <PopperComponent
        str={str}
        onYes={onReject}
        anchor={anchorEl}
        setAnchor={setAnchorEl}
      />
    </div>
  );
}

export default MyOrder;

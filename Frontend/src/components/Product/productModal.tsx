import { Dialog } from "@mui/material";
import { IProduct } from "../../types";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface ModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ModalProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  if (!open) {
    onClose();
  }
  return (
    <Dialog
      PaperProps={{ sx : { borderRadius: "20px" } }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="modal-content">
        <a className="close-button" onClick={() => setOpen(false)}>
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7305 2.02734L10.7578 9L17.7305 15.9727L15.9727 17.7305L9 10.7578L2.02734 17.7305L0.269531 15.9727L7.24219 9L0.269531 2.02734L2.02734 0.269531L9 7.24219L15.9727 0.269531L17.7305 2.02734Z"
              fill="black"
            />
          </svg>
        </a>
        <a className="productImage">
          <img
            src={
              product.image
                ? product.image
                : `../images/no_image-placeholder.png`
            }
            alt="ProductImage"
          />
        </a>
        <section>
          <div className="details-section">
            <div className="name-details">
              <span>{product.name}</span>
              <small>{product.category}</small>
            </div>
            <div className="other-details">
              <span>{product.price} BGN</span>
              <small>Qty:{product.saleQty}</small>
            </div>
          </div>
          <p>{product.description}</p>
         
        </section>
      </div>
    </Dialog>
  );
};
export default ProductModal;
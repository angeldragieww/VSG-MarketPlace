import { useState } from "react";
import PopperComponent from "../../components/Popper";

type DeleteProps = {
  str: string;
  onYes: () => void;
};

const DeleteIcon = ({ str, onYes }: DeleteProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopup = (e :React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    
    
  };

  return (
    <>
      <a className="deleteIcon" onClick={handlePopup}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3438 2.65625H12.6562V4H3.34375V2.65625H5.65625L6.34375 2H9.65625L10.3438 2.65625ZM5.34375 6V12.6562H10.6562V6H5.34375ZM4 12.6562V4.65625H12V12.6562C12 13.0104 11.8646 13.3229 11.5938 13.5938C11.3229 13.8646 11.0104 14 10.6562 14H5.34375C4.98958 14 4.67708 13.8646 4.40625 13.5938C4.13542 13.3229 4 13.0104 4 12.6562Z"
            fill="#ED1C25"
          />
        </svg>
      </a>
      {!!anchorEl && (
        <PopperComponent
          str={str}
          onYes={onYes}
          anchor={anchorEl}
          setAnchor={setAnchorEl}
        />
      )}
    </>
  );
};
export default DeleteIcon;

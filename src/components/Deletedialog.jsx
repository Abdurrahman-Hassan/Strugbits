/* eslint-disable react/prop-types */
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/reducers/itemsSlice";

import "./DataList.css";

const DeleteDialog = ({ user, setDialogOpen }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteItem(user.id));
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="backdrop"></div>{" "}
      {/* Add backdrop for the gray background */}
      <div className="deletedialog">
        <div className="deletedialogdiv">
          <div className="dustbinlogodiv">
            <RiDeleteBin6Line />
          </div>
          <h3>Are you sure?</h3>
          <p>
            Do you really want to delete this customer?
            <span>This process cannot be undone.</span>
          </p>
          <div className="deletedialogbtnsdiv">
            <button
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Cancel
            </button>
            <button onClick={() => handleDeleteClick()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "../store/reducers/itemsSlice";

import "./DataList.css";

const EditDialog = ({ user, setEditdialogopen }) => {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(""); // You may want to handle file upload differently

  const handleEditCustomer = () => {
    // Create a new customer object with the entered data
    const updatedCustomers = {
      id: user.id, // You can use a unique identifier like a timestamp
      first_name: customerName,
      last_name: "", // You can set this to an empty string or handle it differently
      email,
      avatar: photo, // You may want to handle file uploads differently
    };

    console.log(updatedCustomers);
    // Dispatch the addItem action to add the updated customer data to Redux
    dispatch(updateItem(updatedCustomers));

    setEditdialogopen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        setPhoto(imageData);
      };

      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setCustomerName(`${user.first_name} ${user.last_name}`);
    setEmail(user.email);
    setPhoto(user.avatar); // You may want to handle file upload differently
  }, [user]);
  return (
    <div className="edit-dialog">
      <div className="backdrop"></div>{" "}
      {/* Add backdrop for the gray background */}
      <div className="dialog">
        <div>
          <div className="addcutomerheader">
            <div className="closebtndiv">
              <button
                onClick={() => {
                  setEditdialogopen(false);
                }}
              >
                X
              </button>
            </div>{" "}
            <div className="addcustomerheading">
              <h3>Add New Customer</h3>
            </div>
          </div>
          <div className="formdiv">
            <form>
              <input
                type="text"
                required
                maxLength={18}
                id="customername"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="email"
                required
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                id="photolabel"
                htmlFor="photo"
                style={{ cursor: "pointer" }}
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                required
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e)}
              />
              {/* <input
                type="submit"
                id="addcustomersubmitbtn"
                value={"EDIT CUSTOMER"}
              /> */}
              <input
                type="button"
                id="addcustomersubmitbtn"
                value={"EDIT CUSTOMER"}
                onClick={(e) => {
                  e.preventDefault();
                  handleEditCustomer();
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;

import { useRef, useState } from "react";
import "./Addcustomer.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItems } from "../store/reducers/itemsSlice";

const AddCustomer = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(""); // You may want to handle file upload differently

  // Retrieve the existing customer data from Redux
  const existingCustomers = useSelector(selectItems);

  const handleAddCustomer = () => {
    console.log(existingCustomers);
    // Create a new customer object with the entered data
    const newCustomer = {
      id: existingCustomers.length + 1, // You can use a unique identifier like a timestamp
      first_name: customerName,
      last_name: "", // You can set this to an empty string or handle it differently
      email,
      avatar: photo, // You may want to handle file uploads differently
    };

    // Combine the new customer with the existing customer data
    const updatedCustomers = [...existingCustomers, newCustomer];
    console.log(updatedCustomers);
    // Dispatch the addItem action to add the updated customer data to Redux
    dispatch(addItem(updatedCustomers));

    // Close the dialog
    ref.current?.close();
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

  return (
    <div className="addcustomerdiv">
      <button
        className="modalopenbtn"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        <AiOutlinePlus />
        <span>ADD NEW CUSTOMER</span>
      </button>
      <dialog className="dialog" ref={ref}>
        <div>
          <div className="addcutomerheader">
            <div className="closebtndiv">
              <button
                onClick={() => {
                  ref.current?.close();
                }}
              >
                X
              </button>
            </div>
            <div className="addcustomerheading">
              <h3>Add New Customer</h3>
            </div>
          </div>
          <div className="formdiv">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCustomer();
              }}
            >
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
              <input
                type="submit"
                id="addcustomersubmitbtn"
                value={"ADD CUSTOMER"}
              />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCustomer;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./DataList.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItems } from "../store/reducers/itemsSlice";
import DeleteDialog from "./deletedialog";
import EditDialog from "./EditDialog";
const DataList = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectItems);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditdialogopen, setEditdialogopen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the user to be deleted

  const openDialog = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setDialogOpen(true);
  };
  const editDialog = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setEditdialogopen(true);
  };

  useEffect(() => {
    // Check if there's data in localStorage
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("data"));

    if (itemsFromLocalStorage && itemsFromLocalStorage.length > 0) {
      // If there's data in localStorage, populate the Redux state from localStorage
      dispatch(addItem(itemsFromLocalStorage));
    } else {
      // If localStorage is empty, fetch data from the API
      fetch("https://reqres.in/api/users?page=1")
        .then((response) => response.json())
        .then((data) => {
          // Dispatch an action to add the fetched data to Redux
          dispatch(addItem(data.data));

          // Save the fetched data to localStorage
          localStorage.setItem("data", JSON.stringify(data.data));
        })
        .catch((error) => {
          console.log(error);
          alert("There's an error while fetching data!");
        });
    }
  }, [dispatch, useSelector]);

  if (data) {
    return (
      <div className="listmaindiv">
        <div className="abovelistlabeldiv">
          <div className="listlabeldiv">
            <button>Customer ID</button>
            <button>Customer Name</button>
            <button>Email</button>
          </div>
        </div>
        <div className="ListwithData">
          {data.map((user) => {
            return (
              <div className="user" key={user.id}>
                <img
                  src={user.avatar}
                  alt={user.first_name + " " + user.last_name}
                />
                <div className="userlabels">
                  <h4>{user.id}</h4>
                  <h4>{user.first_name + " " + user.last_name}</h4>
                  <h4>{user.email}</h4>
                </div>
                <div className="editdeletebtn">
                  <button className="editbtn" onClick={() => editDialog(user)}>
                    Edit
                  </button>
                  <button
                    className="deletebtn"
                    onClick={() => openDialog(user)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {isDialogOpen && (
          <DeleteDialog user={selectedUser} setDialogOpen={setDialogOpen} />
        )}
        {isEditdialogopen && (
          <EditDialog
            user={selectedUser}
            setEditdialogopen={setEditdialogopen}
          />
        )}
      </div>
    );
  }
};

export default DataList;

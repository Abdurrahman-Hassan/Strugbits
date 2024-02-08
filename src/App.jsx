import "./App.css";
import AddCustomer from "./components/AddCustomer";
import DataList from "./components/DataList";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";

function App() {
  return (
    <div className="maindiv">
      <div>
        <Sidebar />
      </div>
      <div className="mainside">
        <Header />
        <AddCustomer />
        <DataList />
      </div>
    </div>
  );
}

export default App;

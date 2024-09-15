import "./App.css";
import UsersTable from "./Components/UsersTable/UsersTable";
import store from "./services/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <UsersTable />
    </Provider>
  );
}

export default App;

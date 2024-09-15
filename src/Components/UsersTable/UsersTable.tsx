import { useEffect, ChangeEvent } from "react";
import "../../styles/UserTable.css";
import { fetchUsers, setFilters } from "../../services/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../services/store"; 
import { IUser } from "../../services/userSlice"; 

const UsersTable = () => {
  const dispatch = useDispatch();
  
  const users = useSelector((state: RootState) => state.users.filteredList);
  const status = useSelector((state: RootState) => state.users.status);
  const filters = useSelector((state: RootState) => state.users.filters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="table-header-cell"></th>
                <th className="table-header-cell">
                  Name
                  <input
                    name="nameFilter"
                    className="search-input"
                    placeholder="Search Name"
                    value={filters.nameFilter}
                    onChange={handleFilterChange}
                  />
                </th>
                <th className="table-header-cell">
                  Username
                  <input
                    name="usernameFilter"
                    className="search-input"
                    placeholder="Search Username"
                    value={filters.usernameFilter}
                    onChange={handleFilterChange}
                  />
                </th>
                <th className="table-header-cell">
                  E-mail
                  <input
                    name="emailFilter"
                    className="search-input"
                    placeholder="Search Email"
                    value={filters.emailFilter}
                    onChange={handleFilterChange}
                  />
                </th>
                <th className="table-header-cell">
                  Phone
                  <input
                    name="phoneFilter"
                    className="search-input"
                    placeholder="Search Phone"
                    value={filters.phoneFilter}
                    onChange={handleFilterChange}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: IUser) => (
                <tr key={user.id}>
                  <td className="table-cell">
                    <img
                      src="src/public/images/dashboard-username.png"
                      width="38"
                      height="38"
                      alt="profile"
                      className="rounded-full"
                    />
                  </td>
                  <td className="table-cell">{user.name}</td>
                  <td className="table-cell">{user.username}</td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;

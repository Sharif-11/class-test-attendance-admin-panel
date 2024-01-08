import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../Redux/Slices/userSlice";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  });
  return (
    <div>
      <h1>User Informtion</h1>
      <h4>{user?.name}</h4>
      <h4>{user?.email}</h4>
      <img src={user?.profileImage}></img>
    </div>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function AccountActivate() {
  //context
  const [auth, setAuth] = useAuth();
  //hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const { data } = await axios.post(`/register/`, { token });
      if (data?.error) {
        toast.error(data.error);
      } else {
        //save in the local storage
        localStorage.setItem("auth", JSON.stringify(data));

        //save in the context
        setAuth(data);
        toast.success("Successfully logged in. Welcome to real-estate app");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong try again");
    }
  };
  return (
    <div className="display-1 d-flex justify-content-center align-items-center vh-100">
      please wait...
    </div>
  );
}

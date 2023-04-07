import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  //context
  const [auth, setAuth] = useAuth();
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);

  //hooks
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.table({ email, password });
      SetLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data?.error) {
        toast.error(data.error);
        SetLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login succesfull");
        SetLoading(false);
        location?.state !== null
          ? navigate(location.state)
          : navigate("/dashboard");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong. Try again");
      SetLoading(false);
    }
  };
  return (
    <div>
      <h1 className="bg-primary text-light p-5">Login</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your Email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-4"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Login"}
              </button>
            </form>

            <Link className="text-danger" to="/auth/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

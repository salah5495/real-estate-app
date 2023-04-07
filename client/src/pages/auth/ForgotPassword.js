import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  //states
  const [email, setEmail] = useState("");
  const [loading, SetLoading] = useState(false);

  //hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.table({ email, password });
      SetLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
      });

      if (data?.error) {
        toast.error(data.error);
        SetLoading(false);
      } else {
        toast.success("Please check your email for password reset link");
        SetLoading(false);
        navigate("/");
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
      <h1 className="bg-primary text-light p-5">Forgot password</h1>
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

              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>

            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Logout from "./logout";

type Inputs = {
  username: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/auth/user-login-session",
        data,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 p-2">
          <label htmlFor="">username</label>
          <input type="text" placeholder="username" {...register("username")} />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div className="flex flex-col gap-2 p-2">
          <label htmlFor="">password</label>
          <input type="text" placeholder="password" {...register("password")} />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <button>Sign In</button>
      </form>

      <Logout />
    </div>
  );
};

export default SignIn;

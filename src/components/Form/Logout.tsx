import axios from "axios";

const Logout = () => {
  const logout = async () => {
    const response = await axios.delete("http://localhost:7000/api/v1/auth/logout", {
      withCredentials: true,
    });
    console.log(response);
  };
  return (
    <div>
      <form>
        <button onClick={logout}>logout</button>
      </form>
    </div>
  );
};

export default Logout;

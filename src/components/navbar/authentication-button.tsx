import { FaGoogle } from "react-icons/fa";

export const AuthenticationButton = () => (
  <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
    <FaGoogle className="text-white mr-2" />
    <span>Login or Register</span>
  </button>
);

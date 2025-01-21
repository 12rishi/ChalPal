import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { UserType } from "../../../../types/type";

const Form: React.FC<{ type: string; onSubmit: Function }> = ({
  type,
  onSubmit,
}) => {
  const [data, setData] = useState<UserType>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(data);
    setData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="space-y-6 dark:text-gray-100 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        {/* Email Field */}
        {type == "register" ? (
          <div className="space-y-1">
            <label htmlFor="userName" className="font-medium">
              UserName
            </label>
            <input
              className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your email"
              onChange={handleChange}
              value={data.userName}
            />
          </div>
        ) : null}
        <div className="space-y-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={data.email}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        {type == "register" && (
          <div className="space-y-1">
            <label htmlFor="password" className="font-medium">
              Confirm Password
            </label>
            <input
              className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
              type="password"
              id="password"
              name="confirmPassword"
              placeholder="Enter your password"
              onChange={handleChange}
              value={data.confirmPassword}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-40 inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
        >
          {type == "login" ? "login" : "register"}
        </button>
      </form>
    </div>
  );
};

export default Form;

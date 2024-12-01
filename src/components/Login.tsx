const Login = () => {
  return (
    <>
      <div className="h-screen font-sans p-3 flex items-center justify-center bg-gray-100">
        <div className="flex items-center flex-col w-full">
          <h1 className="text-2xl font-semibold font-mono mb-2">TaskIO</h1>
          <p className="mb-6 font-mono w-5/6 text-center">Your ultimate task management companion.</p>

          <form action="" className="w-5/6 max-w-96">
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder="E-mail or Username"
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
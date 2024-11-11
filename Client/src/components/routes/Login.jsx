import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { BackgroundGradientAnimation } from '../Gradient';
import NavBar from '../NavBar';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { id, value,type} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]:value,
    }))
  }
  const login=async(e)=>{
    e.preventDefault();
    if(formData.email==="" || formData.password===""){
      alert("All fields are required");
    }
    else
    {
    }
  }
  return (
    <BackgroundGradientAnimation>
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-auto pt-20 md:pb-20 z-50">
      <form className="flex items-center justify-center  w-full h-full px-4 md:px-0" onSubmit={login}>
        <div className="flex flex-col items-center justify-center w-full px-4 py-8  text-white font-sans lg:py-0 md:w-2/3 lg:w-1/3 mt-10 mb-10">
          <div className="w-full  border border-slate-700 rounded-2xl backdrop-filter backdrop-blur-3xl shadow-2xl">
            <div className="p-6 space-y-4 sm:p-8">
              <p className="text-2xl font-semibold leading-tight tracking-tight text-center md:text-3xl">
                Create an account
              </p>
              <div>
                <label className="block mb-1 text-sm md:text-md font-light">Your Email</label>
                <input
                  placeholder="JohnDoe"
                  className="bg-white/10 border border-gray-300 text-white text-sm md:text-md rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-300 outline-none"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm md:text-md font-light">Password</label>
                <input
                  className="bg-white/10 border border-gray-300 text-white text-sm md:text-md rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-light rounded-lg text-sm md:text-md px-5 py-2.5 text-center text-white"
                type="submit"
              >
                Login
              </button>
              <p className="text-sm md:text-md text-center mt-4">
                Create an account{' '}
                <Link to="/Auth" className="font-light text-blue-400 hover:underline">
                  SignUp
                </Link>
              </p>
              <p className='text-blue-400 hover:underline font-light text-center'>
                Forgot Your Password?
              </p>
            </div>
          </div>
        </div>
      </form>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Login;
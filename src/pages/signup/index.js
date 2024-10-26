import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Signup = () => {

  const router = useRouter()

  const [credentials, setCredentials] = useState({name: "",email: "", password: "",geolocation: ""})


    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const response = await fetch("api/userSignUp",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
          })
        } );

        const res = await response.json()

        if(res.success){
          localStorage.setItem("token", res.authToken);
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("isAdmin", await JSON.parse(res.isAdmin));
          router.push("/");
        }
        else{
          alert("there is something wrong please try again!");
        }
    };

    const handleChange = (e) =>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div style={{height: "90vh", backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: "cover"}}
    className='flex items-center justify-center'>
        <div className="container w-full max-w-md">

            <form onSubmit={handleSubmit} className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pb-8 pt-6 mb-4'>

            <div className='mb-4'>
                    <label 
                    htmlFor="name"
                    className='block text-gray-700 dark:text-gray-300 text-sm font-bold md-2'>
                        Name
                    </label>
                    <input name='name' 
                    type="text" 
                    required
                    onChange={handleChange}
                    value={credentials.name}
                    placeholder="Enter your Name"
                    className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                </div>

                <div className='mb-4'>
                    <label 
                    htmlFor="email"
                    className='block text-gray-700 dark:text-gray-300 text-sm font-bold md-2'>
                        Email
                    </label>
                    <input name='email' 
                    type="email" 
                    required
                    onChange={handleChange}
                    value={credentials.email}
                    placeholder="Enter your Email"
                    className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                </div>
                <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              placeholder="*******"
              onChange={handleChange}
              name="password"
              required
              type="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.password}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="geolocation"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              placeholder="Enter your address"
              onChange={handleChange}
              name="geolocation"
              required
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.geolocation}
            />
          </div>

                <div className='flex items-center justify-center'>

                </div>
                <button type="submit" className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100'>
                    Signup
                </button>
                <Link href="/login" style={{all: "unset"}}>
                <button className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100'>
                    Already a user
                </button>
                </Link>
            </form>

        </div>
    </div>
  )
}

export default Signup
import { useRouter  } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })

    const handleInputChange = (event, field) => {
      setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    const router = useRouter() 
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const apiUrl = "api/users";

          const requestData = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
          };

          const response = await fetch(apiUrl, requestData);

          if (!response.ok) {
            throw new Error(
              `Failed to post task: ${response.status} - ${response.statusText}`
            );
          } else {
            const responseJSON = await response.json();
            localStorage.setItem('userId', responseJSON.id);
            localStorage.setItem('userName', responseJSON.name);
            router.push("/tasks");
          }
        } catch (err) {
            console.log("Error", err);
        }
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        Login
  
        <form className="max-w-sm mx-auto" 
            // Remplazar esto por:  onSubmit={handleSubmit}
            //action="/tasks"
            onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Your email</label>
            <input onChange={e => handleInputChange(e, 'email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Your password</label>
            <input onChange={e => handleInputChange(e, 'password')} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Password1234"required />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
          </div>
          <div className="grid justify-items-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Submit</button>
          </div>
        </form>
      </main>
    );
  }
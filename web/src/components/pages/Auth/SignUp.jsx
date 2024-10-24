import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    // Campos del cliente
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
    // Campos del developer
    companyName: '',
    companyDescription: '',
    logoImageUrl: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          logoImageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = userType === 'customer' ? 'http://localhost:8000/customers' : 'http://localhost:8000/developers';
    const payload = userType === 'customer' ? {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      birthDate: formData.birthDate
    } : {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password,
      companyDescription: formData.companyDescription,
      logoImageUrl: formData.logoImageUrl
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        // Redirigir o realizar alguna acción adicional
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An error occurred during sign up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#220447] text-white font-['Inter']">
      <main className="flex justify-center items-center mt-8">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mt-2 mb-14 text-center">Complete los siguientes datos:</h2>
          
          <div className="flex justify-center mb-8 space-x-4">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`px-4 py-1.5 rounded-xl font-medium text-sm ${
                userType === 'customer'
                  ? 'bg-[#C93DEC] text-white hover:bg-[#a331c4]'
                  : 'bg-[#FFFFFF] text-[#220447] hover:bg-[#bdbebd]'
              }`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setUserType('developer')}
              className={`px-4 py-1.5 rounded-xl font-medium text-sm ${
                userType === 'developer'
                  ? 'bg-[#C93DEC] text-white hover:bg-[#a331c4]'
                  : 'bg-[#FFFFFF] text-[#220447] hover:bg-[#bdbebd]'
              }`}
            >
              Developer
            </button>
          </div>

          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mb-4 text-green-500 text-center">{success}</div>}

          {userType === 'customer' ? (
            // Formulario del cliente
            <div className="flex justify-between">
              <div className="w-1/2 pr-8">
                <div className="mb-4 flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="block mb-2 text-sm">Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-10 text-sm"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="block mb-2 text-sm">Apellido</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-10 text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-sm">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C93DEC]"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="w-1/2 pl-8 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-10 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="birthDate" className="block mb-2 text-sm">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-3 appearance-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:opacity-70 text-sm font-['Inter']"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            //Formulario del developer
            <div className="flex justify-between">
              <div className="w-1/2 pr-8">
                <div className="mb-4">
                  <label htmlFor="companyName" className="block mb-2 text-sm">Nombre de la empresa</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-10 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-sm">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C93DEC]"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="companyDescription" className="block mb-2 text-sm">Descripción de la empresa</label>
                  <textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] text-gray-300 rounded-lg px-4 py-2 text-sm min-h-[100px]"
                  />
                </div>
              </div>
              
              <div className="w-1/2 pl-8 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full px-4 py-2 pr-10 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="logoImageUrl" className="block mb-2 text-sm">Logo de la empresa</label>
                    <input
                      type="file"
                      id="logoImageUrl"
                      name="logoImageUrl"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full bg-[#3A0453] text-gray-300 rounded-full text-sm file:mr-4 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-sm file:bg-[#C93DEC] file:text-white hover:file:bg-[#a331c4] file:font-['Inter'] file:h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-[#C93DEC] text-white rounded-2xl py-2 px-6 hover:bg-[#a331c4]"
            >
              Continuar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
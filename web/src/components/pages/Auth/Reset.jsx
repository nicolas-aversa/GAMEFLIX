import React, { useState } from 'react';;

export default function ResetPassword() {
const [email, setEmail] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    // Aquí iría la lógica para enviar el correo de restablecimiento
};

return (
    <div className="min-h-screen text-white">
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Reset de contraseña</h1>
                <p className="text-center text-secondary mb-6">
                Ingrese su correo electrónico para continuar
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="correo@example.com"
                        className="mt-8 w-full bg-primary text-white rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>
                    <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="mt-2 w-40 bg-secondary text-white rounded-full py-3 px-4 hover:bg-opacity-80 transition-colors duration-300"
                    >
                        Continuar
                    </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
);
}
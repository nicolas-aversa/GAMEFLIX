import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const Reset = () => {
const [pin, setPin] = useState(['', '', '', '', '', '']);
  
const handlePinChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinValue = pin.join('');
    console.log('PIN submitted:', pinValue);
    // Add your submit logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-lg p-8 bg-background border-none">
        <h1 className="text-3xl font-bold text-white text-center mb-12">
          Reset de contraseña
        </h1>
        
        <p className="text-secondary text-center mb-8">
          Digite PIN de 6 dígitos enviado a su correo electrónico
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-12">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-16 text-center text-2xl bg-transparent border-2 border-secondary rounded-lg focus:border-secondary focus:ring-0 text-white"
              />
            ))}
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Continuar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Reset;
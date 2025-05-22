import React, { useState } from 'react';
import ForgotPassword from '../components/OtpForgotPassword';
import VerifyOtp from '../components/VerifyOtp';
import ResetPassword from '../components/OtpResetPassword';

export default function ResetUsingMailOtp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
        {step === 1 && <ForgotPassword onNext={(email) => { setEmail(email); setStep(2); }} />}
        {step === 2 && <VerifyOtp email={email} onVerified={() => setStep(3)} />}
        {step === 3 && <ResetPassword email={email} />}
      </div>
    </div>
  );
}

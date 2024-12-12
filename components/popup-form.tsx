'use client';

import { saveUserPreferences } from '@/actions';
import { X } from 'lucide-react';

const PopupForm = ({ onClose }: { onClose: () => void }) => {
  const handleNeverShow = async () => {
    await saveUserPreferences({ neverShow: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="relative">
          <div className="bg-primary p-6">
            <h2 className="text-white text-3xl font-bold tracking-wider">JOIN THE TEAM</h2>
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <div className="bg-accent p-4">
          <p className="text-white text-center text-lg font-semibold">
            JOIN OUR MAILING LIST TO ENSURE YOU NEVER MISS OUT ON THE MLR ACTION
          </p>
        </div>
        <form className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <input 
                name="firstName" 
                type="text" 
                required
                placeholder="First Name" 
                className="w-full p-2 border border-gray-300 rounded" 
              />
            </div>
            <div>
              <input 
                name="lastName" 
                type="text" 
                required
                placeholder="Last Name" 
                className="w-full p-2 border border-gray-300 rounded" 
              />
            </div>
            <div>
              <input 
                name="email" 
                type="email" 
                required
                placeholder="johnsmith@example.com" 
                className="w-full p-2 border border-gray-300 rounded" 
              />
            </div>
            <div>
              <input 
                name="phone" 
                type="tel" 
                placeholder="Phone (Optional)" 
                className="w-full p-2 border border-gray-300 rounded" 
              />
            </div>
            <div>
              <input 
                name="zipCode" 
                type="text" 
                placeholder="Zip Code (Optional)" 
                className="w-full p-2 border border-gray-300 rounded" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              className="w-full bg-primary text-white p-3 rounded font-semibold hover:bg-primary/90"
            >
              Submit
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full bg-black text-white p-3 rounded font-semibold hover:bg-gray-800"
            >
              Maybe Later
            </button>
            <button 
              type="button" 
              onClick={handleNeverShow} 
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Never show this again
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
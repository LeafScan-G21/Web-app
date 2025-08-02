import React from "react";
import { useState } from "react";
import { X, MapPin, Globe, Home } from "lucide-react";
import { toast } from "react-hot-toast";

const AddressInput = ({ onSubmit, onClose }) => {
  const [address, setAddress] = useState({
    Country: "",
    City: "",
    street: "",
  });

  const handleSubmit = () => {
    if (!address.Country || !address.City) {
      toast.error("Please enter both country and city.");
      return;
    }
    const fullAddress = `${address.street ? address.street + "," : ""}${
      address.City
    },${address.Country}`;
    onSubmit(fullAddress);
    setAddress({ Country: "", City: "", street: "" });
    onClose();
  };

  const handleStreetChange = (e) => {
    setAddress({
      ...address,
      street: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform transition-all duration-300 scale-100">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 px-6 py-6 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Enter Your Location
                    </h2>
                    <p className="text-green-700 text-sm mt-0.5">
                      Help us personalize your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="space-y-5">
                {/* Street Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <Home className="h-4 w-4 mr-2 text-green-500" />
                    Street{" "}
                    <span className="text-gray-500 text-xs ml-1 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your street (optional)"
                    autoCapitalize="words"
                    value={address.street || ""}
                    onChange={handleStreetChange}
                    type="text"
                  />
                </div>
                {/* City Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    City <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your city"
                    autoCapitalize="words"
                    value={address.City}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        City: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                {/* Country Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <Globe className="h-4 w-4 mr-2 text-green-500" />
                    Country <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your country"
                    autoCapitalize="words"
                    value={address.Country}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        Country: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                {/* Info Text */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700 flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>
                      Your location helps us show you relevant local plant care
                      tips and connect you with nearby gardeners.
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Save Location
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;

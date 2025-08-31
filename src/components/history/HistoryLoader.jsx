import React from "react";
import { Loader2 } from "lucide-react";

const HistoryLoader = () => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
    <span className="ml-2 text-green-600">Loading history...</span>
  </div>
);

export default HistoryLoader;

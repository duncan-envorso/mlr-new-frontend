'use client';

import { getUserPreferences } from "@/actions";
import { useEffect, useState } from "react";
import PopupForm from "./popup-form";

export default function ClientPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkPreferences = async () => {
      const prefs = await getUserPreferences();
      if (!prefs?.neverShow) {
        setShowPopup(true);
      }
    };
    
    setTimeout(checkPreferences, 5000);
  }, []);

  return showPopup ? <PopupForm onClose={() => setShowPopup(false)} /> : null;
}
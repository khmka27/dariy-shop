"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      delay: 0,
    });
  }, []);
  return null;
}

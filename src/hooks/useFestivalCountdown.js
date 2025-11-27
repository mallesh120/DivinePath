import { useState, useEffect } from 'react';

/**
 * Custom hook to calculate countdown to a festival
 * Returns days, hours, minutes, and seconds until the festival
 */
const useFestivalCountdown = (festivalDate) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isToday: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(festivalDate + 'T00:00:00');
      
      // Check if festival is today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const targetDay = new Date(festivalDate + 'T00:00:00');
      targetDay.setHours(0, 0, 0, 0);
      
      if (today.getTime() === targetDay.getTime()) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: false,
          isToday: true
        });
        return;
      }
      
      const difference = target - now;
      
      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
          isToday: false
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
        isToday: false
      });
    };

    // Calculate immediately
    calculateCountdown();
    
    // Update every second
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [festivalDate]);

  return countdown;
};

export default useFestivalCountdown;

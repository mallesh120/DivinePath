import { useState, useEffect } from 'react';

const SADHANA_STORAGE_KEY = 'divinepath_sadhana_state';

const defaultGoals = {
  prayer: false,
  learning: false,
  meditation: false,
};

const defaultKidsGoals = {
  chant: false,
  story: false,
  quietTime: false,
};

export const useSadhana = (isKidsZone = false) => {
  const [goals, setGoals] = useState(() => isKidsZone ? { ...defaultKidsGoals } : { ...defaultGoals });
  const [customGoals, setCustomGoals] = useState([]); // Array of strings e.g. ['Read Gita', 'Yoga']
  const [japaCount, setJapaCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [stars, setStars] = useState(0); // Kids specific
  const [completionHistory, setCompletionHistory] = useState([]); // Array of date strings e.g. ['6/1/2026']
  
  // Learning State
  const [pathwayProgress, setPathwayProgress] = useState(1);
  const [shlokaPracticeDays, setShlokaPracticeDays] = useState(0);

  useEffect(() => {
    const loadSadhana = () => {
      try {
        const saved = localStorage.getItem(SADHANA_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          
          // Check if we need to reset for a new day
          const today = new Date().toLocaleDateString();
          if (parsed.lastDate !== today) {
            // New day logic
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toLocaleDateString();

            let newStreak = parsed.streak || 0;
            // Only keep streak if they logged in yesterday and completed all goals
            if (parsed.lastDate !== yesterdayStr || !parsed.allCompletedYesterday) {
              newStreak = 0;
            }

            setStreak(newStreak);
            setStars(parsed.stars || 0);
            
            // Reset daily progress
            const defaultInitialGoals = isKidsZone ? { ...defaultKidsGoals } : { ...defaultGoals };
            const savedCustomGoals = parsed.customGoals || [];
            savedCustomGoals.forEach(g => defaultInitialGoals[g] = false);
            
            setGoals(defaultInitialGoals);
            setCustomGoals(savedCustomGoals);
            setJapaCount(0);
            
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const history = (parsed.completionHistory || []).filter(dateStr => new Date(dateStr) >= thirtyDaysAgo);
            setCompletionHistory(history);

            setPathwayProgress(parsed.pathwayProgress || 1);
            setShlokaPracticeDays(parsed.shlokaPracticeDays || 0);

            saveSadhana({
              ...parsed,
              streak: newStreak,
              lastDate: today,
              goals: defaultInitialGoals,
              completionHistory: history,
              japaCount: 0,
              allCompletedYesterday: false,
              pathwayProgress: parsed.pathwayProgress || 1,
              shlokaPracticeDays: parsed.shlokaPracticeDays || 0
            });
          } else {
            // Same day, load current progress
            setStreak(parsed.streak || 0);
            setStars(parsed.stars || 0);
            setCustomGoals(parsed.customGoals || []);
            setCompletionHistory(parsed.completionHistory || []);
            setPathwayProgress(parsed.pathwayProgress || 1);
            setShlokaPracticeDays(parsed.shlokaPracticeDays || 0);
            
            // Only load goals if they match the zone type to avoid mixing adult/kids goals in state
            const savedGoals = parsed.goals || {};
            const expectedKeys = Object.keys(isKidsZone ? defaultKidsGoals : defaultGoals);
            const hasCorrectKeys = expectedKeys.some(key => key in savedGoals);
            
            if (hasCorrectKeys) {
              // Ensure custom goals are in the goals object
              const loadedGoals = { ...savedGoals };
              const currentCustom = parsed.customGoals || [];
              currentCustom.forEach(g => {
                if (loadedGoals[g] === undefined) loadedGoals[g] = false;
              });
              setGoals(loadedGoals);
            }
            setJapaCount(parsed.japaCount || 0);
          }
        } else {
          // Initialize first time
          saveSadhana({
            lastDate: new Date().toLocaleDateString(),
            streak: 0,
            stars: 0,
            goals: isKidsZone ? { ...defaultKidsGoals } : { ...defaultGoals },
            customGoals: [],
            completionHistory: [],
            japaCount: 0,
            allCompletedYesterday: false,
            pathwayProgress: 1,
            shlokaPracticeDays: 0
          });
        }
      } catch (e) {
        console.error("Failed to load sadhana state", e);
      }
    };
    
    loadSadhana();
  }, [isKidsZone]);

  const saveSadhana = (newState) => {
    localStorage.setItem(SADHANA_STORAGE_KEY, JSON.stringify(newState));
  };

  const checkAllCompleted = (currentGoals) => {
    return Object.values(currentGoals).every(v => v === true);
  };

  const toggleGoal = (goalKey) => {
    setGoals(prev => {
      const updated = { ...prev, [goalKey]: !prev[goalKey] };
      
      const allCompletedNow = checkAllCompleted(updated);
      const allCompletedBefore = checkAllCompleted(prev);

      let newStreak = streak;
      let newStars = stars;

      if (allCompletedNow && !allCompletedBefore) {
        newStreak += 1;
        newStars += 1;
        setStreak(newStreak);
        setStars(newStars);
        
        // Add today to completion history
        const today = new Date().toLocaleDateString();
        setCompletionHistory(prev => {
          if (!prev.includes(today)) {
            return [...prev, today];
          }
          return prev;
        });
        
      } else if (!allCompletedNow && allCompletedBefore) {
        newStreak = Math.max(0, newStreak - 1);
        newStars = Math.max(0, newStars - 1);
        setStreak(newStreak);
        setStars(newStars);
        
        // Remove today from completion history
        const today = new Date().toLocaleDateString();
        setCompletionHistory(prev => prev.filter(d => d !== today));
      }

      // Save to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        const today = new Date().toLocaleDateString();
        
        let newHistory = saved.completionHistory || [];
        if (allCompletedNow && !newHistory.includes(today)) {
          newHistory = [...newHistory, today];
        } else if (!allCompletedNow) {
          newHistory = newHistory.filter(d => d !== today);
        }

        saveSadhana({
          ...saved,
          goals: updated,
          streak: newStreak,
          stars: newStars,
          completionHistory: newHistory,
          allCompletedYesterday: allCompletedNow // For next day calculation
        });
      } catch (e) {}

      return updated;
    });
  };

  const incrementJapa = () => {
    setJapaCount(prev => {
      const next = prev + 1;
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, japaCount: next });
      } catch (e) {}
      return next;
    });
  };

  const resetJapa = () => {
    setJapaCount(0);
    try {
      const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
      saveSadhana({ ...saved, japaCount: 0 });
    } catch (e) {}
  };

  const addCustomGoal = (goalName) => {
    if (!goalName || customGoals.includes(goalName)) return;
    
    setCustomGoals(prev => {
      const updated = [...prev, goalName];
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, customGoals: updated });
      } catch (e) {}
      return updated;
    });

    setGoals(prev => {
      const updated = { ...prev, [goalName]: false };
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, goals: updated });
      } catch (e) {}
      return updated;
    });
  };

  const removeCustomGoal = (goalName) => {
    setCustomGoals(prev => {
      const updated = prev.filter(g => g !== goalName);
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, customGoals: updated });
      } catch (e) {}
      return updated;
    });

    setGoals(prev => {
      const updated = { ...prev };
      delete updated[goalName];
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, goals: updated });
      } catch (e) {}
      return updated;
    });
  };

  const incrementPathwayProgress = (totalDays) => {
    setPathwayProgress(prev => {
      const next = prev < totalDays ? prev + 1 : prev;
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, pathwayProgress: next });
      } catch (e) {}
      return next;
    });
  };

  const incrementShlokaPractice = () => {
    setShlokaPracticeDays(prev => {
      const next = prev < 7 ? prev + 1 : prev;
      try {
        const saved = JSON.parse(localStorage.getItem(SADHANA_STORAGE_KEY) || '{}');
        saveSadhana({ ...saved, shlokaPracticeDays: next });
      } catch (e) {}
      return next;
    });
  };

  return {
    goals,
    customGoals,
    addCustomGoal,
    removeCustomGoal,
    toggleGoal,
    japaCount,
    incrementJapa,
    resetJapa,
    streak,
    stars,
    completionHistory,
    pathwayProgress,
    incrementPathwayProgress,
    shlokaPracticeDays,
    incrementShlokaPractice
  };
};

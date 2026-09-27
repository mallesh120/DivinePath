import { useState, useEffect, useCallback } from 'react';

const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getBestVoice = useCallback((lang = 'en') => {
    if (!voices.length) return null;
    
    if (lang === 'hi' || lang === 'sa' || lang === 'sanskrit') {
      const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('sa') || v.name.toLowerCase().includes('hindi'));
      if (hindiVoice) return hindiVoice;
    }
    
    // Prioritize high-quality voices
    const preferredVoices = [
      'Google UK English Female',
      'Google US English',
      'Samantha',
      'Karen',
      'Tessa',
      'Moira',
      'Daniel',
      'Alex'
    ];

    for (const name of preferredVoices) {
      const voice = voices.find(v => v.name === name || v.name.includes(name));
      if (voice) return voice;
    }

    // Fallback to any English female voice, then any English voice
    let englishVoices = voices.filter(v => v.lang.startsWith('en'));
    
    const femaleVoice = englishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'));
    if (femaleVoice) return femaleVoice;

    return englishVoices.length > 0 ? englishVoices[0] : voices[0];
  }, [voices]);

  const speak = useCallback((text, rate = 0.85, pitch = 1.1, lang = 'en', callbacks = {}) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voice = getBestVoice(lang);
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = rate; 
      utterance.pitch = pitch; 
      
      utterance.onstart = () => {
        setIsPlaying(true);
        if (callbacks.onStart) callbacks.onStart();
      };
      utterance.onend = () => {
        setIsPlaying(false);
        if (callbacks.onEnd) callbacks.onEnd();
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        if (callbacks.onError) callbacks.onError();
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, [getBestVoice]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }, []);

  return { speak, stop, pause, resume, isPlaying };
};

export default useTextToSpeech;

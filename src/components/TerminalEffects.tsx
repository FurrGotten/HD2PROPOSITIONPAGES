import {useState, useEffect} from 'react';

export const TerminalEffects = ({scanLine = true} : {scanLine? : boolean}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      // Glitch duration
      setTimeout(() => setIsGlitching(false), 300);

      // Randomly schedule the next glitch (between 5 and 15 seconds)
      const nextGlitch = Math.random() * 10000 + 5000;
      setTimeout(triggerGlitch, nextGlitch);
    };

    const timer = setTimeout(triggerGlitch, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${scanLine ?'terminal-overlay' : ''} ${isGlitching ? 'screen-glitch' : ''}`} />
  );
};

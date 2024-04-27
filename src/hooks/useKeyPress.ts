import { useState, useEffect } from 'react';

const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key as any;
      setKeyPressed(key);
    };
    const handleKeyUp = () => {
      setKeyPressed(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [keyPressed]);

  return keyPressed;
};

export default useKeyPress;

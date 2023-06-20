import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../store';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.mode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    dispatch(setMode());
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute bottom-8 right-8 bg-red-500"
    >
      {isDarkMode ? '다크모드' : '라이트모드'}
    </button>
  );
};

export default DarkModeToggle;

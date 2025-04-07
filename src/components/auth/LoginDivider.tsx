
import React from 'react';

const LoginDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
          Or continue with
        </span>
      </div>
    </div>
  );
};

export default LoginDivider;

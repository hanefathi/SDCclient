import React from 'react';

const Grid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 mr-56">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="bg-gray-300 p-8 text-center rounded-lg">
          آیتم {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Grid;

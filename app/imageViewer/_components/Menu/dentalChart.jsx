import React from 'react';
import Image from 'next/image';

// The DentalItem component now uses a simple div with Flexbox for layout.
function DentalItem({ tooth, handleClick }) {
  return (
    <div className="flex flex-col items-center mx-1">
      {/* Replaced Typography with a styled span */}
      <span className="text-sm font-semibold mb-1">{tooth.id}</span>
      <div
        key={tooth.id}
        // Added cursor-pointer for better user experience
        className={`w-8 h-16 rounded-full ${tooth.color} flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105`}
        onClick={() => handleClick(tooth.key)}
      >
        {/* Removed the IconButton wrapper */}
        <Image 
          width={30} 
          height={30} 
          src={`/imageViewer/dentalChart/${tooth.id}.png`} 
          alt={`Tooth ${tooth.id}`} 
        />
      </div>
    </div>
  );
}

const DentalChart = ({ instances, setInstances }) => {
  // The initial data for the teeth remains unchanged.
  const teethData = [
    { id: 18, color: 'bg-gray-500', key: 0 },
    { id: 17, color: 'bg-green-500', key: 0 },
    { id: 16, color: 'bg-green-500', key: 0 },
    { id: 15, color: 'bg-yellow-500', key: 0 },
    { id: 14, color: 'bg-yellow-500', key: 0 },
    { id: 13, color: 'bg-gray-500', key: 0 },
    { id: 12, color: 'bg-gray-500', key: 0 },
    { id: 11, color: 'bg-gray-500', key: 0 },
    { id: 21, color: 'bg-green-500', key: 0 },
    { id: 22, color: 'bg-green-500', key: 0 },
    { id: 23, color: 'bg-yellow-500', key: 0 },
    { id: 24, color: 'bg-yellow-500', key: 0 },
    { id: 25, color: 'bg-gray-500', key: 0 },
    { id: 26, color: 'bg-gray-500', key: 0 },
    { id: 27, color: 'bg-gray-500', key: 0 },
    { id: 28, color: 'bg-gray-500', key: 0 },
    { id: 38, color: 'bg-gray-500', key: 0 },
    { id: 37, color: 'bg-green-500', key: 0 },
    { id: 36, color: 'bg-green-500', key: 0 },
    { id: 35, color: 'bg-yellow-500', key: 0 },
    { id: 34, color: 'bg-yellow-500', key: 0 },
    { id: 33, color: 'bg-gray-500', key: 0 },
    { id: 32, color: 'bg-gray-500', key: 0 },
    { id: 31, color: 'bg-gray-500', key: 0 },
    { id: 41, color: 'bg-green-500', key: 0 },
    { id: 42, color: 'bg-green-500', key: 0 },
    { id: 43, color: 'bg-yellow-500', key: 0 },
    { id: 44, color: 'bg-yellow-500', key: 0 },
    { id: 45, color: 'bg-gray-500', key: 0 },
    { id: 46, color: 'bg-gray-500', key: 0 },
    { id: 47, color: 'bg-gray-500', key: 0 },
    { id: 48, color: 'bg-gray-500', key: 0 },
  ];

  // The click handler logic remains the same.
  const handleClick = (key) => {
    const newInstances = [...instances];

    if (!newInstances[key]?.[0]?.configs) {
      console.error("Instance or configs is undefined for key:", key);
      return;
    }

    const { configs } = newInstances[key][0];
    configs.visible = !configs.visible;

    setInstances(newInstances);
  };

  return (
    // All <Box> components are replaced with <div>.
    <div className="w-full p-4 bg-gray-900 text-white rounded-lg">
      {/* Container for the first row of teeth */}
      <div className="flex justify-center mb-4">
        {teethData.slice(0, 16).map((tooth) => (
          <DentalItem
            key={tooth.id}
            tooth={tooth}
            handleClick={handleClick}
          />
        ))}
      </div>

      {/* Container for the second row of teeth */}
      <div className="flex justify-center">
        {teethData.slice(16, 32).map((tooth) => (
          <DentalItem
            key={tooth.id}
            tooth={tooth}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DentalChart;
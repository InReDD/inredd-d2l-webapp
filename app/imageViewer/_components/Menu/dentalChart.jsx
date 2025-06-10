import React from 'react';
import Image from 'next/image';
import { useViewer } from '@/app/context/ViewerContext';

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

const DentalChart = () => {
  // 3. 'instances' e 'setInstances' são obtidos diretamente do contexto via hook
  const { instances, setInstances } = useViewer();

  // O restante do código permanece exatamente o mesmo
  const teethData = [
    { id: 18, color: 'bg-gray-500', key: 0 }, { id: 17, color: 'bg-green-500', key: 0 },
    { id: 16, color: 'bg-green-500', key: 0 }, { id: 15, color: 'bg-yellow-500', key: 0 },
    { id: 14, color: 'bg-yellow-500', key: 0 }, { id: 13, color: 'bg-gray-500', key: 0 },
    { id: 12, color: 'bg-gray-500', key: 0 }, { id: 11, color: 'bg-gray-500', key: 0 },
    { id: 21, color: 'bg-green-500', key: 0 }, { id: 22, color: 'bg-green-500', key: 0 },
    { id: 23, color: 'bg-yellow-500', key: 0 }, { id: 24, color: 'bg-yellow-500', key: 0 },
    { id: 25, color: 'bg-gray-500', key: 0 }, { id: 26, color: 'bg-gray-500', key: 0 },
    { id: 27, color: 'bg-gray-500', key: 0 }, { id: 28, color: 'bg-gray-500', key: 0 },
    { id: 48, color: 'bg-gray-500', key: 0 }, { id: 47, color: 'bg-gray-500', key: 0 },
    { id: 46, color: 'bg-gray-500', key: 0 }, { id: 45, color: 'bg-gray-500', key: 0 },
    { id: 44, color: 'bg-yellow-500', key: 0 }, { id: 43, color: 'bg-yellow-500', key: 0 },
    { id: 42, color: 'bg-green-500', key: 0 }, { id: 41, color: 'bg-green-500', key: 0 },
    { id: 31, color: 'bg-gray-500', key: 0 }, { id: 32, color: 'bg-gray-500', key: 0 },
    { id: 33, color: 'bg-gray-500', key: 0 }, { id: 34, color: 'bg-yellow-500', key: 0 },
    { id: 35, color: 'bg-yellow-500', key: 0 }, { id: 36, color: 'bg-green-500', key: 0 },
    { id: 37, color: 'bg-green-500', key: 0 }, { id: 38, color: 'bg-gray-500', key: 0 },
  ];

  const handleClick = (key) => {
    if (!newInstances[key]?.[0]?.configs) {
      console.error("Instance or configs is undefined for key:", key);
      return;
    }
    newInstances[key][0].configs.visible = !newInstances[key][0].configs.visible;
    setInstances(newInstances);
  };

  const upperArch = teethData.slice(0, 16);
  const lowerArch = teethData.slice(16, 32);

  return (
    <div className="w-full bg-gray-900 text-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Odontograma</h3>

      <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
        <h4 className="text-md font-medium text-gray-300 mb-3">Arcada Superior</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {upperArch.map((tooth) => (
            <DentalItem
              key={tooth.id}
              tooth={tooth}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>

      <hr className="border-gray-700 my-4" />

      <div className="bg-gray-800 p-3 rounded-md border border-gray-700">
        <h4 className="text-md font-medium text-gray-300 mb-3">Arcada Inferior</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {lowerArch.map((tooth) => (
            <DentalItem
              key={tooth.id}
              tooth={tooth}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DentalChart;
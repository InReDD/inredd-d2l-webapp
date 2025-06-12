import React from 'react';
import Image from 'next/image';
import { useViewer } from '@/app/context/ViewerContext';

import styles from './styles.scss';

/**
 * DentalChart: Renders a scalable SVG odontogram.
 */
const DentalChart = () => {
  const { instances, setInstances } = useViewer();

  // --- UPDATED: Coordinates adjusted for a larger, clearer layout ---
  const teethData = [
    // Quadrant 1 (Upper Left)
    { id: 18, key: 0, x: 40,  y: 85  }, { id: 17, key: 1, x: 85,  y: 60  },
    { id: 16, key: 2, x: 130, y: 45  }, { id: 15, key: 3, x: 170, y: 35  },
    { id: 14, key: 4, x: 210, y: 30  }, { id: 13, key: 5, x: 245, y: 35  },
    { id: 12, key: 6, x: 270, y: 45  }, { id: 11, key: 7, x: 295, y: 55  },
    // Quadrant 2 (Upper Right)
    { id: 21, key: 8, x: 325, y: 55  }, { id: 22, key: 9, x: 350, y: 45  },
    { id: 23, key: 10,x: 375, y: 35  }, { id: 24, key: 11,x: 410, y: 30  },
    { id: 25, key: 12,x: 450, y: 35  }, { id: 26, key: 13,x: 490, y: 45  },
    { id: 27, key: 14,x: 535, y: 60  }, { id: 28, key: 15,x: 580, y: 85  },
    // Quadrant 4 (Lower Left)
    { id: 48, key: 16, x: 50,  y: 265 }, { id: 47, key: 17, x: 95,  y: 285 },
    { id: 46, key: 18, x: 140, y: 300 }, { id: 45, key: 19, x: 180, y: 310 },
    { id: 44, key: 20, x: 215, y: 315 }, { id: 43, key: 21, x: 245, y: 310 },
    { id: 42, key: 22, x: 270, y: 300 }, { id: 41, key: 23, x: 295, y: 290 },
    // Quadrant 3 (Lower Right)
    { id: 31, key: 24, x: 325, y: 290 }, { id: 32, key: 25, x: 350, y: 300 },
    { id: 33, key: 26, x: 375, y: 310 }, { id: 34, key: 27, x: 410, y: 315 },
    { id: 35, key: 28, x: 450, y: 310 }, { id: 36, key: 29, x: 480, y: 300 },
    { id: 37, key: 30, x: 525, y: 285 }, { id: 38, key: 31, x: 570, y: 265 },
  ];

  const handleClick = (key) => {
    console.log(`Toggling highlight for tooth with key: ${key}`);
    // ... your state logic here
  };
  
  // Example keys to match the initial screenshot
  const highlightedTeethKeys = [3, 4, 28, 29];

  return (
    // NEW: A wrapper div to ensure proper sizing and padding within the sidebar
    <div className={styles.chartWrapper}>
      <svg
        className={styles.odontogramChart}
        // UPDATED: viewBox is taller for a larger, more proportional chart
        viewBox="0 0 620 350"
        preserveAspectRatio="xMidYMid meet"
      >
        {teethData.map((tooth) => {
          const isHighlighted = highlightedTeethKeys.includes(tooth.key);
          const toothStateClass = isHighlighted ? styles.highlighted : '';

          return (
            <g
              key={tooth.id}
              className={styles.odontogramTooth}
              transform={`translate(${tooth.x}, ${tooth.y})`}
              onClick={() => handleClick(tooth.key)}
            >
              <text
                className={styles.toothNumber}
                x="0" y="-30" // Position number above the tooth
                textAnchor="middle"
              >
                {tooth.id}
              </text>
              <image
                // Only add the 'highlighted' class if needed. Base style is now white.
                className={`${styles.toothImage} ${toothStateClass}`}
                href={`/icons/imageViewer/dentalChartIcons/${tooth.id}.svg`}
                width="40" height="60"
                x="-20" y="-25" // Center the image
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DentalChart;
'use client';

import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}

export default function Card3D({ children, className = '', glare = true }: Card3DProps) {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.05}
      glareEnable={glare}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      className={className}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </Tilt>
  );
}
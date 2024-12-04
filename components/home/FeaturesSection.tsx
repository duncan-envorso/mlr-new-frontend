'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#1E1E1E] to-[#1E1E1E] px-4 py-20 lg:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent opacity-75 blur-2xl" />
      <div className="relative z-10 grid w-full max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 ">
        <FeatureCard
          title={['LIMITED', 'TICKETS', 'AVAILABLE']}
          buttonText="SHOP TICKETS"
          imageSrc="/images/Add.png"
          imageAlt="Limited Tickets"
        />
        <FeatureCard
          title={['GEAR UP', 'FOR', 'GAME DAY']}
          buttonText="SHOP MERCH"
          imageSrc="/images/jersey.png"
          imageAlt="Game Day Gear"
        />
      </div>
    </motion.div>
  );
}

function FeatureCard({
  title,
  buttonText,
  imageSrc,
  imageAlt
}: {
  title: string[];
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="flex h-full flex-col items-center justify-between gap-6 rounded-xl border border-gray-700 bg-black/30 px-6 py-8 backdrop-blur-sm md:flex-row"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="flex-1 text-center md:text-left"
        variants={textVariants}
      >
        <h2 className="font-montserrat font-montserrat-black mb-4 text-4xl uppercase text-white md:text-5xl lg:text-6xl">
          {title.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {line}
              <br />
            </motion.div>
          ))}
        </h2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button className="bg-white px-6 py-2 text-sm font-semibold uppercase text-black hover:bg-gray-200">
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
      <motion.div variants={imageVariants} className="flex-shrink-0">
        <Image
          height={300}
          width={300}
          src={imageSrc}
          alt={imageAlt}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

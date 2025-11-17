import { motion } from 'framer-motion';

const LogoMarquee = ({ logos }) => {
  // Dupliquer les logos pour un effet de boucle infinie
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="bg-white border-y border-gray-200 py-6 overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex gap-16 items-center"
          animate={{
            x: [0, -1920], // Défilement vers la gauche
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-gray-400 font-serif text-2xl tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoMarquee;

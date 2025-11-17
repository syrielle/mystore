import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const RadianceSection = ({ media, isVideo = false }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f5f3f0] w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center w-full">
          {/* Image/Vidéo à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            {isVideo ? (
              <video
                src={media}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={media}
                alt="Collection Miss Bijoux"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Texte à droite */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 px-8 lg:px-16 py-12"
          >
            <h2
              className="text-4xl md:text-5xl font-light text-gray-900 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Un Éclat Incomparable
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Chez Miss Bijoux, la brillance ne réside pas seulement dans les pierres —
              elle vit dans l'histoire derrière chaque création. Avec un dévouement à
              un design intemporel et un savoir-faire impeccable, nos collections incarnent
              l'art du luxe discret. Chaque création est plus qu'un ornement ; c'est le
              reflet de votre essence, conçu pour vous accompagner à travers les moments
              les plus significatifs de la vie.
            </p>

            <Button
              size="lg"
              onClick={() => navigate('/catalogue')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
            >
              Notre Collection
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RadianceSection;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SobreFormTable from '../SobreFormTable/SobreFormTable';
import './SobreStyles.css';
import { FaInfoCircle } from "react-icons/fa";


const IconeSobreTabela: React.FC = () => {
  const [visivel, setVisivel] = useState(false);

  return (
    <>
      <div className="sobre-flutuante">
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: '0 12px 32px rgba(0,0,0,0.30), 0 2px 12px rgba(0,0,0,0.12)' }}
          whileTap={{ scale: 0.96 }}
          animate={{
            y: [0, -4, 0, 4, 0],
            rotate: [0, 2, 0, -2, 0],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          onClick={() => setVisivel(true)}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            borderRadius: '50%',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56
          }}
          title="Sobre"
        >
          <FaInfoCircle
            size={55}
            color="rgb(255, 221, 194)"
            style={{
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
            }}
          />
        </motion.button>
      </div>
      <AnimatePresence>
        {visivel && (
          <motion.div
            className="sobre-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setVisivel(false)}
          >
            <motion.div
              className="balloon-centralizadoTable"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="balloon-arrow" />
              <SobreFormTable />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IconeSobreTabela;
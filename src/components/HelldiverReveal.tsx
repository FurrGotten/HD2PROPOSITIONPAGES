import {type ReactNode} from 'react';
import {useInView} from 'react-intersection-observer';
import {motion} from 'framer-motion';

interface HelldiverRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
}

export const HelldiverReveal = ({children, width = 'fit-content'}: HelldiverRevealProps) => {
  const {ref, inView} = useInView({
    threshold: 0.40,
    triggerOnce: true
  });

  return (
    <div ref={ref} style={{position: 'relative', width, overflow: 'hidden'}}>
      <motion.div
        variants={{
          hidden: {opacity: 0, x: -50, filter: 'blur(10px)'},
          visible: {opacity: 1, x: 0, filter: 'blur(0px)'}
        }}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.6,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 0.1
        }}
      >
        {children}
      </motion.div>

      {inView && (
        <motion.div
          initial={{scaleX: 1}}
          animate={{scaleX: 0}}
          transition={{duration: 0.5, ease: 'circOut'}}
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            background: 'var(--hd-bg-l)',
            zIndex: 20,
            originX: 1
          }}
        />
      )}
    </div>
  );
};

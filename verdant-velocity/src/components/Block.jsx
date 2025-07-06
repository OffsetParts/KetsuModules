import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { twMerge } from 'tailwind-merge';

const variant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Block = ({ className, children, ...rest }) => {
  const control = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) control.start("visible");
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={control}
      className={twMerge(
        "bg-white dark:bg-zinc-800 rounded-xl shadow-soft border border-zinc-200 dark:border-zinc-700 p-6",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Block;

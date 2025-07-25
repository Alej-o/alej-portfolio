import { motion } from 'framer-motion'

export default function AnimatedBorder({ delay = 0 }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0.0, 0.2, 1] }}
      style={{ originX: 0 }}
      className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black"
      aria-hidden="true"
    />
  )
}

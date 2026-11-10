import { motion } from 'framer-motion'
import { usePiDigits } from '../hooks/usePiDigits.ts'

const message = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export default function PiDigits() {
  const state = usePiDigits()

  // The digits themselves are ~10 MB of text, so they are rendered as a plain
  // element (no animated/composited layer); only the short status messages fade in.
  if (state.status === 'ready') {
    return <div>{state.text}</div>
  }

  return (
    <motion.div {...message}>
      {state.status === 'loading' ? 'Loading...' : 'Could not load Pi digits.'}
    </motion.div>
  )
}

import React from 'react'
import TableOne from './tableOne'
import { motion } from 'framer-motion'

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: 100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};

function mainRequest() {
    return (
        <div>
            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                <TableOne />
            </motion.div>
        </div>
    )
}

export default mainRequest

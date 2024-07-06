import React from 'react';
import {motion} from 'framer-motion';
const Card = ({reference}) => {
	return (
		<>
			<motion.div drag dragConstraints={reference} whileDrag={{scale: 1.2}} dragElastic={0.1} dragTransition={{bounceStiffness: 100, bounceDamping: 30}} className='w-60 h-72 bg-zinc-700 rounded-[24px]'></motion.div>
		</>
	);
};

export default Card;

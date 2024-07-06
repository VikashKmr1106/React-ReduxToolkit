import React ,{useRef} from 'react';
import Card from './Card.jsx';


const Foreground = () => {

	const ref = useRef(null);

	return (
		<>
		<div ref={ref} className="fixed z-[3] top-0 left-0 w-full h-full">
         <Card  reference={ref}/>
			
			
			</div>
		</>
	)
}

export default Foreground
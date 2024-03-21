import React from 'react';
import animationLottiLoading from '../../public/animation/loadingLottie.json'
import Lottie from 'lottie-react';
const MyLoading = ({className, loop}) => {
    return (
        <div className='flex items-center justify-center'>
            <Lottie animationData={animationLottiLoading} loop={loop !== 'undefined'? loop : true} className={`${className? className : 'h-20 w-20'}`} />
            
        </div>
    );
};

export default MyLoading;
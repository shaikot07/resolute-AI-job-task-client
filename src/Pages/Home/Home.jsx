import React from 'react';

const Home = () => {
    return (
        <div className="hero min-h-screen bg-[#0489D7] max-w-6xl mx-auto ">
            <div className="grid grid-cols-2 w-full mx-auto">
                <div className="w-[434px] mx-auto bg-green-600 h-600px ">
                    <iframe
                        width="500"
                        height="400"
                        src="https://www.youtube.com/embed/1LPQH6qYBGA"
                        title="YouTube video player"
                        // frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>


                </div>
                <div className="card md:w-[434px] max-w-sm shadow-2xl bg-[#108FD9]">

                    <div className='w-full '>
                        <h1 className='text-3xl text-white font-semibold p-2'> live Chating.. </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
import twitter from '@/Images/Icons/twitter.png';
import linkedin from '@/Images/Icons/linkedin.png';

export default function OurTeam() {

    return (
        <div className="max-w-4xl mx-auto px-4  md:px-8 py-20 ">
            <h1 className="text-5xl font-bold text-center">Our team</h1>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center items-center">
                <div className="max-w-sm flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-52 rounded-full">
                            <img src="https://nowpayments.io/images/about/our-team/xena.png" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-center py-5">
                            Xena
                        </h3>
                        <p className="text-lg text-slate-600 text-center">Senior Business </p>
                        <p className="text-lg text-slate-600 text-center">Development Manager</p>
                        <div className='flex justify-center items-center mt-2'>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={linkedin} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={twitter} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-sm flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-52 rounded-full">
                            <img src="https://nowpayments.io/images/about/our-team/pauline.png" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-center py-5">
                            Pauline
                        </h3>
                        <p className="text-lg text-slate-600 text-center">Senior Business </p>
                        <p className="text-lg text-slate-600 text-center">Development Manager</p>
                        <div className='flex justify-center items-center mt-2'>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={linkedin} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={twitter} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-sm flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-52 rounded-full">
                            <img src="https://nowpayments.io/images/about/our-team/yana.png" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-center py-5">
                            Yana
                        </h3>
                        <p className="text-lg text-slate-600 text-center">Senior Business </p>
                        <p className="text-lg text-slate-600 text-center">Development Manager</p>
                        <div className='flex justify-center items-center mt-2'>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={linkedin} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 mx-1 border-2 border-blue-500 rounded-full hover:shadow-md hover:shadow-pink-200' src={twitter} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

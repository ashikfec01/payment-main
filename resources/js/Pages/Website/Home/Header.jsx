import ButtonBlue from "@/Components/ButtonBlue";
import { Link } from "@inertiajs/react";

export default function Header() {

    return (
        <div className="bg-slate-900 text-white">
            <div className=" py-20 max-w-7xl  mx-auto px-4  md:px-8">
                <div className="flex flex-col lg:flex-row-reverse  ">
                    <div className="w-full">
                        <img src='https://johnlewis.scene7.com/is/image/JohnLewis/laptop-carousel2-140922' className="hidden lg:flex rounded-lg w-full  shadow-2xl" alt='' />
                    </div>
                    <div className='text-white w-full lg:mr-20'>
                        <h1 className="text-4xl lg:text-5xl font-bold" style={{ lineHeight: ' 58px' }}>Start Accepting <br /> <span>Crypto Payments NOW</span></h1>
                        <div className="grid grid-cols-2 gap-8 mt-6">
                            <p className="text-white text-xl font-bold"><span className="text-green-600">160+</span> cryptocurrencies available</p>
                            <p className="text-white text-xl font-bold"><span className="text-green-600">Withdraw euro directly</span> to your bank account</p>
                            <p className="text-white text-xl font-bold"><span className="text-green-600">Only 0.5% </span>– the lowest fee on the market</p>
                            <p className="text-white text-xl font-bold"><span className="text-green-600">Personal account manager </span> & 24/7 support</p>
                        </div>
                        <Link href={route('register')}>
                            <ButtonBlue className="px-9 py-3 text-2xl font-semibold mt-8">
                                Accept Crypto
                            </ButtonBlue>
                        </Link>
                    </div>
                </div>
            </div >
        </div>
    );
}

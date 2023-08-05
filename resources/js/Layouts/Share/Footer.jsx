import medium from '@/Images/Icons/medium.png';
import facebook from '@/Images/Icons/facebook.png';
import youtube from '@/Images/Icons/youtube.png';
import twitter from '@/Images/Icons/twitter.png';
import { Link } from '@inertiajs/react';
export default function Footer() {

    return (
        <footer className="bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row  py-28 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <h3 className='text-xl text-white font-bold mb-3' >
                                Developers
                            </h3>
                            <a className='text-slate-300 hover:text-pink-500' href="">API</a>
                            <a className='text-slate-300 hover:text-pink-500' href="">IPN</a>
                            <a className='text-slate-300 hover:text-pink-500' href="">Sandbox</a>
                            <p className='text-slate-300'>System status <span className='text-green-500'>ok</span></p>
                        </div>
                        <div className="flex flex-col mt-10">
                            <h3 className='text-xl text-white font-bold mb-3'>
                                Company&Team
                            </h3>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('about')}>About</Link>
                            <a className='text-slate-300 hover:text-pink-500' href="">Blog</a>

                        </div>
                    </div>
                    <div className="flex flex-col">

                        {/*Merchants  */}
                        <div className="flex flex-col">
                            <h3 className='text-xl text-white font-bold mb-3'>
                                Merchants
                            </h3>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('main.payment')}>Payment tools</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('main.donation')}>Donation tools</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('main.fiat')}>Fiat processing</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('allcoin')}>Supported coins</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('main.affiliate')}>Affiliate Program</Link>
                        </div>

                        {/*Support  */}
                        <div className="flex flex-col mt-10">
                            <h3 className='text-xl text-white font-bold mb-3'>
                                Support

                            </h3>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('help')}>FAQ</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('contact')}>Contact Us</Link>
                            <Link className='text-slate-300 hover:text-pink-500' href={route('status')}>Status Page</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className='text-xl text-white font-bold mb-3'>
                            Custom Solutions
                        </h3>
                        <a className='text-slate-300 hover:text-pink-500' href="">Twitch Donations</a>
                        <Link className='text-slate-300 hover:text-pink-500' href={route('main.payout')}>Mass Payments</Link>
                        <a className='text-slate-300 hover:text-pink-500' href="">Casinos/Gambling</a>
                        <a className='text-slate-300 hover:text-pink-500' href="">Payments for business</a>
                    </div>
                </div>
                <div className='md:ml-10 mt-10 md:mt-0 w-full'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div className="grid grid-flow-col gap-4 ">
                            <a href="">
                                <img className='w-14 h-14 rounded-full hover:shadow-md hover:shadow-pink-200' src={twitter} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 rounded-full hover:shadow-md hover:shadow-pink-200' src={facebook} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 rounded-full hover:shadow-md hover:shadow-pink-200' src={youtube} alt="" />
                            </a>
                            <a href="">
                                <img className='w-14 h-14 rounded-full hover:shadow-md hover:shadow-pink-200' src={medium} alt="" />
                            </a>
                        </div>
                        <div className='mt-5 lg:mt-0'>
                            <div className='flex flex-col xl:flex-row justify-between mx-auto'>
                                <a className='block border-b-2 border-blue-500 mx-1 px-2 text-lg text-blue-500 hover:text-blue-700 hover:border-blue-700 text-center' href="">User Agreement</a>
                                <a className='block border-b-2 border-blue-500 mx-1 px-2 text-lg text-blue-500 hover:text-blue-700 hover:border-blue-700 text-center mt-5 xl:mt-0' href="">Privacy Policy</a>
                            </div>
                            <div>
                                <a className='block text-center border-b-2 border-blue-500 mx-1 px-2 text-lg text-blue-500 hover:text-blue-700 hover:border-blue-700 mt-5' href="">SQS</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-lg my-5'>NOWPayments – 2023</p>
                        <p>
                            Launched by ChangeNOW. NOWPayments combines all the best practices of the industry — we guarantee the best possible service quality for all our clients. We're ready to go 100% of the time, 24/7
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );

}

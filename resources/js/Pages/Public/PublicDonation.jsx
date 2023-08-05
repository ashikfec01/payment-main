import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";


export default function PublicDonation(props) {
    const [coinSelect, setCoinSelect] = useState(null)
    const [nextStep, setNextStep] = useState(false)
    const [donateStep, setDonateStep] = useState(false)

    return (
        <MainLayout
            auth={props.auth}
        >
            <Head title={`Public Donation`} />
            <div className="flex justify-center min-h-screen items-center max-w-7xl  mx-auto px-4 md:px-8 py-20">
                <div className="border rounded-md">
                    <h2 className='text-2xl text-blue-600 border-b p-4 font-bold'>BitByte<span className='text-black'>Pay</span></h2>
                    {
                        !nextStep &&
                        <div>
                            {/* search field */}
                            <div className="flex items-center justify-between m-4 px-2 bg-slate-300">
                                <input
                                    className="input w-full max-w-xs focus:outline-none focus:ring-0 border-0 text-sm font-medium pl-2 bg-slate-300"
                                    placeholder="Search..."
                                    type="text" />
                                <RiSearchLine className="text-2xl text-blue-500" />
                            </div>
                            {/* search field end */}

                            {/* coin  */}
                            <p className="px-4 text-slate-500">Select currency</p>
                            <div className="max-h-64 overflow-auto grid grid-cols-2 gap-3 px-4">
                                {
                                    props?.coins?.data.map((coin) => <div
                                        key={coin.id}
                                        onClick={() => setCoinSelect(coin)}
                                        className={`flex items-start border  rounded-md p-4 mt-3 ${coinSelect && coinSelect.id === coin.id && 'border-blue-600'}`}>

                                        <div className="leading-none">
                                            <div className="flex items-center">
                                                <h6 className="text-lg font-bold">{coin.ticker}</h6>
                                            </div>
                                            <button className="bg-green-500 text-xs rounded-sm px-2">{coin.ticker}</button>
                                        </div>
                                        <img
                                            className="rounded-full w-8 h-8 ml-4"
                                            src={coin.logourl} alt=""
                                        />
                                    </div>
                                    )
                                }
                            </div>
                            <div className="p-4">
                                <input
                                    className="input w-full max-w-xs focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-300"
                                    placeholder="Amount"
                                    type="text" />
                            </div>


                            <div className="flex justify-start px-4 pb-2">
                                <p>Crypto</p>
                                <label htmlFor={`ToggleCoins`} className="inline-flex items-center space-x-4 cursor-pointer px-2 text-gray-100">
                                    <span className="relative">
                                        <input id={`ToggleCoins`} type="checkbox" className="hidden peer" />
                                        <div className="w-9 h-4 rounded-full shadow-inner bg-gray-200"></div>
                                        <div className="absolute inset-y-0 left-0 w-4 h-4 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-blue-500"></div>
                                    </span>
                                </label>
                                <p>USD</p>
                            </div>

                            <button
                                onClick={() => setNextStep(!nextStep)}
                                className="block w-full bg-blue-500 hover:bg-blue-600 p-3 text-2xl font-semibold text-white rounded-b-md">
                                Next
                            </button>
                        </div>
                    }

                    {
                        nextStep && !donateStep &&
                        <div>
                            <div className="p-4">
                                <label className="block w-full py-1">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block w-full py-1">phone</label>
                                <input
                                    name="phone"
                                    type="text"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block w-full py-1">Name</label>
                                <input
                                    name="Name"
                                    type="text"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block w-full py-1">Social Link</label>
                                <input
                                    name="social_link"
                                    type="text"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block w-full py-1">Address</label>
                                <input
                                    name="address"
                                    type="text"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <button
                                onClick={() => setDonateStep(!donateStep)}
                                className="block w-full bg-blue-500 hover:bg-blue-600 p-3 text-2xl font-semibold text-white rounded-b-md">
                                Donate
                            </button>
                        </div>
                    }
                    {
                        donateStep &&
                        <div>
                            <div className="p-4">
                                <label className="block w-full py-1">BTC Amount</label>
                                <input
                                    name="amount"
                                    type="text"
                                    className="input block w-full max-w-xs md:min-w-[350px] focus:outline-none focus:ring-0 rounded-none border-0 text-sm font-medium bg-slate-200"
                                />
                            </div>
                            <div className="p-4">
                                <label className="block w-full py-1">BTC Amount</label>
                                <p className="text-blue-500">3JqXLqjGVA67kMUfsDdvL26HCSZPb6znoS</p>
                            </div>
                            <button className="border-2 border-blue-500 text-blue-500 px-4 py-1 m-4">
                                Scan QR Code
                            </button>
                            <p className="text-yellow-500 p-4">Waiting...</p>
                        </div>
                    }

                </div>
            </div>
        </MainLayout>
    );
}
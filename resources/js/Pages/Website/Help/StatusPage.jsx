import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import StatusHeader from "./StatusHeader";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";

export default function StatusPage(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Crypto Coin Status" />
                <section className="min-h-screen">

                    {/* header */}
                    <StatusHeader />

                    <div className="max-w-7xl mx-auto px-4 lg:px-8 my-10">
                        <h1 className="text-5xl font-bold mt-5">Available coins</h1>
                        <h4 className="text-2xl text-slate-700 mt-10">Сheck if a certain asset is available for payments or withdrawals at this moment, as well as the minimum payment amount.</h4>

                        {/* search field */}
                        <div className="form-control mt-10">
                            <div className="input-group">
                                <input type="text" placeholder="Search…" className="input input-bordered w-full max-w-sm" />
                                <button className="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                        {/* search field end */}

                        {/* table */}
                        <div className="overflow-x-auto p-3">
                            <table className="w-full  text-center whitespace-nowrap my-5">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-6 text-xl font-bold text-start">Currencies</th>
                                        <th className="px-3 py-6 text-xl font-bold border-b-2 border-l-slate-500">Payments Available</th>
                                        <th className="px-3 py-6 text-xl font-bold border-b-2 border-l-slate-500">Settlements Available</th>
                                        <th className="px-3 py-6 text-xl font-bold border-b-2 border-l-slate-500">Minimum Payment</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-56">
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="w-full flex justify-between items-center">
                                                    <BsCurrencyBitcoin className='bg-yellow-500 rounded-full text-2xl text-white' />
                                                    <span className="font-bold">BTC</span>
                                                    <button className="text-sm bg-green-500 text-white rounded-sm px-2">BTC</button>
                                                </div>
                                                <div className="w-full text-slate-500 font-semibold">
                                                    Bitcoin
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500"><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 "><HiCheck className="mx-auto text-4xl text-blue-500" /> </td>
                                        <td className="px-3 py-4 border-b-2 border-l-slate-500 ">0.0002625</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        {/* table end */}
                    </div>
                </section>
            </MainLayout>
        </div>
    );
}

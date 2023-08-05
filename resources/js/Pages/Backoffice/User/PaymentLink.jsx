import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import { BsQrCode } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { ImSpinner9 } from 'react-icons/im';
import { useState } from 'react';
import Select from 'react-select';

export default function PaymentLink(props) {
    const [createCoin, setCreateCoin] = useState([]);
    const [selectFixedRateCreate, setSelectFixedRateCreate] = useState(false);
    const [selectFeePaidUserCreate, setSelectFeePaidUserCreate] = useState(false);

    const handleCreateCoin = data => {
        setCreateCoin(data);
    }


    return (
        <>
            <Head title="Payment Link" />
            <DashboardLayout auth={props.auth}>
                <div className='m-4 lg:m-10'>
                    <h2 className='text-4xl font-bold mb-7 inline-flex'>Payment Link
                        <div className="lg:tooltip lg:tooltip-bottom ml-4" data-tip="Invoice, or payment link is a bill detailing the price and the item. Create an invoice, share the link to your customer, and receive payment once it is completed.">
                            <i className="fa-solid fa-circle-info text-lg text-gray-400 font-extrabold"></i>
                        </div>
                    </h2>

                    {/* error show  */}
                    <ul className='bg-slate-300 rounded-sm'>
                        {Object.values(props.errors).map((message, i) => <li
                            key={i}
                            className="text-red-500 px-3 py-1"
                        >{message}</li>)}
                    </ul>

                    <div className='lg:mt-9'>
                        <div className='md:flex justify-between'>

                            <label htmlFor="payment_create" className='px-4 py-3 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 font-bold lg:mb-0'>Create payment link</label>

                            {/* search button  */}
                            <div className="form-control border-2 rounded-lg text-gray-300 bg-white">
                                <div className="input-group px-1">
                                    <input type="text" placeholder="Payment link ID, Order ID" className="border-0 mr-8" />
                                    <button>
                                        <i className="fa-solid fa-sliders text-lg mr-2"></i>
                                    </button>
                                    <button className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* tabble  */}
                        <div className="overflow-x-auto rounded-lg bg-white mt-5 p-5 text-center">
                            <table className="w-full my-4 text-gray-400 text-sm">
                                <thead className='font-medium border-b-2'>
                                    <tr className='lg:grid lg:grid-cols-6 lg:justify-items-stretch pb-2'>

                                        <th className='px-3 lg:justify-self-start'>Payment link ID</th>
                                        <th className='px-3 lg:justify-self-start'>Order ID</th>
                                        <th className='px-3 lg:justify-self-start'>Price</th>
                                        <th className='px-3 lg:justify-self-start'>Currency</th>
                                        <th className='px-3 lg:justify-self-start'>Invoice Url</th>
                                        <th className='px-3 lg:justify-self-end'>Created at</th>

                                    </tr>
                                </thead>

                                <tbody className='font-medium'>
                                    {
                                        props?.payments.map((payment, i) => <tr
                                            key={i}
                                            className='lg:grid lg:grid-cols-6 lg:justify-items-stretch pt-2'
                                        >
                                            <td className='px-3 lg:justify-self-start'>{payment?.id}</td>
                                            <td className='px-3 lg:justify-self-start'>{payment?.order_id}</td>
                                            <td className='px-3 lg:justify-self-start'>{payment?.price}</td>
                                            <td className='px-3 lg:justify-self-start'>{payment?.currency}</td>
                                            <td className='px-3 lg:justify-self-start'></td>
                                            <td className='px-3 lg:justify-self-start'>{payment?.created_at}</td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {
                                !props?.payments.length &&
                                <h4 className='text-sm font-medium text-gray-400 text-center'>No payment links yet. It takes a couple of clicks to create one!</h4>
                            }


                        </div>
                    </div>

                    {/* create modal */}
                    <div>
                        <input type="checkbox" id="payment_create" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-white">
                                <label htmlFor="payment_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Create Payment </h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        action={route('payment.link.store')}
                                        method='post' encType="multipart/form-data">

                                        <input type="hidden" name="_token" value={props.csrf} />

                                        <input type="hidden" name="fixed_rate" value={selectFixedRateCreate ? 1 : 0} />
                                        <input type="hidden" name="fee_paid_user" value={selectFeePaidUserCreate ? 1 : 0} />
                                        <input type="hidden" name='currency_id' value={props?.company?.currency?.id} />
                                        <input type="hidden" name='user_id' value={props?.auth?.user?.id} />

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full">
                                                <label className="text-sm">Pay currency</label>
                                                <Select
                                                    className='text-black'
                                                    options={props.coins}
                                                    placeholder="Coin"
                                                    value={createCoin}
                                                    onChange={handleCreateCoin}
                                                    name="coin_id" />
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="original_price" className="text-sm">Price</label>
                                                <div className='flex items-center'>
                                                    <input id="original_price" name="price" type="number"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                    <span className='bg-white text-gray-900 p-2 rounded-sm font-medium'>
                                                        {props?.company?.ticker}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="amount_received" className="text-sm">Order Description</label>
                                                <input id="amount_received" name="order_description" type="text"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="order_id" className="text-sm">Order ID</label>
                                                <input id="order_id" name="order_id" type="text"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full flex items-center justify-between my-3">
                                                <div>
                                                    <input type="checkbox"
                                                        onClick={() => setSelectFixedRateCreate(!selectFixedRateCreate)}
                                                        className="rounded-full mr-1"
                                                    />
                                                    <span>Fixed rate</span>
                                                </div>
                                                <div>
                                                    <input type="checkbox"
                                                        onClick={() => setSelectFeePaidUserCreate(!selectFeePaidUserCreate)}
                                                        className="mr-1 rounded-full"
                                                    />
                                                    <span>Fee paid by user</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex justify-end items-center'>
                                            <button type='submit' className="btn btn-sm">
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* payment_create-confirm */}
                    <div>
                        <input type="checkbox" id="payment_create-confirm" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label htmlFor="payment_create-confirm" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div>
                                    <h2 className="mb-1 text-lg font-bold text-black text-center">Order: #65484</h2>

                                    <div className='flex items-center justify-between'>
                                        <div className=''>
                                            <h2 className='font-bold'>Price: 545454 inr</h2>
                                            <h2 className='font-bold'>Amount: 3.6758223 eth</h2>

                                            <div className='flex items-center'>
                                                <h2 className='font-bold w-60 break-words'>Address: 0xb6aEb2Acd497714aE7ADa784F20452A7F2793F75</h2>

                                                <button className='text-blue-400 ml-2'><MdContentCopy /></button>
                                            </div>
                                        </div>

                                        <BsQrCode className=' text-9xl lg:mt-10 mb-6' />
                                    </div>

                                    <div className=' border-t-2 pt-2'>
                                        <h2 className='font-bold flex items-center my-2'>Status: <span className='text-amber-400 mx-2'>waiting</span> <ImSpinner9 className='text-amber-400' /></h2>

                                        <h2 className='font-bold'>Share a permanent link to a hosted page:</h2>

                                        <div className='flex items-center'>
                                            <h2 className='font-bold break-words'>
                                                https://nowpayments.io/payment/?iid=5210004087&paymentId=5133234689</h2>

                                            <button className='text-blue-400 ml-1'><MdContentCopy /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </DashboardLayout>
        </>
    );
}

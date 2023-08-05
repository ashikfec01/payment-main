
import { Head, Link } from '@inertiajs/react';
import { MdContentCopy, MdOutlineWatchLater } from 'react-icons/md';
import { BsQrCode } from 'react-icons/bs';
import { ImSpinner9 } from 'react-icons/im';
import { BiCircle } from 'react-icons/bi';

export default function PublicPaymentConfirm() {

    return (
        <>
            <Head title="Payment Confirm details" />

            <div className="bg-gray-100">
                <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-3 lg:gap-4">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
                        <div className='bg-gray-100 flex justify-between'>
                            <h3 className='text-xl px-4 lg:px-9 py-3'>BitBytePay</h3>

                            <div className="text-sm px-4 lg:px-9 py-3 lg:hidden">
                                Payment ID: <span className='text-blue-400'>6194026526</span>
                            </div>
                        </div>

                        <div className='px-4 lg:px-9 py-4'>
                            <h4 className='lg:hidden'>hgdf</h4>

                            <div className='flex justify-between'>
                                <div className='flex items-baseline justify-center'>
                                    <h2 className='text-lg lg:text-2xl font-bold'>0.0247219 <span> BTC</span></h2>

                                    <button className='text-blue-400 ml-2 text-lg lg:text-xl'><MdContentCopy /></button>
                                </div>

                                <h2 className='text-lg lg:text-2xl font-bold'>Total: ₹54454</h2>
                            </div>

                            <div className='flex items-center text-xs lg:text-md text-gray-400'>
                                <h2 className=''>The rate will be updated in </h2>

                                <MdOutlineWatchLater className='ml-2 text-xl' />

                                <h2 className='mx-1'>12:54</h2>

                                <div className="tooltip tooltip-right" data-tip="The time after which the rate gets updated.">
                                    <i className="fa-solid fa-circle-info text-base font-extrabold"></i>
                                </div>
                            </div>

                            <h5 className='text-base mt-3 mb-1'>Send the funds to this address</h5>

                            <div className='flex lg:text-2xl mt-1 mb-5'>
                                <h5 className=' font-bold'>3LVJPVqmmjCNpiTSe8PsMaYTe2UNosK3Mg</h5>

                                <button className='text-blue-400 ml-2 text-xl'><MdContentCopy /></button>
                            </div>

                            <BsQrCode className='text-9xl lg:mt-10 mb-6' />

                            <button
                                // onClick={() => showRole(role.id)}
                                // htmlFor="role_details"
                                className="text-blue-400"
                            >Pay with wallet connect</button>
                        </div>

                        <div className='bg-gray-100'>
                            <div className='py-3 flex lg:block'>
                                <div className='flex flex-col lg:flex-row items-center justify-around mx-10 '>
                                    <ImSpinner9 className='text-blue-400' />

                                    <div className='divider'><BiCircle className='text-gray-400 text-7xl' /></div>

                                    <div className='divider '><BiCircle className='text-gray-400 text-7xl' /></div>
                                    
                                    <div className='divider '><BiCircle className='text-gray-400 text-7xl' /></div>

                                    <BiCircle className='text-gray-400 text-xl' />
                                </div>

                                <div class="flex flex-col lg:flex-row justify-around ml-1 mr-5">
                                    <h2 class="text-blue-400 text-center">Waiting<br />for payment</h2>

                                    <h2 class="text-gray-400 text-center">Confirming<br />on blockchain</h2>

                                    <h2 class="text-gray-400 text-center">Confirmed<br />on blockchain</h2>

                                    <h2 class="text-gray-400 text-center">Sending<br />to seller</h2>
                                    
                                    <h2 class="text-gray-400 text-center">Sent to<br /> seller 🎉</h2>

                                </div>
                            </div>

                            <div className="px-4 lg:px-9 text-sm py-6">
                                <div className="flex justify-between text-blue-500">
                                    <button type="button" className="">
                                        Back
                                    </button>

                                    <a rel="noreferrer" target="_blank" className="" href="https://nowpayments.io/doc/user_agreement-v1_2_3.pdf">
                                        User agreement
                                    </a>

                                    <button type="button" className="">
                                        Help
                                    </button>
                                </div>

                                {/* <div className="">
                                    <div className="">
                                        <p className="">
                                            Copy the address and the amount to your wallet and press
                                            <span className="">
                                                Send
                                            </span>.
                                        </p>
                                        <p className="">
                                            Please don’t send funds using smart contract, we won't be able to detect them.
                                        </p>
                                        <p className="">
                                            Still have questions? Reach out via the chat at the bottom right corner.
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="mt-16 mb-6 hidden lg:block">
                            Payment ID: <span className='text-blue-400'>6194026526</span>
                        </div>

                        <h4 className='mb-64 hidden lg:block'>hgdf</h4>

                        <div className="">
                            <div className="">
                                Leave your email and we'll notify you when the seller receives your payment
                            </div>

                            <div className="lg:my-3">
                                <input className="p-2 mr-2 text-sm w-5/6 lg:w-52" placeholder="Email for transaction receipt" />

                                <button className='px-4 py-1 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 font-bold'>Confirm</button>
                            </div>

                            <div className="">
                                {/* for error show  */}
                            </div>

                            <div className="">
                                BitBytePay is for payment processing only. Please contact the store with any questions on goods/services
                            </div>
                        </div>
                    </div>
                </div>

                <Link href='/' className=""><h2 className="font-normal text-md p-3 pl-5">@ Bit<span className='text-blue-400'>Byte</span>Pay 2023</h2 ></Link>
            </div>
        </>
    );
}



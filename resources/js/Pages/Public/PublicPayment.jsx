
import { Head, Link } from '@inertiajs/react';
import Select from 'react-select';

export default function PublicPayment() {

    const options = [
        { value: 'USD', label: 'USD' },
        { value: 'BDT', label: 'BDT' },
        { value: 'INR', label: 'INR' }
    ]

    return (
        <>
            <Head title="Payment details" />

            <div className="bg-gray-100">
                <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-3 lg:gap-4">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
                        <h3 className='bg-gray-100 text-xl px-4 lg:px-9 py-3'>BitBytePay</h3>

                        <div className='px-4 lg:px-9 py-4'>
                            <h4 className='lg:hidden'>hgdf</h4>

                            <h2 className='text-xl lg:text-2xl font-bold mb-10 mt-3'>Total: ₹54454</h2>

                            <h5 className='text-md my-2'>You will pay</h5>

                            <div className='border rounded-md flex justify-between p-1.5 px-4 lg:w-96 mb-8 lg:mb-72'>
                                <h3 className='text-md lg:text-2xl pr-2'>0.2548</h3>

                                <Select
                                    className='text-black w-28'
                                    options={options}
                                    // placeholder="Select roles"
                                    // value={selectedCreateRole}
                                    // onChange={handleSelectCreate}
                                    name="roles[]" />
                            </div>

                            <Link href="http://localhost:8000/public-payment/avik/id">
                                <button className='px-4 py-3 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 font-bold lg:mb-0 w-full lg:w-96'>Proceed to payment</button>
                            </Link>
                        </div>

                        <div class="px-4 lg:px-9 text-sm">
                            <div class="flex justify-between text-blue-500">
                                <a rel="noreferrer" target="_blank" class="" href="https://nowpayments.io/doc/user_agreement-v1_2_3.pdf">
                                    User agreement
                                </a>

                                <button type="button" class="">
                                    Help
                                </button>
                            </div>

                            {/* <div class="">
                                <div class="">
                                    <p class="">
                                        Copy the address and the amount to your wallet and press
                                        <span class="">
                                            Send
                                        </span>.
                                    </p>
                                    <p class="">
                                        Please don’t send funds using smart contract, we won't be able to detect them.
                                    </p>
                                    <p class="">
                                        Still have questions? Reach out via the chat at the bottom right corner.
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="p-5">
                        <h4 className='mt-28 mb-64 hidden lg:block'>hgdf</h4>

                        <div class="">
                            <div class="">
                                Leave your email and we'll notify you when the seller receives your payment
                            </div>

                            <div class="lg:my-3">
                                <input class="p-2 mr-2 text-sm w-5/6 lg:w-52" placeholder="Email for transaction receipt" value="" />

                                <button className='px-4 py-1 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 font-bold'>Confirm</button>
                            </div>

                            <div class="">
                                {/* for error show  */}
                            </div>

                            <div class="">
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



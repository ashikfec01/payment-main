import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonPink from '@/Components/ButtonPink';

export default function Payments(props) {
    return (
        <>
            <Head title="Payments" />
            <DashboardLayout auth={props.auth}>

                {/* Payments  */}
                <div className='m-4 lg:m-10'>

                    <h2 className='text-4xl font-semibold mb-7 inline-flex'>Payments
                        <div className="lg:tooltip lg:tooltip-right ml-5" data-tip="The list of all payments with filtering and export functions.">
                            <i className="fa-solid fa-circle-info text-lg text-blue-400 font-bold"></i>
                        </div>
                    </h2>

                    <ButtonPink className='block px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Open Filter</ButtonPink>

                    {/* table  */}
                    <div className="overflow-x-auto border-2 border-blue-300 mt-9 shadow-lg">
                        <table className="w-full my-4 text-gray-500 text-xs">
                            {/* head */}
                            <thead className='font-black'>
                                <tr>
                                    <th className='px-3'>Payment ID</th>
                                    <th className='px-3'>Order ID</th>
                                    <th className='px-3'>Original Price</th>
                                    <th className='px-3'>Amount Sent</th>
                                    <th className='px-3'>Amount Received</th>
                                    <th className='px-3'>Status</th>
                                    <th className='px-3'>Created at</th>
                                    <th className='px-3'>Last update at</th>
                                    <th className='px-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className='text-center'>
                                    <td className='px-3'>56541</td>
                                    <td className='px-3'>56541</td>
                                    <td className='px-3'>545454$</td>
                                    <td className='px-3'>Quality Control </td>
                                    <td className='px-3'>Quality </td>
                                    <td className='px-3'>Blue</td>
                                    <td className='px-3'>12 45 45</td>
                                    <td className='px-3'>455 5454 </td>
                                    <td className='px-3'>Delete</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 className='text-xl'>You don’t have any complete payments yet.</h4>
                </div>

                {/* Perchases */}
                <div className='m-4 lg:m-10'>
                    <h2 className='text-4xl font-semibold mb-7 inline-flex'>Purchases
                        <div className="lg:tooltip lg:tooltip-right ml-5" data-tip="Special feature for completing a purchase in several payments.">
                            <i className="fa-solid fa-circle-info text-lg text-blue-400 font-extrabold"></i>
                        </div>
                    </h2>

                    <ButtonPink className='block px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Open Filter</ButtonPink>

                    {/* table  */}
                    <div className="overflow-x-auto border-2 border-blue-300 mt-9 shadow-lg">
                        <table className="w-full my-4 text-gray-500 text-xs">
                            {/* head */}
                            <thead className='font-black'>
                                <tr>
                                    <th className='px-3'>Purchase ID</th>
                                    <th className='px-3'>Status</th>
                                    <th className='px-3'>Payments Count</th>
                                    <th className='px-3'>Created at</th>
                                    <th className='px-3'>Last update at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className='text-center'>
                                    <td className='px-3'>56541</td>
                                    <td className='px-3'>Blue</td>
                                    <td className='px-3'>12</td>
                                    <td className='px-3'>455 5454 </td>
                                    <td className='px-3'>5454 454 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 className='text-xl'>You don’t have any complete purchases yet.</h4>
                </div>
            </DashboardLayout>
        </>
    );
}

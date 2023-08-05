
import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function TransactionHistory(props) {
    return (
        <>
            <Head title="Transaction History" />
            <DashboardLayout auth={props.auth}>
                <div className='m-4 lg:m-10'>
                    <h2 className='text-4xl font-semibold mb-7'>Dashboard</h2>

                    {/* chart  */}
                    <h4 className='text-2xl font-extrabold my-4'>Payment Statistics</h4>

                    <div className='border rounded-lg border-blue-400 w-full p-3'>

                        <div className="min-w-0 break-words border-0 border-solid border-black-125 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="lg:flex justify-between">
                                <div className="lg:w-1/2 py-4 pr-1 mb-4 bg-gray-300 rounded-xl">
                                    <div>
                                        <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 px-0 lg:px-6 mx-auto max-w-screen-2xl rounded-xl">
                                    <div className="lg:-mx-3">
                                        <div className='flex justify-around text-sm font-bold m-0 mb-6'>
                                            <h4>Today:</h4>
                                            <h4>0</h4>
                                            <h4>0 USD</h4>
                                        </div>
                                        <div className='flex justify-around text-sm font-bold m-0 mb-6'>
                                            <h4>This Week:</h4>
                                            <h4>0</h4>
                                            <h4>0 USD</h4>
                                        </div>
                                        <div className='flex justify-around text-sm font-bold m-0 mb-6'>
                                            <h4>This Month:</h4>
                                            <h4>0</h4>
                                            <h4>0 USD</h4>
                                        </div>
                                        <div className='flex justify-around text-sm font-bold m-0'>
                                            <h4>All Time:</h4>
                                            <h4>0</h4>
                                            <h4>0 USD</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* table  */}
                    <h4 className='text-2xl font-extrabold my-7'>Last Payments</h4>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs whitespace-nowrap">
                            {/* head */}
                            <thead className='font-black'>
                                <tr>
                                    <th className='p-3'>Payment ID<br></br>Order ID</th>
                                    <th className='p-3'>Original Price</th>
                                    <th className='p-3'>Amount Sent<br></br>Amount Received</th>
                                    <th className='p-3'>Status</th>
                                    <th className='p-3'>Created at<br></br>Last update at</th>
                                    <th className='p-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className='text-center'>
                                    <td className='p-3'>56541</td>
                                    <td className='p-3'>545454$</td>
                                    <td className='p-3'>Quality Control </td>
                                    <td className='p-3'>Blue</td>
                                    <td className='p-3'>12 45 45</td>
                                    <td className='p-3'>Delete</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </DashboardLayout>
        </>
    );
}

import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import Select from 'react-select';
import { useState } from 'react';

export default function Subscriptions(props) {
    const [selectedCreatePeriodUnit, setSelectedCreatePeriodUnit] = useState([{ value: 'Month', label: 'Month' }]);

    const periodUnit = [
        { value: 'Days', label: 'Days' },
        { value: 'Month', label: 'Month' },
        { value: 'Years', label: 'Years' },
    ];

    function handleSelectCreatePeriodUnit(data) {
        setSelectedCreatePeriodUnit(data);
    }

    return (
        <>
            <Head title="Subscriptions" />
            <DashboardLayout auth={props.auth}>
                <div className='m-4 lg:m-10'>
                    <h2 className='text-4xl font-bold'>Subscriptions</h2>

                    {/* error show  */}
                    <ul className='bg-slate-300 rounded-sm'>
                        {Object.values(props.errors).map((message, i) => <li
                            key={i}
                            className="text-red-500 px-3 py-1"
                        >{message}</li>)}
                    </ul>

                    <label htmlFor="subscription_create" className='block w-48 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Subscription</label>

                    <div className="overflow-x-auto mt-5">
                        <table className="min-w-full text-sm text-white">
                            <thead className="bg-gray-700">
                                <tr className="text-center whitespace-nowrap">
                                    <th className="p-3">Subscription ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Cost per period</th>
                                    <th className="p-3">Period</th>
                                    <th className="p-3">Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.subscriptions.map((subscription, i) =>
                                    <tr className="border-b border-opacity-20 text-center border-gray-700 bg-gray-900 whitespace-nowrap" key={i}>
                                        <td className="p-3">
                                            <p>{subscription.id}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subscription?.plan_name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subscription?.price}{subscription?.ticker} </p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subscription?.period_duration}{subscription?.period_unit} </p>
                                        </td>
                                        <td className="p-3">
                                            <p>{subscription?.created_at} </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* create modal*/}
                        <div>
                            <input type="checkbox" id="subscription_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <label htmlFor="subscription_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">Create subscription plan</h2>

                                        <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900 text-white"
                                            action={route('subscription.store')} method='post'>

                                            <input type="hidden" name="_token" value={props.csrf} />
                                            <input type="hidden" name='user_id' value={props?.auth?.user?.id} />
                                            <input type="hidden" name='currency_id' value={props?.company?.currency?.id} />

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                                <div className="col-span-full">
                                                    <label className="text-sm">Title</label>

                                                    <input
                                                        name="plan_name" type="Text" placeholder="Plan name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Period duration</label>
                                                    <div className="flex items-center">
                                                        <input
                                                            name="period_duration" type="Text" placeholder="Period duration" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                        />
                                                        <Select
                                                            className='text-black w-full'
                                                            options={periodUnit}
                                                            value={selectedCreatePeriodUnit}
                                                            onChange={handleSelectCreatePeriodUnit}
                                                            name="period_unit"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Cost per period</label>
                                                    <div className="flex items-center">
                                                        <input
                                                            name="price" type="Text" placeholder="Cost" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                        />
                                                        <span className='bg-white text-gray-900 p-2 rounded-sm font-medium'>
                                                            {props?.company?.ticker}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h1 className="font-bold text-lg whitespace-nowrap">Advanced settings</h1>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Payment notifications link</label>

                                                    <input
                                                        name="payment_notifications_link" type="Text" placeholder="Where you will receive notifs" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Successful payment page</label>

                                                    <input
                                                        name="successful_payment_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Payment failed page</label>

                                                    <input
                                                        name="payment_failed_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Partial payment page</label>

                                                    <input
                                                        name="partial_payment_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
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

                    </div>
                </div>

            </DashboardLayout>
        </>
    );
}

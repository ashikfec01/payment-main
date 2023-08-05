import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Select from 'react-select';

export default function Index(props) {
    const [subscriptionUserId, setSubscriptionUserId] = useState([]);
    const [selectedCreatePeriodUnit, setSelectedCreatePeriodUnit] = useState([{ value: 'Month', label: 'Month' }]);
    const [createCurrency, setCreateCurrency] = useState([]);

    const [showSubscriptionData, setShowSubscriptionData] = useState({});

    const [editSubscriptionData, setEditSubscriptionData] = useState({});
    const [subscriptionUserIdEdit, setSubscriptionUserIdEdit] = useState([]);
    const [selectedEditPeriodUnit, setSelectedEditPeriodUnit] = useState();
    const [editCurrency, setEditCurrency] = useState([]);

    const periodUnit = [
        { value: 'Days', label: 'Days' },
        { value: 'Month', label: 'Month' },
        { value: 'Years', label: 'Years' },
    ];

    function handleSubscriptionUserIdCreate(data) {
        setSubscriptionUserId(data);
    }

    function handleSelectCreatePeriodUnit(data) {
        setSelectedCreatePeriodUnit(data);
    }

    const handleCreateCurrency = data => {
        setCreateCurrency(data);
    }

    function handleSubscriptionUserIdEdit(data) {
        setSubscriptionUserIdEdit(data);
    }

    function handleSelectEditPeriodUnit(data) {
        setSelectedEditPeriodUnit(data);
    }

    const handleEditCurrency = data => {
        setEditCurrency(data);
    }


    // fetch show data
    const showSubscriptionInfo = id => {
        fetch(`http://localhost:8000/admin/subscriptions/${id}`)
            .then(res => res.json())
            .then(data => setShowSubscriptionData(data))
    }

    // fetch edit data
    const editsubScriptionInfo = id => {
        fetch(`http://localhost:8000/admin/subscriptions/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                setEditSubscriptionData(data);
                const selectedUser = Object.assign({}, { 'value': data.subscription.user_id, 'label': data.subscription.email })
                const selectedPeriodUnit = Object.assign({}, { 'value': data.subscription.period_unit, 'label': data.subscription.period_unit })
                const selectedCurrency = Object.assign({}, { 'value': data.subscription.currency_id, 'label': data.subscription.ticker })
                setSubscriptionUserIdEdit(selectedUser);
                setEditCurrency(selectedCurrency)
                setSelectedEditPeriodUnit(selectedPeriodUnit)
            })
    }

    return (
        <DashboardLayout auth={props.auth}
        >
            <Head title="All Subscription" />

            <div className="container p-2 mx-auto sm:p-10 text-gray-100">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-black">All Subscription</h2>

                {
                    props.auth?.user?.permission.includes('subscription-create') &&
                    <label htmlFor="subscription_create" className='block w-48 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Subscription</label>
                }

                {/* error show  */}
                <ul className='bg-slate-300 rounded-sm'>
                    {Object.values(props.errors).map((message, i) => <li
                        key={i}
                        className="text-red-500 px-3 py-1"
                    >{message}</li>)}
                </ul>

                <div className="overflow-x-auto mt-5">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-700">
                            <tr className="text-center whitespace-nowrap">
                                <th className="p-3">Subscription ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">User Email</th>
                                <th className="p-3">Cost per period</th>
                                <th className="p-3">Period</th>
                                <th className="p-3">Created at</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props?.subscriptions?.data.map((subscription, i) =>
                                <tr className="border-b border-opacity-20 text-center border-gray-700 bg-gray-900 whitespace-nowrap" key={i}>
                                    <td className="p-3">
                                        <p>{subscription.id}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{subscription?.plan_name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{subscription?.email} </p>
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

                                    <td className="p-3">

                                        {
                                            props.auth?.user?.permission.includes('subscription-list') &&
                                            <label
                                                onClick={() => showSubscriptionInfo(subscription.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="subscription_show">Show</label>
                                        }

                                        {
                                            props.auth?.user?.permission.includes('subscription-edit') &&
                                            <label
                                                onClick={() => editsubScriptionInfo(subscription.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="subscription_edit">Edit</label>
                                        }

                                        {
                                            props.auth?.user?.permission.includes('subscription-delete') &&
                                            <form
                                                action={route('subscriptions.destroy', subscription.id)}
                                                className='inline'
                                                method='POST'
                                            >
                                                <input type="hidden" name="_token" value={props.csrf} />
                                                <input type="hidden" name="_method" value="delete" />
                                                <button className="m-1 px-3 py-0.5 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500">
                                                    Delete
                                                </button>
                                            </form>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* create modal*/}
                <div>
                    <input type="checkbox" id="subscription_create" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="subscription_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            <div>
                                <h2 className="mb-2 text-xl font-bold leading-tight text-black">Create subscription plan</h2>

                                <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                    action={route('subscriptions.store')} method='post'>

                                    <input type="hidden" name="_token" value={props.csrf} />

                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full">
                                            <label className="text-sm">Title</label>

                                            <input
                                                name="plan_name" type="Text" placeholder="Plan name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>


                                        <div className="col-span-full">
                                            <label htmlFor="user_id" className="text-sm">User Email</label>
                                            <Select
                                                className='text-black'
                                                options={props?.userid}
                                                value={subscriptionUserId}
                                                onChange={handleSubscriptionUserIdCreate}
                                                placeholder="User Email"
                                                name="user_id" />
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
                                                <Select
                                                    className='text-black w-full'
                                                    options={props.currencies}
                                                    placeholder="Currency"
                                                    value={createCurrency}
                                                    onChange={handleCreateCurrency}
                                                    name="currency_id" />
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

                {/* show modal */}
                <div>
                    <input type="checkbox" id="subscription_show" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            {/* close btn */}
                            <label htmlFor="subscription_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            {/* content */}
                            <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                <h3 className="pt-2 text-lg text-blue-500 font-bold">Invoice ID: {showSubscriptionData?.subscription?.plan_name} </h3>
                                <p className="py-1 text-white">User Email: {showSubscriptionData?.subscription?.email} </p>
                                <p className="py-1 text-white">Cost per period: {showSubscriptionData?.subscription?.price}{showSubscriptionData?.subscription?.ticker} </p>
                                <p className="py-1 text-white">Period: {showSubscriptionData?.subscription?.period_duration}{showSubscriptionData?.subscription?.period_unit} </p>
                                <p className="py-1 text-white">Created at: {showSubscriptionData?.subscription?.created_at} </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* edit modal  */}

                <div>
                    <input type="checkbox" id="subscription_edit" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="subscription_edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            <div>
                                <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit order</h2>

                                <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                    action={editSubscriptionData?.subscription && route('subscriptions.update', editSubscriptionData?.subscription?.id)}
                                    method='post' encType="multipart/form-data">

                                    <input type="hidden" name="_token" value={props.csrf} />
                                    <input type="hidden" name="_method" value="put" />

                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full">
                                            <label className="text-sm">Title</label>

                                            <input
                                                defaultValue={editSubscriptionData?.subscription?.plan_name}
                                                name="plan_name" type="Text" placeholder="Plan name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>


                                        <div className="col-span-full">
                                            <label htmlFor="user_id" className="text-sm">User Email</label>
                                            <Select
                                                className='text-black'
                                                options={props?.userid}
                                                value={subscriptionUserIdEdit}
                                                onChange={handleSubscriptionUserIdEdit}
                                                placeholder="User Email"
                                                name="user_id" />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Period duration</label>
                                            <div className="flex items-center">
                                                <input
                                                    defaultValue={editSubscriptionData?.subscription?.period_duration}
                                                    name="period_duration" type="Text" placeholder="Period duration" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                                <Select
                                                    className='text-black w-full'
                                                    options={periodUnit}
                                                    value={selectedEditPeriodUnit}
                                                    onChange={handleSelectEditPeriodUnit}
                                                    name="period_unit"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Cost per period</label>
                                            <div className="flex items-center">
                                                <input
                                                    defaultValue={editSubscriptionData?.subscription?.price}
                                                    name="price" type="Text" placeholder="Cost" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                                <Select
                                                    className='text-black w-full'
                                                    options={props.currencies}
                                                    placeholder="Currency"
                                                    value={editCurrency}
                                                    onChange={handleEditCurrency}
                                                    name="currency_id" />
                                            </div>
                                        </div>

                                        <h1 className="font-bold text-lg whitespace-nowrap">Advanced settings</h1>

                                        <div className="col-span-full">
                                            <label className="text-sm">Payment notifications link</label>

                                            <input
                                                defaultValue={editSubscriptionData?.subscription?.payment_notifications_link}
                                                name="payment_notifications_link" type="Text" placeholder="Where you will receive notifs" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Successful payment page</label>

                                            <input
                                                defaultValue={editSubscriptionData?.subscription?.successful_payment_page}
                                                name="successful_payment_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Payment failed page</label>

                                            <input
                                                defaultValue={editSubscriptionData?.subscription?.payment_failed_page}
                                                name="payment_failed_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Partial payment page</label>

                                            <input
                                                defaultValue={editSubscriptionData?.subscription?.partial_payment_page}
                                                name="partial_payment_page" type="Text" placeholder="Where users will be redirected" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                    </div>


                                    <div className='flex justify-end items-center'>
                                        <button type='submit' className="btn btn-sm">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
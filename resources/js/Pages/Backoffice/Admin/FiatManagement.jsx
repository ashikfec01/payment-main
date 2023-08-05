import DashboardLayout from '@/Layouts/DashboardLayout';
import Select from 'react-select';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index(props) {
    const [fiatWithdrawShowData, setFiatWithdrawShowData] = useState(null)
    const [fiatWithdrawEditData, setFiatWithdrawEditData] = useState(null)
    const [fiatWithdrawStatusStoreEdit, setFiatWithdrawStatusStoreEdit] = useState([]);
    const [fiatUserId, setFiatUserId] = useState([]);

    const fiatWithdrawStatus = [
        { value: 0, label: 'Processing' },
        { value: 1, label: 'Done' }
    ];

    function handleFiatWithdrawStatusEdit(data) {
        setFiatWithdrawStatusStoreEdit(data);
    }

    function handleFiatWithdrawUserIdEdit(data) {
        setFiatUserId(data);
    }

    // fetch show data
    const showFiatWithdrawData = id => {
        fetch(`http://localhost:8000/admin/withdraw/fiat/${id}`)
            .then(res => res.json())
            .then(data => setFiatWithdrawShowData(data))
    }

    // fetch edit data
    const editFiatWithdrawData = id => {
        fetch(`http://localhost:8000/admin/withdraw/fiat/${id}/edit`)
            .then(res => res.json())
            // .then(data => setPaymentEditData(data))
            .then(data => {
                const selectedStatus = Object.assign({}, { 'value': data.fiat_withdraw.status, 'label': data.fiat_withdraw.status ? 'Done' : 'Processing' })
                const selectedUserId = Object.assign({}, { 'value': data.fiat_withdraw.value, 'label': data.fiat_withdraw.label })
                setFiatWithdrawStatusStoreEdit(selectedStatus);
                setFiatUserId(selectedUserId);
                setFiatWithdrawEditData(data);
            }
            )
    }


    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Fiat Withdrawal Management" />

            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Fiat Withdrawal Management</h2>

                    {
                        props.auth?.user?.permission.includes('fiat-withdraw-create') &&
                        <label htmlFor="fiat-withdraw-create" className='block w-56 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Fiat Withdrawal</label>
                    }

                    {/* error show  */}
                    <ul className='bg-slate-300 rounded-sm'>
                        {Object.values(props.errors).map((message, i) => <li
                            key={i}
                            className="text-red-500 px-3 py-1"
                        >{message}</li>)}
                    </ul>

                    {/* table  */}
                    <div className="overflow-x-auto mt-5">
                        <table className="min-w-full text-sm whitespace-nowrap text-white">
                            {/* head */}
                            <thead className="bg-gray-700">
                                <tr className="text-center">
                                    <th className="p-3 text-left">No</th>
                                    <th className="p-3 text-left">User</th>
                                    <th className="p-3">Currency Name</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Created at</th>
                                    <th className="p-3">Last Update at</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props?.fiat_withdraws?.data.map((fiat_withdraw, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.email}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.currency_name}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.amount}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.status ? 'Done' : 'Processing'}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.created_at}</td>
                                        <td className='p-3 whitespace-nowrap'>{fiat_withdraw.updated_at}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('fiat-withdraw-list') &&
                                                <label
                                                    onClick={() => showFiatWithdrawData(fiat_withdraw.id)}
                                                    htmlFor="fiat_withdraw_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('fiat-withdraw-edit') &&
                                                <label
                                                    onClick={() => editFiatWithdrawData(fiat_withdraw.id)}
                                                    htmlFor="fiat_withdraw_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('fiat-withdraw-delete') &&
                                                <form action={route('fiat.destroy', fiat_withdraw.id)}
                                                    className='inline'
                                                    method='POST'
                                                >
                                                    <input type="hidden" name="_token" value={props.csrf} />
                                                    <input type="hidden" name="_method" value="delete" />

                                                    <input type='submit' className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900" value='Delete' />
                                                </form>
                                            }
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>


                    {/* create modal */}
                    <div>
                        <input type="checkbox" id="fiat-withdraw-create" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-white">
                                <label htmlFor="fiat-withdraw-create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Fiat Withdraw Info</h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        action={route('fiat.store')} method='post' encType="multipart/form-data">

                                        <input type="hidden" name="_token" value={props.csrf} />

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="user_id" className="text-sm">User Email</label>
                                                <Select
                                                    className='text-black'
                                                    options={props?.userid}
                                                    placeholder="User Email"
                                                    name="user_id" />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="currency_name" className="text-sm">Currency Name</label>

                                                <input id="currency_name" name="currency_name" type="text" placeholder="Currency Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="amount" className="text-sm">Amount</label>

                                                <input id="amount" name="amount" type="number" placeholder="Amount" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
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
                        <input type="checkbox" id="fiat_withdraw_show" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="fiat_withdraw_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">User: {fiatWithdrawShowData?.fiat_withdraw?.email} </h3>

                                    <p className="py-1 text-white">Currency Name: {fiatWithdrawShowData?.fiat_withdraw?.currency_name}</p>
                                    <p className="py-1 text-white">Amount: {fiatWithdrawShowData?.fiat_withdraw?.amount}</p>

                                    <p className="py-1 text-white">Status: {fiatWithdrawShowData?.fiat_withdraw?.status ? 'Done' : 'Processing'}</p>
                                    <p className="py-1 text-white">Created at: {fiatWithdrawShowData?.fiat_withdraw?.created_at}</p>
                                    <p className="py-1 text-white">Updated at: {fiatWithdrawShowData?.fiat_withdraw?.updated_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    <div>
                        <input type="checkbox" id="fiat_withdraw_edit" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-white">
                                <label htmlFor="fiat_withdraw_edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit Fiat Withdraw Info</h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        action={fiatWithdrawEditData && route('fiat.update', fiatWithdrawEditData?.fiat_withdraw.id)}
                                        method='post' encType="multipart/form-data">

                                        <input type="hidden" name="_token" value={props.csrf} />
                                        <input type="hidden" name="_method" value="put" />

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="user_id" className="text-sm">User Email</label>

                                                <Select
                                                    className='text-black'
                                                    options={props?.userid}
                                                    value={fiatUserId}
                                                    onChange={handleFiatWithdrawUserIdEdit}
                                                    placeholder="User Email"
                                                    name="user_id" />

                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="currency_name" className="text-sm">Currency Name</label>
                                                <input id="currency_name" name="currency_name" type="text"
                                                    defaultValue={fiatWithdrawEditData?.fiat_withdraw?.currency_name}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="amount" className="text-sm">Amount</label>
                                                <input id="amount" name="amount" type="number"
                                                    defaultValue={fiatWithdrawEditData?.fiat_withdraw?.amount}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="status" className="text-sm">Fiat Withdraw Status</label>
                                                <Select
                                                    className='text-black'
                                                    options={fiatWithdrawStatus}
                                                    placeholder="Select Status"
                                                    value={fiatWithdrawStatusStoreEdit}
                                                    onChange={handleFiatWithdrawStatusEdit}
                                                    name="status" />
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
            </section >
        </DashboardLayout >
    );
}
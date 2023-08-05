import DashboardLayout from '@/Layouts/DashboardLayout';
import Select from 'react-select';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";


export default function Index(props) {
    const [paymentUserId, setPaymentUserId] = useState([]);
    const [createCurrency, setCreateCurrency] = useState([]);
    const [createCoin, setCreateCoin] = useState([]);
    const [selectFixedRateCreate, setSelectFixedRateCreate] = useState(false);
    const [selectFeePaidUserCreate, setSelectFeePaidUserCreate] = useState(false);

    const [paymentShowData, setPaymentShowData] = useState(null)

    const [paymentEditData, setPaymentEditData] = useState(null)
    const [selectFixedRateEdit, setSelectFixedRateEdit] = useState(null);
    const [selectFeePaidUserEdit, setSelectFeePaidUserEdit] = useState(null);
    const [paymentUserIdEdit, setPaymentUserIdEdit] = useState([]);
    const [currencyEdit, setCreateCurrencyEdit] = useState([]);
    const [paymentStatusStoreEdit, setPaymentStatusStoreEdit] = useState([]);


    const paymentStatus = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Waiting', label: 'Waiting' },
        { value: 'Success', label: 'Success' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Canceled', label: 'Canceled' }
    ];

    function handlePaymentUserIdCreate(data) {
        setPaymentUserId(data);
    }

    const handleCreateCurrency = data => {
        setCreateCurrency(data);
    }
    const handleCreateCoin = data => {
        setCreateCoin(data);
    }

    function handlePaymentUserIdEdit(data) {
        setPaymentUserIdEdit(data);
    }

    const handleCreateCurrencyEdit = data => {
        setCreateCurrencyEdit(data);
    }

    function handlePaymentStatusEdit(data) {
        setPaymentStatusStoreEdit(data);
    }

    // fetch show data
    const showPaymentData = id => {
        fetch(`http://localhost:8000/admin/payment/${id}`)
            .then(res => res.json())
            .then(data => setPaymentShowData(data))
    }

    // fetch edit data
    const editPaymentData = id => {
        fetch(`http://localhost:8000/admin/payment/${id}/edit`)
            .then(res => res.json())
            // .then(data => setPaymentEditData(data))
            .then(data => {
                const selectedStatus = Object.assign({}, { 'value': data.payment.status, 'label': data.payment.status })
                const selectedUserId = Object.assign({}, { 'value': data.payment.user_id, 'label': data.payment.email })
                const selectedCurrency = Object.assign({}, { 'value': data.payment.currency_id, 'label': data.payment.ticker })
                setPaymentUserIdEdit(selectedUserId)
                setCreateCurrencyEdit(selectedCurrency)
                setPaymentStatusStoreEdit(selectedStatus)
                setSelectFixedRateEdit(data?.payment?.fixed_rate)
                setSelectFeePaidUserEdit(data?.payment?.fee_paid_user)
                setPaymentEditData(data);
            }
            )
    }

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Payment Management" />

            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Payment Management</h2>

                    {
                        props.auth?.user?.permission.includes('payment-create') &&
                        <label htmlFor="payment_create" className='block w-44 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create payment</label>
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
                                    <th className="p-3 text-left">Payment link ID</th>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">User Email</th>
                                    <th className="p-3">Coin</th>
                                    <th className="p-3">Currency</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Order Description</th>
                                    <th className="p-3">Fixed rate</th>
                                    <th className="p-3">Fee paid by user </th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props?.payments?.data.map((payment, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{payment?.id}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.order_id}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.email}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.ticker}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.fiatTicker}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.price}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.order_description}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.fixed_rate ? <FcCheckmark /> : <RxCross2 className='text-red-500' />}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.fee_paid_user ? <FcCheckmark /> : <RxCross2 className='text-red-500' />}</td>
                                        <td className='p-3 whitespace-nowrap'>{payment?.status}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('payment-list') &&
                                                <label
                                                    onClick={() => showPaymentData(payment?.id)}
                                                    htmlFor="payment_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('payment-edit') &&
                                                <label
                                                    onClick={() => editPaymentData(payment?.id)}
                                                    htmlFor="payment_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('payment-delete') &&
                                                <form action={route('payment.destroy', payment?.id)}
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
                        <input type="checkbox" id="payment_create" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-white">
                                <label htmlFor="payment_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Create Payment </h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        action={route('payment.store')}
                                        method='post' encType="multipart/form-data">

                                        <input type="hidden" name="_token" value={props.csrf} />

                                        <input type="hidden" name="fixed_rate" value={selectFixedRateCreate ? 1 : 0} />
                                        <input type="hidden" name="fee_paid_user" value={selectFeePaidUserCreate ? 1 : 0} />

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full">
                                                <label htmlFor="order_id" className="text-sm">Order ID</label>
                                                <input id="order_id" name="order_id" type="text"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="user_id" className="text-sm">User Email</label>
                                                <Select
                                                    className='text-black'
                                                    options={props?.userid}
                                                    value={paymentUserId}
                                                    onChange={handlePaymentUserIdCreate}
                                                    placeholder="User Email"
                                                    name="user_id" />
                                            </div>

                                            <div className="col-span-full">
                                                <label className="text-sm">Currency</label>

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
                                                    <Select
                                                        className='text-black w-full'
                                                        options={props.currencies}
                                                        placeholder="Currency"
                                                        value={createCurrency}
                                                        onChange={handleCreateCurrency}
                                                        name="currency_id" />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="amount_received" className="text-sm">Order Description</label>
                                                <input id="amount_received" name="order_description" type="text"
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

                    {/* show modal */}
                    <div>
                        <input type="checkbox" id="payment_show" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="payment_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Order ID: {paymentShowData?.payment?.order_id} </h3>
                                    <p className="py-1 text-white">User Email: {paymentShowData?.payment?.email}</p>
                                    <p className="py-1 text-white">Currency: {paymentShowData?.payment?.ticker}</p>
                                    <p className="py-1 text-white">Price: {paymentShowData?.payment?.price}</p>
                                    <p className="py-1 text-white">Order Description: {paymentShowData?.payment?.order_description}</p>

                                    <p className="py-1 text-white flex items-center">Fixed rate: {paymentShowData?.payment?.fixed_rate ? < FcCheckmark /> : <RxCross2 className='text-red-500' />}</p>
                                    <p className="py-1 text-white flex items-center">Fee paid by user: {paymentShowData?.payment?.fee_paid_user ? < FcCheckmark /> : <RxCross2 className='text-red-500' />}</p>

                                    <p className="py-1 text-white">Status: {paymentShowData?.payment?.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    <div>
                        <input type="checkbox" id="payment_edit" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box text-white">
                                <label htmlFor="payment_edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit Payment Info</h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        action={paymentEditData && route('payment.update', paymentEditData?.payment.id)}
                                        method='post' encType="multipart/form-data">

                                        <input type="hidden" name="_token" value={props.csrf} />
                                        <input type="hidden" name="_method" value="put" />

                                        <input type="hidden" name="fixed_rate" value={selectFixedRateEdit ? 1 : 0} />
                                        <input type="hidden" name="fee_paid_user" value={selectFeePaidUserEdit ? 1 : 0} />

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full">
                                                <label htmlFor="order_id" className="text-sm">Order ID</label>
                                                <input id="order_id" name="order_id" type="text"
                                                    defaultValue={paymentEditData?.payment?.order_id}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="user_id" className="text-sm">User Email</label>
                                                <Select
                                                    className='text-black'
                                                    options={props?.userid}
                                                    value={paymentUserIdEdit}
                                                    onChange={handlePaymentUserIdEdit}
                                                    placeholder="User Email"
                                                    name="user_id" />
                                            </div>

                                            <div className="col-span-full">
                                                <label className="text-sm">Currency</label>

                                                <Select
                                                    className='text-black'
                                                    options={props.coins}
                                                    placeholder="Currency"
                                                    value={currencyEdit}
                                                    onChange={handleCreateCurrencyEdit}
                                                    name="currency_id" />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="original_price" className="text-sm">Price</label>
                                                <input id="original_price" name="price" type="number"
                                                    defaultValue={paymentEditData?.payment?.price}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="amount_received" className="text-sm">Order Description</label>
                                                <input id="amount_received" name="order_description" type="text"
                                                    defaultValue={paymentEditData?.payment?.order_description}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="status" className="text-sm">Payment Status</label>
                                                <Select
                                                    className='text-black'
                                                    options={paymentStatus}
                                                    placeholder="Select Status"
                                                    value={paymentStatusStoreEdit}
                                                    onChange={handlePaymentStatusEdit}
                                                    name="status" />
                                            </div>
                                            {
                                                paymentEditData?.payment &&
                                                <div className="col-span-full flex items-center justify-between my-3">
                                                    <div>
                                                        <input type="checkbox"
                                                            onClick={() => setSelectFixedRateEdit(!selectFixedRateEdit)}
                                                            defaultChecked={paymentEditData?.payment?.fixed_rate ? true : false}
                                                            className="rounded-full mr-1"
                                                        />
                                                        <span>Fixed rate</span>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox"
                                                            onClick={() => setSelectFeePaidUserEdit(!selectFeePaidUserEdit)}
                                                            defaultChecked={paymentEditData?.payment?.fee_paid_user ? true : false}
                                                            className="mr-1 rounded-full"
                                                        />
                                                        <span>Fee paid by user</span>
                                                    </div>
                                                </div>
                                            }
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

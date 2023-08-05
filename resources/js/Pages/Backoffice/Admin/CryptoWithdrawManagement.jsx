import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';

export default function Index(props) {

    // create state
    const [createModal, setCreateModal] = useState(false);
    const [currencyCreate, setCurrencyCreate] = useState([]);
    const [userIdCreate, setUserIdCreate] = useState([]);
    const [companyIdCreate, setCompanyIdCreate] = useState([]);

    // show state
    const [companyShowData, setCryptoShowData] = useState([]);

    // edit state
    const [editModal, setEditModal] = useState(false);
    const [cryptoEditData, setCryptoEditData] = useState([]);

    const [currencyEdit, setCurrencyEdit] = useState([]);
    const [userIdEdit, setUserIdEdit] = useState([]);
    const [companyIdEdit, setCompanyIdEdit] = useState([]);
    const [statusEdit, setStatusEdit] = useState([]);

    const cryptoWithdrawStatus = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Waiting', label: 'Waiting' },
        { value: 'Success', label: 'Success' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Canceled', label: 'Canceled' }
    ];

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        company_id: '',
        user_id: '',
        currency_id: '',
        address: '',
        memo: '',
        amount: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };


    const handleCryptoWithdrawCreate = (e) => {
        e.preventDefault();

        post(route('crypto.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
                setCompanyIdCreate('')
                setUserIdCreate('')
                setCurrencyCreate('')
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    // fetch show data
    const showCryptoInfo = id => {
        fetch(`http://localhost:8000/admin/withdraw/crypto/${id}`)
            .then(res => res.json())
            .then(data => setCryptoShowData(data))
    }

    // fetch edit data
    const editUserInfo = id => {
        setEditModal(!editModal)

        fetch(`http://localhost:8000/admin/withdraw/crypto/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                setCryptoEditData(data);
                const selectedCurrency = Object.assign({}, { 'value': data.withdraw.currency_id, 'label': data.withdraw.currency_name })
                const selectedUserId = Object.assign({}, { 'value': data.withdraw.value, 'label': data.withdraw.label })
                const selectedCompanyId = Object.assign({}, { 'value': data.withdraw.company_id, 'label': data.withdraw.name })
                const selectedStatus = Object.assign({}, { 'value': data.withdraw.status, 'label': data.withdraw.status })
                setCurrencyEdit(selectedCurrency);
                setUserIdEdit(selectedUserId);
                setCompanyIdEdit(selectedCompanyId);
                setStatusEdit(selectedStatus);
                setData({
                    company_id: data.withdraw.company_id || '',
                    user_id: data.withdraw.value || '',
                    currency_id: data.withdraw.currency_id || '',
                    address: data.withdraw.address || '',
                    memo: data.withdraw.memo || '',
                    amount: data.withdraw.amount || '',
                    status: data.withdraw.status || '',
                })
            })
    }

    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setEachUserEditData({})
        reset()
    }

    // edit user
    const handleEditCryptoWithdraw = (e) => {
        e.preventDefault();

        put(route('crypto.update', cryptoEditData?.withdraw?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                setCurrencyEdit('')
                setUserIdEdit('')
                setCompanyIdEdit('')
                setStatusEdit('')
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }

    // delete Crypto Withdraw
    const deleteCryptoWithdraw = (id) => {
        destroy(route('crypto.destroy', id));
    };

    return (
        <DashboardLayout auth={props.auth}
        >
            <Head title="All Crypto Withdraw Request" />

            <div className="container p-2 mx-auto sm:p-10 text-gray-100">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-black">All Crypto Withdraw</h2>

                {
                    props.auth?.user?.permission.includes('crypto-withdraw-create') &&
                    <label
                        onClick={() => setCreateModal(!createModal)}
                        htmlFor="crypto_create"
                        className='block w-44 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'
                    >
                        Crypto Withdraw
                    </label>
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
                            <tr className="text-left whitespace-nowrap">
                                <th className="p-3">No.</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">User</th>
                                <th className="p-3">Currency Name</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Memo</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props?.withdraws?.data.map((w, i) =>
                                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900 whitespace-nowrap" key={i}>
                                    <td className="p-3">
                                        <p>{i + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.currency_name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.address}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.memo}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.amount}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{w?.status}</p>
                                    </td>
                                    <td className="p-3">

                                        {
                                            props.auth?.user?.permission.includes('crypto-withdraw-list') &&
                                            <label onClick={() => showCryptoInfo(w.id)} className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="crypto_show">Show</label>
                                        }

                                        {/* The button to open modal */}
                                        {
                                            props.auth?.user?.permission.includes('crypto-withdraw-edit') &&
                                            <label onClick={() => editUserInfo(w.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="crypto_edit">Edit</label>
                                        }

                                        {
                                            props.auth?.user?.permission.includes('crypto-withdraw-delete') &&

                                            <button
                                                onClick={() => deleteCryptoWithdraw(w.id)}
                                                className="m-1 px-3 py-0.5 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500"
                                            >
                                                Delete
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* create modal*/}
                {
                    createModal &&
                    <div>
                        <input type="checkbox" id="crypto_create" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label
                                    onClick={() => setCreateModal(!createModal)}
                                    htmlFor="crypto_create"
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                >
                                    ✕
                                </label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Crypto Withdraw</h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        onSubmit={handleCryptoWithdrawCreate}>

                                        <input type="hidden" name="_token" value={props.csrf} />
                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="name" className="text-sm">Company</label>
                                                <Select
                                                    className='text-black'
                                                    options={props.companyid.data}
                                                    value={companyIdCreate}
                                                    onChange={(data) => {
                                                        setCompanyIdCreate(data)
                                                        setData('company_id', data.value)
                                                    }}
                                                    placeholder="Select Company"
                                                    name="company_id" />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="email" className="text-sm">User Email</label>
                                                <Select
                                                    className='text-black'
                                                    options={props.userid.data}
                                                    value={userIdCreate}
                                                    onChange={(data) => {
                                                        setUserIdCreate(data)
                                                        setData('user_id', data.value)
                                                    }}
                                                    placeholder="User Email"
                                                    name="user_id"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label className="text-sm">Currency Name</label>
                                                <Select
                                                    className='text-black'
                                                    options={props?.currencies}
                                                    value={currencyCreate}
                                                    onChange={(data) => {
                                                        setCurrencyCreate(data)
                                                        setData('currency_id', data.value)
                                                    }}
                                                    placeholder="Currency Name"
                                                    name="currency_id"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Address</label>

                                                <input
                                                    name="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    value={data.address}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Memo</label>

                                                <input
                                                    name="memo"
                                                    type="text"
                                                    placeholder="Memo"
                                                    value={data.memo}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Amount</label>

                                                <input
                                                    name="amount"
                                                    type="text"
                                                    placeholder="Amount"
                                                    value={data.amount}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
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
                }

                {/* show modal */}
                <div>
                    <input type="checkbox" id="crypto_show" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            {/* close btn */}
                            <label htmlFor="crypto_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            {/* content */}
                            <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                <h3 className="pt-2 text-lg text-blue-500 font-bold">Company ID: {companyShowData?.withdraw?.name} </h3>
                                <p className="py-1 text-white">User Email: {companyShowData?.withdraw?.email}</p>
                                <p className="py-1 text-white">Currency Name: {companyShowData?.withdraw?.currency_name}</p>
                                <p className="py-1 text-white">Address: {companyShowData?.withdraw?.address}</p>
                                <p className="py-1 text-white">Memo: {companyShowData?.withdraw?.memo}</p>
                                <p className="py-1 text-white">Amount: {companyShowData?.withdraw?.amount}</p>
                                <p className="py-1 text-white">Status: {companyShowData?.withdraw?.status ? 'Done' : 'Processing'}</p>

                            </div>
                        </div>
                    </div>
                </div>

                {/* edit modal  */}
                {
                    editModal &&
                    <div>
                        <input type="checkbox" id="crypto_edit" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label
                                    onClick={handleEditModatClose}
                                    htmlFor="crypto_edit"
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                >
                                    ✕
                                </label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Crypto Withdraw Edit</h2>

                                    <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                        onSubmit={handleEditCryptoWithdraw}
                                        encType="multipart/form-data"
                                    >

                                        <input type="hidden" name="_token" value={props.csrf} />
                                        <input type="hidden" name="_method" value="put" />
                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="name" className="text-sm">Company Id</label>

                                                <Select
                                                    className='text-black'
                                                    options={props?.companyid.data}
                                                    value={companyIdEdit}
                                                    onChange={(data) => {
                                                        setCompanyIdEdit(data)
                                                        setData('company_id', data.value)
                                                    }}
                                                    placeholder="Company ID"
                                                    name="company_id" />

                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="email" className="text-sm">User ID</label>

                                                <Select
                                                    className='text-black'
                                                    options={props?.userid.data}
                                                    value={userIdEdit}
                                                    onChange={(data) => {
                                                        setUserIdEdit(data)
                                                        setData('user_id', data.value)
                                                    }}
                                                    placeholder="User ID"
                                                    name="user_id" />

                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Currency Name</label>

                                                <Select
                                                    className='text-black'
                                                    options={props?.currencies}
                                                    placeholder="Currency Name"
                                                    value={currencyEdit}
                                                    onChange={(data) => {
                                                        setCurrencyEdit(data)
                                                        setData('currency_id', data.value)
                                                    }}
                                                    name="currency_id" />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Address</label>

                                                <input
                                                    value={data.address}
                                                    onChange={handleOnChange}
                                                    name="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Memo</label>

                                                <input
                                                    value={data.memo}
                                                    onChange={handleOnChange}
                                                    name="memo"
                                                    type="text"
                                                    placeholder="Memo"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="text-sm">Amount</label>

                                                <input
                                                    value={data?.amount}
                                                    onChange={handleOnChange}
                                                    name="amount"
                                                    type="text"
                                                    placeholder="Amount"
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="status" className="text-sm">Crypto Withdraw Status</label>
                                                <Select
                                                    className='text-black'
                                                    options={cryptoWithdrawStatus}
                                                    placeholder="Select Status"
                                                    value={statusEdit}
                                                    onChange={(data) => {
                                                        setStatusEdit(data)
                                                        setData('status', data.value)
                                                    }}
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
                }
            </div>
        </DashboardLayout>
    );
}

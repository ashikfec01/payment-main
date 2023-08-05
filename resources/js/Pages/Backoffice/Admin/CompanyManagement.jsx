import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from 'react-select';

export default function CompanyManagement(props) {
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [companyShowData, setCompanyShowData] = useState([]);
    const [companyEditData, setCompanyEditData] = useState([]);

    const [createCurrency, setCreateCurrency] = useState([]);
    const [createNotification, setCreateNotification] = useState([{ value: 1, label: 'On' }]);
    const [createSubscriptions, setCreateSubscriptions] = useState([{ value: 1, label: 'On' }]);
    const [createDonations, setCreateDonations] = useState([{ value: 1, label: 'On' }]);
    const [createPayment, setCreatePayment] = useState([{ value: 1, label: 'On' }]);
    const [createNetworkFee, setCreateNetworkFee] = useState([{ value: 1, label: 'On' }]);

    const [editCurrency, setEditCurrency] = useState([]);
    const [editNotification, setEditNotification] = useState([]);
    const [editSubscriptions, setEditSubscriptions] = useState([]);
    const [editDonations, setEditDonations] = useState([]);
    const [editPayment, setEditPayment] = useState([]);
    const [editNetworkFee, setEditNetworkFee] = useState([]);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        currency_id: '',
        secret_key: '',
        callback_url: '',
        timeout: '',
        notifications: 1,
        subscriptions: 1,
        donations: 1,
        payment_link: 1,
        network_fee_optimisation: 1,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const status = [
        { value: 1, label: 'On' },
        { value: 0, label: 'Off' }
    ];


    // create 
    const handleCreateCompany = (e) => {
        e.preventDefault();

        post(route('company.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()

                setCreateCurrency('');
                setCreateNotification('');
                setCreateSubscriptions('');
                setCreateDonations('');
                setCreatePayment('');
                setCreateNetworkFee('');
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    // fetch show data
    const showCompanyData = id => {
        fetch(`http://localhost:8000/admin/company/${id}`)
            .then(res => res.json())
            .then(data => setCompanyShowData(data))
    }


    // fetch edit data
    const editCompanyData = id => {
        setEditModal(!editModal)

        fetch(`http://localhost:8000/admin/company/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                const selectedCurrency = Object.assign({}, { 'value': data.company.currency.id, 'label': data.company.currency.ticker })
                const selectedNotification = Object.assign({}, { 'value': data.company.notifications ? data.company.notifications : 0, 'label': data.company.notifications ? 'On' : 'Off' })
                const selectedSubscriptions = Object.assign({}, { 'value': data.company.subscriptions ? data.company.subscriptions : 0, 'label': data.company.subscriptions ? 'On' : 'Off' })
                const selectedDonations = Object.assign({}, { 'value': data.company.donations ? data.company.donations : 0, 'label': data.company.donations ? 'On' : 'Off' })
                const selectedPayment = Object.assign({}, { 'value': data.company.payment_link ? data.company.payment_link : 0, 'label': data.company.payment_link ? 'On' : 'Off' })
                const selectedNetworkFee = Object.assign({}, { 'value': data.company.network_fee_optimisation ? data.company.network_fee_optimisation : 0, 'label': data.company.network_fee_optimisation ? 'On' : 'Off' })

                setEditCurrency(selectedCurrency)
                setEditNotification(selectedNotification)
                setEditSubscriptions(selectedSubscriptions)
                setEditDonations(selectedDonations)
                setEditPayment(selectedPayment)
                setEditNetworkFee(selectedNetworkFee)

                setCompanyEditData(data);

                // console.log(data);
                setData({
                    _method: 'put',
                    name: data.company.name || '',
                    currency_id: data.company.currency_id || '',
                    secret_key: data.company.secret_key || '',
                    callback_url: data.company.callback_url || '',
                    timeout: data.company.timeout || '',
                    notifications: data.company.notifications ? 1 : 0,
                    subscriptions: data.company.subscriptions ? 1 : 0,
                    donations: data.company.donations ? 1 : 0,
                    payment_link: data.company.payment_link ? 1 : 0,
                    network_fee_optimisation: data.company.network_fee_optimisation ? 1 : 0,
                })
            })
    }

    //  edit data
    const handleEditModalClose = () => {
        setEditModal(!editModal)
        setCompanyEditData({})
        reset()
    }

    const handleEditCompany = (e) => {
        e.preventDefault();

        post(route('company.update', companyEditData?.company?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }


    // delete 
    const deleteCompany = (id) => {
        destroy(route('company.destroy', id));
    };

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Company Management" />

            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Company Management</h2>
                    {
                        props.auth?.user?.permission.includes('company-create') &&
                        <label
                            onClick={() => setCreateModal(!createModal)}
                            htmlFor="company_create" className='block w-44 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Company</label>
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
                                    <th className="p-3 text-left">Company name</th>
                                    <th className="p-3">Currency Name</th>
                                    <th className="p-3">Secret key</th>
                                    <th className="p-3">Callback url</th>
                                    <th className="p-3">Timeout</th>
                                    <th className="p-3">Notifications</th>
                                    <th className="p-3">Subscriptions</th>
                                    <th className="p-3">Donations</th>
                                    <th className="p-3">Payment link</th>
                                    <th className="p-3">Network fee optimisation</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props.companies?.data.map((company, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.name}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.currency?.ticker}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.secret_key}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.callback_url}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.timeout}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.notifications ? 'On' : 'Off'}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.subscriptions ? 'On' : 'Off'}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.donations ? 'On' : 'Off'}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.payment_link ? 'On' : 'Off'}</td>
                                        <td className='p-3 whitespace-nowrap'>{company?.network_fee_optimisation ? 'On' : 'Off'}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('company-list') && <label
                                                    onClick={() => showCompanyData(company.id)}
                                                    htmlFor="company_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('company-edit') &&
                                                <label
                                                    onClick={() => editCompanyData(company.id)}
                                                    htmlFor="company_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('company-delete') &&

                                                <input type='submit' onClick={() => deleteCompany(company.id)} className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900" value='Delete' />
                                            }
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>


                    {/* create modal */}
                    {
                        createModal &&
                        <div>
                            <input type="checkbox" id="company_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={() => setCreateModal(!createModal)}
                                        htmlFor="company_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Company Info</h2>

                                        <form
                                            onSubmit={handleCreateCompany}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            encType="multipart/form-data">

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Company name</label>

                                                    <input
                                                        name="name" type="text" placeholder="Name"
                                                        value={data.name}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Currency Name</label>

                                                    <Select
                                                        className='text-black'
                                                        options={props.currencies}
                                                        placeholder="Currency"
                                                        value={createCurrency}
                                                        onChange={(data) => {
                                                            setData('currency_id', data.value)
                                                            setCreateCurrency(data)
                                                        }}
                                                        name="currency_id" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Secret key</label>

                                                    <input
                                                        name="secret_key" type="text" placeholder="Secret key"
                                                        value={data.secret_key}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Callback URL</label>

                                                    <input
                                                        name="callback_url" type="url" placeholder="Callback URL"
                                                        value={data.callback_url}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Timeout</label>

                                                    <input
                                                        name="timeout" type="number" placeholder="Timeout"
                                                        value={data.timeout}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Notifications</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Notification Status"
                                                        value={createNotification}
                                                        onChange={(data) => {
                                                            setCreateNotification(data)
                                                            setData('notifications', data.value)
                                                        }}
                                                        name="notifications" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="logourl" className="text-sm">Subscriptions</label>
                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Subscriptions Status"
                                                        value={createSubscriptions}
                                                        onChange={(data) => {
                                                            setCreateSubscriptions(data)
                                                            setData('subscriptions', data.value)
                                                        }}
                                                        name="subscriptions" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="apiurl" className="text-sm">Donations</label>
                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Donations Status"
                                                        value={createDonations}
                                                        onChange={(data) => {
                                                            setCreateDonations(data)
                                                            setData('donations', data.value)
                                                        }}
                                                        name="donations" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Payment link</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Payment link Status"
                                                        value={createPayment}
                                                        onChange={(data) => {
                                                            setCreatePayment(data)
                                                            setData('payment_link', data.value)
                                                        }}
                                                        name="payment_link" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Network fee optimisation</label>
                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Network fee optimisation"
                                                        value={createNetworkFee}
                                                        onChange={(data) => {
                                                            setCreateNetworkFee(data)
                                                            setData('network_fee_optimisation', data.value)
                                                        }}
                                                        name="network_fee_optimisation" />
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
                        <input type="checkbox" id="company_show" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="company_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Company Name: {companyShowData?.company?.name} </h3>
                                    <p className="py-1 text-white">Currency Name: {companyShowData?.company?.ticker}</p>
                                    <p className="py-1 text-white">Secret Key: {companyShowData?.company?.secret_key}</p>
                                    <p className="py-1 text-white">Callback Url: {companyShowData?.company?.callback_url}</p>
                                    <p className="py-1 text-white">Timeout: {companyShowData?.company?.timeout}</p>
                                    <p className="py-1 text-white">Notifications: {companyShowData?.company?.notifications ? 'On' : 'Off'}</p>
                                    <p className="py-1 text-white">Notifications: {companyShowData?.company?.subscriptions ? 'On' : 'Off'}</p>
                                    <p className="py-1 text-white">Notifications: {companyShowData?.company?.donations ? 'On' : 'Off'}</p>
                                    <p className="py-1 text-white">Notifications: {companyShowData?.company?.payment_link ? 'On' : 'Off'}</p>
                                    <p className="py-1 text-white">Notifications: {companyShowData?.company?.network_fee_optimisation ? 'On' : 'Off'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    {
                        editModal &&
                        <div>
                            <input type="checkbox" id="company_edit" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label htmlFor="company_edit" onClick={handleEditModalClose}
                                        className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">Company Info</h2>

                                        <form
                                            onSubmit={handleEditCompany}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            encType="multipart/form-data">

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Company name</label>
                                                    <input
                                                        value={data?.name}
                                                        onChange={handleOnChange}
                                                        name="name" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Currency Name</label>
                                                    <Select
                                                        className='text-black'
                                                        options={props.currencies}
                                                        placeholder="Currency"
                                                        value={editCurrency}
                                                        onChange={(data) => {
                                                            setData('currency_id', data.value)
                                                            setEditCurrency(data)
                                                        }}
                                                        name="currency_id" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Secret key</label>
                                                    <input
                                                        value={data?.secret_key}
                                                        onChange={handleOnChange}
                                                        name="secret_key" type="text" placeholder="Secret key" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Callback url</label>
                                                    <input
                                                        value={data?.callback_url}
                                                        onChange={handleOnChange}
                                                        name="callback_url" type="url" placeholder="Secret key" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Timeout</label>

                                                    <input
                                                        value={data?.timeout}
                                                        onChange={handleOnChange}
                                                        name="timeout" type="number" placeholder="Timeout" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Notifications</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Notification Status"
                                                        value={editNotification}
                                                        onChange={(data) => {
                                                            setData('notifications', data.value)
                                                            setEditNotification(data)
                                                        }}
                                                        name="notifications" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="logourl" className="text-sm">Subscriptions</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Subscriptions Status"
                                                        value={editSubscriptions}
                                                        onChange={(data) => {
                                                            setData('subscriptions', data.value)
                                                            setEditSubscriptions(data)
                                                        }}
                                                        name="subscriptions" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="apiurl" className="text-sm">Donations</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Donations Status"
                                                        value={editDonations}
                                                        onChange={(data) => {
                                                            setData('donations', data.value)
                                                            setEditDonations(data)
                                                        }}
                                                        name="donations" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Payment link</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Payment link Status"
                                                        value={editPayment}
                                                        onChange={(data) => {
                                                            setData('payment_link', data.value)
                                                            setEditPayment(data)
                                                        }}
                                                        name="payment_link" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Network fee optimisation</label>

                                                    <Select
                                                        className='text-black'
                                                        options={status}
                                                        placeholder="Network fee optimisation"
                                                        value={editNetworkFee}
                                                        onChange={(data) => {
                                                            setData('network_fee_optimisation', data.value)
                                                            setEditNetworkFee(data)
                                                        }}
                                                        name="network_fee_optimisation" />
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
            </section >
        </DashboardLayout >
    );
}
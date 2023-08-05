import DashboardLayout from '@/Layouts/DashboardLayout';
import Select from 'react-select';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function Index(props) {
    const [createModal, setCreateModal] = useState(false);

    const [currencyShowData, setCurrencyShowData] = useState(null);

    const [editModal, setEditModal] = useState(false);
    const [currencyStatusStoreEdit, setCurrencyStatusStoreEdit] = useState([]);
    const [currencyEditData, setCurrencyEditData] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        ticker: '',
        logourl: '',
        active: '',
    });
    console.log(data);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleFile = (e) => {
        let file = e.target.files[0];

        if (file !== undefined) {
            setData("logourl", file);
        }
    };

    const currencyStatus = [
        { value: 0, label: 'Inactive' },
        { value: 1, label: 'Active' }
    ];


    // create 
    function handleCurrencyStatusCreate(data) {
        // setCurrencyStatusCreate(data);
        setData('active', data.value)
    }

    const handleCreateFiatCurrencies = (e) => {
        e.preventDefault();

        post(route('currencies.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
            },
            onError: () => setCreateModal(!createModal)
        });
    };


    // fetch show data
    const showCurrencyData = id => {
        fetch(`http://localhost:8000/admin/fiat/currencies/${id}`)
            .then(res => res.json())
            .then(data => setCurrencyShowData(data))
    }


    //  edit data
    function handleCurrencyStatusEdit(data) {
        setCurrencyStatusStoreEdit(data);
        setData('active', data.value);
    }

    const editCurrencyData = id => {
        setEditModal(!editModal)

        fetch(`http://localhost:8000/admin/fiat/currencies/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const selectedStatus = Object.assign({}, { 'value': data.currency.active, 'label': data.currency.active ? 'Active' : 'Inactive' })
                setCurrencyStatusStoreEdit(selectedStatus)
                setCurrencyEditData(data);

                // console.log(data);
                setData({
                    _method: 'put',
                    name: data.currency.name || '',
                    ticker: data.currency.ticker || '',
                    logourl: undefined,
                    active: data.currency.active,
                })
            }
            )
    }

    const handleEditModalClose = () => {
        setEditModal(!editModal)
        setCurrencyEditData({})
        reset()
    }

    const handleEditFiatCurrencies = (e) => {
        e.preventDefault();

        post(route('currencies.update', currencyEditData.currency?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }


    // delete 
    const deleteFiatCurrencies = (id) => {
        destroy(route('currencies.destroy', id));
    };

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Fiat Currencies" />

            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Fiat Currencies</h2>

                    {
                        props.auth?.user?.permission.includes('currencies-create') &&
                        <label
                            onClick={() => setCreateModal(!createModal)}
                            htmlFor="currency_create" className='block w-40 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Curreny</label>
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
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3">Logo url</th>
                                    <th className="p-3">Ticker</th>
                                    <th className="p-3">Active</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}
                                {
                                    props.currencies?.data.map((currency, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{currency.name}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            <div className="avatar">
                                                <div className="w-11 rounded">
                                                    <img className='w-full h-full' src={currency.logourl} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-3 whitespace-nowrap'>{currency.ticker}</td>
                                        <td className='p-3 whitespace-nowrap'>{currency.active ? 'Active' : 'Inactive'}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('currencies-list') &&
                                                <label
                                                    onClick={() => showCurrencyData(currency.id)}
                                                    htmlFor="currency_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('currencies-edit') &&
                                                <label
                                                    onClick={() => editCurrencyData(currency.id)}
                                                    htmlFor="currency_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('currencies-delete') &&

                                                <input type='submit' onClick={() => deleteFiatCurrencies(currency.id)}
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900" value='Delete' />

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
                            <input type="checkbox" id="currency_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={() => setCreateModal(!createModal)}
                                        htmlFor="currency_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Currency</h2>

                                        <form
                                            onSubmit={handleCreateFiatCurrencies}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            encType="multipart/form-data">

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Currency Name</label>

                                                    <input name="name" type="text" placeholder="Name"
                                                        value={data.name}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Currency Ticker</label>

                                                    <input name="ticker" type="text" placeholder="ticker"
                                                        value={data.ticker}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Currency Status</label>

                                                    <Select
                                                        className='text-black'
                                                        options={currencyStatus}
                                                        placeholder="Select Status"
                                                        // value={currencyStatusCreate}
                                                        onChange={handleCurrencyStatusCreate}
                                                        name="active" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Logo</label>

                                                    <input name="logourl" type="file" placeholder="URL of Coin Logo" onChange={handleFile}
                                                        className="w-full block text-white file:border-0 border-0 text-sm file:mr-4 file:py-2 file:px-8 file:rounded-full file:font-semibold file:bg-violet-50 file:text-violet-700" />
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
                        <input type="checkbox" id="currency_show" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="currency_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Name: {currencyShowData?.currency?.name} </h3>
                                    <div className="avatar my-1">
                                        <div className="w-11 rounded">
                                            <img src={currencyShowData?.currency?.logourl} />
                                        </div>
                                    </div>
                                    <p className="py-1 text-white">Ticker: {currencyShowData?.currency?.ticker}</p>
                                    <p className="py-1 text-white">Active: {currencyShowData?.currency?.active ? 'Active' : 'Inactive'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    {
                        editModal &&
                        <div>
                            <input type="checkbox" id="currency_edit" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label htmlFor="currency_edit" onClick={handleEditModalClose}
                                        className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit Currency Info</h2>

                                        <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            onSubmit={handleEditFiatCurrencies}
                                            encType="multipart/form-data">

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="name" className="text-sm">Currency Name</label>
                                                    <input name="name" type="text"
                                                        value={data?.name}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label className="text-sm">Currency Ticker</label>

                                                    <input name="ticker" type="text"
                                                        value={data?.ticker}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>


                                                <div className="col-span-full">
                                                    <label className="text-sm">Currency Status</label>
                                                    <Select
                                                        className='text-black'
                                                        options={currencyStatus}
                                                        placeholder="Select Status"
                                                        value={currencyStatusStoreEdit}
                                                        onChange={handleCurrencyStatusEdit}
                                                        name="active" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Logo URL</label>
                                                    <input name="logourl" type="file"
                                                        onChange={handleFile}
                                                        className="w-full block text-white file:border-0 border-0 text-sm file:mr-4 file:py-2 file:px-8 file:rounded-full file:font-semibold file:bg-violet-50 file:text-violet-700" />
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

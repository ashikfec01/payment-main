import DashboardLayout from '@/Layouts/DashboardLayout';
import Select from 'react-select';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function Index(props) {
    // create state
    const [createModal, setCreateModal] = useState(false);
    const [selectedCreateCategory, setSelectedCreateCategory] = useState([]);
    const [coinStatusStoreCreate, setCoinStatusStoreCreate] = useState([]);
    // show state
    const [coinShowData, setCoinShowData] = useState(null)
    // edit state
    const [editModal, setEditModal] = useState(false);
    const [coinEditData, setCoinEditData] = useState(null)
    const [selectedEditCategory, setSelectedEditCategory] = useState([]);
    const [coinStatusStoreEdit, setCoinStatusStoreEdit] = useState([]);

    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        ticker: '',
        active: '',
        category: [],
        logourl: null,
        apiurl: '',
        apitoken: '',
    });

    const coinCategories = [
        { value: 'Populer Coins', label: 'Populer Coins' },
        { value: 'Stable Coins', label: 'Stable Coins' },
        { value: 'Other Coins', label: 'Other Coins' }
    ];

    const coinStatus = [
        { value: 0, label: 'Inactive' },
        { value: 1, label: 'Active' }
    ];

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleFile = (e) => {
        if (e.target.files[0] !== undefined) {
            setData('logourl', e.target.files[0]);
        }
    };

    // create
    function handleSelectCreate(data) {
        setSelectedCreateCategory(data);
        const coinValue = data.map(d => d.value)
        setData('category', coinValue)
    }

    function handleCoinStatusCreate(data) {
        setCoinStatusStoreCreate(data);
        setData('active', data.value)
    }

    const handleCreateCoin = (e) => {
        e.preventDefault();

        post(route('coins.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                setSelectedCreateCategory('')
                setCoinStatusStoreCreate('')
                reset()
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    // show
    const showCoinData = id => {
        // fetch show data
        fetch(`http://localhost:8000/admin/coins/${id}`)
            .then(res => res.json())
            .then(data => setCoinShowData(data))
    }

    // edit 
    function handleSelectEdit(data) {
        setSelectedEditCategory(data);
        const coinValue = data.map(d => d.value)
        setData('category', coinValue)
    }

    function handleCoinStatusEdit(data) {
        setCoinStatusStoreEdit(data);
        setData('active', data.value)
    }

    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setCoinEditData({})
        reset()
    }

    const editCoinData = id => {

        setEditModal(!editModal)

        // fetch edit data
        fetch(`http://localhost:8000/admin/coins/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                const selectedStatus = Object.assign({}, { 'value': data?.coin?.active, 'label': data?.coin?.active ? 'Active' : 'Inactive' })
                setCoinStatusStoreEdit(selectedStatus)
                setCoinEditData(data);
                const t = JSON.parse(data?.coin?.category).map(d => Object.assign({}, { 'value': d, 'label': d }));
                setSelectedEditCategory(t);
                setData({
                    _method: 'put',
                    name: data?.coin?.name,
                    ticker: data?.coin?.ticker,
                    active: data?.coin?.active,
                    category: data?.coin?.category,
                    logourl: undefined,
                    apiurl: data?.coin?.apiurl,
                    apitoken: data?.coin?.apitoken,
                })
            }
            )
    }

    // edit user
    const handleEditCoin = (e) => {
        e.preventDefault();

        post(route('coins.update', coinEditData?.coin?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }

    // delete user
    const deleteCoin = (id) => {
        destroy(route('coins.destroy', id));
    };

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Coin Management" />

            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Coin Management</h2>

                    {
                        props.auth?.user?.permission.includes('coin-create') &&
                        <label
                            onClick={() => setCreateModal(!createModal)}
                            htmlFor="coin_create"
                            className='block w-36 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'
                        >
                            Create Coin
                        </label>
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
                                    <th className="p-3">Api url</th>
                                    <th className="p-3">Api token</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    props.coins.data.map((coin, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{coin.name}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            <div className="avatar">
                                                <div className="w-11 rounded">
                                                    <img src={coin.logourl} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-3 whitespace-nowrap'>{coin.ticker}</td>
                                        <td className='p-3 whitespace-nowrap'>{coin.active ? 'Active' : 'Inactive'}</td>
                                        <td className='p-3 whitespace-nowrap'>{coin.apiurl}</td>
                                        <td className='p-3 whitespace-nowrap'>{coin.apitoken}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {JSON.parse(coin.category).map((c, i) => <p key={i}>{c}</p>)}
                                        </td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('coin-list') &&
                                                <label
                                                    onClick={() => showCoinData(coin.id)}
                                                    htmlFor="coin_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('coin-edit') &&
                                                <label
                                                    onClick={() => editCoinData(coin.id)}
                                                    htmlFor="coin_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('coin-delete') &&
                                                <input
                                                    onClick={() => deleteCoin(coin?.id)}
                                                    type='submit'
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                    value='Delete'
                                                />
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
                            <input type="checkbox" id="coin_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={() => setCreateModal(!createModal)}
                                        htmlFor="coin_create"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                    >
                                        ✕
                                    </label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Coin Info</h2>

                                        <form
                                            onSubmit={handleCreateCoin}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            encType="multipart/form-data"
                                        >

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="name" className="text-sm">Coin Name</label>

                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Name"
                                                        value={data.name}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="name" className="text-sm">Coin Ticker</label>

                                                    <input
                                                        name="ticker"
                                                        type="text"
                                                        placeholder="ticker"
                                                        value={data.ticker}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>


                                                <div className="col-span-full">
                                                    <label htmlFor="active" className="text-sm">Coin Active Status</label>

                                                    <Select
                                                        className='text-black'
                                                        options={coinStatus}
                                                        placeholder="Select Status"
                                                        value={coinStatusStoreCreate}
                                                        onChange={handleCoinStatusCreate}
                                                        name="active" />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="category" className="text-sm mr-6">Coin Category</label>
                                                    <Select
                                                        className='text-black'
                                                        isMulti
                                                        options={coinCategories}
                                                        placeholder="Select Categories"
                                                        value={selectedCreateCategory}
                                                        onChange={handleSelectCreate}
                                                        name="category[]"
                                                    />
                                                </div>

                                                {/* image */}
                                                <div className="col-span-full">
                                                    <label htmlFor="logourl" className="text-sm">Logo URL</label>

                                                    <input
                                                        name="logourl"
                                                        type="file"
                                                        placeholder="URL of Coin Logo"
                                                        onChange={handleFile}
                                                        className="w-full block text-white file:border-0 border-0 text-sm file:mr-4 file:py-2 file:px-8 file:rounded-full file:font-semibold file:bg-violet-50 file:text-violet-700"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="apiurl" className="text-sm">API URL</label>

                                                    <input
                                                        name="apiurl"
                                                        type="url"
                                                        placeholder="URL of API"
                                                        value={data.apiurl}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="apitoken" className="text-sm">API Token</label>

                                                    <input
                                                        name="apitoken"
                                                        type="text"
                                                        placeholder="API Token"
                                                        value={data.apitoken}
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
                        <input type="checkbox" id="coin_show" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="coin_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Name: {coinShowData?.coin?.name} </h3>
                                    <div className="avatar my-1">
                                        <div className="w-11 rounded">
                                            <img src={coinShowData?.coin?.logourl} />
                                        </div>
                                    </div>
                                    <p className="py-1 text-white">Ticker: {coinShowData?.coin?.ticker}</p>
                                    <p className="py-1 text-white">Active: {coinShowData?.coin?.active ? 'Active' : 'Inactive'}</p>
                                    <p className="py-1 text-white">Category:
                                        {
                                            coinShowData && JSON.parse(coinShowData.coin.category).map((c, i) => <span
                                                key={i}
                                            >{i ? ', ' + c : ' ' + c}</span>
                                            )
                                        }
                                    </p>

                                    <p className="py-1 text-white break-words">Api url: {coinShowData?.coin?.apiurl}</p>
                                    <p className="py-1 text-white break-words">Api token: {coinShowData?.coin?.apitoken}</p>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    {
                        editModal &&
                        <div>
                            <input type="checkbox" id="coin_edit" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={handleEditModatClose}
                                        htmlFor="coin_edit"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                    >
                                        ✕
                                    </label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit Coin Info</h2>

                                        <form
                                            onSubmit={handleEditCoin}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                            encType="multipart/form-data"
                                        >

                                            <input type="hidden" name="_token" value={props.csrf} />
                                            <input type="hidden" name="_method" value="put" />

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="name" className="text-sm">Coin Name</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        value={data.name}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="name" className="text-sm">Coin Ticker</label>

                                                    <input
                                                        name="ticker"
                                                        type="text"
                                                        value={data.ticker}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>


                                                <div className="col-span-full">
                                                    <label htmlFor="active" className="text-sm">Coin Active Status</label>
                                                    <Select
                                                        className='text-black'
                                                        options={coinStatus}
                                                        placeholder="Select Status"
                                                        value={coinStatusStoreEdit}
                                                        onChange={handleCoinStatusEdit}
                                                        name="active" />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="category" className="text-sm mr-6">Coin Category</label>

                                                    <Select
                                                        className='text-black'
                                                        isMulti
                                                        options={coinCategories}
                                                        placeholder="Select Category"
                                                        value={selectedEditCategory}
                                                        onChange={handleSelectEdit}
                                                        name="category[]" />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="logourl" className="text-sm">Logo</label>
                                                    <input
                                                        name="logourl"
                                                        type="file"
                                                        onChange={handleFile}
                                                        className="w-full block text-white file:border-0 border-0 text-sm file:mr-4 file:py-2 file:px-8 file:rounded-full file:font-semibold file:bg-violet-50 file:text-violet-700"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="apiurl" className="text-sm">API URL</label>

                                                    <input
                                                        name="apiurl"
                                                        type="url"
                                                        value={data.apiurl}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>
                                                <div className="col-span-full">
                                                    <label htmlFor="apitoken" className="text-sm">API Token</label>

                                                    <input
                                                        name="apitoken"
                                                        type="text"
                                                        value={data.apitoken}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
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

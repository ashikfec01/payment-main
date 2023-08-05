import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from 'react';
import Select from 'react-select';

export default function Index(props) {
    const [createModal, setCreateModal] = useState(false);
    const [countries, setCountries] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    //show state
    const [accountShowData, setAccountShowData] = useState({});

    // edit stats
    const [editModal, setEditModal] = useState(false);
    const [selectedCountryEidt, setSelectedCountryEidt] = useState(null)
    const [selectedUserEidt, setSelectedUserEidt] = useState(null)

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        user_id: '',
        email: '',
        iban: '',
        country: '',
        city: '',
        postcode: '',
        billing_address: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    // create 
    const handleCreateAccount = (e) => {
        e.preventDefault();

        post(route('account.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
                setSelectedUser('');
                setSelectedCountry('');
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    // fetch show data
    const showAccountData = id => {
        fetch(`http://localhost:8000/admin/account/${id}`)
            .then(res => res.json())
            .then(data => setAccountShowData(data.account))
    }

    // edit

    // edit modal close
    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setCoinEditData({})
        reset()
    }

    const editAccountData = id => {
        setEditModal(!editModal)

        // fetch edit data
        fetch(`http://localhost:8000/admin/account/${id}`)
            .then(res => res.json())
            .then(data => {
                const selectedUser = Object.assign({ value: data?.account?.company_id, label: data?.account?.name })
                const selectedCountry = Object.assign({ value: data?.account?.country, label: data?.account?.country })
                console.log(selectedUser)
                console.log(data)
                setSelectedUserEidt(selectedUser)
                setSelectedCountryEidt(selectedCountry)

                setData({
                    id: data?.account?.id,
                    company_id: data?.account?.company_id,
                    email: data?.account?.email,
                    iban: data?.account?.iban,
                    country: data?.account?.country,
                    city: data?.account?.city,
                    postcode: data?.account?.postcode,
                    billing_address: data?.account?.billing_address,
                })
            }
            )
    }

    // edit user
    const handleEditAccount = (e) => {
        e.preventDefault();

        put(route('account.update', data?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                setSelectedUserEidt('')
                setSelectedCountryEidt('')
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }

    // delete user
    const deleteAccount = (id) => {
        destroy(route('account.destroy', id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://countriesnow.space/api/v0.1/countries');
            const data = await res.json();
            const allCountry = data.data.map(d => Object.assign({ value: d.country, label: d.country }))
            setCountries(allCountry)
        }
        fetchData()
    }, [])


    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Fiat Currencies" />
            <section className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-2xl font-bold leading-tight text-black">Account Management</h2>

                    {
                        props.auth?.user?.permission.includes('account-management-create') &&
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
                                    <th className="p-3 text-left">Company Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">IBAN</th>
                                    <th className="p-3">Country</th>
                                    <th className="p-3">City</th>
                                    <th className="p-3">Postcode</th>
                                    <th className="p-3">Billing address</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}
                                {
                                    props?.accounts?.data.map((account, i) => <tr
                                        key={i}
                                        className="text-center border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.name}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.email}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.iban}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.country}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.city}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.postcode}</td>
                                        <td className='p-3 whitespace-nowrap'>{account?.billing_address}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('account-management-list') &&
                                                <label
                                                    onClick={() => showAccountData(account?.id)}
                                                    htmlFor="account_show"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('account-management-edit') &&
                                                <label
                                                    onClick={() => editAccountData(account?.id)}
                                                    htmlFor="account_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }
                                            {
                                                props.auth?.user?.permission.includes('account-management-delete') &&

                                                <input
                                                    type='submit'
                                                    onClick={() => deleteAccount(account?.id)}
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
                            <input type="checkbox" id="currency_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={() => setCreateModal(!createModal)}
                                        htmlFor="currency_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Account</h2>

                                        <form
                                            onSubmit={handleCreateAccount}
                                            className="bg-gray-900 space-y-3 p-3 rounded-md shadow-sm"
                                        >
                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                                <div className="col-span-full">
                                                    <label className="text-sm">Company Name</label>

                                                    <Select
                                                        className='text-black'
                                                        options={props?.companies}
                                                        placeholder="select company"
                                                        value={selectedUser}
                                                        onChange={(data) => {
                                                            setData('company_id', data.value)
                                                            setSelectedUser(data)
                                                        }}
                                                        name="company_id" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Email</label>

                                                    <input
                                                        value={data.email}
                                                        onChange={handleOnChange}
                                                        name="email"
                                                        type="Text"
                                                        placeholder="Email"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">IBAN</label>

                                                    <input
                                                        value={data.iban}
                                                        onChange={handleOnChange}
                                                        name="iban"
                                                        type="text"
                                                        placeholder="e.g.: BY20 OLMP 3135 0000 0010 0000 0933"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Country</label>


                                                    <Select
                                                        className='text-black'
                                                        options={countries}
                                                        placeholder="Choose your country"
                                                        value={selectedCountry}
                                                        onChange={(data) => {
                                                            setData('country', data.value)
                                                            setSelectedCountry(data)
                                                        }}
                                                        name="country" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">City</label>

                                                    <input
                                                        value={data.city}
                                                        onChange={handleOnChange}
                                                        name="city"
                                                        type="Text"
                                                        placeholder="e.g.: Berlin"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Postcode</label>

                                                    <input
                                                        value={data.postcode}
                                                        onChange={handleOnChange}
                                                        name="postcode"
                                                        type="Text"
                                                        placeholder="e.g.: 52066"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Billing address</label>

                                                    <input
                                                        value={data.billing_address}
                                                        onChange={handleOnChange}
                                                        name="billing_address"
                                                        type="Text"
                                                        placeholder="e.g.: Warmweihestrasse 35"
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
                        <input type="checkbox" id="account_show" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="account_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Company: {accountShowData?.name} </h3>
                                    <p className="py-1 text-white">Email: {accountShowData?.email}</p>
                                    <p className="py-1 text-white">IBAN: {accountShowData?.iban}</p>
                                    <p className="py-1 text-white">Country: {accountShowData?.country}</p>
                                    <p className="py-1 text-white">City: {accountShowData?.city}</p>
                                    <p className="py-1 text-white">Postcode: {accountShowData?.postcode}</p>
                                    <p className="py-1 text-white">Billing Address: {accountShowData?.billing_address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    {
                        editModal &&
                        <div>
                            <input type="checkbox" id="account_edit" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box text-white">
                                    <label
                                        onClick={handleEditModatClose}
                                        htmlFor="account_edit"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                    >
                                        ✕
                                    </label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit Account</h2>

                                        <form
                                            onSubmit={handleEditAccount}
                                            className="bg-gray-900 space-y-3 p-3 rounded-md shadow-sm"
                                        >
                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                                <div className="col-span-full">
                                                    <label className="text-sm">Company Name</label>

                                                    <Select
                                                        className='text-black'
                                                        options={props?.companies}
                                                        placeholder="select company"
                                                        value={selectedUserEidt}
                                                        onChange={(data) => {
                                                            setData('company_id', data.value)
                                                            setSelectedUserEidt(data)
                                                        }}
                                                        name="company_id" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">Email</label>

                                                    <input
                                                        value={data.email}
                                                        onChange={handleOnChange}
                                                        name="email"
                                                        type="Text"
                                                        placeholder="Email"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">IBAN</label>

                                                    <input
                                                        value={data.iban}
                                                        onChange={handleOnChange}
                                                        name="iban"
                                                        type="text"
                                                        placeholder="e.g.: BY20 OLMP 3135 0000 0010 0000 0933"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Country</label>


                                                    <Select
                                                        className='text-black'
                                                        options={countries}
                                                        placeholder="Choose your country"
                                                        value={selectedCountryEidt}
                                                        onChange={(data) => {
                                                            setData('country', data.value)
                                                            setSelectedCountryEidt(data)
                                                        }}
                                                        name="country" />
                                                </div>

                                                <div className="col-span-full">
                                                    <label className="text-sm">City</label>

                                                    <input
                                                        value={data.city}
                                                        onChange={handleOnChange}
                                                        name="city"
                                                        type="Text"
                                                        placeholder="e.g.: Berlin"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Postcode</label>

                                                    <input
                                                        value={data.postcode}
                                                        onChange={handleOnChange}
                                                        name="postcode"
                                                        type="Text"
                                                        placeholder="e.g.: 52066"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>
                                                <div className="col-span-full">
                                                    <label className="text-sm">Billing address</label>

                                                    <input
                                                        value={data.billing_address}
                                                        onChange={handleOnChange}
                                                        name="billing_address"
                                                        type="Text"
                                                        placeholder="e.g.: Warmweihestrasse 35"
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
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
                    }

                </div>
            </section >
        </DashboardLayout>
    );
}
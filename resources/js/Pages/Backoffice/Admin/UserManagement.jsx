import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';

export default function Index(props) {
    // create state
    const [createModal, setCreateModal] = useState(false);
    const [selectedCreateRole, setSelectedCreateRole] = useState([]);
    const [selectedCreateCompany, setSelectedCreateCompany] = useState([]);

    // show state
    const [eachUserShowData, setEachUserShowData] = useState();

    // edit state
    const [editModal, setEditModal] = useState(false);
    const [selectedEditRole, setSelectedEditRole] = useState([]);

    const [eachUserEditData, setEachUserEditData] = useState();

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        name: '',
        email: '',
        password: '',
        company_id: '',
        company_name: '',
        google2fa_secret: false,
        google2fa_secret: '',
        roles: [],
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    // create
    function handleSelectCreate(data) {
        setSelectedCreateRole(data);
        const role = data.map(d => d.value)
        setData('roles', role)
    }
    function handleCompanySelectCreate(data) {
        setSelectedCreateCompany(data);
        setData('company_id', data.value)
    }


    const handleCreateUser = (e) => {
        e.preventDefault();

        setSelectedCreateRole('')
        setSelectedCreateCompany('');

        post(route('users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    // fetch show data
    const showUserInfo = id => {
        fetch(`http://localhost:8000/admin/users/${id}`)
            .then(res => res.json())
            .then(data => setEachUserShowData(data))
    }

    //edit
    const editUserInfo = id => {
        setEditModal(!editModal)

        // fetch edit data
        fetch(`http://localhost:8000/admin/users/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                setEachUserEditData(data);
                const currentRoles = data.userRole.map(d => Object.assign(d, { 'value': d.id, 'label': d.name }))
                setSelectedEditRole(currentRoles);

                const role = currentRoles.map(d => d.value)

                setData({ roles: role, email: data?.user?.email, name: data?.user?.name, password: '', company_id: data?.user?.company?.id, google2fa_secret: data?.user?.google2fa_secret ? true : null, company_name: data?.user?.company?.name });
            })
    }

    function handleSelectEdit(data) {
        setSelectedEditRole(data);
        const role = data.map(d => d?.value)
        setData('roles', role)
    }

    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setEachUserEditData({})
        reset()
    }

    // edit user
    const handleEditUser = (e) => {
        e.preventDefault();

        setSelectedEditRole('')
        put(route('users.update', eachUserEditData?.user?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }

    // delete user
    const deleteUser = (id) => {
        destroy(route('users.destroy', id));
    };

    return (
        <DashboardLayout auth={props?.auth}
        >
            <Head title="All User" />

            <div className="p-2 mx-auto sm:p-10 text-gray-100">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-black">All User Info</h2>

                {
                    props?.auth?.user?.permission.includes('user-create') &&

                    <label
                        onClick={() => setCreateModal(!createModal)}
                        htmlFor="modal-user-create"
                        className='block w-36 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'
                    >
                        Create User
                    </label>
                }

                {/* error show  */}
                <ul className='bg-slate-300 rounded-sm'>
                    {Object.values(props?.errors).map((message, i) => <li
                        key={i}
                        className="text-red-500 px-3 py-1"
                    >{message}</li>)}
                </ul>

                <div className="overflow-x-auto mt-5">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">No.</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">email</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Roles</th>
                                <th className="p-3">2fa</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props?.users.map((user, i) =>
                                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900" key={i}>
                                    <td className="p-3">
                                        <p>{i + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.company.name}</p>
                                    </td>
                                    <td className="p-3">
                                        {user.roles.map((role, j) => <p key={j}>{role}</p>)}
                                    </td>
                                    <td className="p-3">
                                        <p>{user.google2fa_secret ? 'On' : 'Off'}</p>
                                    </td>

                                    <td className="p-3">

                                        {
                                            props?.auth?.user?.permission.includes('user-list') &&

                                            <label onClick={() => showUserInfo(user.id)} className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="modal-user-show">Show</label>
                                        }

                                        {/* The button to open modal */}
                                        {
                                            props?.auth?.user?.permission.includes('user-edit') &&

                                            <label
                                                onClick={() => editUserInfo(user.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="modal-user-edit"
                                            >
                                                Edit
                                            </label>
                                        }

                                        {
                                            props?.auth?.user?.permission.includes('user-delete') &&
                                            <button
                                                onClick={() => deleteUser(user?.id)}
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
                {/* modal-user-create */}
                {
                    createModal &&
                    <div>
                        <input type="checkbox" id="modal-user-create" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label
                                    onClick={() => setCreateModal(!createModal)}
                                    htmlFor="modal-user-create"
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                >
                                    ✕
                                </label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">New User Info</h2>

                                    <form
                                        onSubmit={handleCreateUser}
                                        className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                    >

                                        <p className="font-medium">Personal Inormation</p>
                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="name" className="text-sm">Name</label>

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
                                                <label htmlFor="email" className="text-sm">Email</label>

                                                <input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={data.email}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="password" className="text-sm">Password</label>

                                                <input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password should be 8 charecters"
                                                    value={data.password}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="roles" className="text-sm mr-6">Role</label>


                                                <Select
                                                    className='text-black'
                                                    isMulti
                                                    options={props?.roles.data}
                                                    placeholder="Select roles"
                                                    value={selectedCreateRole}
                                                    onChange={handleSelectCreate}
                                                    name="roles[]" />
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="roles" className="text-sm mr-6">Company</label>


                                                <Select
                                                    className='text-black'
                                                    options={props?.companies}
                                                    placeholder="Select Company"
                                                    value={selectedCreateCompany}
                                                    onChange={handleCompanySelectCreate}
                                                    name="company_id" />
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

                {/* modal-user-show */}
                <div>
                    <input type="checkbox" id="modal-user-show" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="modal-user-show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            <div>
                                <h2 className="mb-2 text-xl font-bold leading-tight text-black">{eachUserShowData?.user?.name} Details Information</h2>

                                <section className="">
                                    <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">

                                        <fieldset className="p-3 rounded-md shadow-sm bg-gray-900">

                                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="firstname" className="text-sm">Name</label>

                                                    <input id="firstname" disabled type="text" placeholder={eachUserShowData?.user?.name} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="email" className="text-sm">Email</label>

                                                    <input id="email" disabled type="email" placeholder={eachUserShowData?.user?.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="address" className="text-sm">Company Name</label>

                                                    <h4 className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-500 bg-white p-2">
                                                        {eachUserShowData?.user?.company?.name}
                                                    </h4>
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="address" className="text-sm">Email Verified</label>

                                                    <h4 className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-500 bg-white p-2">
                                                        {
                                                            eachUserShowData?.user?.email_verified_at ? "Verified" : "Not Verified"
                                                        }
                                                    </h4>
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="role" className="text-sm mr-6">Role</label>

                                                    <h4 className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-500 bg-white p-2">
                                                        {
                                                            eachUserShowData?.userRole &&
                                                            Object.keys(eachUserShowData?.userRole).map((role, i) => <p key={i} className='border border-black p-0.5 rounded-md inline mr-1'>{role}</p>)
                                                        }
                                                    </h4>
                                                </div>

                                                <div className="col-span-full sm:col-span-3">
                                                    <label htmlFor="address" className="text-sm">2fa</label>
                                                    <h4 className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-500 bg-white p-2">
                                                        {
                                                            eachUserShowData?.user?.google2fa_secret ? 'On' : 'Off'
                                                        }
                                                    </h4>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>


                {/* modal-user-edit */}
                {
                    editModal &&
                    <div>
                        <input type="checkbox" id="modal-user-edit" className="modal-toggle" />

                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <label
                                    onClick={handleEditModatClose}
                                    htmlFor="modal-user-edit"
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                >
                                    ✕
                                </label>

                                <div>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit {eachUserEditData?.user?.name} Info</h2>

                                    <form
                                        onSubmit={handleEditUser}
                                        className="container flex flex-col mx-auto ng-untouched ng-pristine ng-valid p-2 rounded-md shadow-sm bg-gray-900"
                                    >
                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">


                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="name" className="text-sm">Name</label>

                                                <input
                                                    name="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="email" className="text-sm">Email</label>

                                                <input
                                                    name="email"
                                                    type="email"
                                                    readOnly
                                                    value={data.email}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="password" className="text-sm">Password</label>

                                                <input
                                                    name="password"
                                                    type="text"
                                                    value={data.password}
                                                    onChange={handleOnChange}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="password" className="text-sm">Company Name</label>
                                                <input
                                                    name="company_id"
                                                    type="text"
                                                    readOnly
                                                    value={data.company_name}
                                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="roles" className="text-sm mr-6">Role</label>
                                                <Select
                                                    className='text-black'
                                                    isMulti
                                                    options={props?.roles.data}
                                                    placeholder="Select roles"
                                                    value={selectedEditRole}
                                                    onChange={handleSelectEdit}
                                                    name="roles[]" />
                                            </div>
                                        </div>

                                        <label className="text-sm mr-6 mt-3">2fa</label>
                                        {
                                            eachUserEditData?.user &&

                                            <label htmlFor="Toggle2fa" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                                <input id={eachUserEditData?.user?.google2fa_secret ? "Toggle2fa" : null} type="checkbox"
                                                    checked={data.google2fa_secret ? true : false}
                                                    className="hidden peer"
                                                    onChange={() => setData('google2fa_secret', !data.google2fa_secret)}
                                                />
                                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                                            </label>
                                        }

                                        <div className='flex justify-end items-center'>
                                            <button type='submit' className="btn btn-sm mt-2">
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

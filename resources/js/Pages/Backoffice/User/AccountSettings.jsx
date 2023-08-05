import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '../Profile/Partials/UpdateProfileInformationForm';
import { useState } from 'react';
import Select from 'react-select';

export default function AccountSettings(props) {

    const [createModal, setCreateModal] = useState(false);
    const [selectedCreateRole, setSelectedCreateRole] = useState([]);

    // edit state
    const [editModal, setEditModal] = useState(false);
    const [selectedEditRole, setSelectedEditRole] = useState([]);

    const [eachUserEditData, setEachUserEditData] = useState();

    //detele state
    const [deleteModal, setDeleteModal] = useState(false);

    const {
        data,
        setData,
        post,
        get,
        delete: destroy,
        reset
    } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [],
    });

    function handleSelectCreate(data) {
        setSelectedCreateRole(data);
        const role = data.map(d => d.value)
        setData('roles', role)
    }

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        setSelectedCreateRole('')
        post(route('account.settings'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
            },
            onError: () => setCreateModal(!createModal)
        });
    };

    const handle2fatSetting = (e) => {
        e.preventDefault();
        get(route('2faregister'));
    }


    //edit
    const editUserInfo = id => {
        setEditModal(!editModal)

        // fetch edit data
        fetch(`http://localhost:8000/admin/users/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                setEachUserEditData(data);
                const currentRoles = data.userRole.map(d => Object.assign(d, { 'value': d.id, 'label': d.name.replace('Company_', '') }))
                setSelectedEditRole(currentRoles);

                const role = currentRoles.map(d => d.value)

                setData({ roles: role, name: data?.user?.name, password: undefined, id: data?.user?.id });
            })
    }

    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setEachUserEditData({})
        reset()
    }

    function handleSelectEdit(data) {
        setSelectedEditRole(data);
        const role = data.map(d => d?.value)
        setData('roles', role)
    }

    // edit user
    const handleEditUser = (e) => {
        e.preventDefault();

        setSelectedEditRole('')
        post(route('account.settings'), {
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
        destroy(route('', id));
    };

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Account Settings" />
            <div className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className='text-4xl font-bold'>Account Settings</h2>

                    {/* My Team  */}
                    <div>
                        <h2 className='text-2xl font-bold mt-9'>My Team</h2>

                        {/* table  */}

                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg">
                            <table className="min-w-full my-3 text-xs">
                                {/* head */}
                                <thead className='font-bold border-b-2'>
                                    <tr className='text-center'>
                                        <th className='p-3 text-center whitespace-nowrap'>No</th>
                                        <th className='p-3 text-center whitespace-nowrap'>Name</th>
                                        <th className='p-3 text-center whitespace-nowrap'>Email</th>
                                        <th className='p-3 text-center whitespace-nowrap'>Verify Email</th>
                                        <th className='p-3 text-center whitespace-nowrap'>Role</th>
                                        <th className='p-3 text-center whitespace-nowrap'>Action</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {/* row 1 */}
                                    {props.usersinfo.map((user, i) => <tr
                                        key={i}
                                        className='text-center'>
                                        <td className='p-3 text-center whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 text-center whitespace-nowrap'>{user.name}</td>
                                        <td className='p-3 text-center whitespace-nowrap'>{user.email}</td>
                                        <td className='p-3 text-center whitespace-nowrap'>{user.email_verified_at ? 'Yes' : 'No'}</td>
                                        <td className='p-3 text-center whitespace-nowrap'>{user.roles.map((role, i) => <span key={role.id}>{i ? ',' + ' ' + role.name.replace('Company_', '') : role.name.replace('Company_', '')} </span>)}</td>

                                        <td className='p-3 text-center whitespace-nowrap'>

                                            <label
                                                onClick={() => editUserInfo(user.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500"
                                                htmlFor="modal-user-edit"
                                            >
                                                Edit
                                            </label>

                                            <label
                                                onClick={() => {
                                                    setDeleteModal(!deleteModal)
                                                }}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500"
                                                htmlFor="user_delete"
                                            >
                                                Delete
                                            </label>

                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                            <label
                                onClick={() => setCreateModal(!createModal)}
                                className='bg-[#fc7095] text-white px-5 py-2.5 font-bold text-xs hover:shadow-sm hover:shadow-slate-900'
                                htmlFor="my_team_create">
                                Add new user
                            </label>
                        </div>
                    </div>

                    {/* create modal */}

                    {
                        createModal &&
                        <div>
                            <input type="checkbox" id="my_team_create" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <label
                                        htmlFor="my_team_create"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                        onClick={() => setCreateModal(!createModal)}
                                    >
                                        ✕
                                    </label>

                                    <div>
                                        <h2 className="mb-2 text-xl font-bold leading-tight text-black">New User Info</h2>

                                        <form
                                            onSubmit={submit}
                                            className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900 text-white"
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

                                                    {console.log(props)}

                                                    <Select
                                                        className='text-black'
                                                        isMulti
                                                        options={props?.roles}
                                                        placeholder="Select roles"
                                                        value={selectedCreateRole}
                                                        onChange={handleSelectCreate}
                                                        name="roles[]" />
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
                                            className="container flex flex-col mx-auto ng-untouched ng-pristine ng-valid p-2 rounded-md shadow-sm bg-gray-900 text-white"
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
                                                        defaultValue={eachUserEditData?.user?.email}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="password" className="text-sm">Password</label>

                                                    <input
                                                        name="password"
                                                        type="text"
                                                        value={data?.password ? data?.password : ''}
                                                        onChange={handleOnChange}
                                                        className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                                    />
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="roles" className="text-sm mr-6">Role</label>
                                                    <Select
                                                        className='text-black'
                                                        isMulti
                                                        options={props?.roles}
                                                        placeholder="Select roles"
                                                        value={selectedEditRole}
                                                        onChange={handleSelectEdit}
                                                        name="roles[]" />
                                                </div>
                                            </div>

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

                    {
                        deleteModal &&
                        <div>
                            <input type="checkbox" id="user_delete" className="modal-toggle" />

                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <div
                                        className="container flex flex-col mx-auto ng-untouched ng-pristine ng-valid p-2 rounded-md shadow-sm bg-gray-900 text-white"
                                    >
                                        <h2 className='text-2xl font-semibold p-4'>
                                            Are you sure you want to delete User?
                                        </h2>

                                        <div className='flex justify-end items-center'>
                                            <div>
                                                <button
                                                    onClick={() => setDeleteModal(!deleteModal)}
                                                    className="btn btn-sm mt-2 me-3"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <button
                                                type='submit'
                                                className="btn btn-sm mt-2 btn-error"
                                            >
                                                Delete User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Profile  */}
                    <div>
                        <h2 className='text-2xl font-bold mt-9'>User Profile</h2>

                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-5 shadow-lg">

                            <UpdateProfileInformationForm
                                mustVerifyEmail={props.mustVerifyEmail}
                                status={props.status}
                                className="max-w-sm"
                            />
                        </div>
                    </div>

                    {/* Password  */}
                    <div>
                        <h2 className='text-2xl font-bold mt-9'>Password</h2>

                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg">

                            <UpdatePasswordForm className="max-w-sm" />

                        </div>
                    </div>

                    {/* Two step authentification  */}
                    <div>
                        <h2 className='text-2xl font-bold mt-9'>Two step authentification</h2>

                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg flex justify-between">

                            <h2 className='text-sm font-medium'>Require a security key or code in addition to your password.</h2>

                            <label htmlFor="Toggle2fa" className="inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                <input id="Toggle2fa" type="checkbox"
                                    defaultValue={props?.auth?.user?.google2fa_secret}
                                    defaultChecked={props?.auth?.user?.google2fa_secret ? true : false}
                                    className="hidden peer"
                                    onClick={handle2fatSetting}
                                    name='google2fa_secret'
                                />
                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                            </label>
                        </div>
                    </div>

                    {/* Apps  */}
                    <div>
                        <h2 className='text-2xl font-bold mt-9'>Delete User Account</h2>

                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg flex justify-between">

                            <DeleteUserForm className="max-w-5xl lg:flex lg:justify-between" />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

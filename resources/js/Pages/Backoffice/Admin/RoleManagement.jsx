import Checkbox from '@/Components/Checkbox';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index(props) {
    const [createModal, setCreateModal] = useState(false);
    const [roleShowData, setRoleShowData] = useState('')
    const [roleEditData, setRoleEditData] = useState('')
    const [editModal, setEditModal] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        roleName: '',
        permission: []

    });

    // set create role permission
    const handlePermission = (permissionName) => {
        setData('permission', [...data.permission, permissionName]);
    }

    // create role
    const handleCreateRole = (e) => {
        e.preventDefault();

        post(route('roles.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(!createModal)
                reset()
            },
            onError: () => setCreateModal(!createModal)
        });
    };



    // fetch show data
    const showRole = id => {
        fetch(`http://localhost:8000/admin/roles/${id}`)
            .then(res => res.json())
            .then(data => setRoleShowData(data))
    }

    // edit    
    const editRole = id => {
        setEditModal(!editModal)
        // fetch show data
        fetch(`http://localhost:8000/admin/roles/${id}/edit`)
            .then(res => res.json())
            .then(data => {

                setRoleEditData(data)

                setData({
                    roleName: data.role.name,
                    permission: data.rolePermissions
                })
            })
    }

    const handleEditModatClose = () => {
        setEditModal(!editModal)
        setEachUserEditData({})
        reset()
    }

    // edit user
    const handleEditUser = (e) => {
        e.preventDefault();

        put(route('roles.update', roleEditData?.role?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(!editModal)
                reset()
            },
            onError: () => setEditModal(!editModal)
        });
    }

    // delete user
    const deleteRole = (id) => {
        destroy(route('roles.destroy', id));
    };

    console.log(data)

    return (
        <DashboardLayout auth={props.auth}>
            <Head title="Role Management" />

            <div className="min-h-screen py-12">
                <div className="max-w-7xl px-3 sm:px-6 lg:px-8">
                    <h2 className='text-3xl font-bold mb-7'>Role Management</h2>
                    {
                        props.auth?.user?.permission.includes('role-create') &&
                        <label
                            onClick={() => setCreateModal(!createModal)}
                            htmlFor="role_create"
                            className='block w-36 bg-blue-600 text-white rounded-md hover:shadow-sm hover:shadow-white hover:bg-blue-900 p-2 px-4 mt-7 mb-2'
                        >
                            Create Role
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
                                <tr className="text-left">
                                    <th className="p-3">No</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    props.roles.data.map((role, i) => <tr
                                        key={i}
                                        className="border-b border-opacity-20 border-gray-700 bg-gray-900"
                                    >
                                        <td className='p-3 whitespace-nowrap'>{i + 1}</td>
                                        <td className='p-3 whitespace-nowrap'>{role.name}</td>
                                        <td className='p-3 whitespace-nowrap'>
                                            {
                                                props.auth?.user?.permission.includes('role-list') &&
                                                <label
                                                    onClick={() => showRole(role.id)}
                                                    htmlFor="role_details"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >Show</label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('role-edit') &&
                                                <label
                                                    onClick={() => editRole(role.id)}
                                                    htmlFor="role_edit"
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900"
                                                >
                                                    Edit
                                                </label>
                                            }

                                            {
                                                props.auth?.user?.permission.includes('role-delete') &&
                                                <input
                                                    onClick={() => deleteRole(role?.id)}
                                                    type='submit'
                                                    className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 hover:bg-violet-600 text-gray-900" value='Delete'
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
                            <input type="checkbox" id="role_create" className="modal-toggle" />
                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    {/* close btn */}
                                    <label
                                        onClick={() => setCreateModal(!createModal)}
                                        htmlFor="role_create"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                    >
                                        ✕
                                    </label>
                                    <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Role Create</h2>
                                    {/* content */}
                                    <form
                                        onSubmit={handleCreateRole}
                                        className='p-3 rounded-md shadow-sm bg-gray-900'
                                    >

                                        <input
                                            value={data.roleName}
                                            onChange={(event) => setData('roleName', event.target.value)}
                                            className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            type="text"
                                            name='roleName'
                                            placeholder='Type role name'
                                        />
                                        {
                                            props.permissions.map(permission => <div
                                                key={permission.id}
                                                className="mt-1">
                                                <Checkbox
                                                    onClick={() => handlePermission(permission.name)}
                                                    name="permission[]"
                                                    value={permission.name}
                                                />
                                                <span className="ml-2 text-sm text-white">{permission.name}</span>
                                            </div>)
                                        }
                                        <div className='flex justify-start items-center'>
                                            <button type='submit' className="btn btn-sm mt-2 px-7 py-2">
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* show modal */}
                    <div>
                        <input type="checkbox" id="role_details" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                {/* close btn */}
                                <label htmlFor="role_details" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                {/* content */}
                                <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                    <p className="py-2 text-white">Name: {roleShowData?.role?.name}</p>
                                    <h3 className="pt-2 text-lg text-blue-500 font-bold">Role permission</h3>
                                    {
                                        roleShowData?.rolePermissions?.map((permission) => <div
                                            key={permission?.id}
                                            className="mt-1">
                                            <span className="ml-2 text-sm text-white">{permission.name}</span>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* edit modal */}
                    {
                        editModal &&
                        <div>
                            <input type="checkbox" id="role_edit" className="modal-toggle" />
                            <div className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    {/* close btn */}
                                    <label
                                        onClick={handleEditModatClose}
                                        htmlFor="role_edit"
                                        className="btn btn-sm btn-circle absolute right-2 top-2"
                                    >
                                        ✕
                                    </label>
                                    {/* content */}

                                    <form
                                        onSubmit={handleEditUser}
                                        className='p-3 rounded-md shadow-sm mt-5 bg-gray-900'
                                    >

                                        <input
                                            className='input input-bordered w-full max-w-xs'
                                            type="text"
                                            name='roleName'
                                            value={data.roleName}
                                            onChange={(event) => setData('roleName', event.target.value)}
                                        />
                                        {
                                            props.permissions.map(permission => <div
                                                key={permission.id}
                                                className="mt-1">
                                                <Checkbox
                                                    onChange={() => setData('permission', [...data.permission, permission.name])}
                                                    name="permission[]"
                                                    value={permission.name}
                                                    checked={data.permission && data.permission.includes(permission.name)} />
                                                <span className="ml-2 text-sm text-white">{permission.name}</span>
                                            </div>)
                                        }

                                        <div className='flex justify-start items-center'>
                                            <button type='submit' className="btn btn-sm mt-2 px-7 py-2">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </DashboardLayout>
    );
}
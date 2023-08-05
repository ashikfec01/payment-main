import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';

export default function Index(props) {
    const [selectedCreateStatus, setSelectedCreateStatus] = useState([]);
    const [selectedEditStatus, setSelectedEditStatus] = useState([]);
    const [showDonationData, setShowDonationData] = useState({});
    const [editDonationData, setEditDonationData] = useState({});

    const status = [
        { value: 0, label: 'Not Success' },
        { value: 1, label: 'Ok' }
    ];

    function handleSelectCreateStatus(data) {
        setSelectedCreateStatus(data);
    }

    function handleSelectEditStatus(data) {
        setSelectedEditStatus(data);
    }

    // fetch show data
    const showDonationInfo = id => {
        fetch(`http://localhost:8000/admin/donation/${id}`)
            .then(res => res.json())
            .then(data => setShowDonationData(data))
    }

    // fetch edit data
    const editdonationInfo = id => {
        fetch(`http://localhost:8000/admin/donation/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                setEditDonationData(data);
                const selectedStatus = Object.assign({}, { 'value': data.donation.status, 'label': data.donation.status ? 'Ok' : 'Not Success' })
                setSelectedEditStatus(selectedStatus);
            })
    }

    return (
        <DashboardLayout auth={props.auth}
        >
            <Head title="All Donation" />

            <div className="container p-2 mx-auto sm:p-10 text-gray-100">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-black">All Donation</h2>

                {
                    props.auth?.user?.permission.includes('donation-create') &&
                    <label htmlFor="donation_create" className='block w-44 px-6 py-2 mt-7 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700'>Create Donation</label>
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
                            <tr className="text-center whitespace-nowrap">
                                <th className="p-3">No</th>
                                <th className="p-3">Payment ID</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Social Link</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Created at</th>
                                <th className="p-3">Last update at</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props?.donations?.data.map((donation, i) =>
                                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-900 whitespace-nowrap text-center" key={i}>
                                    <td className="p-3">
                                        <p>{i + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.payment_id}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.status ? 'Ok' : 'Not success'}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.phone}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.social_link}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.address}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.created_at}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{donation?.updated_at}</p>
                                    </td>
                                    <td className="p-3">

                                        {
                                            props.auth?.user?.permission.includes('donation-list') &&
                                            <label
                                                onClick={() => showDonationInfo(donation.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="donation_show">Show</label>
                                        }

                                        {
                                            props.auth?.user?.permission.includes('donation-edit') &&
                                            <label
                                                onClick={() => editdonationInfo(donation.id)}
                                                className="m-1 px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500" htmlFor="donation_edit">Edit</label>
                                        }

                                        {
                                            props.auth?.user?.permission.includes('donation-delete') &&
                                            <form
                                                action={route('donation.destroy', donation.id)}
                                                className='inline'
                                                method='POST'
                                            >
                                                <input type="hidden" name="_token" value={props.csrf} />
                                                <input type="hidden" name="_method" value="delete" />
                                                <button className="m-1 px-3 py-0.5 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500">
                                                    Delete
                                                </button>
                                            </form>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* create modal*/}
                <div>
                    <input type="checkbox" id="donation_create" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="donation_create" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            <div>
                                <h2 className="mb-2 text-xl font-bold leading-tight text-black">New Donation</h2>

                                <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                    action={route('donation.store')} method='post'>

                                    <input type="hidden" name="_token" value={props.csrf} />
                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">


                                        <div className="col-span-full">
                                            <label className="text-sm">Payment ID</label>

                                            <input
                                                name="payment_id" type="Text" placeholder="Payment ID" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Status</label>

                                            <Select
                                                className='text-black'
                                                options={status}
                                                placeholder="donation Status"
                                                value={selectedCreateStatus}
                                                onChange={handleSelectCreateStatus}
                                                name="status"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Email</label>

                                            <input
                                                name="email" type="email" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="text-sm">Phone</label>

                                            <input
                                                name="phone" type="phone" placeholder="" className="w-full rounded-md p-2  focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="text-sm">Name</label>

                                            <input
                                                name="name" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Social Link</label>

                                            <input
                                                name="social_link" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Address</label>

                                            <input
                                                name="address" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
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

                {/* show modal */}
                <div>
                    <input type="checkbox" id="donation_show" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            {/* close btn */}
                            <label htmlFor="donation_show" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            {/* content */}
                            <div className='p-3 rounded-md shadow-sm bg-gray-900 mt-5'>
                                <h3 className="pt-2 text-lg text-blue-500 font-bold">Name: {showDonationData?.donation?.name} </h3>
                                <p className="py-1 text-white">Payment ID: {showDonationData?.donation?.payment_id}</p>
                                <p className="py-1 text-white">Status: {showDonationData?.donation?.status ? 'Ok' : 'Not success'}</p>
                                <p className="py-1 text-white">Email: {showDonationData?.donation?.email}</p>
                                <p className="py-1 text-white">Phone: {showDonationData?.donation?.phone}</p>
                                <p className="py-1 text-white">Social Link: {showDonationData?.donation?.social_link}</p>
                                <p className="py-1 text-white">Address: {showDonationData?.donation?.address}</p>
                                <p className="py-1 text-white">Created at: {showDonationData?.donation?.created_at}</p>
                                <p className="py-1 text-white">Last update at: {showDonationData?.donation?.updated_at}</p>

                            </div>
                        </div>
                    </div>
                </div>

                {/* edit modal  */}
                <div>
                    <input type="checkbox" id="donation_edit" className="modal-toggle" />

                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="donation_edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                            <div>
                                <h2 className="mb-2 text-xl font-bold leading-tight text-black">Edit order</h2>

                                <form className="mx-auto space-y-3 p-3 rounded-md shadow-sm bg-gray-900"
                                    action={editDonationData?.donation && route('donation.update', editDonationData?.donation?.id)}
                                    method='post' encType="multipart/form-data">

                                    <input type="hidden" name="_token" value={props.csrf} />
                                    <input type="hidden" name="_method" value="put" />

                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">


                                        <div className="col-span-full">
                                            <label className="text-sm">Payment ID</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.payment_id}
                                                name="payment_id" type="Text" placeholder="Payment ID" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Status</label>

                                            <Select
                                                className='text-black'
                                                options={status}
                                                value={selectedEditStatus}
                                                onChange={handleSelectEditStatus}
                                                name="status" />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Email</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.email}
                                                name="email" type="email" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="text-sm">Phone</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.phone}
                                                name="phone" type="phone" placeholder="" className="w-full rounded-md p-2  focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="text-sm">Name</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.name}
                                                name="name" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Social Link</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.social_link}
                                                name="social_link" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <label className="text-sm">Address</label>

                                            <input
                                                defaultValue={editDonationData?.donation?.address}
                                                name="address" type="Text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
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
            </div>
        </DashboardLayout>
    );
}

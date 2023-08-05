import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';

export default function ContactUs(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Contact Us" />
                <section>
                    <div className='min-h-screen max-w-7xl mx-auto px-4 lg:px-8 my-20'>
                        <h1 className='text-5xl text-center mb-6 font-bold'>Contact US</h1>

                        <div className='xl:flex flex-row-reverse justify-center items-center mx-4'>
                            <form
                                className='xl:w-1/2  max-w-[600px] mx-auto bg-white shadow-md shadow-pink-200 p-4 rounded-md xl:ml-4'
                            >
                                {/* name  */}
                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Your Name</span></label>
                                    <input
                                        type="text"
                                        name='name'
                                        required
                                        placeholder="Enter Your Name"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                {/* email  */}
                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Your Email</span></label>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="input input-bordered w-full "
                                        name='email'
                                        required
                                    />
                                </div>
                                {/* Subject line  */}
                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Subject</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Subject"
                                        className="input input-bordered w-full "
                                        name='subject'
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Message</span></label>
                                    <textarea
                                        className="textarea textarea-bordered"
                                        rows="8"
                                        placeholder="Enter Your Message"
                                        name='message'
                                        required
                                    ></textarea>

                                </div>

                                <input className="bg-blue-700 hover:bg-slate-900 text-white text-xl px-6 py-4 mt-5 hover:shadow-md hover:shadow-yellow-500 p-4 rounded-md" value='Send Mail' type="submit" />

                            </form>
                            <div className='xl:w-1/2 mx-auto max-w-[600px] my-10  text-lg'>
                                {/* phone */}
                                <div className='flex items-center px-7 py-9 bg-white shadow-md shadow-pink-200 rounded-md'>
                                    <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                                        <FaPhoneAlt />
                                    </div>
                                    <div className='ml-5 font-semibold'>
                                        <p>Phone / WhatsApp</p>
                                        <p>+1 1582554039</p>
                                    </div>
                                </div>
                                {/* email */}
                                <div className='flex items-center px-7 py-9 my-7 bg-white shadow-md shadow-pink-200 rounded-md'>
                                    <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                                        <HiOutlineMail />
                                    </div>
                                    <div className='ml-5 font-semibold'>
                                        <p>For support and other queries</p>
                                        <p>info@nowpayments.io</p>
                                    </div>
                                </div>
                                <div className='flex items-center px-7 py-9 my-7 bg-white shadow-md shadow-pink-200 rounded-md'>
                                    <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                                        <HiOutlineMail />
                                    </div>
                                    <div className='ml-5 font-semibold'>
                                        <p>Email</p>
                                        <p>info@nowpayments.io</p>
                                    </div>
                                </div>
                                {/* address */}
                                <div className='flex items-center px-7 py-9 bg-white shadow-md shadow-pink-200 rounded-md'>
                                    <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                                        <HiOutlineLocationMarker />
                                    </div>
                                    <div className='ml-5 font-semibold'>
                                        <p>Address</p>
                                        <p>NY, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    );
}

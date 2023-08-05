import { Head, Link } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonPink from '@/Components/ButtonPink';
import ButtonBlueOutline from '@/Components/ButtonBlueOutline';
import { useState } from 'react';
import Select from 'react-select';

export default function Donations(props) {
    const [selectedDonationApiKey, setSelectedDonationApiKey] = useState([{ value: '55f5ffs_alkd_avik', label: '55f5ffs_alkd_avik' }]);

    const donationApiKey = [
        { value: '55f5ffs_alkd_avik', label: '55f5ffs_alkd_avik' },
        { value: '55f5ffs_alkd_avik2', label: '55f5ffs_alkd_avik2' },
    ];

    function handleSelectDonationApiKey(data) {
        setSelectedDonationApiKey(data);
    }
    return (
        <>
            <Head title="Donations" />
            <DashboardLayout auth={props.auth}>
                <div className='m-4 lg:m-10'>
                    <h2 className='text-4xl font-bold'>Donations</h2>

                    {/* tabble  */}
                    <div className="overflow-x-auto rounded-lg text-center mt-4 lg:mt-11 mb-12 lg:mb-44">
                        <table className="w-full text-xs font-bold">
                            <thead>
                                <tr>
                                    <th className='px-4'>Payment ID</th>
                                    <th className='px-4'>Status</th>
                                    <th className='px-4'>Email</th>
                                    <th className='px-4'>Phone</th>
                                    <th className='px-4'>Name</th>
                                    <th className='px-4'>Social Link</th>
                                    <th className='px-4'>Address</th>
                                    <th className='px-4'>Created at<br />Last update at</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className='px-4'>5465</td>
                                    <td className='px-4'>ok</td>
                                    <td className='px-4'>demo@demo.com</td>
                                    <td className='px-4'>25645646548</td>
                                    <td className='px-4'>demo name</td>
                                    <td className='px-4'>45 45 8478</td>
                                    <td className='px-4'>demo address, demo, demo</td>
                                    <td className='px-4'>45 45 8478</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* donation link  */}
                    <h2 className='text-2xl font-bold mb-5'>Donation Link
                        <Link href={route('main.donation')}><i className="fa-solid fa-circle-info text-sm text-blue-400 ml-3"></i></Link>
                    </h2>
                    <form action="">

                        <div className="border-2 border-sky-400 p-4 lg:p-6">

                            <div>
                                <label className="text-sm mr-6"> Create your own donation link here</label>

                                <Select
                                    className='text-black'
                                    options={donationApiKey}
                                    placeholder="Select roles"
                                    value={selectedDonationApiKey}
                                    onChange={handleSelectDonationApiKey}
                                    name="api_key" />
                            </div>

                            <div className='lg:flex my-4 text-sm'>
                                <h4 className='font-medium'>nowpayments.io/donation/</h4>

                                <input type="text" name='donation_id' placeholder="example" className="input input-bordered input-xs w-52 max-w-xs ml-1" />

                                <button>
                                    <i className="fa-solid fa-clone ml-2 text-blue-400"></i>
                                </button>
                            </div>

                            <div className='w-72 lg:w-80 font-bold mt-9'>
                                <div className='flex justify-between px-4'>
                                    <h4 className='w-20'>Field</h4>
                                    <h4>Show</h4>
                                    <h4>Require</h4>
                                </div>

                                {/* email toggole  */}
                                <div className="flex justify-between border rounded-lg border-sky-400 p-2.5 px-4 my-2.5">
                                    <h4 className='w-20'>Email</h4>

                                    <label htmlFor="ToggleEmail1" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleEmail1" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>

                                    <label htmlFor="ToggleEmail2" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleEmail2" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </div>

                                {/* phone toggle  */}
                                <div className="flex justify-between border rounded-lg border-sky-400 p-2.5 px-4 my-2.5">
                                    <h4 className='w-20'>Phone</h4>

                                    <label htmlFor="TogglePhone1" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="TogglePhone1" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>

                                    <label htmlFor="TogglePhone2" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="TogglePhone2" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </div>

                                {/* name toggle  */}
                                <div className="flex justify-between border rounded-lg border-sky-400 p-2.5 px-4 my-2.5">
                                    <h4 className='w-20'>Name</h4>

                                    <label htmlFor="ToggleName1" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleName1" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>

                                    <label htmlFor="ToggleName2" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleName2" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </div>

                                {/* social link toggle  */}
                                <div className="flex justify-between border rounded-lg border-sky-400 p-2.5 px-4 my-2.5">
                                    <h4 className='w-20'>Social Link</h4>

                                    <label htmlFor="ToggleSocialLink1" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleSocialLink1" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>

                                    <label htmlFor="ToggleSocialLink2" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleSocialLink2" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </div>

                                {/* address toggle  */}
                                <div className="flex justify-between border rounded-lg border-sky-400 p-2.5 px-4 my-2.5">
                                    <h4 className='w-20'>Address</h4>

                                    <label htmlFor="ToggleAddress1" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleAddress1" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>

                                    <label htmlFor="ToggleAddress2" className="inline-flex items-center space-x-4 cursor-pointer text-gray-100">
                                        <span className="relative">
                                            <input id="ToggleAddress2" type="checkbox" className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <ButtonPink className='text-xs font-bold px-5 py-2 mt-4'>Save</ButtonPink>
                        </div>
                    </form>

                    {/* donation api  */}
                    <div className="border-2 border-sky-400 p-4 lg:p-6 my-6 lg:mt-12">
                        <h4 className='text-lg font-bold my-4'>Choose the donation button style</h4>

                        {/* toggle link  */}
                        <div>
                            <label htmlFor="ToggleBlackWhite" className="w-full items-center rounded-md cursor-pointer">
                                <input id="ToggleBlackWhite" type="checkbox" className="hidden peer" />

                                {/* toggle black */}
                                <span className="rounded-l-md block peer-checked:hidden">
                                    <div className='flex'>
                                        <h1 className='text-lg font-bold rounded-md bg-black text-white px-7 py-1 mr-2'>Black</h1>

                                        <h1 className='text-lg font-bold rounded-md text-blue-500 border-2 border-blue-500 px-7 py-1'>White</h1>
                                    </div>

                                    <button>
                                        <Link href={route('main.donation')}><img src="https://nowpayments.io/images/embeds/donation-button-black.svg" alt="" srcSet="" className='w-56 my-2.5' /></Link>
                                    </button>

                                    <h4 className='text-lg font-bold my-2'>Choose your api key</h4>


                                    <select className="select select-bordered select-xs w-full bg-gray-200 pl-2 p-0">
                                        <option>55f5ffs-45sfgfsdg-sfgsdf54fg65</option>
                                        <option>sdfdf545fd-545fsd54sfd-fg5fdg5f5</option>
                                    </select>

                                    <h1 className='bg-black text-white my-4 py-3 px-2 overflow-auto'>
                                        <pre className="styles_wrapperCode__JHniU"><code className="styles_code__2Ay9i"><span>&lt;<span className="styles_tagName__2YuPf">a</span> <span>href</span>=<span className="styles_tagString__3hTmT">"https://nowpayments.io/donation?api_key=EV76GMK-CXAMZVS-MM7RGQC-ZDSDFTT"</span> <span>target</span>=<span className="styles_tagString__3hTmT">"_blank"</span>&gt;</span><br />&nbsp;<span>&lt;<span className="styles_tagName__2YuPf">img</span> <span>src</span>=<span className="styles_tagString__3hTmT">"https://nowpayments.io/images/embeds/donation-button-black.svg"</span> <span>alt</span>=<span className="styles_tagString__3hTmT">"Crypto donation button by NOWPayments"</span>&gt;</span><br /><span>&lt;/<span className="styles_tagName__2YuPf">a</span>&gt;</span></code></pre>
                                    </h1>

                                    <ButtonBlueOutline className='rounded-md font-bold hover:text-blue-500 hover:border-blue-500 py-1 px-6'>Copy to clipboard</ButtonBlueOutline>

                                </span>

                                {/* toggle white  */}
                                <span className="rounded-r-md hidden peer-checked:block">
                                    <div className='flex'>
                                        <h1 className='text-lg font-bold rounded-md bg-white text-black border-2 border-black px-7 py-1 mr-2'>Black</h1>

                                        <h1 className='text-lg font-bold rounded-md text-white bg-blue-500 px-7 py-1'>White</h1>
                                    </div>

                                    <button>
                                        <Link href={route('main.donation')}><img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="" srcSet="" className='w-56 my-2.5' /></Link>
                                    </button>

                                    <h4 className='text-lg font-bold my-2'>Choose your api key</h4>

                                    <select className="select select-bordered select-xs w-full bg-gray-200 pl-2 p-0">
                                        <option>55f5ffs-45sfgfsdg-sfgsdf54fg65</option>
                                        <option>sdfdf545fd-545fsd54sfd-fg5fdg5f5</option>
                                    </select>

                                    <h1 className='bg-black text-white my-4 py-3 px-2 overflow-auto'>

                                        <pre className="styles_wrapperCode__JHniU"><code className="styles_code__2Ay9i"><span>&lt;<span className="styles_tagName__2YuPf">a</span> <span>href</span>=<span className="styles_tagString__3hTmT">"https://nowpayments.io/donation?api_key=EV76GMK-CXAMZVS-MM7RGQC-ZDSDFTT"</span> <span>target</span>=<span className="styles_tagString__3hTmT">"_blank"</span>&gt;</span><br />&nbsp;<span>&lt;<span className="styles_tagName__2YuPf">img</span> <span>src</span>=<span className="styles_tagString__3hTmT">"https://nowpayments.io/images/embeds/donation-button-white.svg"</span> <span>alt</span>=<span className="styles_tagString__3hTmT">"Cryptocurrency &amp; Bitcoin donation button by NOWPayments"</span>&gt;</span><br /><span>&lt;/<span className="styles_tagName__2YuPf">a</span>&gt;</span></code></pre>
                                    </h1>

                                    <ButtonBlueOutline className='rounded-md font-bold hover:text-blue-500 hover:border-blue-500 py-1 px-6'>Copy to clipboard</ButtonBlueOutline>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="border-2 border-sky-400 p-4 lg:p-6 my-6 lg:mt-12">

                        <h4 className='text-lg font-bold my-2'>Place a donation widget to your web page</h4>

                        <select className="select select-bordered select-xs w-full bg-gray-200 pl-2 p-0">
                            <option>55f5ffs-45sfgfsdg-sfgsdf54fg65</option>
                            <option>sdfdf545fd-545fsd54sfd-fg5fdg5f5</option>
                        </select>

                        <h1 className='bg-black text-white my-4 py-3 px-2 overflow-auto'>
                            <pre className="styles_wrapperCode__JHniU"><code className="styles_code__2Ay9i"><span>&lt;<span className="styles_tagName__2YuPf">iframe</span>&nbsp;<span>href</span>=<span className="styles_tagString__3hTmT">"https://nowpayments.io/embeds/donation-widget?api_key=EV76GMK-CXAMZVS-MM7RGQC-ZDSDFTT"</span>&nbsp;<span>frameborder</span>=<span className="styles_tagString__3hTmT">"0"</span>&nbsp;<span>scrolling</span>=<span className="styles_tagString__3hTmT">"no"</span>&nbsp;<span>style</span>=<span className="styles_tagString__3hTmT">"overflow-y: hidden;"</span>&nbsp;<span>width</span>=<span className="styles_tagString__3hTmT">"354"</span>&nbsp;<span>height</span>=<span className="styles_tagString__3hTmT">"680"</span>&gt;</span><span>&lt;/<span className="styles_tagName__2YuPf">iframe</span>&gt;</span></code></pre>
                        </h1>

                        <ButtonBlueOutline className='rounded-md font-bold hover:text-blue-500 hover:border-blue-500 py-1 px-6'>Copy to clipboard</ButtonBlueOutline>
                    </div>
                </div>

            </DashboardLayout>
        </>
    );
}

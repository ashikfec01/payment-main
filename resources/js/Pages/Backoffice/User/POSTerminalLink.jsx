import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonBlue from '@/Components/ButtonBlue';
import { useState } from 'react';
import Select from 'react-select';

export default function POSTerminalLink(props) {
    const [selectedPosApiKey, setSelectedPosApiKey] = useState([{ value: '55f5ffs_alkd_avik', label: '55f5ffs_alkd_avik' }]);
    const [selectedPosTheme, setSelectedPosTheme] = useState([{ value: 'light', label: 'light' }]);

    const posApiKey = [
        { value: '55f5ffs_alkd_avik', label: '55f5ffs_alkd_avik' },
        { value: '55f5ffs_alkd_avik2', label: '55f5ffs_alkd_avik2' },
    ];
    const posTheme = [
        { value: 'light', label: 'light' },
        { value: 'dark', label: 'dark' }
    ];

    function handleSelectPosApiKey(data) {
        setSelectedPosApiKey(data);
    }

    function handleSelectPosTheme(data) {
        setSelectedPosTheme(data);
    }
    return (
        <>
            <Head title="POS Terminal Link" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='text-4xl font-bold'>POS Terminal Link</h2>

                    <div className='bg-white rounded-lg p-6 mt-9'>
                        <h2 className='text-2xl font-medium'>How to accept crypto payments offline</h2>

                        <div className='flex flex-col md:flex-row my-4'>
                            <iframe width="150" height="260"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                            </iframe>

                            <ol className="list-decimal text-lg p-6 md:p-0 md:ml-14 mt-5 md:mt-0">
                                <li>Open the link on your phone</li>
                                <li>Enter payment amount</li>
                                <li>Customer scans QR with crypto wallet</li>
                                <li>Customer sends funds</li>
                                <li>When received - see success sign 🎉</li>
                            </ol>

                        </div>

                        <h4 className='text-xl md:text-2xl font-medium mb-4 mt-7'>Create your Point Of Sale terminal</h4>

                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                                <div>
                                    <label className="text-sm mr-6"> Api Key</label>

                                    <Select
                                        className='text-black'
                                        options={posApiKey}
                                        placeholder="Select roles"
                                        value={selectedPosApiKey}
                                        onChange={handleSelectPosApiKey}
                                        name="api_key" />
                                </div>

                                <div>
                                    <label className="text-sm mr-6"> Theme</label>

                                    <Select
                                        className='text-black'
                                        options={posTheme}
                                        placeholder="Select roles"
                                        value={selectedPosTheme}
                                        onChange={handleSelectPosTheme}
                                        name="theme" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row my-4 text-lg'>
                                <h4 className='font-medium ml-2 md:ml-0'>nowpayments.io/pos-terminal/</h4>

                                <div className='flex justify-between border border-gray-300 rounded-md ml-1'>
                                    <input type="text" name='pos_id' placeholder="" className="input input-sm w-52 max-w-xs ml-1" />

                                    <button>
                                        <i className="fa-regular fa-clone mx-2 text-blue-400"></i>

                                    </button>
                                </div>

                                <h5 className='text-pink-400 text-sm font-medium ml-2'>Pos terminal link must not be empty</h5>

                            </div>

                            <ButtonBlue className='bg-blue-300 text-sm font-bold px-10 md:px-36 py-3'>Copy link POS terminal</ButtonBlue>

                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}

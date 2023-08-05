import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonPink from '@/Components/ButtonPink';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import Select from 'react-select';

export default function CompanySettings(props) {

    const [createCurrency, setCreateCurrency] = useState({ value: props.company.currency.id, label: props.company.currency.ticker });
    const {
        data,
        setData,
        post,
    } = useForm({
        id: props.company.id,
        name: props.company.name || '',
        currency_id: props.company.currency.id || '',

        secret_key: props?.company?.secret_key || '',
        callback_url: props?.company?.callback_url || '',
        timeout: props?.company?.timeout || '',
        notifications: props?.company?.notifications || '',

        network_fee_optimisation: props?.company?.network_fee_optimisation ? true : false,
        payment_link: props?.company?.payment_link ? true : false,
        donations: props?.company?.donations ? true : false,
        subscriptions: props?.company?.subscriptions ? true : false,
        payment_name: '',
        value: '',
    });

    const handleCreateCurrency = data => {
        setCreateCurrency(data);
        setData('currency_id', data.value)
    }
    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleCompanyProfile = (e) => {
        e.preventDefault();

        post(route('company.settings.post'));
    }

    const handleInstantPayment = (e) => {
        e.preventDefault();

        post(route('company.settings.post'));
    }

    // fetch api generator
    const showApiGenerator = () => {
        fetch(`http://localhost:8000/portal/company/api/generator`)
            .then(res => res.json())
            .then(data => setData('secret_key', data.api))
    }

    const handlePaymentSetting = async (e) => {
        data.payment_name = e.target.name;
        data.value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        await sleep(1000);
        e.preventDefault();
        post(route('company.settings.post', props?.company?.id));
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <>
            <Head title="Company Settings" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='text-4xl font-bold'>Company Settings</h2>

                    <Tab.Group>
                        <Tab.List className='my-5'>
                            <Tab className='text-base md:text-lg px-2 sm:px-3 md:px-5 font-bold text-blue-400 hover:text-blue-700 '>Profile</Tab>

                            <Tab className='text-base md:text-lg px-2 sm:px-3 md:px-5 font-bold text-blue-400 hover:text-blue-700'>Instant Payment</Tab>
                            <Tab className='text-base md:text-lg px-2 sm:px-3 md:px-5 font-bold text-blue-400 hover:text-blue-700'>Payment settings</Tab>

                        </Tab.List>

                        <Tab.Panels className='mt-5'>
                            <Tab.Panel>
                                {/* Profile  */}
                                <div>
                                    <h2 className='text-2xl font-bold mt-9'>Company Profile</h2>


                                    <form
                                        onSubmit={handleCompanyProfile}
                                    >

                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 border-2 border-blue-300 mt-5 p-5 shadow-lg">
                                            <div className="col-span-full sm:col-span-3">
                                                <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>Company Name
                                                    <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="Company name. Required for internal use in the system.">
                                                        <i className="fa-solid fa-circle-info text-blue-400 font-bold"></i>
                                                    </div>
                                                </h2>
                                                {/* company name */}
                                                <input
                                                    type="text"
                                                    name='name'
                                                    value={data.name}
                                                    onChange={handleOnChange}
                                                    className="block input input-sm w-full max-w-sm text-xl bg-gray-200 p-2 my-5"
                                                />
                                            </div>


                                            <div className="col-span-full">

                                                {/* base currency  */}
                                                <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>Base Currency
                                                    <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="The product price is displayed in the currency of your choice">
                                                        <i className="fa-solid fa-circle-info text-blue-400 font-bold"></i>
                                                    </div>
                                                </h2>

                                                <Select
                                                    className='text-black'
                                                    options={props.currencies}
                                                    placeholder="Currency"
                                                    value={createCurrency}
                                                    onChange={handleCreateCurrency}
                                                    name="currency_id"
                                                />
                                            </div>

                                            <ButtonPink type='submit' className='block my-1 px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Save changes</ButtonPink>

                                        </div>
                                    </form>
                                </div>
                            </Tab.Panel>

                            <Tab.Panel>
                                {/* Instant Payment Notifications  */}
                                <form
                                    onSubmit={handleInstantPayment}
                                >
                                    <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-2xl font-bold mt-9'>Instant Payment Notifications
                                        <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="The coin your widget list starts with">
                                            <i className="fa-solid fa-circle-info text-lg text-blue-400 font-extrabold"></i>
                                        </div>
                                    </h2>

                                    <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg">
                                        <h2 className='flex items-center text-sm font-bold'>
                                            <a target="_blank" href="https://nowpayments.io/help/what-is/what-is-ipn" rel="noreferrer" className='text-blue-400 mr-2'>IPN</a> secret key
                                            <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="Required to receive updates on the payment status via API">
                                                <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                            </div>
                                        </h2>
                                        <input type="text"
                                            name='secret_key'
                                            value={data.secret_key}
                                            onChange={handleOnChange}
                                            className="input input-sm w-full max-w-lg bg-gray-200 my-4"
                                        />

                                        <div>
                                            <label
                                                onClick={showApiGenerator}
                                                className='px-5 py-2.5 bg-[#fc7095] text-white hover:shadow-sm hover:shadow-slate-900 font-bold text-xs rounded-none'>
                                                Generate
                                            </label>
                                        </div>

                                        <h2 className='text-sm font-bold mt-9'>
                                            IPN Callback url
                                        </h2>

                                        <input
                                            type="text"
                                            name='callback_url'
                                            value={data?.callback_url}
                                            onChange={handleOnChange}
                                            className="input input-sm w-full max-w-lg bg-gray-200 my-4"
                                        />

                                        <h2 className='text-sm font-bold my-6'>
                                            Recurrent notifications
                                        </h2>

                                        <h2 className='flex items-center text-sm font-bold'>
                                            Timeout
                                            <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="Time between notifications, minutes.">
                                                <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                            </div>
                                        </h2>

                                        <input
                                            type="number"
                                            name='timeout'
                                            value={data?.timeout}
                                            onChange={handleOnChange}
                                            className='bg-gray-200 border-none w-56 p-1 mt-5'
                                        />

                                        <h2 className='flex items-center text-sm font-bold mt-5'>
                                            Number of recurrent notifications
                                            <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="0 to 10">
                                                <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                            </div>
                                        </h2>
                                        <input
                                            type="number"
                                            name='notifications'
                                            value={data?.notifications}
                                            onChange={handleOnChange}
                                            className='bg-gray-200 border-none w-56 p-1 my-5'
                                        />

                                        <ButtonPink
                                            type='submit'
                                            className='block px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'
                                        >
                                            Save
                                        </ButtonPink>
                                    </div>
                                </form>
                            </Tab.Panel>

                            <Tab.Panel>
                                {/* Payment settings  */}
                                <div>
                                    <h2 className='text-2xl font-bold mt-9'>Payment settings
                                    </h2>
                                    <div className="overflow-x-auto border-2 border-blue-300 mt-5 p-6 shadow-lg">
                                        <div className="flex items-center justify-between max-w-lg">
                                            <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>
                                                Network fee optimisation
                                                <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="Network fees vary from coin to coin. Among your wallets, a payment picks the most suitable one and undergoes the conversion that will result in the lowest network fee in total.">
                                                    <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                                </div>
                                            </h2>
                                            <label
                                                htmlFor="ToggleNetwork" className="my-3 inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                                <input
                                                    id="ToggleNetwork"
                                                    type="checkbox"
                                                    onClick={handlePaymentSetting}
                                                    name='network_fee_optimisation'
                                                    value={data.network_fee_optimisation}
                                                    defaultChecked={data?.network_fee_optimisation}
                                                    className="hidden peer"
                                                />
                                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                                            </label>
                                        </div>

                                        {/* Toggle Payment Link  */}
                                        <div className="flex items-center justify-between max-w-lg">
                                            <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>
                                                Payment Link
                                                <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="">
                                                    <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                                </div>
                                            </h2>



                                            <label htmlFor="TogglePaymentLink" className="my-3 inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                                <input id="TogglePaymentLink" type="checkbox"
                                                    value={data?.payment_link}
                                                    defaultChecked={data?.payment_link}
                                                    className="hidden peer"
                                                    onClick={handlePaymentSetting}
                                                    name='payment_link'
                                                />
                                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                                            </label>




                                        </div>

                                        {/* Toggle Donations  */}
                                        <div className="flex items-center justify-between max-w-lg">
                                            <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>
                                                Donations
                                                <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="">
                                                    <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                                </div>
                                            </h2>

                                            <label htmlFor="ToggleDonations" className="my-3 inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                                <input id="ToggleDonations" type="checkbox"
                                                    value={data?.donations}
                                                    defaultChecked={props?.company?.donations ? true : false}
                                                    className="hidden peer"
                                                    onClick={handlePaymentSetting}
                                                    name='donations'
                                                />
                                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                                            </label>
                                        </div>

                                        {/* Toggle Subscriptions  */}
                                        <div className="flex items-center justify-between max-w-lg">
                                            <h2 className='flex items-center whitespace-nowrap md:whitespace-normal text-sm font-bold'>
                                                Subscriptions
                                                <div className="lg:tooltip lg:tooltip-right ml-3" data-tip="">
                                                    <i className="fa-solid fa-circle-info text-sm text-blue-400 font-extrabold"></i>
                                                </div>
                                            </h2>

                                            <label htmlFor="ToggleSubscriptions" className="my-3 inline-flex items-center p-1 cursor-pointer bg-gray-300 text-gray-800">
                                                <input id="ToggleSubscriptions"
                                                    type="checkbox"
                                                    value={data?.subscriptions}
                                                    defaultChecked={props?.company?.subscriptions ? true : false}
                                                    className="hidden peer"
                                                    onClick={handlePaymentSetting}
                                                    name='subscriptions'
                                                />
                                                <span className="px-1 py-0.5 bg-gray-600 peer-checked:bg-gray-300">OFF</span>
                                                <span className="px-1 py-0.5 bg-gray-300 peer-checked:bg-violet-400">ON</span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </DashboardLayout>
        </>
    );
}

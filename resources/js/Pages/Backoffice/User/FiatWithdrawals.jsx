import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonBlue from '@/Components/ButtonBlue';
import { useState } from 'react';
import ButtonBlueOutline from '@/Components/ButtonBlueOutline';
import { useEffect } from 'react';
import Select from 'react-select';

export default function FiatWithdrawals(props) {
    const [registered, setRegistered] = useState(false) // not parmanent
    const [countries, setCountries] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(props?.account?.country ? { value: props?.account?.country, label: props?.account?.country } : '')
    console.log(props)
    const {
        data,
        setData,
        post,
    } = useForm({
        id: props?.account?.id,
        company_id: props?.auth?.user?.company_id,
        email: props?.account?.email || '',
        iban: props?.account?.iban || '',
        country: props?.account?.country || '',
        city: props?.account?.city || '',
        postcode: props?.account?.postcode || '',
        billing_address: props?.account?.billing_address || '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    // create 
    const handleCreateAccount = (e) => {
        e.preventDefault();

        post(route('fiat.withdrawals'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setSelectedUser('');
                setSelectedCountry('');
            },
            // onError: () => {}
        });
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
        <>
            <Head title="Fiat Withdrawals" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='flex items-center text-3xl font-bold mb-7'>Fiat Withdrawals
                        <div className="lg:tooltip lg:tooltip-right ml-4" data-tip="Convert your crypto profit into EUR and receive straight to your bank account">
                            <i className="fa-solid fa-circle-info text-lg text-gray-400 font-extrabold"></i>
                        </div>
                    </h2>

                    {
                        !registered ?
                            <div className='bg-white rounded-lg p-2'>
                                <div className='p-4'>
                                    <h3 className='text-2xl uppercase mb-7'>To withdraw funds to your bank account:</h3>

                                    <div className='font-medium text-lg'>
                                        <li className='mx-5 my-3'>You are required to pass KYB on our partner's website.<br />
                                            This is a standard procedure.</li>
                                        <li className='mx-5 my-3'>Press the button below and provide the documents<br />
                                            to check your eligibility for fiat withdrawals.</li>
                                        <li className='mx-5 my-3'>Crypto to fiat conversions become available on this page<br />
                                            after successful verification.</li>
                                    </div>
                                </div>

                                <ButtonBlue
                                    onClick={() => setRegistered(!registered)}
                                    className='block bg-blue-300 hover:bg-blue-400 text-lg font-bold px-12 py-2 mt-28 ml-6'
                                >
                                    Request for verification email
                                </ButtonBlue>


                            </div>
                            :
                            <div className='bg-white rounded-lg p-2'>
                                <form
                                    onSubmit={handleCreateAccount}
                                    className="max-w-[400px] space-y-3 p-3 rounded-md shadow-sm"
                                >
                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

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
                                        <div className="col-span-full">
                                            <ButtonBlue
                                                type="submit"
                                                className='bg-blue-300 rounded-none hover:bg-blue-400 text-lg font-bold px-12 py-2 w-full mt-11'
                                            >
                                                Submit
                                            </ButtonBlue>

                                            <ButtonBlueOutline
                                                onClick={() => setRegistered(!registered)}
                                                className='text-lg font-bold px-12 py-2 w-full mt-3'
                                            >
                                                Back
                                            </ButtonBlueOutline>
                                        </div>
                                    </div>

                                </form>
                            </div>
                    }
                </div>
            </DashboardLayout>
        </>
    );
}

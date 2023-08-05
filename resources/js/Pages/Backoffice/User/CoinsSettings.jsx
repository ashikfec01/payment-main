import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from 'react';

export default function CoinsSettings(props) {
    const [coinInfo, setCoinInfo] = useState(props.coins);
    const [activeCoin, setActiveCoin] = useState(props.activeCoin);
    const [coinCategoriesStatus, setCoinCategoriesStatus] = useState(props.activeCategory);

    const coinCategories = ['Populer Coins', 'Stable Coins', 'Other Coins'];
    const [searchText, setSearchText] = useState("");

    const updateCategory = async (category, x) => {
        const response = await fetch(route('coins.settings'), {
            method: "POST", headers: { 'X-CSRF-TOKEN': props.csrf }, body: JSON.stringify({ 'category': category, 'type': !coinCategoriesStatus[x] })
        });
        const jsonData = await response.json();
        if (jsonData.activeCategory) { setCoinCategoriesStatus(jsonData.activeCategory) }
        if (jsonData.activeCoin) { setActiveCoin(jsonData.activeCoin) }
    }

    const updateCoin = async (id) => {
        const response = await fetch(route('coins.settings'), {
            method: "POST", headers: { 'X-CSRF-TOKEN': props.csrf }, body: JSON.stringify({ 'id': id })
        });
        const jsonData = await response.json();
        if (jsonData.activeCategory) { setCoinCategoriesStatus(jsonData.activeCategory) }
        if (jsonData.activeCoin) { setActiveCoin(jsonData.activeCoin) }
    }

    const updateCoinInfo = () => {
        let infos = props.coins;
        if (searchText != "") {
            infos = props.coins.filter(data => data.ticker.includes(searchText.toUpperCase()) ? data : null);
        }
        setCoinInfo(infos);
    }

    const updateCoinInfoUpdate = (d) => {
        setSearchText(d);
        let infos = props.coins;
        if (d != "") {
            infos = props.coins.filter(data => data.ticker.includes(d.toUpperCase()) ? data : null);
        }
        setCoinInfo(infos);
    }

    return (
        <>
            <Head title="Coins Settings" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='text-4xl font-bold'>Coins Settings</h2>

                    <h2 className='text-sm mt-9'>Here, you can choose the cryptocurrencies you want to accept.</h2>

                    <ul className="list-disc px-10 py-5 text-sm">
                        <li>To choose a coin - simply click on its logo. </li>
                        <li>If a coin is not chosen, it will not be available for payments through plugins or the donation widget.<br />
                            It will also not be available via invoices without the ‘pay_currency’ parameter specified</li>
                    </ul>
                    <h2 className='text-sm'>You can change these settings at any time.</h2>

                    {/* search button  */}
                    <div className="form-control bg-gray-200 text-slate-900 w-min my-10">
                        <div className="input-group px-1 text-sm">
                            <button className="font-bold" onClick={updateCoinInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>

                            <input type="text" onChange={(e) => updateCoinInfoUpdate(e.target.value)} placeholder="Type your coin name here" className="border-0 bg-gray-200 text-sm pl-1 pr-14" />
                        </div>
                    </div>
                    {
                        coinCategories.map((category, x) => <div key={x}>
                            <div>
                                <h2 className='text-2xl font-bold mt-9'>{category}
                                    <label htmlFor={`ToggleCoins${x}`} className="inline-flex items-center space-x-4 cursor-pointer text-gray-100 ml-5">
                                        <span className="relative">
                                            <input id={`ToggleCoins${x}`} type="checkbox" onChange={(e) => updateCategory(category, x)} checked={coinCategoriesStatus[x]} className="hidden peer" />
                                            <div className="w-14 h-7 rounded-full shadow-inner bg-gray-200 peer-checked:bg-pink-300"></div>
                                            <div className="absolute inset-y-0 left-0 w-7 h-7 m-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-400 peer-checked:bg-pink-500"></div>
                                        </span>
                                    </label>
                                </h2>

                                <div className='flex flex-wrap gap-x-4 gap-y-2.5 my-4'>
                                    {
                                        coinInfo.map((coin, i) => coin.category.includes(category) && <div
                                            key={i} onClick={() => updateCoin(coin.id)}
                                        >{activeCoin.includes(coin.id) ? <button
                                            className='flex px-4 py-1 border border-blue-300'>
                                            <h2 className='text-lg font-medium mr-6'>{coin.ticker}</h2>
                                            <img className='w-7 rounded-full' src={coin.logourl}></img>
                                        </button> : <button
                                            className='flex px-4 py-1 border border-gray-300'>
                                            <h2 className='text-lg font-medium mr-6 text-gray-400'>{coin.ticker}</h2>
                                            <img className='w-7 rounded-full' src={coin.logourl}></img>
                                        </button>}
                                        </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </DashboardLayout>
        </>
    );
}

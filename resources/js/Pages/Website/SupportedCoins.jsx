import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function SupportedCoins(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Supported Coins" />
                <section className="min-h-screen max-w-7xl mx-auto px-4 lg:px-8 my-20">
                    <h1 className='text-5xl mb-6 font-bold'>Supported Coins</h1>
                    <p>
                        The list of supported cryptocurrencies below is not final. We always work on bringing new tokens to the network. Most importantly, we listen to our user suggestions when they mention a new cryptocurrency we should support. The crypto world is growing, and we are looking to provide a service for everyone to use. Paying with any crypto is possible with NOWPayments, and you can easily embed it to your stores and websites simply by registering an  <Link
                            href={route('register')}
                            className='text-blue-500 hover:text-blue-700'
                        >
                            account with NOWPayments!
                        </Link>
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 my-12">
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">Bitcoin (BTC)</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">Bitcoin (BTC)</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">ethereum</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">Bitcoin (BTC)</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">Bitcoin (BTC)</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">ethereum</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">Bitcoin (BTC)</p>
                        </div>
                        <div className="flex flex-col justify-center items-center border-2 border-blue-500 p-4">
                            <img src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg" alt=""
                                className="w-16 h-16"
                            />
                            <p className="mt-3">ethereum</p>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    );
}

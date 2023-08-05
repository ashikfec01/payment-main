
export default function PaymentGet() {
    return (
        <div className="hidden lg:flex lg:flex-col my-12 max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-center text-4xl font-semibold leading-loose">With NOWPayments You Get</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center content-center py-12">
                <div className="mr-5">
                    <img src="https://nowpayments.io/images/features/1.svg" alt="" />
                    <h3 className="text-xl font-bold mt-5">160+ cryptocurrencies</h3>
                    <p className="mt-2">Accept BTC, ETH and any other cryptocurrency of your choice</p>
                </div>
                <div className="mr-5">
                    <img src="https://nowpayments.io/images/features/2.svg
                    " alt="" />
                    <h3 className="text-xl font-bold mt-5">Best fees</h3>
                    <p className="mt-2">Pay less – our fees are the lowest on the market, starting from 0,4%</p>
                </div>
                <div className="mr-5">
                    <img src="https://nowpayments.io/images/features/3.svg" alt="" />
                    <h3 className="text-xl font-bold mt-5">Instant payouts</h3>
                    <p className="mt-2">Receive your funds directly to your wallet – right away</p>
                </div>
                <div>
                    <img src="https://nowpayments.io/images/features/4.svg" alt="" />
                    <h3 className="text-xl font-bold mt-5">Premium account manager</h3>
                    <p className="mt-2">Your personal manager and 24/7 support will answer all your questions</p>
                </div>
            </div>
        </div>
    );
}

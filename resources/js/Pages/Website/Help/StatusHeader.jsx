export default function StatusHeader(props) {

    return (
        <div className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
                <h1 className="text-4xl text-center font-bold my-3">Status page</h1>

                {/* Check minimum payment */}
                <h2 className="text-2xl py-5 text-slate-300">Check minimum payment amount for each currency pair</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  mt-5">
                    <div className="flex flex-col text-slate-300">
                        <label>From</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs bg-black rounded-sm" />
                    </div>
                    <div className="flex flex-col text-slate-300">
                        <label>To</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs bg-black rounded-sm" />
                    </div>
                    <div className="flex flex-col text-slate-300">
                        <label>Minimum Payment Amount</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs bg-black rounded-sm" />
                    </div>
                    <div className="flex flex-col text-slate-300">
                        <label>USD equivalent</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs bg-black rounded-sm" />
                    </div>
                </div>
                <p className="text-xs mt-2 text-center text-slate-300">The minimum payment amount is formed of the amount of network fees required for the transaction</p>


                {/* Check payment status */}
                <h2 className="text-2xl py-5 mt-10 text-slate-300">Check payment status</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-5">
                    <div className="flex flex-col text-slate-300">
                        <label>Payment ID OR Paying address</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-md bg-black rounded-sm" />
                    </div>
                    <div className="flex flex-col text-slate-300">
                        <label>Payment Status</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-md bg-black rounded-sm" />
                    </div>
                </div>
                <p className="text-xs mt-2 text-slate-300">Please enter the address you sent the funds to</p>


                {/* Check withdrawal */}
                <h2 className="text-2xl py-5 mt-14 text-slate-300">Check withdrawal/payout status</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-5">
                    <div className="flex flex-col text-slate-300">
                        <label>Withdrawal/Payout ID</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-md bg-black rounded-sm" />
                    </div>
                    <div className="flex flex-col text-slate-300">
                        <label>Withdrawal/Payout Status</label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-md bg-black rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}

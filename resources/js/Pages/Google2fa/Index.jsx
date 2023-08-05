import { Head } from "@inertiajs/react";

export default function Index(props) {
    return (
        <section className="min-h-screen py-12  flex justify-center items-center text-center bg-slate-950">
            <Head title="Confirm Code" />
            <div className="max-w-7xl px-3 sm:px-6 lg:px-8 bg-white py-4 lg:py-10 rounded-lg">
                {/* error show  */}
                <ul className='bg-slate-300 rounded-sm'>
                    {Object.values(props.errors).map((message, i) => <li
                        key={i}
                        className="text-red-500 px-3 py-1"
                    >{message}</li>)}
                </ul>


                <form method="POST" action={route('2fa')} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={props.csrf} />

                    <div>
                        <p className="mb-5">Please enter the <strong>OTP</strong> generated on your Authenticator App. <br /> Ensure
                            you submit the current one because it refreshes every 30 seconds.</p>
                        <label>One Time Password</label>
                        <div className="mt-2">
                            <input type="number"
                                className=""
                                name="one_time_password" required autoFocus />
                        </div>
                    </div>
                    <div>
                        <div >
                            <button type="submit" className="btn btn-sm btn-primary mt-4">
                                Login
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </section>
    );
}
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Register(props) {
    const [enable, setEnable] = useState(props?.auth?.user?.google2fa_secret)
    return (
        <DashboardLayout auth={props.auth}>
            <section className="min-h-screen flex justify-center items-center text-center bg-[#f3f4f6] py-12">

                <Head title="Register two step verification" />
                <div className="max-w-7xl px-3 sm:px-6 bg-white lg:px-8 py-4 lg:py-10 rounded-lg">
                    {
                        !enable ?
                            <div>
                                <h4 className="text-2xl mb-4">Set up Google Authenticator</h4>
                                <p className="mb-4">Set up your two factor authentication by scanning the barcode below. Alternatively, you can
                                    use
                                    the code <strong>{props.secret}</strong></p>
                                <div
                                    className="flex justify-center"
                                    dangerouslySetInnerHTML={{ __html: props.QR_Image }}></div>
                                <p className="text-red-500 my-5">You must set up your Google Authenticator app before continuing. <br /> You will be unable to login
                                    otherwise
                                </p>
                                {/* error message */}
                                <p className="text-red-500 text-lg">{props?.message}</p>
                                <form action={route('google2facontrol')} method="post">

                                    <input type="hidden" name="_token" value={props.csrf} />
                                    <input name="key" value={props.secret} type="hidden" />
                                    <input
                                        className='input input-bordered w-full max-w-xs block mx-auto mt-4'
                                        placeholder="Type Code"
                                        type="number"
                                        autoFocus
                                        name="otp"
                                    />
                                    <button className="btn btn-sm btn-primary mt-5">Enable 2fa</button>
                                </form>
                            </div>
                            :
                            <div>
                                <h4 className="text-2xl mb-4">Deactivate Google Authenticator</h4>
                                <p className="mb-4">You must deactivate your Google Authenticator app before continuing. You need provide
                                    validation
                                </p>
                                {/* error message */}
                                <p className="text-red-500 text-lg">{props?.message}</p>
                                <form action={route('google2facontrol')} method="post">

                                    <input type="hidden" name="_token" value={props.csrf} />
                                    <input
                                        className='input input-bordered w-full max-w-xs block mx-auto mt-4'
                                        type="number"
                                        autoFocus
                                        name="otp"
                                    />
                                    <button className="btn btn-sm btn-primary mt-5">Disable 2fa</button>
                                </form>
                            </div>
                    }
                </div>
            </section>
        </DashboardLayout>
    );
}
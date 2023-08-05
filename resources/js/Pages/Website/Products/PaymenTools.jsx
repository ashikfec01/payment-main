import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function PaymenTools(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Accept Payments" />
                <section className="min-h-screen">

                </section>
            </MainLayout>
        </div>
    );
}

import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import MassHeader from "./MassHeader";

export default function MassPayments(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Mass Payments" />
                <section className="min-h-screen">
                    <MassHeader />
                </section>
            </MainLayout>
        </div>
    );
}

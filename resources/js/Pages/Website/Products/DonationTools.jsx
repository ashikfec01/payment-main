import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import DonationHeader from "./DonationHeader";

export default function DonationTools(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Accept Donation" />
                <section className="min-h-screen">
                    <DonationHeader />
                </section>
            </MainLayout>
        </div>
    );
}

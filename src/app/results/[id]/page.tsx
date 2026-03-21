import React from "react";
import { getUser } from "@/lib/dal/users";
import { notFound, redirect } from "next/navigation";
import { getBrandKitById } from "@/lib/dal/brandkits";
import ResultsPageClient from "@/app/results/[id]/ResultsPageClient";

interface ResultsPageProps {
    params: Promise<{ id: string }>;
}

const ResultsPage = async ({ params }: ResultsPageProps) => {

    const { id : brandKitId } = await params;

    const user = await getUser()

    if (!user.termsAccepted.version) {
        redirect('/legal/accept')
    }

    const brandKit = await getBrandKitById(brandKitId)

    if (!brandKit) notFound()

    return <ResultsPageClient brandKit={brandKit} />;
};

export default ResultsPage;

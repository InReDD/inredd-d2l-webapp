import Record from "@/app/_components/Dashboard/Record";
import { getVisitById } from "@/services/visit";

export default async function RecordPatientPage({ params }) {
    let visit = null;
    let error = null;
    
    try {
        visit = await getVisitById(params.visitId);

    } catch (e) {
        console.error("Failed to fetch visit on server:", e);
        error = e.message || "Could not load visit data.";
    }

    if (error) {
        return <div className="p-4 text-danger">{error}</div>;
    }
    
    if (!visit) {
        return <div className="p-4">Visita não encontrada.</div>;
    }

    return (
        <Record visit={visit}/>
    )
}
import { Button, ButtonLink, AccordionDashboardD2L } from "@/app/_components";
import routes from "@/helpers/routes";

/**
 * A utility function to format the date string (YYYY-MM-DD) to DD/MM/YYYY.
 * @param {string} dateString - The date string from the API.
 * @returns {string} - The formatted date.
 */
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const PatientsVisits = ({ patient }) => {
    const visits = patient?.visits || [];

    if (!patient) {
        return null;
    }

    return (
        <div className="">
            <div className="accordion mt-20">
                <AccordionDashboardD2L
                    initOpen={false}
                    summary={<span>Pacient’s visits ({patient.visits.length})</span>}
                >
                    <div className="visit-table-header d-flex justify-content-between px-3 pt-3">
                        <div className="col-1 fw-bold">ID</div>
                        <div className="col-3 fw-bold">Visit date</div>
                        <div className="col-5 fw-bold">Register</div>
                        <div className="col-3 fw-bold text-end">Actions</div>
                    </div>
                    <div className="divider-line mt-2 mb-3"></div>

                    {visits.length > 0 ? (
                        [...visits].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate)).map((visit) => (
                            <div key={visit.id} className="visit-row d-flex justify-content-between align-items-start px-3 py-2">
                                <div className="col-1">{visit.id}</div>
                                <div className="col-3">{formatDate(visit.visitDate)}</div>
                                <div className="col-5">{visit.mainComplaint}</div>
                                <div className="col-3 d-flex justify-content-end gap-2">
                                    <ButtonLink href={`/patient/${patient.id}/recordPage/${visit.id}`} className="btn-black" size="small">Record</ButtonLink>
                                    <Button type="button" className="btn-black" size="small">Viewer</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2">No visits have been recorded for this patient.</div>
                    )}
                </AccordionDashboardD2L>
            </div>
        </div>
    )
}

export default PatientsVisits;
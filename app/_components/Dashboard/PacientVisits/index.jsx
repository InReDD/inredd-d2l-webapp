import AccordionDashboardD2L from "@/app/_components/Dashboard/AccordionItem";
import { Button } from "@/app/_components";

const PatientsVisits = () => {
    return (
        <div className="">

            <div className="accordion mt-20">
                <AccordionDashboardD2L
                    initOpen={false}
                    summary={<span>Pacient’s visits (08)</span>}
                >
                    {/* Cabeçalho da tabela */}
                    <div className="visit-table-header d-flex justify-content-between px-3 pt-3">
                        <div className="col-1 fw-bold">ID</div>
                        <div className="col-3 fw-bold">Visit date</div>
                        <div className="col-5 fw-bold">Register</div>
                        <div className="col-3 fw-bold text-end">Actions</div>
                    </div>
                    <div className="divider-line mt-2 mb-3"></div>

                    {/* Linhas da tabela */}
                    {[12, 13, 14, 15].map((id) => (
                        <div key={id} className="visit-row d-flex justify-content-between align-items-start px-3 py-2">
                            <div className="col-1">{id}</div>
                            <div className="col-3">05/10/2024 10:00pm</div>
                            <div className="col-5">
                                Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
                                consectetur
                            </div>
                            <div className="col-3 d-flex justify-content-end gap-2">
                                {/* <Button type="submit" className="btn-black" size="small">Analysis</Button> */}
                                <Button type="submit" className="btn-black" size="small">Record</Button>
                                <Button type="submit" className="btn-black" size="small">Viewer</Button>
                            </div>
                        </div>
                    ))}
                </AccordionDashboardD2L>
            </div>

        </div>
    )
}

export default PatientsVisits;
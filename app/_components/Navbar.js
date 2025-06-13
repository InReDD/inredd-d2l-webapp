import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Input } from "./Form";
import Image from "next/image";
import AccordionDashboard from "@/app/_components/AccordionDasboardNavbar";
import Dropdown from "@/app/_components/Dropdown";

const Navbar = () => {
    return (
        <div className="sidenav active">
            <div className="col-12 mt-16 pr-10 pl-10 d-flex justify-content-between align-items-baseline">
                <Paragraph2 className="paragrafo">
                    Pacients
                </Paragraph2>
                <ul>
                    <li>
                        <a href="/">Add new+</a>
                    </li>
                </ul>
            </div>
            <div className="w-100 mt-4 pr-10 pl-10 d-flex justify-content-between">
            <Input
                placeholder="Search for a pacient..."
            />
            <Image
                className="Search.png mt-5 ml-5"
                src={"/icons/Search.png"}
                width={25}
                height={25}
                alt="Search Icon"
            />
            </div>
            <div className="col-12 mt-24 pl-10 pt-8 pd-8 d-flex justify-content-between align-items-baseline p-0">
                <div className="paragrafo3">
                    <Paragraph3>
                        1-10 of 200
                    </Paragraph3>
                </div>
                <div className="paragrafo3 mr-10 d-flex justify-content-between align-items-baseline">
                    <Paragraph3>
                        Page:
                    </Paragraph3>
                    <div className="ml-8">
                        <Dropdown></Dropdown>
                    </div>
                </div>
            </div>
            <div className="accordion mt-20">
                <AccordionDashboard className="accordion ml-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas quis interdum lorem. Maecenas at orci sapien. 
                    In in finibus nisl.
                </AccordionDashboard>
            </div>
            <div className="accordion mt-20">
                <AccordionDashboard className="accordion ml-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas quis interdum lorem. Maecenas at orci sapien. 
                    In in finibus nisl.
                </AccordionDashboard>
            </div>
            <div className="accordion mt-20">
                <AccordionDashboard className="accordion ml-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas quis interdum lorem. Maecenas at orci sapien. 
                    In in finibus nisl.
                </AccordionDashboard>
            </div>
            <div className="accordion mt-20">
                <AccordionDashboard className="accordion ml-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas quis interdum lorem. Maecenas at orci sapien. 
                    In in finibus nisl.
                </AccordionDashboard>
            </div>

        </div>
    )
}

export default Navbar

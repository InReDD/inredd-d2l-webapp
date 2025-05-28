import { Paragraph2 } from "@/app/_components/Typography";
import { Input } from "./Form";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="sidenav active">
            <div className="col-12 mt-16 d-flex justify-content-between">
                <Paragraph2 className="paragrafo">
                    Pacients
                </Paragraph2>
                <ul>
                    <li>
                        <a href="/">Add new+</a>
                    </li>
                </ul>
            </div>
            <div className="w-100 mt-4 d-flex justify-content-between">
            <Input
                placeholder="Search for a pacient..."
            />
            <Image
                className="Search.png"
                src={"/icons/Search.png"}
                width={25}
                height={25}
                alt="Search Icon"
                />
            </div>
        </div>
    )
}

export default Navbar

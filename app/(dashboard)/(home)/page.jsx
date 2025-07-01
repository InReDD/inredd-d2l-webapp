import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
    return generate({
        title: "Dashboard de Pacientes",
        description: "Dental Second Look",
    });
}

export default async function DashboardHome() {
    return (
        <div className="container-fluid">
            homepage
        </div>
    );
}

import Link from 'next/link';
import { getDashboardStats } from '@/services/dashboard'; 
import { generateMetadata as generate } from "@/helpers";
import { FaUserPlus, FaSearch, FaUserFriends, FaCalendarCheck } from 'react-icons/fa';
import './styles.scss'; 

export async function generateMetadata() {
    return generate({
        title: "Dashboard",
        description: "Dental Second Look - Overview",
    });
}

const StatCard = ({ icon, label, value }) => (
    <div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    </div>
);

const RecentPatientItem = ({ patient }) => (
    <Link href={`/patient/${patient.id}`} className="recent-patient-item">
        <div className="patient-avatar">{patient.fullName.charAt(0)}</div>
        <div className="patient-details">
            <span className="patient-name">{patient.fullName}</span>
            <span className="patient-dob">Born: {new Date(patient.dateOfBirth).toLocaleDateString('en-US')}</span>
        </div>
    </Link>
);


export default async function DashboardHome() {
    let stats = null;
    let error = null;

    try {
        stats = await getDashboardStats();
        console.log(stats)
    } catch (e) {
        console.error("Failed to load dashboard data:", e);
        error = "Could not load dashboard data. Please try again later.";
    }
    
    const welcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    if (error) {
        return <div className="dashboard-error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h2>{welcomeMessage()}!</h2>
                    <p>Here's a summary of your clinic's activity.</p>
                </div>
                <div className="quick-actions">
                    <Link href="/patient/new" className="button btn-primary">
                        <FaUserPlus /> New Patient
                    </Link>
                    <Link href="/search" className="button btn-secondary">
                        <FaSearch /> Advanced Search
                    </Link>
                </div>
            </header>

            <div className="stats-grid">
                <StatCard icon={<FaUserFriends />} label="Total Patients" value={stats?.totalPatients ?? '...'} />
                <StatCard icon={<FaCalendarCheck />} label="Visits in Next 7 Days" value={stats?.upcomingVisitsCount ?? '...'} />
            </div>

            <div className="recent-activity">
                <h3>Recently Added Patients</h3>
                <div className="recent-patients-list">
                    {stats?.recentPatients?.length > 0 ? (
                        stats.recentPatients.map(p => <RecentPatientItem key={p.id} patient={p} />)
                    ) : (
                        <p>No recent patients to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
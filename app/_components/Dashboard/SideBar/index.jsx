"use client"

import { usePathname } from 'next/navigation';

import FilterSidebar from "./FilterSidebar";
import ResumeSideBar from "./ResumeSideBar";


const AppSidebar = () => {
    const currentPath = usePathname();

    return currentPath === '/search' ? <FilterSidebar /> : <ResumeSideBar />;
};

export default AppSidebar;

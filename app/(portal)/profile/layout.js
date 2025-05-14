import routes from "@/helpers/routes";
import { SideBar } from "./_components";

export default function PortalLayout({ children }) {
  return (
    <div className="container pt-52 pb-52">
      <div className="row">
        <div className="col-12 col-lg-3">
          <SideBar
            items={[
              {
                title: "Profile",
                options: [
                  {
                    title: "Personal data",
                    route: routes.PERSONAL_DATA,
                  },
                ],
              },
              {
                title: "Members",
                options: [
                  {
                    title: "Collaborators",
                    route: routes.COLLABORATORS,
                  },
                  {
                    title: "Groups",
                    route: routes.GROUPS,
                  },
                ],
              },
              {
                title: "Digital Library",
                options: [
                  {
                    title: "Papers",
                    route: routes.PAPERS,
                  },
                ],
              },
              {
                title: "Solutions",
                options: [
                  {
                    title: "Users",
                    route: routes.USERS,
                  },
                  {
                    title: "Access requests",
                    route: routes.ACCESS_REQUESTS,
                  },
                  {
                    title: "Dental Second Look (D2L)",
                    route: routes.PROFILE_D2L,
                  },
                  {
                    title: "Open Data",
                    route: routes.PROFILE_OPEN_DATA,
                  },
                ],
              },
              {
                title: "Settings",
                options: [
                  {
                    title: "Accept Terms",
                    route: routes.PROFILE_ACCEPT_TERMS,
                  },
                  {
                    title: "Privacy Policy",
                    route: routes.PROFILE_PRIVACY_POLICY,
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="col-12 col-lg-9">{children}</div>
      </div>
    </div>
  );
}

import routes from "@/helpers/routes";
import { generateMetadata } from "@/helpers";
import { ButtonLink } from "./_components";

export const metadata = generateMetadata({
  title: "404 - Page not found",
  description:
    "The page you are looking for may have been removed, have its name changed, or be temporarily unavailable",
});

export default function NotFound() {
  return (
    <div className="container mt-80 pt-80 mb-80 pb-80">
      <div className="row">
        <div className="col-12 text-center text-primary-1">
          <h1 className="mb-16 fw-bold">404 - Page Not Found</h1>
        </div>
        <div className="col-6 offset-3 text-center">
          <p>
            The page you are looking for may have been removed, have its name
            changed, or be temporarily unavailable
          </p>
          <div className="d-flex justify-content-center mt-28">
            <ButtonLink size={"small"} href={routes.DASHBOARD_HOME}>
              Go back Home
            </ButtonLink>
          </div>
        </div>
        <div className="col-12 mt-8 d-flex justify-content-center"></div>
      </div>
    </div>
  );
}

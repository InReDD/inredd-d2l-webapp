import { Paragraph1, Title } from "@/app/_components/Typography";
import CardLogin from "@/app/_components/CardLogin";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Sign into your account",
    description: "Sign in to access your InReDD solutions",
  });
}

export default function Login() {
  return (
    <main id="login">
      <div className="bg-login">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <Title>
                <span className="text-primary-1">Log into your Account</span>
              </Title>
            </div>
            <div className="col-12 col-md-10 mx-auto mb-80 text-center mt-20">
              <Paragraph1>
                <span className="text-neutral-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas quis interdum lorem. Maecenas at orci sapien. In in
                  finibus nisl.
                </span>
              </Paragraph1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-4 mb-16 d-flex justify-content-center">
            <CardLogin />
          </div>
        </div>
      </div>
    </main>
  );
}

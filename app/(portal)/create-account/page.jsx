import { Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import CardCreateAccount from "@/app/_components/CardCreateAccount";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Create your account",
    description: "Create your account and get access to your InReDD solutions",
  });
}

export default function CreateAccount() {
  return (
    <main id="create-account">
      <div className="bg-create-account">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <Title>
                <span className="text-primary-1">Create Account</span>
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
          <div className="col-12 col-md-8 col-lg-8 mb-16 d-flex justify-content-center">
            <CardCreateAccount />
          </div>
        </div>
      </div>
    </main>
  );
}

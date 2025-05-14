import Image from "next/image";
import "./style.scss";
import { Button } from "@/app/_components";
import classNames from "classnames";

const sizes = {
  small: 40,
  medium: 80,
  "medium-large": 120,
  large: 242,
};

export default function ProfilePicture({
  src,
  name,
  canEdit = false,
  size,
  className,
}) {
  if (!["small", "medium", "medium-large", "large"].includes(size)) {
    size = "large";
  }

  const userInitials = (name) => {
    const tokens = name.split(" ");
    let initials = "";

    if (tokens.length > 1) {
      initials = tokens[0][0] + tokens[1][0];
    } else {
      initials = tokens[0][0] + tokens[0][1];
    }

    return initials.toUpperCase();
  };

  return (
    <div
      className={classNames(
        "profile-picture",
        { "empty-image": !src },
        size,
        className,
      )}
      title={name}
    >
      {src ? (
        <Image
          className="image-profile"
          src={src}
          width={sizes[size]}
          height={sizes[size]}
          alt={`${name}'s profile image`}
        />
      ) : (
        userInitials(name)
      )}
      {canEdit && (
        <Button size={"small"} variant={"black"} icon={"edit"}>
          Edit
        </Button>
      )}
    </div>
  );
}

"use client"
import { useOutsideClick } from "@/helpers/hooks";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Icon({
  alt,
  width,
  height,
  srcIcon,
  srcIconHover,
}) {

  const [hover, setIsHoved] = useState(true);
  const imageRef = useRef();
  const icon = hover ? `/icons/${srcIcon}.svg` : `/icons/${srcIconHover}.svg`;

  useOutsideClick(imageRef, () => setIsHoved(!hover));
  return (
    <Image
      ref={imageRef}
      src={icon}
      width={width}
      height={height}
      alt={alt}
    />
  );
}


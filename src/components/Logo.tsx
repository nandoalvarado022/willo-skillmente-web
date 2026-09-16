import Image from "next/image";

type LogoProps = {
  light?: boolean;
  className?: string;
};

export function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Image
      src="/images/skillmente-logo.png"
      alt="SkillMente"
      width={600}
      height={239}
      priority
      className={`h-8 w-auto sm:h-9 ${light ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

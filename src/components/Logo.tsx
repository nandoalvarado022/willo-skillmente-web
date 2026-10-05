import Image from "next/image";

type LogoProps = {
  light?: boolean;
  className?: string;
};

export function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Image
      src={light ? "/images/skillmente-logo-on-dark.png" : "/images/skillmente-logo.png"}
      alt="SkillMente"
      width={600}
      height={239}
      priority
      className={`h-8 w-auto sm:h-9 ${className}`}
    />
  );
}

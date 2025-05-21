import React from "react";
import * as Icons from "lucide-react";
import type { LucideIcon as LucideIconType } from "lucide-react";

type IconName = keyof typeof Icons;

interface LucideIconProps {
  name: IconName;
  className?: string;
  onClick?: () => void;
}

const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  className,
  onClick,
}) => {
  const Icon = Icons[name] as LucideIconType;

  return <Icon className={className} onClick={onClick} />;
};

export default LucideIcon;

type IconProps = {
  className?: string;
};

function Glyph({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
    >
      {children}
    </svg>
  );
}

export function EngineIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3.5" y="8" width="17" height="9" rx="1.5" />
      <path d="M8 8V5.5h8V8" />
      <path d="M8 17v2.2M12 17v2.2M16 17v2.2" />
      <path d="M3.5 11H2M20.5 11H22M3.5 14H2M20.5 14H22" />
    </Glyph>
  );
}

export function GearIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.2M12 19v2.2M2.8 12H5M19 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2 5.2 18.8" />
    </Glyph>
  );
}

export function SuspensionIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M10 2.5h4" />
      <path d="M12 2.5v3.2" />
      <path d="M8.5 7.2c2.2 1.3 4.8 1.3 7 0M8.5 10.4c2.2 1.3 4.8 1.3 7 0M8.5 13.6c2.2 1.3 4.8 1.3 7 0" />
      <path d="M12 14.2V19" />
      <circle cx="12" cy="20.6" r="1.3" />
    </Glyph>
  );
}

export function DiagnosticIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M6.5 10h2.2l1.4-2.2 2.2 4.2 1.4-2H17.5" />
      <path d="M12 16v3.5M9 21h6" />
    </Glyph>
  );
}

export function InspectionIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="6" y="3.5" width="12" height="17" rx="1.5" />
      <path d="M9 3.5h6v2.4H9z" />
      <path d="M9 12.2 11 14l4-4" />
    </Glyph>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18.5h2" />
    </Glyph>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 3.8a8.2 8.2 0 0 0-7 12.4L4 20.2l4.1-1.1A8.2 8.2 0 1 0 12 3.8Z" />
      <path d="M9 12.2c.4 1.7 1.7 2.8 3.4 3" />
    </Glyph>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <Glyph className={`arrow-forward ${className ?? "h-4 w-4"}`}>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </Glyph>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Glyph>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.7" />
    </Glyph>
  );
}

const serviceIconMap = {
  engine: EngineIcon,
  transmission: GearIcon,
  suspension: SuspensionIcon,
  diagnostics: DiagnosticIcon,
  inspection: InspectionIcon,
} as const;

export function ServiceIcon({
  id,
  className,
}: {
  id: keyof typeof serviceIconMap;
  className?: string;
}) {
  const Icon = serviceIconMap[id];
  return <Icon className={className} />;
}

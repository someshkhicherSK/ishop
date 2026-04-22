"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathName() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment) =>
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: formatSegment(segment),
      href,
    };
  });

  return (
    <div className="bg-white flex flex-wrap gap-x-2 gap-y-1 px-4 py-4 my-4 text-sm md:text-base">
      <Link href="/" className="hover:underline text-gray-600">
        Home /
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <Link
            href={crumb.href}
            className={`${
              index === breadcrumbs.length - 1
                ? "font-semibold text-gray-900"
                : "text-gray-600 hover:underline"
            }`}
          >
            {crumb.label}
          </Link>
          {index < breadcrumbs.length - 1 && <span>/</span>}
        </span>
      ))}
    </div>
  );
}

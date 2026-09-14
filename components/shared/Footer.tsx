import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Services", href: "/services" },
      { label: "Technicians", href: "/technicians" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "For Users",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Profile", href: "/profile" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "GitHub",
    href: "#",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="size-5" />
              </div>

              <span className="text-xl font-bold">
                FixItNow
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              FixItNow connects customers with trusted technicians for
              reliable home services, repairs, maintenance and more.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />

                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />

                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />

                <span>support@fixitnow.com</span>
              </div>
            </div>
          </div>


          {/* LINK GROUPS */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


        {/* BOTTOM */}
        <div className="flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>


          {/* SOCIAL */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
}
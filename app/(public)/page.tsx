
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

/* =====================================================
   TYPES
===================================================== */

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  profileImage: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Technician = {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string;
  averageRating: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type Category = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type Service = {
  id: string;
  technicianId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  technician: Technician;
};

type ServiceResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Service[];
};

/* =====================================================
   GET SERVICES
===================================================== */

const getServices = async (): Promise<Service[]> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/services`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch services");

      return [];
    }

    const result: ServiceResponse = await res.json();

    return result.data || [];
  } catch (error) {
    console.error("Home service fetch error:", error);

    return [];
  }
};

/* =====================================================
   HOW IT WORKS
===================================================== */

const steps = [
  {
    step: "01",
    title: "Choose a Service",
    description:
      "Browse available services and select what you need for your home.",
    numberColor: "text-blue-500",
    backgroundColor: "bg-blue-500/10",
  },
  {
    step: "02",
    title: "Find a Technician",
    description:
      "Compare trusted technicians based on skills, location and ratings.",
    numberColor: "text-emerald-500",
    backgroundColor: "bg-emerald-500/10",
  },
  {
    step: "03",
    title: "Book & Get It Done",
    description:
      "Choose a convenient time and let the professional handle the rest.",
    numberColor: "text-orange-500",
    backgroundColor: "bg-orange-500/10",
  },
];

/* =====================================================
   PAGE
===================================================== */

export default async function HomePage() {
  const services = await getServices();

  /* =====================================================
     FEATURED SERVICES
  ===================================================== */

  const featuredServices = services.slice(0, 6);

  /* =====================================================
     UNIQUE TECHNICIANS
  ===================================================== */

  const uniqueTechnicians = Array.from(
    new Map(
      services
        .filter((service) => service.technician)
        .map((service) => [
          service.technician.id,
          service.technician,
        ])
    ).values()
  );

  const featuredTechnicians = uniqueTechnicians.slice(0, 3);

  /* =====================================================
     UNIQUE CATEGORIES
  ===================================================== */

  const categories = Array.from(
    new Map(
      services
        .filter((service) => service.category)
        .map((service) => [
          service.category.id,
          service.category,
        ])
    ).values()
  );

  /* =====================================================
     AVAILABLE TECHNICIANS
  ===================================================== */

  const availableTechnicians = uniqueTechnicians.filter(
    (technician) => technician.availability
  );

  /* =====================================================
     REAL STATS
  ===================================================== */

  const stats = [
    {
      value: `${services.length}`,
      label: "Available Services",
    },
    {
      value: `${uniqueTechnicians.length}`,
      label: "Technicians",
    },
    {
      value: `${categories.length}`,
      label: "Service Categories",
    },
    {
      value: `${availableTechnicians.length}`,
      label: "Available Now",
    },
  ];

  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

      {/* =====================================================
    HERO
===================================================== */}

<section className="relative overflow-hidden border-b">
  {/* Background */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

  <div className="container mx-auto grid min-h-[650px] items-center gap-12 px-4 py-20 lg:grid-cols-2">

    {/* =====================================================
        LEFT SIDE
    ===================================================== */}

    <div className="max-w-2xl">
      <Badge
        variant="secondary"
        className="mb-6 rounded-full px-4 py-2"
      >
        <BadgeCheck className="mr-2 size-4" />
        Trusted Home Service Platform
      </Badge>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Expert Home Services,
        <span className="block text-primary">
          Right When You Need Them.
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
        Find trusted technicians for plumbing, electrical work,
        cleaning, repairs and more. Book professional home services
        quickly and confidently.
      </p>

      {/* BUTTONS */}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="/services">
            Find a Service
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          asChild
        >
          <Link href="/technicians">
            Browse Technicians
          </Link>
        </Button>
      </div>

      {/* TRUST ITEMS */}

      <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">

        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-primary" />
          Verified professionals
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-primary" />
          Secure booking
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-primary" />
          Transparent service
        </div>

      </div>
    </div>


    {/* =====================================================
        RIGHT SIDE
    ===================================================== */}

    <div className="relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute -left-10 top-10 size-56 rounded-full bg-primary/10 blur-3xl" />

      <Card className="relative overflow-hidden border shadow-2xl">

        {/* CARD HEADER */}

        <CardHeader className="border-b bg-muted/40">

          <div className="flex items-center justify-between">

            <div>
              <CardTitle>
                Find the right professional
              </CardTitle>

              <CardDescription className="mt-1">
                Reliable service is just a few clicks away
              </CardDescription>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
              <Search className="size-5 text-primary" />
            </div>

          </div>

        </CardHeader>


        <CardContent className="space-y-4 p-6">

          {/* SEARCH BOX */}

          <form action="/services" method="GET">

            <div className="rounded-xl border bg-background p-4">

              <p className="mb-3 text-sm font-medium">
                What service do you need?
              </p>

              <div className="flex items-center gap-2">

                <div className="relative flex-1">

                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    name="search"
                    placeholder="Search plumbing, cleaning..."
                    className="pl-9"
                  />

                </div>

                <Button type="submit">
                  Search
                </Button>

              </div>

            </div>

          </form>


          {/* REAL SERVICES */}

          <div className="grid grid-cols-2 gap-3">

            {featuredServices.slice(0, 4).map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group rounded-xl border p-4 transition-all hover:border-primary/40 hover:bg-muted/40"
              >

                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Wrench className="size-5" />
                </div>

                <p className="truncate font-medium">
                  {service.name}
                </p>

                <div className="mt-1 flex items-center justify-between gap-2">

                  <p className="truncate text-xs text-muted-foreground">
                    {service.category.name}
                  </p>

                  <span className="shrink-0 text-xs font-semibold text-primary">
                    ৳{service.price}
                  </span>

                </div>

              </Link>
            ))}

          </div>


          {/* EMPTY STATE */}

          {featuredServices.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center">

              <Wrench className="mx-auto size-7 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                No services available
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Please check back later.
              </p>

            </div>
          )}


          {/* VIEW ALL */}

          <Button
            className="w-full"
            asChild
          >
            <Link href="/services">
              Explore All Services
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

        </CardContent>

      </Card>

    </div>

  </div>
</section>


      {/* =====================================================
          REAL STATS
      ===================================================== */}

      <section className="border-b bg-muted/30">

        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="text-center"
            >

              <p className="text-2xl font-bold text-primary md:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="container mx-auto px-4 py-24">

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <Badge
              variant="outline"
              className="mb-4"
            >
              Popular Services
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Services for your home
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Discover services offered by our registered technicians.
            </p>

          </div>

          <Button
            variant="outline"
            asChild
          >
            <Link href="/services">

              View All Services

              <ArrowRight className="ml-2 size-4" />

            </Link>
          </Button>

        </div>


        {/* NO SERVICE */}

        {featuredServices.length === 0 && (

          <div className="rounded-xl border bg-muted/20 p-12 text-center">

            <Wrench className="mx-auto size-8 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No services available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please check back later.
            </p>

          </div>

        )}


        {/* SERVICE CARDS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {featuredServices.map((service) => (

            <Card
              key={service.id}
              className="group relative flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
            >

              {/* CARD CLICK */}

              <Link
                href={`/services/${service.id}`}
                className="absolute inset-0 z-0"
                aria-label={`View ${service.name}`}
              >
                <span className="sr-only">
                  View {service.name}
                </span>
              </Link>


              <CardHeader className="relative z-[1] pointer-events-none">

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">

                    <Wrench className="size-6 text-primary" />

                  </div>

                  <Badge variant="secondary">
                    {service.category.name}
                  </Badge>

                </div>

                <CardTitle className="transition-colors group-hover:text-primary">
                  {service.name}
                </CardTitle>

                <CardDescription className="line-clamp-2 leading-6">
                  {service.description}
                </CardDescription>

              </CardHeader>


              <CardContent className="relative z-[1] flex-1 pointer-events-none">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      ৳{service.price}
                    </p>

                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">

                    <MapPin className="size-4" />

                    {service.location}

                  </div>

                </div>


                {/* TECHNICIAN */}

                <div className="mt-5 flex items-center gap-3 border-t pt-5">

                  <Avatar>

                    <AvatarImage
                      src={service.technician.user.profileImage || ""}
                      alt={service.technician.user.name}
                    />

                    <AvatarFallback>
                      {service.technician.user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>

                  </Avatar>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold">
                      {service.technician.user.name}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">

                      <Star className="size-3 fill-current text-yellow-500" />

                      {service.technician.averageRating.toFixed(1)}

                    </div>

                  </div>

                </div>

              </CardContent>


              {/* BOOK BUTTON */}

              <div className="relative z-10 p-6 pt-0">

                <Button
                  className="w-full"
                  disabled={!service.technician.availability}
                  asChild={service.technician.availability}
                >

                  {service.technician.availability ? (

                    <Link
                      href={`/bookings/create?serviceId=${service.id}`}
                    >
                      Book Now

                      <ArrowRight className="ml-2 size-4" />
                    </Link>

                  ) : (

                    <span>
                      Currently Unavailable
                    </span>

                  )}

                </Button>

              </div>

            </Card>

          ))}

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="bg-muted/40">

        <div className="container mx-auto px-4 py-24">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <Badge
              variant="outline"
              className="mb-4"
            >
              Simple & Easy
            </Badge>

            <h2 className="text-3xl font-bold sm:text-4xl">
              How FixItNow works
            </h2>

            <p className="mt-4 text-muted-foreground">
              Book trusted home service professionals in three simple
              steps.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {steps.map((item) => (

              <Card
                key={item.step}
                className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
              >

                <CardHeader>

                  {/* COLORED NUMBER */}

                  <div
                    className={`mb-6 flex size-20 items-center justify-center rounded-2xl ${item.backgroundColor}`}
                  >

                    <span
                      className={`text-4xl font-black ${item.numberColor}`}
                    >
                      {item.step}
                    </span>

                  </div>


                  <CardTitle className="text-xl">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="leading-6">
                    {item.description}
                  </CardDescription>

                </CardHeader>

              </Card>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          REAL TECHNICIANS
      ===================================================== */}

      <section className="container mx-auto px-4 py-24">

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <Badge
              variant="outline"
              className="mb-4"
            >
              Professionals
            </Badge>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Meet our technicians
            </h2>

            <p className="mt-3 text-muted-foreground">
              Skilled professionals providing services through FixItNow.
            </p>

          </div>

          <Button
            variant="outline"
            asChild
          >
            <Link href="/technicians">

              All Technicians

              <ArrowRight className="ml-2 size-4" />

            </Link>
          </Button>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          {featuredTechnicians.map((technician) => {

            const user = technician.user;

            const initials =
              user.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "T";

            return (

              <Card
                key={technician.id}
                className="transition-all hover:-translate-y-1 hover:shadow-lg"
              >

                <CardContent className="p-6">

                  <div className="flex items-start gap-4">

                    <Avatar className="size-14">

                      <AvatarImage
                        src={user.profileImage || ""}
                        alt={user.name}
                      />

                      <AvatarFallback>
                        {initials}
                      </AvatarFallback>

                    </Avatar>


                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate font-semibold">
                          {user.name}
                        </h3>

                        <BadgeCheck className="size-4 shrink-0 text-primary" />

                      </div>


                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">

                        <BriefcaseBusiness className="size-3.5" />

                        {technician.experience} years experience

                      </div>

                    </div>

                  </div>


                  {/* BIO */}

                  {technician.bio && (

                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {technician.bio}
                    </p>

                  )}


                  {/* SKILLS */}

                  {technician.skills.length > 0 && (

                    <div className="mt-5 flex flex-wrap gap-1.5">

                      {technician.skills
                        .slice(0, 3)
                        .map((skill) => (

                          <Badge
                            key={skill}
                            variant="secondary"
                          >
                            {skill}
                          </Badge>

                        ))}

                    </div>

                  )}


                  <div className="mt-6 flex items-center justify-between border-t pt-5">

                    <div className="flex items-center gap-1">

                      <Star className="size-4 fill-current text-yellow-500" />

                      <span className="text-sm font-semibold">
                        {technician.averageRating.toFixed(1)}
                      </span>

                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">

                      <MapPin className="size-4" />

                      {technician.location}

                    </div>

                  </div>


                  <Button
                    variant="outline"
                    className="mt-5 w-full"
                    asChild
                  >
                    <Link href={`/technicians/${technician.id}`}>

                      View Profile

                      <ArrowRight className="ml-2 size-4" />

                    </Link>
                  </Button>

                </CardContent>

              </Card>

            );

          })}

        </div>

      </section>


      {/* =====================================================
          WHY FIXITNOW
      ===================================================== */}

      <section className="border-y bg-muted/30">

        <div className="container mx-auto grid gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">

          <div>

            <Badge
              variant="outline"
              className="mb-4"
            >
              Why FixItNow?
            </Badge>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Home service you can depend on
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Find skilled professionals, manage your bookings and get
              your home services completed with confidence.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-2">

            <Feature
              icon={ShieldCheck}
              title="Trusted Technicians"
              description="Connect with registered professionals for your home services."
            />

            <Feature
              icon={Clock3}
              title="Easy Scheduling"
              description="Book your preferred service date and time."
            />

            <Feature
              icon={Star}
              title="Ratings & Reviews"
              description="Choose professionals using customer feedback."
            />

            <Feature
              icon={BadgeCheck}
              title="Simple Experience"
              description="Book and manage services through one platform."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="container mx-auto px-4 py-24">

        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground md:px-12">

          <div className="absolute right-0 top-0 size-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            <Badge className="mb-5 bg-white/15 text-white hover:bg-white/15">
              Get Started Today
            </Badge>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Need something fixed?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80">
              Find a trusted technician and book your home service in
              just a few clicks.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/services">

                  Book a Service

                  <ArrowRight className="ml-2 size-4" />

                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/register">
                  Join FixItNow
                </Link>
              </Button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   FEATURE COMPONENT
===================================================== */

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

function Feature({
  icon: Icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="rounded-xl border bg-background p-5">

      <Icon className="mb-4 size-6 text-primary" />

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

    </div>
  );
}






// import Link from "next/link";

// import {
//   ArrowRight,
//   BadgeCheck,
//   Bolt,
//   Brush,
//   CheckCircle2,
//   Clock3,
//   Hammer,
//   MapPin,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Star,
//   Wrench,
// } from "lucide-react";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const services = [
//   {
//     title: "Plumbing",
//     description: "Leaks, pipes, faucets and other plumbing services.",
//     icon: Wrench,
//   },
//   {
//     title: "Electrical",
//     description: "Safe and professional electrical repair services.",
//     icon: Bolt,
//   },
//   {
//     title: "Home Repair",
//     description: "Reliable help for everyday home repair needs.",
//     icon: Hammer,
//   },
//   {
//     title: "Cleaning",
//     description: "Professional cleaning for a fresh and healthy home.",
//     icon: Sparkles,
//   },
//   {
//     title: "Painting",
//     description: "Give your home a fresh new look with expert painters.",
//     icon: Brush,
//   },
//   {
//     title: "Maintenance",
//     description: "Keep your home running smoothly all year round.",
//     icon: ShieldCheck,
//   },
// ];

// const steps = [
//   {
//     step: "01",
//     title: "Choose a Service",
//     description:
//       "Browse available services and select what you need for your home.",
//   },
//   {
//     step: "02",
//     title: "Find a Technician",
//     description:
//       "Compare trusted technicians based on skills, location and ratings.",
//   },
//   {
//     step: "03",
//     title: "Book & Get It Done",
//     description:
//       "Choose a convenient time and let the professional handle the rest.",
//   },
// ];

// const technicians = [
//   {
//     name: "John Smith",
//     skill: "Plumbing Expert",
//     rating: "4.9",
//     location: "Dhaka",
//     initials: "JS",
//   },
//   {
//     name: "David Miller",
//     skill: "Electrician",
//     rating: "4.8",
//     location: "Dhaka",
//     initials: "DM",
//   },
//   {
//     name: "Robert Wilson",
//     skill: "Home Repair Expert",
//     rating: "5.0",
//     location: "Gazipur",
//     initials: "RW",
//   },
// ];

// const stats = [
//   {
//     value: "500+",
//     label: "Trusted Technicians",
//   },
//   {
//     value: "10K+",
//     label: "Completed Services",
//   },
//   {
//     value: "4.9/5",
//     label: "Customer Rating",
//   },
//   {
//     value: "24/7",
//     label: "Service Support",
//   },
// ];

// export default function HomePage() {
//   return (
//     <main>
//       {/* HERO */}
//       <section className="relative overflow-hidden border-b">
//         <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

//         <div className="container mx-auto grid min-h-[650px] items-center gap-12 px-4 py-20 lg:grid-cols-2">
//           {/* LEFT */}
//           <div className="max-w-2xl">
//             <Badge
//               variant="secondary"
//               className="mb-6 rounded-full px-4 py-2"
//             >
//               <BadgeCheck className="mr-2 size-4" />
//               Trusted Home Service Platform
//             </Badge>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
//               Expert Home Services,
//               <span className="block text-primary">
//                 Right When You Need Them.
//               </span>
//             </h1>

//             <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
//               Find trusted technicians for plumbing, electrical work,
//               cleaning, repairs and more. Book professional home services
//               quickly and confidently.
//             </p>

//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <Button size="lg" asChild>
//                 <Link href="/services">
//                   Find a Service
//                   <ArrowRight className="ml-2 size-4" />
//                 </Link>
//               </Button>

//               <Button
//                 size="lg"
//                 variant="outline"
//                 asChild
//               >
//                 <Link href="/technicians">
//                   Browse Technicians
//                 </Link>
//               </Button>
//             </div>

//             <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="size-4 text-primary" />
//                 Verified professionals
//               </div>

//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="size-4 text-primary" />
//                 Secure booking
//               </div>

//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="size-4 text-primary" />
//                 Transparent service
//               </div>
//             </div>
//           </div>

//           {/* RIGHT HERO CARD */}
//           <div className="relative">
//             <div className="absolute -left-10 top-10 size-56 rounded-full bg-primary/10 blur-3xl" />

//             <Card className="relative overflow-hidden border shadow-2xl">
//               <CardHeader className="border-b bg-muted/40">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle>Find the right professional</CardTitle>
//                     <CardDescription className="mt-1">
//                       Reliable service is just a few clicks away
//                     </CardDescription>
//                   </div>

//                   <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
//                     <Search className="size-5 text-primary" />
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="space-y-4 p-6">
//                 <div className="rounded-xl border bg-background p-4">
//                   <p className="mb-3 text-sm font-medium">
//                     What service do you need?
//                   </p>

//                   <div className="flex items-center gap-3 rounded-lg border px-4 py-3 text-muted-foreground">
//                     <Search className="size-4" />
//                     Search plumbing, electrical, cleaning...
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   {services.slice(0, 4).map((service) => {
//                     const Icon = service.icon;

//                     return (
//                       <div
//                         key={service.title}
//                         className="rounded-xl border p-4 transition hover:border-primary/40 hover:bg-muted/40"
//                       >
//                         <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
//                           <Icon className="size-5 text-primary" />
//                         </div>

//                         <p className="font-medium">
//                           {service.title}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <Button className="w-full" asChild>
//                   <Link href="/services">
//                     Explore All Services
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="border-b bg-muted/30">
//         <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
//           {stats.map((stat) => (
//             <div
//               key={stat.label}
//               className="text-center"
//             >
//               <p className="text-2xl font-bold md:text-3xl">
//                 {stat.value}
//               </p>

//               <p className="mt-1 text-sm text-muted-foreground">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* POPULAR SERVICES */}
//       <section className="container mx-auto px-4 py-24">
//         <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div>
//             <Badge variant="outline" className="mb-4">
//               Popular Services
//             </Badge>

//             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//               Everything your home needs
//             </h2>

//             <p className="mt-3 max-w-xl text-muted-foreground">
//               Discover reliable professionals for everyday repairs,
//               maintenance and improvement projects.
//             </p>
//           </div>

//           <Button variant="outline" asChild>
//             <Link href="/services">
//               View All Services
//               <ArrowRight className="ml-2 size-4" />
//             </Link>
//           </Button>
//         </div>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service) => {
//             const Icon = service.icon;

//             return (
//               <Card
//                 key={service.title}
//                 className="group transition-all hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <CardHeader>
//                   <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
//                     <Icon className="size-6" />
//                   </div>

//                   <CardTitle>{service.title}</CardTitle>

//                   <CardDescription className="leading-6">
//                     {service.description}
//                   </CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <Link
//                     href="/services"
//                     className="inline-flex items-center text-sm font-medium text-primary"
//                   >
//                     Find professionals
//                     <ArrowRight className="ml-2 size-4" />
//                   </Link>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="bg-muted/40">
//         <div className="container mx-auto px-4 py-24">
//           <div className="mx-auto mb-14 max-w-2xl text-center">
//             <Badge variant="outline" className="mb-4">
//               Simple & Easy
//             </Badge>

//             <h2 className="text-3xl font-bold sm:text-4xl">
//               How FixItNow works
//             </h2>

//             <p className="mt-4 text-muted-foreground">
//               Book trusted home service professionals in three simple
//               steps.
//             </p>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             {steps.map((item) => (
//               <Card
//                 key={item.step}
//                 className="relative overflow-hidden"
//               >
//                 <CardHeader>
//                   <span className="mb-6 text-6xl font-black text-primary/10">
//                     {item.step}
//                   </span>

//                   <CardTitle>
//                     {item.title}
//                   </CardTitle>

//                   <CardDescription className="leading-6">
//                     {item.description}
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURED TECHNICIANS */}
//       <section className="container mx-auto px-4 py-24">
//         <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div>
//             <Badge variant="outline" className="mb-4">
//               Professionals
//             </Badge>

//             <h2 className="text-3xl font-bold sm:text-4xl">
//               Meet top technicians
//             </h2>

//             <p className="mt-3 text-muted-foreground">
//               Skilled professionals ready to help with your next job.
//             </p>
//           </div>

//           <Button variant="outline" asChild>
//             <Link href="/technicians">
//               All Technicians
//               <ArrowRight className="ml-2 size-4" />
//             </Link>
//           </Button>
//         </div>

//         <div className="grid gap-6 md:grid-cols-3">
//           {technicians.map((technician) => (
//             <Card
//               key={technician.name}
//               className="transition hover:shadow-lg"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start gap-4">
//                   <Avatar className="size-14">
//                     <AvatarFallback className="bg-primary/10 font-semibold text-primary">
//                       {technician.initials}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold">
//                         {technician.name}
//                       </h3>

//                       <BadgeCheck className="size-4 text-primary" />
//                     </div>

//                     <p className="text-sm text-muted-foreground">
//                       {technician.skill}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex items-center justify-between border-t pt-5">
//                   <div className="flex items-center gap-1">
//                     <Star className="size-4 fill-current text-yellow-500" />

//                     <span className="text-sm font-semibold">
//                       {technician.rating}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                     <MapPin className="size-4" />
//                     {technician.location}
//                   </div>
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="mt-5 w-full"
//                   asChild
//                 >
//                   <Link href="/technicians">
//                     View Profile
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* WHY US */}
//       <section className="border-y bg-muted/30">
//         <div className="container mx-auto grid gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">
//           <div>
//             <Badge variant="outline" className="mb-4">
//               Why FixItNow?
//             </Badge>

//             <h2 className="text-3xl font-bold sm:text-4xl">
//               Home service you can depend on
//             </h2>

//             <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
//               We make it easier to find skilled professionals, manage
//               bookings and get your home services completed with
//               confidence.
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="rounded-xl border bg-background p-5">
//               <ShieldCheck className="mb-4 size-6 text-primary" />

//               <h3 className="font-semibold">
//                 Trusted Technicians
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-muted-foreground">
//                 Find skilled and reliable professionals for your home.
//               </p>
//             </div>

//             <div className="rounded-xl border bg-background p-5">
//               <Clock3 className="mb-4 size-6 text-primary" />

//               <h3 className="font-semibold">
//                 Easy Scheduling
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-muted-foreground">
//                 Pick a convenient date and time for your service.
//               </p>
//             </div>

//             <div className="rounded-xl border bg-background p-5">
//               <Star className="mb-4 size-6 text-primary" />

//               <h3 className="font-semibold">
//                 Ratings & Reviews
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-muted-foreground">
//                 Make better decisions using real customer feedback.
//               </p>
//             </div>

//             <div className="rounded-xl border bg-background p-5">
//               <BadgeCheck className="mb-4 size-6 text-primary" />

//               <h3 className="font-semibold">
//                 Simple Experience
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-muted-foreground">
//                 From finding a technician to completing the booking.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="container mx-auto px-4 py-24">
//         <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground md:px-12">
//           <div className="absolute right-0 top-0 size-72 rounded-full bg-white/10 blur-3xl" />

//           <div className="relative mx-auto max-w-3xl text-center">
//             <Badge className="mb-5 bg-white/15 text-white hover:bg-white/15">
//               Get Started Today
//             </Badge>

//             <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
//               Need something fixed?
//             </h2>

//             <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80">
//               Find a trusted technician and book your home service in
//               just a few clicks.
//             </p>

//             <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
//               <Button
//                 size="lg"
//                 variant="secondary"
//                 asChild
//               >
//                 <Link href="/services">
//                   Book a Service
//                   <ArrowRight className="ml-2 size-4" />
//                 </Link>
//               </Button>

//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
//                 asChild
//               >
//                 <Link href="/register">
//                   Join FixItNow
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
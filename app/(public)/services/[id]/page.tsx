import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
   FETCH SINGLE SERVICE
===================================================== */

const getServiceById = async (
  id: string
): Promise<Service | null> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/services`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const result: ServiceResponse = await res.json();

    return (
      result.data.find((service) => service.id === id) ?? null
    );
  } catch (error) {
    console.error("Single service fetch error:", error);

    return null;
  }
};

/* =====================================================
   PAGE
===================================================== */

type SingleServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SingleServicePage({
  params,
}: SingleServicePageProps) {
  const { id } = await params;

  const service = await getServiceById(id);

  /* =====================================================
     SERVICE NOT FOUND
  ===================================================== */

  if (!service) {
    return (
      <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">

          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
            <Wrench className="size-7 text-muted-foreground" />
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            Service not found
          </h1>

          <p className="mt-2 text-muted-foreground">
            The service you are looking for may have been removed or
            does not exist.
          </p>

          <Button
            className="mt-6"
            asChild
          >
            <Link href="/services">
              <ArrowLeft className="mr-2 size-4" />
              Back to Services
            </Link>
          </Button>

        </div>
      </main>
    );
  }

  const technician = service.technician;
  const technicianUser = technician.user;

  const initials =
    technicianUser.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  return (
    <main>

      {/* =====================================================
          TOP AREA
      ===================================================== */}

      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">

          {/* BACK */}

          <Button
            variant="ghost"
            className="mb-6 -ml-3"
            asChild
          >
            <Link href="/services">
              <ArrowLeft className="mr-2 size-4" />
              Back to Services
            </Link>
          </Button>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* =====================
                SERVICE INFORMATION
            ====================== */}

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <Badge variant="secondary">
                  {service.category.name}
                </Badge>

                {technician.availability ? (
                  <Badge
                    variant="outline"
                    className="gap-1"
                  >
                    <CheckCircle2 className="size-3 text-green-600" />
                    Available
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    Currently Unavailable
                  </Badge>
                )}

              </div>

              <div className="mt-6 flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:flex">
                  <Wrench className="size-7 text-primary" />
                </div>

                <div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    {service.name}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">

                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {service.location}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <UserRound className="size-4" />
                      {technicianUser.name}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Star className="size-4 fill-current text-yellow-500" />

                      {technician.averageRating.toFixed(1)}
                    </div>

                  </div>

                </div>
              </div>

              <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                {service.description}
              </p>

            </div>


            {/* =====================
                BOOKING CARD
            ====================== */}

            <Card className="h-fit shadow-lg">

              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  Service price
                </p>

                <CardTitle className="text-4xl text-primary">
                  ৳{service.price}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                <div className="space-y-3 border-y py-5">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-muted-foreground">
                      Category
                    </span>

                    <span className="font-medium">
                      {service.category.name}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-muted-foreground">
                      Location
                    </span>

                    <span className="font-medium">
                      {service.location}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-muted-foreground">
                      Availability
                    </span>

                    <span
                      className={
                        technician.availability
                          ? "font-medium text-green-600"
                          : "font-medium text-destructive"
                      }
                    >
                      {technician.availability
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>

                </div>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={!technician.availability}
                  asChild={technician.availability}
                >
                  {technician.availability ? (
                    <Link
                      href={`/bookings/create?serviceId=${service.id}`}
                    >
                      Book Now
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  ) : (
                    <span>Currently Unavailable</span>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Choose your preferred booking date and time on the
                  next step.
                </p>

              </CardContent>

            </Card>

          </div>
        </div>
      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}

          <div className="space-y-8">

            {/* ABOUT SERVICE */}

            <Card>
              <CardHeader>
                <CardTitle>
                  About this service
                </CardTitle>
              </CardHeader>

              <CardContent>

                <p className="leading-7 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border p-4">

                    <MapPin className="mb-3 size-5 text-primary" />

                    <p className="font-medium">
                      Service Location
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.location}
                    </p>

                  </div>

                  <div className="rounded-xl border p-4">

                    <Wrench className="mb-3 size-5 text-primary" />

                    <p className="font-medium">
                      Service Category
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.category.name}
                    </p>

                  </div>

                </div>

              </CardContent>
            </Card>


            {/* TECHNICIAN */}

            <Card>

              <CardHeader>
                <CardTitle>
                  Your Service Provider
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="flex flex-col gap-6 sm:flex-row">

                  <Avatar className="size-20">

                    <AvatarImage
                      src={technicianUser.profileImage || ""}
                      alt={technicianUser.name}
                    />

                    <AvatarFallback className="text-xl">
                      {initials}
                    </AvatarFallback>

                  </Avatar>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-xl font-semibold">
                        {technicianUser.name}
                      </h3>

                      <BadgeCheck className="size-5 text-primary" />

                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">

                      <div className="flex items-center gap-1.5">

                        <BriefcaseBusiness className="size-4" />

                        {technician.experience} years experience

                      </div>

                      <div className="flex items-center gap-1.5">

                        <Star className="size-4 fill-current text-yellow-500" />

                        {technician.averageRating.toFixed(1)} rating

                      </div>

                      <div className="flex items-center gap-1.5">

                        <MapPin className="size-4" />

                        {technician.location}

                      </div>

                    </div>

                    {technician.bio && (
                      <p className="mt-5 leading-7 text-muted-foreground">
                        {technician.bio}
                      </p>
                    )}

                  </div>

                </div>


                {/* SKILLS */}

                {technician.skills.length > 0 && (
                  <div className="mt-8 border-t pt-6">

                    <p className="mb-3 text-sm font-medium">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {technician.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                        >
                          {skill}
                        </Badge>
                      ))}

                    </div>

                  </div>
                )}


                <div className="mt-8">

                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link
                      href={`/technicians/${technician.id}`}
                    >
                      View Technician Profile

                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>


          {/* =====================================================
              RIGHT SIDEBAR
          ===================================================== */}

          <div className="space-y-6">

            {/* TECHNICIAN QUICK INFO */}

            <Card>

              <CardHeader>
                <CardTitle className="text-lg">
                  Technician Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="flex items-center gap-3">

                  <Mail className="size-4 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Email
                    </p>

                    <p className="truncate text-sm font-medium">
                      {technicianUser.email}
                    </p>
                  </div>

                </div>

                {technicianUser.phone && (
                  <div className="flex items-center gap-3">

                    <Phone className="size-4 text-muted-foreground" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Phone
                      </p>

                      <p className="text-sm font-medium">
                        {technicianUser.phone}
                      </p>
                    </div>

                  </div>
                )}

                <div className="flex items-center gap-3">

                  <MapPin className="size-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Technician Location
                    </p>

                    <p className="text-sm font-medium">
                      {technician.location}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <BriefcaseBusiness className="size-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Experience
                    </p>

                    <p className="text-sm font-medium">
                      {technician.experience} years
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="size-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Hourly Rate
                    </p>

                    <p className="text-sm font-medium">
                      ৳{technician.hourlyRate}/hour
                    </p>
                  </div>

                </div>

              </CardContent>

            </Card>


            {/* TRUST CARD */}

            <Card>

              <CardContent className="space-y-4 pt-6">

                <div className="flex gap-3">

                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />

                  <div>
                    <p className="text-sm font-medium">
                      Trusted Professional
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Book services from registered FixItNow technicians.
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />

                  <div>
                    <p className="text-sm font-medium">
                      Easy Booking
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Choose your preferred date, time and service
                      address.
                    </p>
                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </section>

    </main>
  );
}
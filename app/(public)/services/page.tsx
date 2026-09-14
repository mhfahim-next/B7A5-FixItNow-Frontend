import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  Search,
  Star,
  Wrench,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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

const getServices = async (): Promise<ServiceResponse | null> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/services`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch services:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Service fetch error:", error);
    return null;
  }
};

/* =====================================================
   PAGE
===================================================== */

type ServicesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  const response = await getServices();

  const services = response?.data ?? [];

  const search = params.search?.toLowerCase().trim() ?? "";
  const selectedCategory = params.category ?? "";

  /* GET UNIQUE CATEGORIES */

  const categories = Array.from(
    new Map(
      services.map((service) => [
        service.category.id,
        service.category,
      ])
    ).values()
  );

  /* FILTER */

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      !search ||
      service.name.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search) ||
      service.location.toLowerCase().includes(search) ||
      service.technician.user.name.toLowerCase().includes(search);

    const matchesCategory =
      !selectedCategory ||
      service.category.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Wrench className="mr-2 size-4" />
              Home Services
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Find the right service for your home
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Browse trusted home services and connect with skilled
              technicians in your area.
            </p>
          </div>

          {/* SEARCH / FILTER */}

          <form
            method="GET"
            className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-2xl border bg-background p-4 shadow-sm md:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                name="search"
                defaultValue={params.search ?? ""}
                placeholder="Search services, location or technician..."
                className="pl-9"
              />
            </div>

            <select
              name="category"
              defaultValue={selectedCategory}
              className="h-10 rounded-md border bg-background px-3 text-sm md:w-52"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <Button type="submit">
              <Search className="mr-2 size-4" />
              Search
            </Button>

            {(search || selectedCategory) && (
              <Button
                variant="outline"
                asChild
              >
                <Link href="/services">
                  Clear
                </Link>
              </Button>
            )}
          </form>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Available Services
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {filteredServices.length}{" "}
              {filteredServices.length === 1
                ? "service"
                : "services"}{" "}
              found
            </p>
          </div>
        </div>

        {/* API ERROR */}

        {!response && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-10 text-center">
            <h3 className="text-lg font-semibold">
              Unable to load services
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while loading services. Please try
              again later.
            </p>
          </div>
        )}

        {/* EMPTY */}

        {response && filteredServices.length === 0 && (
          <div className="rounded-xl border bg-muted/20 p-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Search className="size-6 text-primary" />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              No services found
            </h3>

            <p className="mt-2 text-muted-foreground">
              Try another search term or category.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              asChild
            >
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        )}

        {/* SERVICE CARDS */}

        {filteredServices.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => {
              const technician = service.technician;
              const technicianUser = technician.user;

              const initials =
                technicianUser.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "T";

              return (
                // <Card
                //   key={service.id}
                //   className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                // >
                //   {/* CARD TOP */}

                //   <div className="flex items-center justify-between border-b bg-muted/30 px-6 py-4">
                //     <Badge variant="secondary">
                //       {service.category.name}
                //     </Badge>

                //     {technician.availability ? (
                //       <Badge
                //         variant="outline"
                //         className="gap-1"
                //       >
                //         <CheckCircle2 className="size-3 text-green-600" />
                //         Available
                //       </Badge>
                //     ) : (
                //       <Badge variant="outline">
                //         Unavailable
                //       </Badge>
                //     )}
                //   </div>

                //   <CardHeader>
                //     <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                //       <Wrench className="size-6 text-primary" />
                //     </div>

                //     <CardTitle className="text-xl">
                //       {service.name}
                //     </CardTitle>

                //     <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                //       {service.description}
                //     </p>
                //   </CardHeader>

                //   <CardContent className="flex-1 space-y-5">
                //     {/* PRICE / LOCATION */}

                //     <div className="flex items-center justify-between">
                //       <div>
                //         <p className="text-xs text-muted-foreground">
                //           Starting from
                //         </p>

                //         <p className="text-2xl font-bold text-primary">
                //           ৳{service.price}
                //         </p>
                //       </div>

                //       <div className="flex items-center gap-1 text-sm text-muted-foreground">
                //         <MapPin className="size-4" />

                //         <span>{service.location}</span>
                //       </div>
                //     </div>

                //     {/* TECHNICIAN */}

                //     <div className="rounded-xl border bg-muted/20 p-4">
                //       <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                //         Service Provider
                //       </p>

                //       <div className="flex items-center gap-3">
                //         <Avatar>
                //           <AvatarImage
                //             src={technicianUser.profileImage || ""}
                //             alt={technicianUser.name}
                //           />

                //           <AvatarFallback>
                //             {initials}
                //           </AvatarFallback>
                //         </Avatar>

                //         <div className="min-w-0 flex-1">
                //           <p className="truncate text-sm font-semibold">
                //             {technicianUser.name}
                //           </p>

                //           <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                //             <span className="flex items-center gap-1">
                //               <BriefcaseBusiness className="size-3" />
                //               {technician.experience} years
                //             </span>

                //             <span className="flex items-center gap-1">
                //               <Star className="size-3 fill-current text-yellow-500" />
                //               {technician.averageRating.toFixed(1)}
                //             </span>
                //           </div>
                //         </div>
                //       </div>

                //       {/* SKILLS */}

                //       {technician.skills.length > 0 && (
                //         <div className="mt-4 flex flex-wrap gap-1.5">
                //           {technician.skills
                //             .slice(0, 3)
                //             .map((skill) => (
                //               <Badge
                //                 key={skill}
                //                 variant="outline"
                //                 className="text-xs font-normal"
                //               >
                //                 {skill}
                //               </Badge>
                //             ))}
                //         </div>
                //       )}
                //     </div>
                //   </CardContent>

                //   <CardFooter className="grid grid-cols-2 gap-3 border-t pt-6">
                //     <Button
                //       variant="outline"
                //       asChild
                //     >
                //       <Link
                //         href={`/technicians/${technician.id}`}
                //       >
                //         Technician
                //       </Link>
                //     </Button>

                //     <Button asChild>
                //       <Link href={`/services/${service.id}`}>
                //         View Service
                //         <ArrowRight className="ml-2 size-4" />
                //       </Link>
                //     </Button>
                //   </CardFooter>
                // </Card>
                <Card
                    key={service.id}
                    className="group relative flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* CLICKABLE WHOLE CARD */}
                    <Link
                      href={`/services/${service.id}`}
                      className="absolute inset-0 z-0"
                      aria-label={`View ${service.name}`}
                    >
                      <span className="sr-only">
                        View {service.name}
                      </span>
                    </Link>

                    {/* CARD TOP */}
                    <div className="relative z-[1] flex items-center justify-between border-b bg-muted/30 px-6 py-4 pointer-events-none">
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
                          Unavailable
                        </Badge>
                      )}
                    </div>

                    {/* SERVICE INFO */}
                    <CardHeader className="relative z-[1] pointer-events-none">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Wrench className="size-6" />
                      </div>

                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {service.name}
                      </CardTitle>

                      <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {service.description}
                      </p>
                    </CardHeader>

                    <CardContent className="relative z-[1] flex-1 space-y-5 pointer-events-none">
                      {/* PRICE + LOCATION */}
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
                          <span>{service.location}</span>
                        </div>
                      </div>

                      {/* TECHNICIAN */}
                      <div className="rounded-xl border bg-muted/20 p-4">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Service Provider
                        </p>

                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={technicianUser.profileImage || ""}
                              alt={technicianUser.name}
                            />

                            <AvatarFallback>
                              {initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {technicianUser.name}
                            </p>

                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BriefcaseBusiness className="size-3" />
                                {technician.experience} years
                              </span>

                              <span className="flex items-center gap-1">
                                <Star className="size-3 fill-current text-yellow-500" />
                                {technician.averageRating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* SKILLS */}
                        {technician.skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {technician.skills
                              .slice(0, 3)
                              .map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  {skill}
                                </Badge>
                              ))}
                          </div>
                        )}
                      </div>
                    </CardContent>

                    {/* ACTIONS */}
                    <CardFooter className="relative z-10 grid grid-cols-2 gap-3 border-t pt-6">

                      {/* TECHNICIAN PROFILE */}
                      <Button
                        variant="outline"
                        asChild
                      >
                        <Link href={`/technicians/${technician.id}`}>
                          Technician
                        </Link>
                      </Button>

                      {/* BOOK NOW */}
                      <Button asChild>
                        <Link
                          href={`/bookings/create?serviceId=${service.id}`}
                        >
                          Book Now
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>

                    </CardFooter>
                  </Card>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_action/authActions";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(
    registerAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-2">
      <Card className="space-y-1 p-4">

        {/* Name */}
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        {/* Password */}
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        {/* <div className=" "> */}

{/* Phone - Optional */}
        <Input
          name="phone"
          type="tel"
          placeholder="Phone number (Optional)"
        />

        {/* Address - Optional */}
        <Input
          name="address"
          type="text"
          placeholder="Address (Optional)"
        />
        {/* </div> */}
        

        {/* Profile Photo - Optional */}
        <Input
          name="profilePhoto"
          type="url"
          placeholder="Profile photo URL (Optional)"
        />

        {/* Role */}
        <select
          name="role"
          defaultValue="CUSTOMER"
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          required
        >
          <option value="CUSTOMER">Customer</option>
          <option value="TECHNICIAN">Technician</option>
        </select>

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Creating Account..." : "Create Account"}
        </Button>

      </Card>
    </form>
  );
};

export default RegisterForm;
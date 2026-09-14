"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}


export const loginAction = async (prevState : LoginState , formData: FormData) => {

    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });

        // redirect("/dashboard")
    }

    return result
}

type regState ={
    success: boolean;
    statusCode: number;
    message: string;
}

export const registerAction = async (
  prevState: regState, formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const phone = formData.get("phone");
  const address = formData.get("address");
  const profilePhoto = formData.get("profilePhoto");

  const payload = {
    name,
    email,
    password,
    role,

    phone: phone || undefined,
    address: address || undefined,
    profilePhoto: profilePhoto || undefined,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const text = await res.text();

  if (!text) {
    return {
      success: false,
      statusCode: res.status,
      message: "Backend returned an empty response",
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      statusCode: res.status,
      message: "Backend returned an invalid JSON response",
    };
  }
};


export const logoutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
};

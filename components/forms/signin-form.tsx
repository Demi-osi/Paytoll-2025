"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ExclamationCircleIcon } from '@heroicons/react/solid';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from 'react-dom';
import { authenticate } from "@/app/lib/action";
import { useSession } from "next-auth/react";
//import { authenticate } from '@/app/lib/action';
//import { useAction } from "next/actions"; 

export function SigninForm() {
  const { data: session, status } = useSession();
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  
 /* const [errorMessage, formAction, isPending] = useFormState(
  authenticate,
  undefined,
);*/

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  

  return (
    <div className="w-full max-w-md">
      <form action={dispatch}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username or email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <div className="mt-4 text-left text-sm">
              <Link className="underline ml-2" href="">
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full">Sign In</button>
          </CardFooter>
          {/*errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )*/}
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
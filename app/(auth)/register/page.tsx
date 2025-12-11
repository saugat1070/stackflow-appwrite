"use client";
import { useAuthStore } from "@/store/auth.store";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className="flex w-full flex-col space-y-2">{children}</div>;
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default function RegisterPage() {
  const router = useRouter()
  const { createAccount } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!name || !email || !password) {
      setError(() => "please provide email,password and name");
    }
    try {
      setIsLoading(() => true);
      setError(() => "");
      const response = await createAccount(
        String(name),
        String(email),
        String(password)
      );
      if(response.success){
        toast.success("Signup successful,please login now");
        router.push("/login")
      }
      if (response.error) {
        setError(() => response.error!.message);
      }
    } catch (error: any) {
      setError(() => error?.message);
      setIsLoading(() => false);
    } finally {
      setIsLoading(() => false);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Riverflow
      </h2>
      {/* <BottomGradient/> */}
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 ">
        Signup with riverflow if you you don't have an account.
        <br /> If you already have an account,{" "}
        <Link href={"/login"} className="text-orange-500 hover:underline ">
          login
        </Link>{" "}
        to riverflow
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2  md:flex-col md:space-y-3 ">
          <LabelInputContainer>
            <Label className="" htmlFor="name">
              Name:
            </Label>
            <Input
              className="text-black dark:text-white"
              id="name"
              name="name"
              placeholder="Tyler"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              className="text-black dark:text-white"
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              className="text-black dark:text-white"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up
            <BottomGradient />
          </button>

          <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>
            <button
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer"
              type="button"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                GitHub
              </span>
              <BottomGradient />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

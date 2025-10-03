// src/components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/auth";

// Import shadcn/ui Form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginForm() {
  // 1. Initialize the form using useForm, this now holds all form state
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useLogin();
  const router = useRouter();

  // The onSubmit function receives validated data from react-hook-form
  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Login successful! Redirecting...", {});
        router.replace("/dashboard");
      },
      onError: (error) => {
        // 4. Update the toast to an error message
        console.log({ error });
        toast.error(error.message || "An unknown error occurred.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0">
          <div className="flex items-center space-x-3">
            {/* LOGO IMAGE (Pastikan file berada di /public/logo.png) */}
            <Image
              src="/logo.png"
              alt="ANTARJAYA Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            {/* <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">
              ANTARJAYA MAHAJDA MAKMUR
            </h2> */}
            <div>
              <CardTitle className="text-xl">
                Daily Inspection Monitoring (DIM)
              </CardTitle>
              <CardDescription>
                Masukkan kredensial Anda untuk mengakses dashboard.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 2. Wrap the form in the <Form> component */}
          <Form {...form}>
            {/* 3. Use form.handleSubmit in the onSubmit handler */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* 4. Use FormField for each input to connect it to react-hook-form state */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukkan Email Anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan Kata Sandi Anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 5. Display mutation error if it exists */}
              {isError && (
                <Alert variant="destructive">
                  {/* Assuming the error object has a message property */}
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}

              {/* 6. Use `isPending` from the mutation for loading state */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1">
              <p>
                <strong>Mechanic:</strong> mechanic@gmail.com / password
              </p>
              <p>
                <strong>Leader:</strong> leader@gmail.com / password
              </p>
              <p>
                <strong>Admin:</strong> admin@gmail.com / password
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

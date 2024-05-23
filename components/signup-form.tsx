"use client";
import React, { useTransition } from "react";
import TextField from "./text-field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "@/lib/zod/signup";

type Props = {};

type Schema = z.infer<typeof schema>;

const resolver = zodResolver(schema);

const SignUpForm = (props: Props) => {
  const [isPending, transition] = useTransition();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    shouldFocusError: true,
    resolver,
  });

  const onSubmit = (formData: Schema) => {
    transition(async () => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data?.error) {
        console.error(data.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 space-y-6 rounded-lg border border-slate-200 p-8"
    >
      <h1 className="mb-14 text-center text-3xl font-medium">S&apos;incrire</h1>
      <TextField
        {...register("firstName", { required: "Nom est requis" })}
        label="Nom"
        type="text"
        icon="material-symbols-light:person-outline"
        error={errors.firstName?.message}
        placeholder="John"
      />
      <TextField
        {...register("lastName", { required: "Prenom est requis" })}
        label="Prenom"
        type="text"
        icon="material-symbols-light:person-outline"
        error={errors.lastName?.message}
        placeholder="Doe"
      />

      <TextField
        {...register("nationalId", { required: "CIN est requis" })}
        label="CIN"
        type="text"
        icon="material-symbols-light:id-card-outline"
        error={errors.nationalId?.message}
        placeholder="R123456"
      />
      <TextField
        {...register("email", { required: "Addresse Email est requis" })}
        label="Adresse Email"
        type="email"
        icon="material-symbols-light:alternate-email"
        error={errors.email?.message}
        placeholder="john@example.com"
      />
      <TextField
        label="Mot de passe"
        type="password"
        icon="material-symbols-light:password"
        error={errors.password?.message}
        {...register("password", { required: "Mot de passe est requis" })}
        placeholder="Your password"
      />
      <TextField
        label="Confirmer mot de passe"
        type="password"
        icon="material-symbols-light:password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Confirmation de mot de passe est requis",
        })}
        placeholder="Your password"
      />
      <button
        disabled={isPending}
        className="w-full rounded bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:bg-slate-500"
      >
        S&apos;incrire
      </button>
    </form>
  );
};

export default SignUpForm;

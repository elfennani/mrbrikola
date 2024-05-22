"use client";
import React from "react";
import TextField from "./text-field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

type Schema = {
  username: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    shouldFocusError: true,
  });

  console.log(watch("username"));

  return (
    <form
      onSubmit={handleSubmit(console.log)}
      className="w-96 space-y-6 rounded-lg border border-slate-200 p-8"
    >
      <h1 className="mb-14 text-center text-3xl font-medium">Se connecter</h1>
      <TextField
        {...register("username", { required: "Addresse Email est requis" })}
        label="Adresse Email"
        type="text"
        icon="material-symbols-light:alternate-email"
        error={errors.username?.message}
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
      <button className="w-full rounded bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:bg-slate-500">
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;

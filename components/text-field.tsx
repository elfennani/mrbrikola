"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  label: string;
  icon?: string;
  error?: string;
} & Omit<InputProps, "className">;

const TextField = (
  { label, icon, error, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <label
      className={cn(
        "flex w-full flex-col gap-1 text-xs font-medium text-slate-800 transition-colors focus-within:text-orange-500",
        error && "text-red-500",
      )}
    >
      {label}
      <div className="relative">
        {icon && (
          <Icon
            icon={icon}
            className="absolute left-3 top-1/2 size-5 -translate-y-1/2 p-0"
          />
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full rounded border border-slate-200 px-4 py-3 text-sm font-normal text-inherit text-slate-900 outline-none transition-colors focus:border-orange-500",
            icon && "pl-10",
          )}
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </label>
  );
};

export default forwardRef(TextField);

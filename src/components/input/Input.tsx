import { forwardRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { type InputProps } from "@/types/inputProps";
import styles from "./Input.module.css";
import { slugify } from "@/lib/slugify";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", label, error, name, id, onChange, ...props },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    const inputType = type === "password" && show ? "text" : type;
    const toggleShow = () => setShow((prev) => !prev);

    const fallbackId =
      id ??
      name ??
      (label
        ? `input-${slugify(label)}`
        : `input-${Math.random().toString(36).substring(2, 9)}`);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value); // update local state
      if (onChange) onChange(e); // forward to parent if neede
    };

    const getValidationMessage = (): string | null => {
      if (!value) return null;

      if (name === "username") {
        const isValid = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(value);
        if (!isValid) {
          return "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";
        }
      }

      if (name === "password") {
        const longEnough = value.length >= 15;
        const secureEnough =
          value.length >= 8 &&
          /[a-z]/.test(value) && // contains lowercase
          /\d/.test(value); // contains number

        if (!(longEnough || secureEnough)) {
          return "Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.";
        }
      }

      if (name === "email") {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValid) {
          return "Please enter a valid email address.";
        }
      }

      return null;
    };

    const validationMessage = getValidationMessage();

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={fallbackId}
            className={cn(
              "block text-sm font-medium text-[var(--label)]",
              styles.inputlabel
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex flex-col items-end  justify-center ">
          <input
            id={fallbackId}
            type={inputType}
            name={name}
            className={cn(
              "w-full  rounded-md border shadow-sm",
              "border-[var(--input)] transprent text-[var(--foreground)] focus:outline-none focus:ring-[var(--ring)] focus:ring-1",
              error &&
                "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500",
              styles.input,
              className
            )}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          {/* 👁 Eye icon toggle */}
          {type === "password" && (
            <span
              className="absolute mr-3 cursor-pointer text-[var(--foreground)] dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              onClick={toggleShow}
              tabIndex={-1}
            >
              {show ? <GoEyeClosed size={18} /> : <GoEye size={18} />}
            </span>
          )}
        </div>
        {validationMessage && (
          <p className="text-sm text-red-500 ">{validationMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/// <reference types="nativewind/types" />

declare module "*.css";

declare namespace React {
  interface HTMLAttributes<T> {
    className?: string;
  }
}

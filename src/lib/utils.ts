import clsx, { type ClassValue } from "clsx";
import { User } from "lucia";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDiscordImage(user: User): string {
  const imageBaseUrl = "https://cdn.discordapp.com/avatars";
  const avatarUrl = `${imageBaseUrl}/${user.discordId}/${user.avatar}.png`;
  return avatarUrl;
}

export function fallBackLetters(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join(" ");
}

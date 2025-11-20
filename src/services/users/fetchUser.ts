import { Fetch } from "@/libs/instance";
import type { User } from "@/types/user";

export const getUser = async (): Promise<User[]> => {
  const res = await Fetch("/users", {
    next: { revalidate: 60 },
  });
  return res as User[];
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await Fetch(`/users/${id}`, {
    next: { revalidate: 60 },
  });
  return res as User;
};

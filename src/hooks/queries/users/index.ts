import { useQuery } from "@tanstack/react-query";
import { getUser, getUserById } from "@/services/users/fetchUser";

export const useUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
};

export const useDetailUser = (id: number) => {
  return useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => getUserById(id),
  });
};

import DetailUser from "@/features/users/detail";
import { getUserById } from "@/services/users/fetchUser";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const userId = Number(params.id);

  try {
    const user = await getUserById(userId);
    return {
      title: `${user.name} – User Detail`,
      description: `Profile details of ${user.name}.`,
      openGraph: {
        title: `${user.name} – User Detail`,
        description: `User: ${user.name}, Email: ${user.email}`,
        type: "profile",
        url: `/users/${userId}`,
      },
    };
  } catch (error) {
    return {
      title: "User Not Found",
      description: "The requested user could not be found.",
    };
  }
}

export default function Page({ params }: PageProps) {
  const id = Number(params.id);

  return (
    <div>
      <DetailUser id={id} />
    </div>
  );
}

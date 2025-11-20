"use client";

import Error from "@/components/ui/error";
import DetailSkeleton from "@/components/ui/skeleton/detail-skeleton";
import { useDetailUser } from "@/hooks/queries/users";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

export default function DetailUser({ id }: Props) {
  const { data, isLoading, isError } = useDetailUser(id);
  const router = useRouter();

  if (isError) return <Error showBack onBack={() => router.back()} />;

  return (
    <>
      <Link
        href="/"
        className="inline-block p-2 text-sm hover:bg-gray-300/50 border-gray-300 border rounded-lg"
      >
        Back to list
      </Link>
      <h1 className="text-2xl my-4 font-semibold text-blue-500">User Detail</h1>
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="border border-gray-300 bg-white p-6 rounded-xl shadow-md space-y-4">
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Username:</span> {data?.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {data?.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {data?.phone}
            </p>
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a
                href={`https://${data?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {data?.website}
              </a>
            </p>
          </div>

          <hr />
          <div>
            <h2 className="font-semibold text-lg">Company</h2>
            <p>{data?.company?.name}</p>
            <p className="text-gray-600 italic">&ldquo;{data?.company?.catchPhrase}&rdquo;</p>
          </div>

          <hr />
          <div>
            <h2 className="font-semibold text-lg">Address</h2>
            <p>
              {data?.address?.street}, {data?.address?.suite}
            </p>
            <p>
              {data?.address?.city}, {data?.address?.zipcode}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

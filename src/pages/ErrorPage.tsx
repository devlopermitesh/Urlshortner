import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export const ErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? "The page you are looking for could not be found.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-4 text-gray-600">{message}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

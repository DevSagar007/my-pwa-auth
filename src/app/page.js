import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-5">Hello PWA App !</h1>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 h-[50px] text-sm font-bold text-heading hover:bg-primary hover:text-white hover:border-primary"
          >
            Login Here
          </Link>
        </div>
      </main>
    </div>
  );
}
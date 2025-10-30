export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
          Hello World!
        </h1>
        <p className="text-2xl text-white/90 mb-4">
          Welcome to Firebase + Next.js
        </p>
        <p className="text-lg text-white/80">
          Deployed from GitHub Actions
        </p>
      </div>
    </main>
  );
}

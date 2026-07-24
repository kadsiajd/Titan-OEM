import { LoginForm } from '@/features/auth/components/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access the OEM management console.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

import { cookies } from 'next/headers';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { verifyAdminToken, ADMIN_PASSWORD } from '../../lib/adminAuth';

export const metadata = {
  title: 'Admin Dashboard | Anjali Boutique',
  description: 'Manage boutique blog posts, collections, contact info, and customer inquiries.'
};

export default async function AdminPage() {
  if (!ADMIN_PASSWORD) {
    return (
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 rounded-[32px] border border-zinc-200 bg-secondary p-10 shadow-premium">
          <h1 className="text-3xl font-semibold text-zinc-900">Admin password missing</h1>
          <p className="text-sm leading-7 text-zinc-600">
            Configure an <code>ADMIN_PASSWORD</code> in <code>.env.local</code> to enable admin access. Do not store the password in source files.
          </p>
          <p className="text-sm leading-7 text-zinc-600">
            Create <code>.env.local</code> at the project root and add a strong secret value there.
          </p>
        </div>
      </section>
    );
  }

  const authCookie = cookies().get('admin-auth')?.value;
  const isAuthenticated = verifyAdminToken(authCookie);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

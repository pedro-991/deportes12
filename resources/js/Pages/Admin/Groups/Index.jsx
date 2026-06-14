import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ groups = [] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Grupos" />
      <div className="py-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Grupos</h1>
            <Link href={route('admin.groups.create')} className="px-4 py-2 bg-blue-600 text-white rounded">
              Crear/Generar Grupos
            </Link>
          </div>

          {groups.length === 0 && (
            <div className="bg-white p-6 rounded shadow">No hay grupos creados.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((g) => (
              <div key={g.id} className="bg-white p-4 rounded shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{g.name}</div>
                    <div className="text-xs text-gray-500">{g.description}</div>
                  </div>
                  <div className="text-sm text-gray-600">{g.teams?.length ?? 0} equipos</div>
                </div>
                <ul className="text-sm divide-y divide-gray-100">
                  {(g.teams || []).map((t) => (
                    <li key={t.id} className="py-2 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.name}</div>
                        {t.city && <div className="text-xs text-gray-500">{t.city}</div>}
                      </div>
                      <Link href={route('admin.teams.show', t.id)} className="text-xs text-blue-600">Ver</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
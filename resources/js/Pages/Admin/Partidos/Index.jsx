import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ groups = [] }) {
  const { data, setData, post, processing } = useForm({ group_id: null });

  function generar(groupId) {
    if (!confirm('Generar enfrentamientos para este grupo?')) return;
    setData('group_id', groupId);
    post(route('admin.partidos.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Partidos por Grupo" />
      <div className="py-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Partidos</h1>
            <Link href={route('admin.groups.index')} className="px-3 py-2 bg-gray-100 rounded">Grupos</Link>
          </div>

          {groups.map(g => (
            <div key={g.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs text-gray-500">{g.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generar(g.id)}
                    disabled={processing}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Generar partidos
                  </button>
                  <div className="text-sm text-gray-600">{(g.teams || []).length} equipos</div>
                </div>
              </div>

              <div className="mt-2">
                <div className="text-sm font-medium mb-2">Enfrentamientos</div>
                <ul className="divide-y divide-gray-100">
                  {(g.partidos || []).length === 0 && <li className="py-2 text-sm text-gray-500">No hay enfrentamientos</li>}
                  {(g.partidos || []).map(e => (
                    <li key={e.id} className="py-2 flex items-center justify-between">
                      <div className="text-sm">
                        {e.team1?.name || e.vs1} <span className="text-gray-400">vs</span> {e.team2?.name || e.vs2}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(e.created_at).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
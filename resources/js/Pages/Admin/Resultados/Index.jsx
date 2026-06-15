import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ groups = [] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Resultados" />
      <div className="py-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Resultados</h1>
            <Link href={route('admin.resultados.create')} className="px-3 py-2 bg-green-600 text-white rounded">Ingresar resultado</Link>
          </div>

          {groups.map(g => (
            <div key={g.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-xs text-gray-500">{g.description}</div>
                </div>
                <div className="text-sm text-gray-600">{(g.partidos || []).length} enfrentamientos</div>
              </div>

              <ul className="divide-y divide-gray-100">
                {(g.partidos || []).length === 0 && <li className="py-2 text-sm text-gray-500">No hay enfrentamientos</li>}
                {(g.partidos || []).map(e => {
                  // buscar goles asociados
                  const resA = (e.resultados || []).find(r => r.team_id === e.vs1);
                  const resB = (e.resultados || []).find(r => r.team_id === e.vs2);
                  return (
                    <li key={e.id} className="py-2 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{e.team1?.name || e.vs1}</span>
                        <span className="text-gray-500 mx-2">({resA?.goles ?? '---'})</span>
                        <span className="text-gray-400">vs</span>
                        <span className="text-gray-500 mx-2">({resB?.goles ?? '---'})</span>
                        <span className="font-medium ms-2">{e.team2?.name || e.vs2}</span>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(e.created_at).toLocaleDateString()}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ team = {}, players = [] }) {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

  const playersList = team.players ?? players ?? [];

  function deletePlayer(id) {
    if (!confirm('¿Eliminar jugador?')) return;
    Inertia.delete(route('admin.players.destroy', { player: id }));
  }

  function mostrar_en_console() {
    console.log('Equipo:', team);
  }
  
  mostrar_en_console();

  return (
    <AuthenticatedLayout>
      <Head title={team.name || 'Equipo'} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {team.logo_url && (
                    <img
                      src={team.logo_url}
                      alt={team.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
                    <div className="text-sm text-gray-500">
                      {team.tournament?.name || '—'} · {team.sport?.name || '—'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={route('admin.teams.edit', team.id)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                  >
                    Editar
                  </Link>
                  <Link
                    href={route('admin.teams.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Volver
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="text-xs font-medium text-blue-800">Jugadores</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {playersList.length}
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50">
                  <div className="text-xs font-medium text-yellow-800">Género</div>
                  <div className="text-sm mt-1 text-gray-900">
                    {team.type || '—'}
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-purple-50">
                  <div className="text-xs font-medium text-purple-800">Color</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md border" style={{ background: team.color || '#ffffff' }} />
                    <div className="text-sm text-gray-700">{team.color || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-sm text-gray-700">
                  {team.description || 'Sin descripción.'}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detalles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-medium text-gray-900">Alias</div>
                    <div>{team.alias || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Torneo</div>
                    <div>{team.tournament?.name || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Deporte</div>
                    <div>{team.sport?.name || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Creado</div>
                    <div>{formatDate(team.created_at)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Jugadores</h3>
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {playersList.map((p, idx) => (
                        <tr key={p.id}>
                          <td className="px-4 py-2 text-sm text-gray-700">{idx + 1}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{p.first_name} {p.last_name}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{p.gender}</td>
                          <td className="px-4 py-2 text-sm text-right">
                            <div className="inline-flex gap-2">
                              <Link
                                href={route('admin.players.edit', { player: p.id })}
                                className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                              >
                                Editar
                              </Link>
                              <button
                                type="button"
                                onClick={() => deletePlayer(p.id)}
                                className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
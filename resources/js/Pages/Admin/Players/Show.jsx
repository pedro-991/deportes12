import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ player = {} }) {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

  function deletePlayer(id) {
    if (!confirm('¿Eliminar jugador?')) return;
    Inertia.delete(route('player.destroy', { player: id }));
  }

  return (
    <AuthenticatedLayout>
      <Head title={`${player.first_name || ''} ${player.last_name || ''}`.trim() || 'Jugador'} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {player.photo_url && (
                    <img
                      src={player.photo_url}
                      alt={`${player.first_name} ${player.last_name}`}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {player.first_name} {player.last_name}
                    </h1>
                    <div className="text-sm text-gray-500">
                      {player.team?.name || '—'} · {player.team?.sport?.name || '—'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={route('admin.players.edit', player.id)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    onClick={() => deletePlayer(player.id)}
                    className="inline-flex items-center px-4 py-2 bg-red-100 border border-transparent rounded-md text-sm text-red-700 hover:bg-red-200"
                  >
                    Eliminar
                  </button>

                  <Link
                    href={route('admin.players.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Volver
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="text-xs font-medium text-blue-800">Edad</div>
                  <div className="text-2xl font-bold text-blue-600">{player.age ?? '-'}</div>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50">
                  <div className="text-xs font-medium text-yellow-800">Número</div>
                  <div className="text-sm mt-1 text-gray-900">{player.number ?? '-'}</div>
                </div>

                <div className="p-4 rounded-lg border bg-purple-50">
                  <div className="text-xs font-medium text-purple-800">Género</div>
                  <div className="mt-2 text-sm text-gray-700">{player.gender || '—'}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Observaciones</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {player.observations || 'Sin observaciones.'}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detalles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-medium text-gray-900">DNI</div>
                    <div>{player.dni || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Equipo</div>
                    <div>{player.team?.name || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Creado</div>
                    <div>{formatDate(player.created_at)}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Última actualización</div>
                    <div>{formatDate(player.updated_at)}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
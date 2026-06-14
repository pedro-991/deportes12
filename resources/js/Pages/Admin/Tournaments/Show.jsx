import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ tournament = {} }) {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

  return (
    <AuthenticatedLayout>
      <Head title={tournament.name || 'Torneo'} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {tournament.logo_url && (
                    <img
                      src={tournament.logo_url}
                      alt={tournament.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{tournament.name}</h1>
                    <div className="text-sm text-gray-500">
                      {tournament.organization?.name || '—'} · {tournament.sport?.name || '—'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={route('admin.tournaments.edit', tournament.id)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                  >
                    Editar
                  </Link>
                  <Link
                    href={route('admin.tournaments.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Volver
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="text-xs font-medium text-blue-800">Fechas</div>
                  <div className="text-sm text-gray-900">
                    {formatDate(tournament.date_init)} — {formatDate(tournament.date_end)}
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-yellow-50">
                  <div className="text-xs font-medium text-yellow-800">Estado</div>
                  <div className="text-sm mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tournament.status === 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : tournament.status === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tournament.status === 0 ? 'En Proceso' : tournament.status === 1 ? 'Finalizado' : 'Eliminado'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-purple-50">
                  <div className="text-xs font-medium text-purple-800">Equipos</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {tournament.teams ? tournament.teams.length : 0}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-sm text-gray-700">
                  {tournament.description || 'Sin descripción.'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detalles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-medium text-gray-900">Tipo</div>
                    <div>{tournament.type || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Prioridad</div>
                    <div>{tournament.priority ?? '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Min Jugadores</div>
                    <div>{tournament.min_players ?? '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Max Jugadores</div>
                    <div>{tournament.max_players ?? '—'}</div>
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
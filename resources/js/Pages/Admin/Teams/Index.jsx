import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ teams = {} }) {
  return (
    <AuthenticatedLayout>
      <Head title="Equipos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Equipos</h2>
                <div className="flex items-center gap-3">
                  <Link
                    href={route('admin.teams.create')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                  >
                    Nuevo Equipo
                  </Link>
                  <Link
                    href={route('admin.teams.index')}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Refrescar
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alias</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deporte</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Torneo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {(teams.data || []).map((team) => (
                      <tr key={team.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {team.logo_url && (
                              <img src={team.logo_url} alt={team.name} className="h-8 w-8 rounded-full mr-3 object-cover" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{team.name}</div>
                              {team.color && <div className="text-xs text-gray-500">Color: {team.color}</div>}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.alias || '—'}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-2 py-1 rounded-md text-xs bg-gray-100">{team.type || '—'}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.sport?.name || '—'}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.tournament?.name || '—'}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {team.status === 1 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactivo</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={route('admin.teams.show', team.id)} className="text-blue-600 hover:text-blue-900 mr-3">Ver</Link>
                          <Link href={route('admin.teams.edit', team.id)} className="text-green-600 hover:text-green-900 mr-3">Editar</Link>
                          <Link
                            href={route('admin.teams.destroy', team.id)}
                            method="delete"
                            as="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              if (!confirm('¿Eliminar equipo?')) e.preventDefault();
                            }}
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {(!teams.data || teams.data.length === 0) && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                          Sin equipos registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                {/* Paginación simple si viene en props */}
                {teams.meta && teams.links && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Mostrando {teams.meta.from ?? 0} - {teams.meta.to ?? 0} de {teams.meta.total ?? 0}
                    </div>
                    <div className="space-x-2">
                      {teams.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.url || '#'}
                          className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
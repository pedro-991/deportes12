import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { players, filters } = usePage().props;

  function handleDelete(id) {
    Swal.fire({
      title: '¿Eliminar jugador?',
      text: 'Esta acción eliminará el jugador permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('admin.players.destroy', id), {
          onSuccess: () => {
            Swal.fire('Eliminado', 'Jugador eliminado correctamente.', 'success');
          },
          onError: () => {
            Swal.fire('Error', 'No se pudo eliminar el jugador.', 'error');
          },
        });
      }
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Jugadores" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Jugadores</h2>
                <div className="flex items-center gap-3">
                  <Link
                    href={route('admin.players.create')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                  >
                    Nuevo Jugador
                  </Link>
                  <Link
                    href={route('admin.players.index')}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Refrescar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-md p-4 mb-6">
          <form method="GET" action="/admin/players" className="flex gap-3">
            <input name="search" defaultValue={filters?.search || ''} placeholder="Buscar por nombre, apellido o DNI" className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            <select name="gender" defaultValue={filters?.gender || ''} className="px-3 py-2 border rounded-md">
              <option value="">Todos</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Buscar</button>
          </form>
        </div>

        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">DNI</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Género</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players?.data?.length > 0 ? (
                players.data.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.first_name} {p.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.dni || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex gap-3 justify-end items-center">
                        <Link href={`/admin/players/${p.id}`} className="text-indigo-600 hover:text-indigo-900">Ver</Link>
                        <Link href={`/admin/players/${p.id}/edit`} className="text-gray-600 hover:text-gray-900">Editar</Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                          title="Eliminar jugador"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-7 4h10" />
                          </svg>
                          <span className="ml-2 hidden sm:inline">Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No hay jugadores</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Mostrando {players?.from || 0} - {players?.to || 0} de {players?.total || 0}
          </div>
          <div className="flex gap-2">
            {players?.prev_page_url ? (
              <Link href={players.prev_page_url} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Anterior</Link>
            ) : (
              <button disabled className="px-3 py-1 bg-gray-50 text-gray-400 rounded">Anterior</button>
            )}
            {players?.next_page_url ? (
              <Link href={players.next_page_url} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Siguiente</Link>
            ) : (
              <button disabled className="px-3 py-1 bg-gray-50 text-gray-400 rounded">Siguiente</button>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
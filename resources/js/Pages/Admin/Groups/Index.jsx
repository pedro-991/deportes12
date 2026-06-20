import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ groups = [] }) {

  function handleDelete(id) {
    Swal.fire({
      title: '¿Eliminar grupo?',
      text: 'Esta acción eliminará el grupo y sus enlaces con equipos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('admin.groups.destroy', id), {
          onSuccess: () => {
            Swal.fire('Eliminado', 'Grupo eliminado correctamente.', 'success');
          },
          onError: () => {
            Swal.fire('Error', 'No se pudo eliminar el grupo.', 'error');
          },
        });
      }
    });
  }

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
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600">{g.teams?.length ?? 0} equipos</div>
                    <button
                      type="button"
                      onClick={() => handleDelete(g.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar grupo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-7 4h10" />
                      </svg>
                    </button>
                  </div>
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
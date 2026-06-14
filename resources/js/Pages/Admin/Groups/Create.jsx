import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ teams = [] }) {
  const { post, processing } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    if (!confirm('¿Generar grupos automáticamente con los equipos disponibles?')) return;
    post(route('admin.groups.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Crear Grupos" />
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Generar grupos automáticamente</h2>
              <Link href={route('admin.groups.index')} className="text-sm text-gray-600 hover:underline">
                Volver
              </Link>
            </div>

            <p className="mb-4">Equipos disponibles: <strong>{teams.length}</strong></p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-sm text-gray-700">
                Reglas aplicadas:
                <ul className="list-disc pl-5 mt-2">
                  <li>Máximo 4 grupos.</li>
                  <li>Balanceo lo más parejo posible (diferencia ≤ 1).</li>
                  <li>Si hay exactamente 4 equipos → 2 grupos de 2.</li>
                </ul>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 disabled:opacity-50"
                >
                  Generar grupos
                </button>

                <Link
                  href={route('admin.groups.index')}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
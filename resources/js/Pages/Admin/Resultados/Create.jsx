import React, { useState, useMemo } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ groups = [] }) {
  const { data, setData, post, processing } = useForm({
    group_id: groups.length ? groups[0].id : null,
    partido_id: null,
    goles_vs1: '',
    goles_vs2: '',
  });

  const partidos = useMemo(() => {
    const g = groups.find(x => x.id === Number(data.group_id));
    return g ? (g.partidos || []) : [];
  }, [data.group_id, groups]);

  // set default enfrentamiento when group changes
  React.useEffect(() => {
    if (partidos.length > 0) {
      setData('partido_id', partidos[0].id);
    } else {
      setData('partido_id', null);
    }
  }, [data.group_id, partidos.length]); // eslint ignore

  function submit(e) {
    e.preventDefault();
    post(route('admin.resultados.store'));
  }

  const selectedEnf = partidos.find(x => x.id === Number(data.partido_id)) || null;

  return (
    <AuthenticatedLayout>
      <Head title="Ingresar Resultado" />
      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Ingresar Resultado</h2>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Grupo</label>
                <select name="group_id" value={data.group_id || ''} onChange={e => setData('group_id', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md">
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Partido</label>
                <select name="partido_id" value={data.partido_id || ''} onChange={e => setData('partido_id', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md">
                  <option value="">Selecciona un partido</option>
                  {partidos.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.team1?.name || e.vs1} vs {e.team2?.name || e.vs2}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEnf && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{selectedEnf.team1?.name || selectedEnf.vs1}</label>
                    <input type="number" min="0" value={data.goles_vs1} onChange={e => setData('goles_vs1', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{selectedEnf.team2?.name || selectedEnf.vs2}</label>
                    <input type="number" min="0" value={data.goles_vs2} onChange={e => setData('goles_vs2', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
                <Link href={route('admin.resultados.index')} className="text-sm text-gray-600">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
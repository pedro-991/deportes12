import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ tournaments }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Panel de Administración
                            </h2>
                            
                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                        Torneos Activos
                                    </h3>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {tournaments.data.filter(t => t.status === 0).length}
                                    </p>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                                        Torneos Finalizados
                                    </h3>
                                    <p className="text-3xl font-bold text-green-600">
                                        {tournaments.data.filter(t => t.status === 1).length}
                                    </p>
                                </div>
                                
                                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                                        Total Torneos
                                    </h3>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {tournaments.data.length}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Acciones rápidas */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Acciones Rápidas
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={route('admin.tournaments.create')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Nuevo Torneo
                                    </Link>
                                    <Link
                                        href={route('admin.teams.create')}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Nuevo Equipo
                                    </Link>
                                    <Link
                                        href={route('admin.players.create')}
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Nuevo Jugador
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Lista de torneos recientes */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Torneos Recientes
                                    </h3>
                                    <Link
                                        href={route('admin.tournaments.index')}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Ver todos →
                                    </Link>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Torneo
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Deporte
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fechas
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tournaments.data.map((tournament) => (
                                                <tr key={tournament.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {tournament.logo && (
                                                                <img
                                                                    src={tournament.logo_url}
                                                                    alt={tournament.name}
                                                                    className="h-8 w-8 rounded-full mr-3"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {tournament.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {tournament.organization?.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {tournament.sport?.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(tournament.date_init).toLocaleDateString()} - {new Date(tournament.date_end).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            tournament.status === 0 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : tournament.status === 1 
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {tournament.status === 0 
                                                                ? 'En Proceso' 
                                                                : tournament.status === 1 
                                                                ? 'Finalizado'
                                                                : 'Eliminado'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('admin.tournaments.show', tournament.id)}
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                        >
                                                            Ver
                                                        </Link>
                                                        <Link
                                                            href={route('admin.tournaments.edit', tournament.id)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Editar
                                                        </Link>
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
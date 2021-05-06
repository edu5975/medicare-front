import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ('../views/Type.vue')
    },
    {
        path: '/registropaciente',
        name: 'Registropaciente',
        component: () =>
            import ('../views/RPaciente.vue')
    },
    {
        path: '/registromedico',
        name: 'Registromedico',
        component: () =>
            import ('../views/RMedico.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () =>
            import ('../views/Logout.vue')
    },
    {
        path: '/lobby',
        name: 'Lobby',
        component: () =>
            import ('../views/Lobby.vue')
    },
    {
        path: '/tienda',
        name: 'Tienda',
        component: () =>
            import ('../views/tienda/inicio.vue')
    },
    {
        path: '/carrito',
        name: 'Carrito',
        component: () =>
            import ('../views/paciente/carrito.vue')
    },
    {
        path: '/pago',
        name: 'Pago',
        component: () =>
            import ('../views/paciente/cobro.vue')
    },
    {
        path: '/pedidos',
        name: 'Pedidos',
        component: () =>
            import ('../views/paciente/pedidos.vue')
    },
    {
        path: '/pedidos/detalle/:id',
        name: 'PedidosDetalle',
        component: () =>
            import ('../views/paciente/pedidoDetalle.vue')
    },
    {
        path: '/medicos',
        name: 'BusquedaMedicos',
        component: () =>
            import ('../views/paciente/busquedaMedicos.vue')
    },
    //MEDICO
    {
        path: '/medico',
        name: 'Medico',
        component: () =>
            import ('../views/medico/homeMedico.vue')
    },
    {
        path: '/medico/perfil',
        name: 'MedicoPerfil',
        component: () =>
            import ('../views/medico/RMedico.vue')
    },
    {
        path: '/medico/servicios',
        name: 'ServiciosMedico',
        component: () =>
            import ('../views/medico/Servicios.vue')
    }, {
        path: '/medico/consulta/detalle/:id',
        name: 'DetalleConsultaMedico',
        component: () =>
            import ('../views/medico/detalleConsulta.vue')
    },
    {
        path: '/medico/consulta/detalle/asignadas/:id',
        name: 'DetalleConsultaMedicoAsignadas',
        component: () =>
            import ('../views/medico/detalleConsultaAsigned.vue')
    },
    //PACIENTE
    {
        path: '/paciente',
        name: 'Paciente',
        component: () =>
            import ('../views/paciente/homePaciente.vue')
    },
    {
        path: '/paciente/perfil',
        name: 'PacientePerfil',
        component: () =>
            import ('../views/paciente/EPaciente.vue')
    },
    {
        path: '/paciente/consulta',
        name: 'ConsultaPaciente',
        component: () =>
            import ('../views/paciente/PacienteConsulta.vue')
    }, {
        path: '/paciente/consulta/detalle/:id',
        name: 'DetalleConsultaPaciente',
        component: () =>
            import ('../views/paciente/detalleConsulta.vue')
    },
    {
        path: '/paciente/consulta/detalle/respondida/:id',
        name: 'DetalleConsultaRespondidaPaciente',
        component: () =>
            import ('../views/paciente/detalleConsultaRespondida.vue')
    },
    //ADMINISTRADOR
    {
        path: '/admin',
        name: 'AdminHome',
        component: () =>
            import ('../views/admin/homeAdmin.vue')
    },
    {
        path: '/admin/especialidades',
        name: 'AdminEspecialidades',
        component: () =>
            import ('../views/admin/Especialidades.vue')
    },
    {
        path: '/admin/alergias',
        name: 'AdminAlergias',
        component: () =>
            import ('../views/admin/Alergias.vue')
    },
    {
        path: '/admin/cirugias',
        name: 'AdminCirugias',
        component: () =>
            import ('../views/admin/Cirugias.vue')
    },
    {
        path: '/admin/enfermedades',
        name: 'AdminEnfermedades',
        component: () =>
            import ('../views/admin/Enfermedades.vue')
    },
    {
        path: '/admin/servicios',
        name: 'AdminServicios',
        component: () =>
            import ('../views/admin/Servicios.vue')
    },
    {
        path: '/admin/medicamentos',
        name: 'AdminMedicamentos',
        component: () =>
            import ('../views/admin/Medicamentos.vue')
    },
    {
        path: '/admin/pacientes',
        name: 'AdminPacientes',
        component: () =>
            import ('../views/admin/Pacientes.vue')
    },
    {
        path: '/admin/medicos',
        name: 'AdminMedicos',
        component: () =>
            import ('../views/admin/Medicos.vue')
    },
    {
        path: '/admin/ventas',
        name: 'AdminVentas',
        component: () =>
            import ('../views/admin/Ventas.vue')
    },
    {
        path: '/admin/covid',
        name: 'AdminCovid',
        component: () =>
            import ('../views/admin/Covid.vue')
    },
    {
        path: '/admin/consultas',
        name: 'AdminConsultas',
        component: () =>
            import ('../views/admin/Consultas.vue')
    },
    //COVID
    {
        path: '/covid',
        name: 'covid',
        component: () =>
            import ('../views/Covid.vue')
    },

    {
        path: '/pruebas',
        name: 'pruebas',
        component: () =>
            import ('../views/Pruebas.vue')
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
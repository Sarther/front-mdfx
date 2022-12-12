import { createRouter, createWebHistory } from 'vue-router'
import Medicine from '../components/Medicine.vue'
import Doctor from '../components/Doctor.vue'
import Patient from '../components/Patient.vue'
import Appointment from '../components/Appointment.vue'
import Diagnosis from '../components/Diagnosis.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Medicine
    },
    {
      path: '/medicine',
      name: 'medicine',
      component: Medicine
    },
    {
      path: '/patients',
      name: 'patients',
      component: Patient
    }
    ,
    {
      path: '/doctors',
      name: 'doctors',
      component: Doctor
    }
    ,
    {
      path: '/appointments',
      name: 'appointments',
      component: Appointment
    }
    ,
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: Diagnosis
    }
  ]
})

export default router

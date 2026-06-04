import { Routes } from '@angular/router'

import { MainLayout } from '@/app/layouts/main-layout/main.layout'

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        title: 'Home',
        loadChildren: () => import('@/app/features/home/home.routes').then((m) => m.homeRoutes),
      },
      {
        path: 'make-appointment',
        title: 'Make appointment',
        loadChildren: () => import('@/app/features/make-appointment/make-appointment.routes').then((m) => m.makeAppointmentRoutes),
      },
    ],
  },
  { path: '**', redirectTo: '' },
]

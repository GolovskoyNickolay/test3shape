import { Component, provideZonelessChangeDetection } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { provideRouter, Router } from '@angular/router'

import { MenuItem } from './main-layout.type'
import { MainLayout } from './main.layout'

interface ProtectedMainLayout {
  menuItems: MenuItem[]
  title: () => string
}

@Component({ standalone: true, template: '' })
class NoopComponent {}

describe('MainLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: 'home', title: 'Home', component: NoopComponent },
          { path: 'make-appointment', title: 'Make appointment', component: NoopComponent },
        ]),
      ],
    })
  })

  const create = () => {
    const fixture = TestBed.createComponent(MainLayout)
    fixture.detectChanges()
    return {
      fixture,
      instance: fixture.componentInstance as unknown as ProtectedMainLayout,
    }
  }

  it('exposes Home and Make appointment menu items', () => {
    const { instance } = create()
    expect(instance.menuItems.map((i) => i.route)).toEqual(['/home', '/make-appointment'])
  })

  it('resolves title from active route', async () => {
    const router = TestBed.inject(Router)
    await router.navigate(['/home'])
    const { instance } = create()
    expect(instance.title()).toBe('Home')
  })

  it('updates title when navigation completes', async () => {
    const router = TestBed.inject(Router)
    await router.navigate(['/home'])
    const { fixture, instance } = create()
    expect(instance.title()).toBe('Home')

    await router.navigate(['/make-appointment'])
    fixture.detectChanges()
    expect(instance.title()).toBe('Make appointment')
  })
})

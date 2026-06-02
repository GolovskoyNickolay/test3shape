import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'

import { NotificationService } from '@/app/core/services/notification.service'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService)

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.status === 0 ? 'Network error' : (err.error?.message ?? err.statusText ?? 'Request failed')
      notify.error(message)
      return throwError(() => err)
    }),
  )
}

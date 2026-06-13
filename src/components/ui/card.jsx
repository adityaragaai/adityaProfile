import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn('rounded-xl border', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('flex flex-col', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center', className)} {...props} />
}

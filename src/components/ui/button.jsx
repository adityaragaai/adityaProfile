import { cn } from '@/lib/utils'

export function Button({ className, variant = 'default', children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors px-4 py-2',
        variant === 'outline' && 'border border-white/10 bg-transparent text-neutral-50',
        variant === 'default' && 'bg-neutral-200 text-neutral-900',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

import { cn } from '@/lib/utils'

export function Button({ className, variant = 'default', children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors px-4 py-2',
        variant === 'outline' && 'border border-[var(--line-10)] bg-transparent text-[var(--text-primary)]',
        variant === 'default' && 'bg-[var(--invert-bg)] text-[var(--invert-text)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

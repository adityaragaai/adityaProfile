import { ResponsiveContainer, Tooltip } from 'recharts'

export function ChartContainer({ children, config, className }) {
  const cssVars = {}
  if (config) {
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) cssVars[`--color-${key}`] = value.color
    })
  }

  return (
    <div className={className} style={cssVars}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function ChartTooltip(props) {
  return (
    <Tooltip
      contentStyle={{
        backgroundColor: 'var(--bg-panel)',
        border: '1px solid var(--line-10)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '11px',
      }}
      {...props}
    />
  )
}

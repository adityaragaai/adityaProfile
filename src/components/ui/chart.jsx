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
        backgroundColor: 'oklch(0.205 0 0)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '11px',
      }}
      {...props}
    />
  )
}

const modules = import.meta.glob('../assets/tech-icons/*.png', { eager: true })

// Build a map: filename-without-ext → resolved URL
const iconMap = {}
for (const path in modules) {
  const name = path.split('/').pop().replace('.png', '')
  iconMap[name] = modules[path].default
}

// Named aliases so callers can use short/variant keys
const TECH_ICONS = {
  // React variants
  'React':        iconMap['React'],
  'React 19':     iconMap['React'],
  'React.js':     iconMap['React'],

  // TypeScript
  'TypeScript':   iconMap['TypeScript'],

  // Node
  'Node.js':      iconMap['Node.js'],

  // MongoDB
  'MongoDB':      iconMap['MongoDB'],

  // Tailwind variants
  'Tailwind':          iconMap['Tailwind CSS'],
  'Tailwind CSS':      iconMap['Tailwind CSS'],

  // HTML / CSS / JS
  'HTML':         iconMap['HTML5'],
  'CSS':          iconMap['CSS3'],
  'JavaScript':   iconMap['JavaScript'],

  // Tools & frameworks
  'Express.js':   null,   // no local icon — handled via fallback text
  'GSAP':         null,
  'Figma':        iconMap['Figma'],
  'Vite':         iconMap['Vite.js'],
  'Jest':         null,
  'Git':          iconMap['Git'],
  'Java':         iconMap['Java'],
  'Next.js':      iconMap['Next.js'],
  'Spring':       iconMap['Spring'],
  'Jenkins':      iconMap['Jenkins'],
}

export default TECH_ICONS

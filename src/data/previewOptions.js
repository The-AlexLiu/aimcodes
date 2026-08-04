import ascentImage from '../assets/maps/ascent.jpg'
import havenImage from '../assets/maps/haven.jpg'
import bindImage from '../assets/maps/bind.jpg'

export const previewBackgroundOptions = [
  { value: 'ascent', label: 'Ascent', image: ascentImage },
  { value: 'haven', label: 'Haven', image: havenImage },
  { value: 'bind', label: 'Bind', image: bindImage },
]

export const crosshairColorPresets = [
  { key: 'white', preset: '0', hex: '#ffffff' },
  { key: 'green', preset: '1', hex: '#00ff00' },
  { key: 'cyan', preset: '5', hex: '#00ffff' },
  { key: 'yellow', preset: '4', hex: '#ffff00' },
  { key: 'red', preset: '7', hex: '#ff0000' },
  { key: 'pink', preset: '6', hex: '#ff00ff' },
]

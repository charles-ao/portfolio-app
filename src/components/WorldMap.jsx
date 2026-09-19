import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
  Sphere,
  ZoomableGroup,
} from 'react-simple-maps'
import contact from '../data/contact.json'
import './WorldMap.css'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json'
const HIGHLIGHTED_COUNTRY = 'United Kingdom'
const MIN_ZOOM = 1
const MAX_ZOOM = 8
const INITIAL_POSITION = { coordinates: [0, 15], zoom: MIN_ZOOM }

const geographyStyle = {
  default: { fill: 'var(--bg2)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
  hover: { fill: 'var(--accent)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
  pressed: { fill: 'var(--accent-hover)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
}

const highlightedStyle = {
  default: { fill: 'var(--accent)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
  hover: { fill: 'var(--accent)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
  pressed: { fill: 'var(--accent-hover)', stroke: 'var(--bg)', strokeWidth: 0.6, outline: 'none' },
}

export default function WorldMap() {
  const [position, setPosition] = useState(INITIAL_POSITION)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const { lat, lon } = contact.location

  function zoomIn() {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, MAX_ZOOM) }))
  }

  function zoomOut() {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, MIN_ZOOM) }))
  }

  function resetView() {
    setPosition(INITIAL_POSITION)
  }

  return (
    <div className="world-map">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 150, center: [0, 5] }}
        width={880}
        height={440}
        className="world-map__svg"
        role="img"
        aria-label="World map with the United Kingdom highlighted. Scroll or drag to explore, use the on-screen controls to zoom."
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={setPosition}
        >
          <Sphere stroke="var(--bg2)" strokeWidth={1} fill="transparent" />
          <Graticule stroke="var(--bg2)" strokeWidth={0.5} />
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = geo.properties.name === HIGHLIGHTED_COUNTRY
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={isHighlighted ? highlightedStyle : geographyStyle}
                  />
                )
              })
            }
          </Geographies>
          <Marker coordinates={[lon, lat]}>
            <g transform={`scale(${1 / position.zoom})`}>
              <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <line x1="0" y1="-16" x2="0" y2="-52" stroke="var(--accent)" strokeWidth="1" />
              <circle r="3" fill="var(--fg)" />
              <text textAnchor="middle" y="-60" className="world-map__pin-label">
                UNITED KINGDOM
              </text>
            </g>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>

      <div className="world-map__controls">
        <button type="button" className="world-map__control-btn" onClick={zoomIn} title="Zoom in" aria-label="Zoom in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button type="button" className="world-map__control-btn" onClick={zoomOut} title="Zoom out" aria-label="Zoom out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        </button>
        <button type="button" className="world-map__control-btn" onClick={resetView} title="Reset view" aria-label="Reset view">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 12a9 9 0 1 1 3 6.7" />
            <path d="M3 21v-6h6" />
          </svg>
        </button>
      </div>

      <span className={`world-map__hover${hoveredCountry ? ' world-map__hover--visible' : ''}`}>
        {hoveredCountry}
      </span>
    </div>
  )
}

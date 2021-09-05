//front-end
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { LocationMarkerIcon } from '@heroicons/react/outline'
//back-end
import { useState } from 'react'
import getCenter from 'geolib/es/getCenter'

function MapArea ({ searchRes }) {
  const [selectedPlace, setSelectedPlace] = useState({})
  //transform searchRes to long and lat
  const coordinates = searchRes.map(res => ({
    longitude: res.long,
    latitude: res.lat
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11
  })

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/l0rdher0n/ckt5961v11r9q18oev8gpep5k'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {searchRes.map(res => (
        <div key={res.long}>
          <Marker
            longitude={res.long}
            latitude={res.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedPlace(res)}
              className='
                 cursor-pointer
                 text-2xl
                 animate-bounce
                 '
              aria-label='push-pin'
            >
              <LocationMarkerIcon className='h-3 text-blue-100' />
            </p>
          </Marker>
          {/**Popup if Marker is clicked */}
          {selectedPlace.long == res.long ? (
            <Popup
              onClose={() => setSelectedPlace({})}
              closeOnClick={true}
              latitude={res.lat}
              long={res.long}
            >
              {res.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default MapArea

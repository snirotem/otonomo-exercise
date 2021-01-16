import * as React from 'react'
import Checkbox from '../Checkbox'
import Button from '../Button'
import EventNotification from '../EventNotification'

const eventsComponent = ({
  events = [],
  fuelThreashold,
  colors,
  onClearEvents,
}) => {
  const [isFilteredByFeul, setIsFilteredByFuel] = React.useState(false)

  const eventsToShow = events.filter(item => {
    return !isFilteredByFeul || item.fuel * 100 < fuelThreashold
  })

  return (
    <div className="events-component columns">
      <div className="header">
        <Checkbox
          checked={isFilteredByFeul}
          onClick={() => {
            setIsFilteredByFuel(!isFilteredByFeul)
          }}>{`Filter events where fuel level is under ${fuelThreashold}%`}</Checkbox>
        <span>
          {eventsToShow && eventsToShow.length ? (
            <span className="total-events">{`${eventsToShow.length} Event${
              eventsToShow.length > 1 ? 's' : ''
            }`}</span>
          ) : null}
          <Button className="clear-events-btn" onClick={onClearEvents}>
            Clear
          </Button>
        </span>
      </div>
      <div className="events-list columns">
        {(!eventsToShow || eventsToShow.length === 0) && (
          <span className="no-events">
            No Events Yet. Add a VIN or wait for event...
          </span>
        )}
        {eventsToShow.map(item => {
          return <EventNotification carEvent={item} color={colors[item.vin]} />
        })}
      </div>
    </div>
  )
}

export default eventsComponent

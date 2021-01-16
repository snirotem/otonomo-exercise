import * as React from 'react'
import List from './listComponent'
import Events from './eventsComponent'

import createStreamerFrom from '../../api/streamer'
import generateCarData from '../../api/data-generator'

import './styles.scss'

const FUEL_TH = 15

export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vins: {},
      events: [],
      colors: {},
    }
  }

  componentWillUnmount() {
    Object.keys(this.state.vins).forEach(item => {
      this.state.vins[item].streamer.stop()
      this.state.vins[item].streamer.removeHandler(this.saveEventData)
    })
  }

  saveEventData = data => {
    const events = Object.assign([], this.state.events)
    events.unshift(data)
    this.setState({ events })
  }

  addListener = vin => {
    const streamer = createStreamerFrom(() => generateCarData(vin))
    streamer.subscribe(this.saveEventData)
    streamer.start()
    return streamer
  }

  onAddVin = vin => {
    const vins = Object.assign({}, this.state.vins)
    const colors = Object.assign({}, this.state.colors)

    vins[vin] = {
      enabled: true,
      streamer: this.addListener(vin),
      color: this.state.vins[vin]
        ? this.state.vins[vin].color
        : this.getRandomColor(),
    }

    colors[vin] = vins[vin].color

    this.setState({ vins, colors })
  }

  onVinStateChange = vin => {
    const vins = Object.assign({}, this.state.vins)
    vins[vin].enabled = !vins[vin].enabled
    if (vins[vin].enabled) vins[vin].streamer.start()
    else vins[vin].streamer.stop()
    this.setState({ vins })
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  render() {
    return (
      <div className="details-page">
        <List
          vins={this.state.vins}
          onAddClicked={this.onAddVin}
          onVinStateChange={this.onVinStateChange}
        />
        <Events
          fuelThreashold={FUEL_TH}
          events={this.state.events}
          colors={this.state.colors}
          onClearEvents={() => this.setState({ events: [] })}
        />
      </div>
    )
  }
}

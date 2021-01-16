import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import createStreamerFrom from './api/streamer'
import generateCarData from './api/data-generator'
import DetailsPage from './components/layout/detailsPage'

class App extends Component {
  streamer = createStreamerFrom(() => generateCarData('12345678901234567'))

  state = { carData: {} }

  updateState = carData => {
    this.setState({ carData })
  }

  componentDidMount() {
    this.streamer.subscribe(this.updateState)
    this.streamer.start()
  }

  render() {
    return (
      <div className="App">
        <DetailsPage />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            {JSON.stringify(this.state.carData)}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header> */}
      </div>
    )
  }
}

export default App

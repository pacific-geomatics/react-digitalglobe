import { isArray, isUndefined, uniqueId } from 'lodash'
import React, { PropTypes } from 'react'
import 'mapbox.js'

// Inspired by:
// https://github.com/PaulLeCam/react-leaflet

export class Map extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    layer: PropTypes.string,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoom: PropTypes.number,
    id: PropTypes.string,
    center: PropTypes.array,
    style: ProTypes.object
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      id: props.id || uniqueId('map')
    }
  }

  componentDidMount() {
    this.leafletElement = Leaflet.map(this.state.id, this.props)
    super.componentDidMount()
    this.setState({map: this.leafletElement})
    if (!isUndefined(this.props.bounds)) {
      this.leafletElement.fitBounds(this.props.bounds, this.props.boundsOptions)
    }
  }

  componentDidMount() {
    L.mapbox.accessToken = this.props.token

    const map = L.mapbox.map(this.map, {
      center: this.props.center,
      zoom: this.props.zoom,
      maxZoom: this.props.maxZoom
    })
  }

  render() {
    const style = {}
    return (
      <div
        className={this.props.className}
        id={this.state.id}
        style={this.props.style}>
        {children}
      </div>
    )
  }
}

import * as React from 'react'
import { PropertyControls, ControlType, animate, PropertyStore, Frame } from 'framer'

const style: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#8855FF',
  background: 'rgba(136, 85, 255, 0.1)',
  overflow: 'hidden',
}

// const data = Data({ scale: Animatable(1) })


// Define type of property
interface Props {
  text: string
}

export class SimpleAnimate extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'menu',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
  }

  switch = PropertyStore(
    {
      left: 0,
      top: 0,
    },
    true
  )

  componentWillReceiveProps(nextProps) {

    console.log('nextProps', nextProps)

    if (nextProps.playingOnTap !== this.props.playingOnTap) {
        if (nextProps.playingOnTap == true) {
            // Play onTap Animation
            console.log('play!')
            let left
            let top
            let springOptions = {
                tension: 30
                friction: 10,
            }
            left = 100
            animate.spring(this.switch, { left, top }, springOptions)
        }
        
        if (nextProps.playingOnTap == false) {
            // Reverse onTap Animation
            console.log('reverse!')
            let left
            let top
            let springOptions = {
                tension: 30
                friction: 10,
            }
            left = 0
            animate.spring(this.switch, { left, top }, springOptions)
        }
    }
  }


  render() {
    return (
      <Frame style={style} left={this.switch.left}>
        <h1>{this.props.playingOnTap ? 'true' : 'false'}</h1>

        <p>{this.props.text}</p>
      </Frame>
    )
  }
}

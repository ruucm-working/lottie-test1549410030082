import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import { log } from 'ruucm-util'

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

// Define type of property
interface Props {
  text: string
}

export class actionBtn extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'click me',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
  }

  render() {
    return (
      <Frame style={style} onTap={this.props.onTap}>
        {log('this.props(actionBtn)', this.props)}
        {this.props.text}
      </Frame>
    )
  }
}

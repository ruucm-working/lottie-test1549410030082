import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const TriggerFrame = styled(Frame)`
  width: 100% !important;
  height: 100% !important;

  color: #75be8e;
  background: rgba(117, 190, 142, 0.6) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${props =>
    !props.visibility &&
    css`
      background: rgba(117, 190, 142, 0.3) !important;
    `};
`
const Child = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  overflow: scroll;
`

// Define type of property
interface Props {
  text: string
}

export class Trigger extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Trigger',
    playType: 'toggle',
    onTapTrigger: false,
    onMouseDownTrigger: true,
    onMouseUpTrigger: true,
    visibility: true,
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    playType: {
      type: ControlType.SegmentedEnum,
      options: ['play', 'reverse', 'toggle'],
      optionTitles: ['Play', 'Reverse', 'Toggle'],
      title: 'Play Type',
    },
    onTapTrigger: { type: ControlType.Boolean, title: 'onTap Trigger' },
    onMouseDownTrigger: {
      type: ControlType.Boolean,
      title: 'onMouseDown Trigger',
    },
    onMouseUpTrigger: { type: ControlType.Boolean, title: 'onMouseUp Trigger' },
    visibility: {
      type: ControlType.Boolean,
      title: 'Visibility',
    },
    children: { type: ControlType.Children, title: 'Children' },
  }

  render() {
    const otherProps = Object.assign({}, this.props)
    delete otherProps.children

    return (
      <TriggerFrame
        onTap={() =>
          this.props.onTapTrigger
            ? this.props.onTap(this.props.playType)
            : void 0
        }
        onMouseDown={() =>
          this.props.onMouseDownTrigger
            ? this.props.onMouseDown(this.props.playType)
            : void 0
        }
        onMouseUp={() =>
          this.props.onMouseUpTrigger
            ? this.props.onMouseUp(this.props.playType)
            : void 0
        }
        visibility={this.props.visibility}
      >
        {this.props.playType}
        <Child>
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, otherProps)
          })}
        </Child>
      </TriggerFrame>
    )
  }
}

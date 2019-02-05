import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const TriggerFrame = styled(Frame)`
  width: 100% !important;
  height: 100% !important;

  color: #75be8e;
  background: rgba(50, 206, 191, 0.51) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${props =>
    !props.visibility &&
    css`
      opacity: 0.3;
    `};
`

// Define type of property
interface Props {
  text: string
}

export class LottieTrigger extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Trigger',
    playType: 'toggle',
    onTapTrigger: true,
    onMouseDownTrigger: false,
    onMouseUpTrigger: false,
    visibility: true,
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
  }

  render() {
    return (
      <TriggerFrame
        onTap={() =>
          this.props.onTapTrigger
            ? this.props.onTap(this.props.playType)
            : void 0
        }
        // onMouseDown={() =>
        //   this.props.onMouseDownTrigger
        //     ? this.props.onMouseDown(this.props.playType)
        //     : void 0
        // }
        // onMouseUp={() =>
        //   this.props.onMouseUpTrigger
        //     ? this.props.onMouseUp(this.props.playType)
        //     : void 0
        // }
        visibility={this.props.visibility}
      >
        {this.props.playType}
      </TriggerFrame>
    )
  }
}

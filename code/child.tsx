import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { css } from 'styled-components'

const ChildFrame = styled(Frame)`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100% !important;
  height: 100% !important;

  color: slateblue;
  background: rgba(106, 90, 205, 0.62) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
// Define type of property
interface Props {
  text: string
}

export class child extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'child',
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    children: { type: ControlType.Children, title: 'Children' },
  }

  render() {
    return <ChildFrame>{this.props.text}</ChildFrame>
  }
}

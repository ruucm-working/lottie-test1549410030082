import * as React from 'react'
import { PropertyControls, ControlType } from 'framer'
import styled from 'styled-components'

const Wrap = styled.div`
  padding: 35px 16px 30px 16px;
`
const Label = styled.div`
  color: #908f94;
  font-size: 13px;
  font-family: Helvetica;
  margin-bottom: 5px;
`
const Title = styled.div`
  font-size: 30px;
  font-family: Helvetica;
  font-weight: 900;
`

// Define type of property
interface Props {
  title: string
  label: string
}

export class Header extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
  }

  render() {
    return (
      <Wrap>
        <Label>{this.props.label}</Label>
        <Title>{this.props.title}</Title>
      </Wrap>
    )
  }
}

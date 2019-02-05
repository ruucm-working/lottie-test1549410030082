import * as React from 'react'

import { Frame, PropertyControls, ControlType } from 'framer'

import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const Wrap = styled.div`
  position: relative;

  width: 100% !important;
  max-height: 100% !important;
  height: 100% !important;
  transition: max-height 1s ease-in;

  ${props =>
    props.src &&
    css`
      background: center / cover no-repeat url(${props.src});
    `};

  ${props =>
    props.opened &&
    css`
      max-height: 80% !important;
      height: 80% !important;
      transition: max-height 10s ease-in;
      ${Desc} {
        background: white !important;
        /* This bottom value differs as 'Desc' Contents height change */
        bottom: -540px;
        opacity: 1;
        transition: bottom 0s ease-in;
      }
      ${CloseButton} {
        display: block;
      }
    `};
`

const Desc = styled.div`
  padding: 0 20px;
  padding-bottom: 40px;
  text-align: justify;
  font-size: 20px;
  color: #8b8b8b;
  position: absolute;
  z-index: -1;
  bottom: 0vh;
  background: rebeccapurple;
  opacity: 0;
  transition: bottom 1s ease-in, opacity 2s ease-in;
  strong {
    color: #080808;
  }
`

const Label = styled.div`
  font-family: Helvetica;
  color: rgba(0, 0, 0, 0.35);
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 12px;
`

const Title = styled.div`
  font-family: Helvetica;
  color: white;
  font-size: 25px;
  font-weight: 900;
`

const MainImg = styled(Frame)`
  position: relative !important;
  margin: 0 auto;
  transform: none !important;

  width: 100% !important;
  height: 100% !important;
  padding: 25px;
  background: transparent !important;
  ${props =>
    props.src &&
    css`
      background: center / cover no-repeat url(${props.src});
    `};
`
const CloseButton = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  width: 25px !important;
  height: 25px !important;
  display: none;
  cursor: pointer;
  z-index: 1;
  ${props =>
    props.src &&
    css`
      background: center / cover no-repeat url(${props.src});
    `};
`
const Child = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
`

// Define type of property
interface Props {
  title: string
  label: string
  mainImg: string
  desc: string
}

export class Box extends React.Component<Props> {
  state = {
    show: false,
  }
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
    mainImg: 'http://kaijupop.com/wp-content/uploads/2014/04/KWsub.png',
    closeButtonImg:
      'https://github.com/ruucm-working/my-files/blob/master/close-btn.png?raw=true',
    desc: '',
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
    mainImg: { type: ControlType.String, title: 'Main Image' },
    closeButtonImg: { type: ControlType.String, title: 'CloseButton Image' },
    desc: { type: ControlType.String, title: 'Description' },
    children: { type: ControlType.Children, title: 'Children' },
  }

  render() {
    return (
      <Wrap src={this.props.mainImg} opened={this.props.playingOnMouseUp}>
        <CloseButton
          src={this.props.closeButtonImg}
          onClick={e => {
            e.stopPropagation()
            this.props.onMouseDown('reverse')
            this.props.onMouseUp('reverse')
          }}
        />
        <MainImg>
          <Label>{this.props.label}</Label>
          <Title
            dangerouslySetInnerHTML={{
              __html: this.props.title,
            }}
          />
          <Child>{this.props.children}</Child>
        </MainImg>
        <Desc
          dangerouslySetInnerHTML={{
            __html: this.props.desc,
          }}
        />
      </Wrap>
    )
  }
}

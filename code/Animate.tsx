import * as React from 'react'
import {
  PropertyControls,
  PropertyStore,
  ControlType,
  Frame,
  Animatable,
  animate,
} from 'framer'
import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'
import { TweenMax, Elastic, Power1, Power3, Power4 } from 'gsap'

const AnimateFrame = styled(Frame)`
  width: 100% !important;
  height: 100% !important;

  color: sandybrown;
  display: block !important;
  background: rgba(244, 164, 96, 0.6) !important;
`
const Label = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
`
const ChildFrame = styled(Frame)`
  left: 50%;
  transform: translateX(-50%) !important;
  -webkit-box-shadow: -5px 8px 40px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -5px 8px 40px 0px rgba(0, 0, 0, 0.3);
  box-shadow: -5px 8px 40px 0px rgba(0, 0, 0, 0.3);
  /* Don't want to animate height yet */
  height: 100%;
  border-radius: 20px;
  background: rebeccapurple;
  overflow: scroll;
`

// Define type of property
interface Props {
  text: string
}

const screenWidth = 375
const screenHeight = 667
export class Animate extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Animate',

    firstWidth: 100,
    firstHeight: 70,

    onTapLeft: 0,
    onTapTop: 0,

    onMDLeft: 0,
    onMDTop: 0,
    onMDWidth: 70,
    onMDHeight: 60,

    onMULeft: 0,
    onMUTop: 0,
    onMUWidth: 90,
    onMUHeight: 100,

    tension: 500,
    friction: 50,
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    firstWidth: { type: ControlType.Number, title: 'First Width' },
    firstHeight: { type: ControlType.Number, title: 'First Height' },

    onTapLeft: { type: ControlType.Number, title: 'onTap X' },
    onTapTop: { type: ControlType.Number, title: 'onTap Y' },

    onMDLeft: { type: ControlType.Number, title: 'onMD X' },
    onMDTop: { type: ControlType.Number, title: 'onMD Y' },
    onMDWidth: { type: ControlType.Number, title: 'onMD Width' },
    onMDHeight: { type: ControlType.Number, title: 'onMD Height' },

    onMULeft: { type: ControlType.Number, title: 'onMU X' },
    onMUTop: { type: ControlType.Number, title: 'onMU Y' },
    onMUWidth: { type: ControlType.Number, title: 'onMU Width' },
    onMUHeight: { type: ControlType.Number, title: 'onMU Height' },
  }

  switch = PropertyStore(
    {
      left: 0,
      top: 0,
      width: screenWidth * (this.props.firstWidth / 100),
      height: screenHeight * (this.props.firstHeight / 100),
    },
    true
  )

  componentWillReceiveProps(nextProps) {
    // Play onTap Animation
    if (nextProps.playingOnTap !== this.props.playingOnTap) {
      let left
      let top
      let scale
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }

      if (nextProps.playingOnTap) {
        log('play playingOnTap!')

        left = this.props.onTapLeft
        top = this.props.onTapTop
        scale = this.props.onTapScale / 100

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse playingOnTap!')
        left = 0
        top = 0
        scale = 1
        animate.spring(this.switch, { left, top, scale }, springOptions)
      }
    }

    // Play onMouseDown Animation
    if (nextProps.playingOnMouseDown !== this.props.playingOnMouseDown) {
      let left
      let top
      let width
      let height
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseDown) {
        log('play playingOnMouseDown!')

        left = this.props.onMDLeft
        top = this.props.onMDTop
        width = (screenWidth * this.props.onMDWidth) / 100
        height = (screenHeight * this.props.onMDHeight) / 100

        animate.spring(this.switch, { left, top, width, height }, springOptions)
      } else {
        log('reverse playingOnMouseDown!')
        left = 0
        top = 0
        width = (screenWidth * this.props.firstWidth) / 100
        height = (screenHeight * this.props.firstHeight) / 100
        log('this.props', this.props)
        animate.spring(this.switch, { left, top, width, height }, springOptions)
      }
    }

    // Play onMouseUp Animation
    if (nextProps.playingOnMouseUp !== this.props.playingOnMouseUp) {
      let left
      let top
      let width
      let height
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseUp) {
        log('play playingOnMouseUp!')

        left = this.props.onMULeft
        top = this.props.onMUTop
        width = (screenWidth * this.props.onMUWidth) / 100
        height = (screenHeight * this.props.onMUHeight) / 100
        animate.spring(this.switch, { left, top, width, height }, springOptions)

        // Border Radius Anim (using gsap)
        var myChild = document.getElementById('my-child')
        TweenMax.to(myChild, 1, {
          borderRadius: '0px',
        })
      } else {
        log('reverse playingOnMouseUp!')
        left = 0
        top = 0
        width = (screenWidth * this.props.firstWidth) / 100
        height = (screenHeight * this.props.firstHeight) / 100
        animate.spring(this.switch, { left, top, width, height }, springOptions)

        // Border Radius Anim (using gsap)
        var myChild = document.getElementById('my-child')
        TweenMax.to(myChild, 1, {
          borderRadius: '20px',
        })
      }
    }
  }

  render() {
    const otherProps = Object.assign({}, this.props)
    delete otherProps.children

    return (
      <AnimateFrame
        bg={this.props.bg}
        onTap={this.props.onTap}
        left={this.switch.left}
        top={this.switch.top}
        style={{
          display: 'block',
        }}
      >
        <Label>{this.props.text}</Label>
        <ChildFrame
          id="my-child"
          width={this.switch.width}
          height={this.switch.height}
        >
          {React.Children.map(this.props.children, child => {
            let hey = React.cloneElement(child.props.children, otherProps)
            // log('child.props.children', child.props.children)
            // log('hey', hey)
            // return hey != undefined ? hey : <div />
            // return React.cloneElement(child, otherProps)

            return child.props.children
          })}
        </ChildFrame>
      </AnimateFrame>
    )
  }
}

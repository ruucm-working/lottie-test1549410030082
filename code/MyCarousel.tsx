import * as React from 'react'
import { PropertyControls, ControlType, Stack, Data } from 'framer'
import NukaCarousel from 'nuka-carousel'
import { log } from 'ruucm-util'
import styled, { css } from 'styled-components'

const emptyStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#8855FF',
  background: 'rgba(136, 85, 255, 0.1)',
  overflow: 'hidden',
}

const Wrap = styled.div`
  .slider-frame {
    height: 100% !important;
    background: green;
  }
`

interface Props {
  cellSpacing: number
  slideIndex: number
  cellAlign: 'left' | 'center' | 'right'
  wrapAround: boolean
  dragging: boolean
  slidesToShow: number
  slidesToScroll: number
  speed: number
  padding: number
  paddingPerSide: boolean
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  onSlideIndexBeforeChange: (current: number, next: number) => void
}

interface State {
  slideIndex: number
}

export class MyCarousel extends React.Component<Partial<Props>, State> {
  static defaultProps = {
    cellSpacing: 0,
    slideIndex: 0,
    cellAlign: 'left',
    wrapAround: false,
    dragging: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    padding: 0,
    paddingPerSide: false,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  }
  static propertyControls: PropertyControls<Props> = {
    slideIndex: { type: ControlType.Number, min: 0, title: 'Slide Index' },
    cellAlign: {
      type: ControlType.SegmentedEnum,
      options: ['left', 'center', 'right'],
      optionTitles: ['Left', 'Center', 'Right'],
      title: 'Slide Align',
    },
    cellSpacing: { type: ControlType.Number, min: 0, title: 'Slide Spacing' },
    padding: {
      type: ControlType.FusedNumber,
      toggleKey: 'paddingPerSide',
      toggleTitles: ['Padding', 'Padding per Side'],
      valueKeys: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      valueLabels: ['T', 'R', 'B', 'L'],
      min: 0,
      title: 'Frame Padding',
    },
    wrapAround: {
      type: ControlType.Boolean,
      disabledTitle: 'False',
      enabledTitle: 'True',
      title: 'Wrap Around',
    },
    dragging: {
      type: ControlType.Boolean,
      disabledTitle: 'False',
      enabledTitle: 'True',
      title: 'Dragging',
    },
    // slidesToShow: { type: ControlType.Number, min: 1, title: "Slide to show" },
    // slidesToScroll: { type: ControlType.Number, min: 1, title: "Slide to scroll" },
    speed: {
      type: ControlType.Number,
      min: 1,
      max: 4000,
      title: 'Animation duration',
    },
  }

  state = {
    slideIndex: MyCarousel.defaultProps.slideIndex,
  }

  componentDidMount() {
    const { slideIndex } = this.props
    this.setState({ slideIndex })
  }

  componentWillReceiveProps(props: Props) {
    if (props.slideIndex !== this.props.slideIndex) {
      this.setState({ slideIndex: props.slideIndex })
    }
  }

  myFunction = (currentSlide, nextSlide) => {
    const { onSlideIndexBeforeChange } = this.props
    if (onSlideIndexBeforeChange) {
      onSlideIndexBeforeChange(currentSlide, nextSlide)
    }
  }

  render() {
    if (this.props.children.length <= 0) {
      const content =
        'Connect to a Frame layer with children and adjust props in the property panel'
      return <div style={emptyStyle}>{content}</div>
    }
    if (this.props.children[0].props.children.length <= 0) {
      const content = 'Connect to a Frame layer with at least 1 child'
      return <div style={emptyStyle}>{content}</div>
    }
    const childrenContent = this.props.children[0].props.children
    log('childrenContent', childrenContent)
    const framePaddingLocal = this.props.paddingPerSide
      ? this.props.paddingTop +
        'px ' +
        this.props.paddingRight +
        'px ' +
        this.props.paddingBottom +
        'px ' +
        this.props.paddingLeft +
        'px'
      : this.props.padding + 'px'
    const framePaddingLeft = this.props.paddingPerSide
      ? this.props.paddingLeft
      : this.props.padding
    const framePaddingRight = this.props.paddingPerSide
      ? this.props.paddingRight
      : this.props.padding
    return (
      <Wrap>
        <NukaCarousel
          // renderCenterLeftControls={!this.props.horizController ? false : ({ previousSlide }) => (
          //     <button style={{position: "relative", width: 0, height: 0, backgroundColor: "transparent", border: "none", padding: 0}} onClick={previousSlide}>
          //         <CarouselLeftControl style={{cursor: "pointer", transform: "translate3d(0, -50%, 0)", left: framePaddingLeft}}></CarouselLeftControl>
          //     </button>
          // )}
          // renderCenterRightControls={!this.props.horizController ? false : ({ nextSlide }) => (
          //     <button style={{position: "relative", width: 0, height: 0, backgroundColor: "transparent", border: "none", padding: 0}} onClick={nextSlide}>
          //         <CarouselRightControl style={{cursor: "pointer", transform: "translate3d(-100%, -50%, 0)", left: -framePaddingRight}}></CarouselRightControl>
          //     </button>
          // )}
          // ={!this.props.bottomController ? false : ({ slideCount, currentSlide }) => (
          //     <Stack direction="horizontal" distribution="center" alignment="center" gap={1} width={this.props.width} height="auto" style={{transform: "translate3d(-50%, -100%, 0)"}}>
          //         {[...Array(slideCount)].map((object, i) => currentSlide == i ? <CarouselCurrentDot></CarouselCurrentDot> : <CarouselOtherDots></CarouselOtherDots>)}
          //     </Stack>
          // )}
          renderCenterLeftControls={({ currentSlide }) => <div />}
          renderCenterRightControls={({ currentSlide }) => <div />}
          renderBottomCenterControls={({ currentSlide }) => <div />}
          framePadding={framePaddingLocal}
          slideIndex={this.state.slideIndex}
          afterSlide={slideIndex => this.setState({ slideIndex })}
          beforeSlide={this.myFunction}
          initialSlideHeight={childrenContent[0].props.height}
          cellSpacing={this.props.cellSpacing}
          slideWidth={childrenContent[0].props.width + 'px'}
          cellAlign={this.props.cellAlign}
          wrapAround={this.props.wrapAround}
          dragging={this.props.dragging}
          slidesToShow={this.props.slidesToShow}
          slidesToScroll={this.props.slidesToScroll}
          speed={this.props.speed}
          style={{
            width: this.props.width,
            background: 'red',
            height: this.props.height,
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {childrenContent.map((data, i) => {
            return data
          }, this)}
        </NukaCarousel>
      </Wrap>
    )
  }
}

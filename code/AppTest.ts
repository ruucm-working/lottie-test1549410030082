import { Data, animate, Override, Animatable } from 'framer'
import { log } from 'ruucm-util'

const data = Data({
  toggle: true,
  scale: Animatable(1),
  opacity: Animatable(1),
  rotation: Animatable(0),
  playingOnTap: false,
  playingOnMouseDown: false,
  playingOnMouseUp: false,
})

export const Animate: Override = () => {
  return {
    playingOnTap: data.playingOnTap,
    playingOnMouseDown: data.playingOnMouseDown,
    playingOnMouseUp: data.playingOnMouseUp,
  }
}

export const Trigger: Override = () => {
  return {
    playingOnTap: data.playingOnTap,
    playingOnMouseDown: data.playingOnMouseDown,
    playingOnMouseUp: data.playingOnMouseUp,
    onTap(type) {
      log('onTap')
      if (type == 'play') data.playingOnTap = true
      else if (type == 'reverse') data.playingOnTap = false
      else if (type == 'toggle') data.playingOnTap = !data.playingOnTap
    },
    onMouseDown(type) {
      if (type == 'play') data.playingOnMouseDown = true
      else if (type == 'reverse') data.playingOnMouseDown = false
      else if (type == 'toggle')
        data.playingOnMouseDown = !data.playingOnMouseDown
    },
    onMouseUp(type) {
      if (type == 'play') data.playingOnMouseUp = true
      else if (type == 'reverse') data.playingOnMouseUp = false
      else if (type == 'toggle') data.playingOnMouseUp = !data.playingOnMouseUp
    },
  }
}

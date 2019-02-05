import { Data, animate, Override, Animatable } from 'framer'
import { log } from 'ruucm-util'

const data = Data({ scale: Animatable(1) })

// export const Scale: Override = () => {
//     return {
//         scale: data.scale,
//         onTap() {
//             data.scale.set(0.6)
//             animate.spring(data.scale, 1)
//         },
//     }
// }

export const Animate: Override = () => {
  return {
    playingOnTap: data.playingOnTap,
    playingOnMouseDown: data.playingOnMouseDown,
    playingOnMouseUp: data.playingOnMouseUp,
  }
}

export const Trigger: Override = () => {
  return {
    onTap(type) {
      log('onTap')
      if (type == 'play') data.playingOnTap = true
      else if (type == 'reverse') data.playingOnTap = false
      else if (type == 'toggle') data.playingOnTap = !data.playingOnTap
    },
    // onMouseDown(type) {
    //   log('onMouseDown')
    //   if (type == 'play') data.playingOnMouseDown = true
    //   else if (type == 'reverse') data.playingOnMouseDown = false
    //   else if (type == 'toggle')
    //     data.playingOnMouseDown = !data.playingOnMouseDown
    // },
    // onMouseUp(type) {
    //   if (type == 'play') data.playingOnMouseUp = true
    //   else if (type == 'reverse') data.playingOnMouseUp = false
    //   else if (type == 'toggle') data.playingOnMouseUp = !data.playingOnMouseUp
    // },
  }
}

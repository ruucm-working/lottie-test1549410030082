import { Data, animate, Override, Animatable } from 'framer'
import { log } from 'ruucm-util'

const data = Data({
  cardFocus: false,
  scale: Animatable(1),
  show: false,
  text: 'yap',
})

export const Scale: Override = () => {
  return {
    scale: data.scale,
    onTap() {
      log('scale!')
      data.cardFocus = !data.cardFocus
      log('data.cardFocus', data.cardFocus)
      log(data.cardFocus)
    },
  }
}

export const actionBtn: Override = () => {
  return {
    text: data.text,
    onTap() {
      data.text = 'ahahah'
      data.show = !data.show
      log('actionBtn onTap')
    },
  }
}

export const Item: Override = () => {
  return {
    hey: 'aas',
    show: data.show,
  }
}

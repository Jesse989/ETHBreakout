import { createAnimations } from '../animations.js'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    })
  }

  //loading up all assets before starting GameScene
  preload() {
    this.load.setPath("/app/assets")
    this.load.audio('music', ['dungeon_ambient_1.mp3', 'dungeon_ambient_1.ogg'])
    this.load.audio('block', ['block_01.mp3', 'block_01.ogg'])
    this.load.audio('clash', ['clash_01.mp3', 'clash_01.ogg'])
    this.load.audio('heal', ['water_01.mp3', 'water_01.ogg'])
    this.load.audio('crit', ['crit_01.mp3', 'crit_01.ogg'])
    this.load.audio('absorb', ['absorb_01.mp3', 'absorb_01.ogg'])
    this.load.audio('miss', ['miss_01.mp3', 'miss_01.ogg'])
    this.load.audio('paddle', ['paddle_01.mp3', 'paddle_01.ogg'])
    this.load.audio('foom', ['foom_0.mp3', 'foom_0.ogg'])
    this.load.audio('freeze', ['freeze.mp3', 'freeze.ogg'])
    this.load.atlas('assets', 'breakout.png', 'breakout.json')
    this.load.multiatlas('knight', 'antler-knight.json', '/app/assets')
    this.load.multiatlas('combust', 'combust.json', '/app/assets')
    this.load.multiatlas('heal', 'heal.json', '/app/assets')
    this.load.multiatlas('shield', 'shield.json', '/app/assets')
    this.load.multiatlas('button', 'button.json', '/app/assets')
    this.load.json('map', 'dungeon_01.json')
    this.load.spritesheet('tiles', 'tileset_cave_1.png', { frameWidth: 64, frameHeight: 32 })
    this.load.spritesheet('skeleton', 'skeleton.png', { frameWidth: 128, frameHeight: 128 })
    this.load.spritesheet('abilities', 'abilities.png', { frameWidth: 128, frameHeight: 128 })
    this.load.spritesheet('gold', 'coins25.png', { frameWidth: 64, frameHeight: 128 })
    this.load.image('star', 'star.png')
    this.load.on('complete', () => {
      createAnimations(this)
      this.scene.start('StartScene')
      this.scene.start('BreakOutScene')

    })
  }

  create() {
    let game = this.game
    this.registry.events.on('changedata', this.updateData, this)
    this.game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock()
    })
  }

  updateData(parent, key, data) {
    if(key === 'gameOver') {
      this.scene.stop('BreakOutScene')
      this.game.input.mouse.releasePointerLock()
    } else if (key === 'combat') {
      this.scene.resume('BreakOutScene').setVisible(true, 'BreakOutScene')
      this.scene.sendToBack('GameScene')
    } else if (key === 'noCombat') {
      this.scene.pause('BreakOutScene').setVisible(false, 'BreakOutScene')
      this.scene.sendToBack('BreakOutScene')
      this.game.input.mouse.releasePointerLock()
    }
  }
}

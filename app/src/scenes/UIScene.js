export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true })
    //player hps
    this.hpText
    //player xp
    this.xpText
    //target hp
    this.targetHpText
    //yellow increases crit
    this.crit
  }

  create() {
    this.hpText = this.add.text(30, 10)
    this.xpText = this.add.text(30, 30)
    this.targetHpText = this.add.text(1080, 10)
    this.crit = this.add.text(30, 50)
    this.registry.events.on('changedata', this.updateData, this)
  }

  updateData(parent, key, data) {
    switch (key) {
      case 'playerHps':
        this.hpText.setText('HP: ' + Math.round(data))
        break
      case 'playerXp':
        this.xpText.setText('Score: ' + data.toFixed(0))
        break
      case 'targetHps':
        this.targetHpText.setText(data.name + ' : ' + Math.round(data.currentHps))
        break
      case 'crit':
        this.crit.setText('Crit: ' + data.toFixed(0) + '%')
        break
      case 'gameOver':
        this.targetHpText.setText('')
        this.xpText.setPosition(570, 330)
        this.crit.setText("Game Over").setPosition(530, 270).setScale(2)
        this.hpText.setText('(reload page to play again!)').setPosition(500, 380)
        this.registry.events.off('changedata')
        this.scene.scene.cameras.main.setBackgroundColor('0x000000')
        this.scene.stop('GameScene')
        break 
      default:
    }
  }
}

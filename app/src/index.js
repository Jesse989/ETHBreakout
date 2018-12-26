import 'phaser' 
import BootScene from './scenes/BootScene.js'
import GameScene from './scenes/GameScene.js'
import BreakOutScene from './scenes/BreakOutScene.js'
import UIScene from './scenes/UIScene.js'
import StartScene from './scenes/StartScene.js'
import getWeb3 from "./utils/getWeb3"
import ipfs from './ipfs'

//config file
var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
        debug: false,
        gravity: { y: 0 }
    }
  },
  scene: [ BootScene, GameScene, BreakOutScene, UIScene, StartScene ]
}

var game = new Phaser.Game(config)

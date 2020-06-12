namespace SpriteKind {
    export const _bulNum = SpriteKind.create()
    export const _bullPic = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.blizzard, 100)
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bulletNum > 0) {
        projectile = sprites.createProjectileFromSprite(img`
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
f 5 5 5 5 f 
`, mySprite, 0, -100)
        bulletNum += -1
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 100)
    info.changeScoreBy(1)
    if (info.score() > 999) {
        bulNum.setPosition(125, 4)
        bullpic.setPosition(bulNum.x - 10, 4)
    } else if (info.score() > 99) {
        bulNum.setPosition(132, 4)
        bullpic.setPosition(bulNum.x - 10, 4)
    } else if (info.score() > 9) {
        bulNum.setPosition(138, 4)
        bullpic.setPosition(bulNum.x - 10, 4)
    }
})
let apple: Sprite = null
let recoverTime = 0
let projectile: Sprite = null
let bulletNum = 0
let mySprite: Sprite = null
let bullpic: Sprite = null
let bulNum: Sprite = null
info.setScore(0)
info.setLife(5)
bulNum = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind._bulNum)
bulNum.setPosition(150, 10)
bullpic = sprites.create(img`
. f 5 5 f . . . . . 
. f 5 5 f . f f f . 
. f 5 5 f . . . . . 
. f 5 5 f . f f f . 
. f 5 5 f . . . . . 
`, SpriteKind._bullPic)
bullpic.setPosition(bulNum.x - 15, 4)
mySprite = sprites.create(img`
. . . . . . . . . . b 5 b . . . 
. . . . . . . . . b 5 b . . . . 
. . . . . . . . . b c . . . . . 
. . . . . . b b b b b b . . . . 
. . . . . b b 5 5 5 5 5 b . . . 
. . . . b b 5 d 1 f 5 5 d f . . 
. . . . b 5 5 1 f f 5 d 4 c . . 
. . . . b 5 5 d f b d d 4 4 . . 
b d d d b b d 5 5 5 4 4 4 4 4 b 
b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
b d c 5 5 5 5 d 5 5 5 5 5 b . . 
c d d c d 5 5 b 5 5 5 5 5 5 b . 
c b d d c c b 5 5 5 5 5 5 5 b . 
. c d d d d d d 5 5 5 5 5 d b . 
. . c b d d d d d 5 5 5 b b . . 
. . . c c c c c c c c b b . . . 
`, SpriteKind.Player)
mySprite.setPosition(80, 110)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(mySprite, 100, 0)
scene.setBackgroundColor(9)
bulletNum = 5
let tmp = 0
let time = game.runtime()
game.onUpdate(function () {
    if (tmp != bulletNum) {
        tmp = bulletNum
        if (bulletNum == 5) {
            bulNum.setImage(img`
f f f f f 
f . . . . 
f f f f f 
. . . . f 
f f f f f 
`)
        } else if (bulletNum == 4) {
            bulNum.setImage(img`
f . . . f 
f . . . f 
f f f f f 
. . . . f 
. . . . f 
`)
        } else if (bulletNum == 3) {
            bulNum.setImage(img`
3 3 3 3 3 
. . . . 3 
3 3 3 3 3 
. . . . 3 
3 3 3 3 3 
`)
        } else if (bulletNum == 2) {
            bulNum.setImage(img`
2 2 2 2 2 
. . . . 2 
2 2 2 2 2 
2 . . . . 
2 2 2 2 2 
`)
        } else if (bulletNum == 1) {
            bulNum.setImage(img`
. . 2 . . 
. 2 2 . . 
2 . 2 . . 
. . 2 . . 
2 2 2 2 2 
`)
        } else {
            bulNum.setImage(img`
2 2 2 2 2 
2 . . . 2 
2 . . . 2 
2 . . . 2 
2 2 2 2 2 
`)
        }
    }
    recoverTime = 500 + Math.floor(info.score() / 10) * 500
})
game.onUpdate(function () {
    if (game.runtime() - time >= recoverTime) {
        if (bulletNum < 5) {
            bulletNum += 1
        }
        time = game.runtime()
    }
})
game.onUpdateInterval(800, function () {
    apple = sprites.create(img`
. . . . . . . e c 7 . . . . . . 
. . . . e e e c 7 7 e e . . . . 
. . c e e e e c 7 e 2 2 e e . . 
. c e e e e e c 6 e e 2 2 2 e . 
. c e e e 2 e c c 2 4 5 4 2 e . 
c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
. e e e 2 2 2 2 2 2 2 2 2 4 e . 
. 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
. . 2 e e 2 2 2 2 2 4 4 2 e . . 
. . . 2 2 e e 4 4 4 2 e e . . . 
. . . . . 2 2 e e e e . . . . . 
`, SpriteKind.Food)
    apple.setPosition(Math.randomRange(10, 150), 10)
    apple.setFlag(SpriteFlag.AutoDestroy, true)
    apple.vy = 100
})

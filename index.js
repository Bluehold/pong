var canvas = document.querySelector('#canvas')
var c = canvas.getContext('2d')

keypress = {}
document.addEventListener('keydown', keyUp)
document.addEventListener('keyup', keyDown)
function keyUp(e) {
  keypress[e.keyCode] = true
}
function keyDown(e) {
  keypress[e.keyCode] = false
}

{
  var uiMid = 12
  var score = [0, 0]
  var bar = [250, 250]
  var ball = [600, 250, 10, 0.1]
  var AIball = 0;
  var Endflash = 0;
  
  class particle {
    constructor(x, y, motion, rotation) {
      this.x = [0, 0]
      this.motion = [0, 0]
      this.rotation = [0, 0]
    }
  }
  var EParticles = {}; 
  var EPcount = 20
  for (i = 0;i < EPcount; i++) {
    EParticles[i] = new particle()
  }
}

c.strokeStyle = '#00000000'
setInterval( function () {
  c.fillStyle = '#000'
  c.beginPath()
  c.rect(0, 0, 1200, 500)
  c.fill()

  if (ball[0] > -10 && ball[0] < 1210) {
    ball[0] += ball[2]
    ball[1] += ball[3]
  }
  if ((ball[1] - 10 < 0 && ball[3] < 0) || (ball[1] + 10 > 500  && ball[3] > 0)) ball[3] = -ball[3]
  if (ball[0] < 1150 && ball[0] > 1130 && Math.abs(ball[1] - bar[1]) < 60) {
    ball[2] = -ball[2]
    ball[3] = (ball[1] - bar[1]) * 0.15
  }
  if (ball[0] < 70 && ball[0] > 50 && Math.abs(ball[1] - bar[0]) < 60) {
    ball[2] = -ball[2]
    ball[3] = (ball[1] - bar[0]) * 0.15
  }
  
  if (keypress[83]) bar[0] += 4
  if (keypress[87]) bar[0] -= 4
  
  if (ball[2] > 0) {
    AIball = (1130 - ball[0]) * (ball[3] / ball[2]) + ball[1]
    if ((AIball < 10 && AIball > -490)) AIball = 10 - AIball
    if ((AIball < 980 && AIball > 490)) AIball = 980 - AIball
    if ((AIball < -490 && AIball > -980)) AIball += 980
    if ((AIball < 1470 && AIball > 980)) AIball -= 1470 + AIball
  }
  else {
  AIball = 250
  }
  if (bar[1] + 45 + ball[3] < AIball) bar[1] += 4
  if (bar[1] - 45 + ball[3] > AIball) bar[1] -= 4
  for (var v in bar) {
    if (bar[v] < 50) bar[v] = 50
    if (bar[v] > 450) bar[v] = 450
  }
  
  if (ball[0] < 0 && Endflash < 80) {
    if (Endflash % 6 < 4) {
      c.fillStyle = '#444'
      c.beginPath()
      c.rect(0,ball[1] - 70, 1200, 140)
      c.fill()
      c.fillStyle = '#888'
      c.beginPath()
      c.rect(0,ball[1] - 50, 1200, 100)
      c.fill()
    }
    Endflash += 1
  }
  if (Endflash == 80) for (var v in EParticles) {
    EParticles[v].xy = [-5, ball[1]]
    EParticles[v].motion = [(Math.random() * 4) ** 2 + 0.1, ((Math.random() * 4) ** 2 - 8)]
    EParticles[v].rotation = [Math.random() * Math.PI * 2, Math.random() - 0.5]
    Endflash += 1
  }
  c.fillStyle = '#fff'
  if (Endflash > 80) for (var v in EParticles) {
      EParticles[v].xy[0] += EParticles[v].motion[0]
      EParticles[v].xy[1] += EParticles[v].motion[1]
      EParticles[v].rotation[0] += EParticles[v].rotation[1]
      EParticles[v].motion[1] += 0.1

      c.beginPath()
      c.moveTo(EParticles[v].xy[0] + Math.sin(EParticles[v].rotation[0]) * 7 , EParticles[v].xy[1] + Math.cos(EParticles[v].rotation[0]) * 7)
      for (l = 0; l < 4; l++) {
        EParticles[v].rotation[0] += Math.PI * 0.5
        c.lineTo(EParticles[v].xy[0] + Math.sin(EParticles[v].rotation[0]) * 7 , EParticles[v].xy[1] + Math.cos(EParticles[v].rotation[0]) * 7)
      }
      c.stroke()
      c.fill()
      Endflash += 1
    }
    if (Endflash > 4800) for (var v in EParticles) {
      EParticles.x = [0, 0]
      EParticles.motion = [0, 0]
      EParticles.rotation = [0, 0]
      Endflash = 0
      ball = [600, 250, 10, Math.random() - 0.5]
    }
  {
    c.fillStyle = '#fff'
    for (uiMid = 12; uiMid < 500; uiMid += 50) {
      c.beginPath()
      c.rect(595, uiMid, 10, 25)
      c.fill()
    }
    c.beginPath()
    c.rect(ball[0] - 10,ball[1] - 10, 20, 20)
    c.fill()
    {
      c.beginPath()
      c.rect(50, bar[0] - 50, 20, 100)
      c.fill()
      c.beginPath()
      c.rect(1130, bar[1] - 50, 20, 100)
      c.fill()
    }
  }
}, 10);
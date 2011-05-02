// vim: ai set sw=2 ts=2

socket = new io.Socket('garmonbozia.local')
socket.connect()
socket.send('some data')
socket.on('connect', function() {
  $(function() {
    $('<canvas width="800" height="600" style="border: 1px solid"></canvas>').appendTo('body')

    var canvas = $('canvas')
      , context = canvas[0].getContext('2d')
      , active = false

    function paint(coord) { context.fillRect(coord.x, coord.y, 4, 4) }

    canvas.mousemove(function(e) {
      if (!active) return

      var coord = {}

      coord.x = e.clientX - canvas[0].offsetLeft
      coord.y = e.clientY - canvas[0].offsetTop

      paint(coord)
      socket.send(JSON.stringify(coord))
    })

    canvas.mousedown(function() { active = true })
    canvas.mouseup(function() { active = false })

    canvas.css({cursor: "crosshair"})

    context.fillStyle = "rgb(0, 0, 255)"

    socket.on('message', function(data) { paint(JSON.parse(data)) })
  })
})


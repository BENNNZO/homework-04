function constGlitch() {
    document.querySelectorAll('.const-glitch').forEach(e => {
        count = 20
        time = 1
        let glitchBox = document.createElement('div').classList.add('glitch-box');
        for (let i = 0; i < count; i++) {
            e.appendChild(glitchBox)
        }
        setInterval(function() {

        })
    })
}

constGlitch()
function shake(amp, amt, len, selector) {
    let index = len / amt
    let stagger = 0
    while (index <= len) {
        setTimeout(function () {
            const moveX = ((Math.random() - 0.5) * 2) * amp
            const moveY = ((Math.random() - 0.5) * 2) * amp
            // console.log({ moveX, moveY, selector })
            document.querySelectorAll(`${selector}`).forEach(e => {
                e.style.transition = 'transform 0.05s ease-out'
                e.style.transform = `translate(${moveX * (amp * 10)}px, ${moveY * (amp * 10)}px) rotate(${(Math.random() - 0.5) * 10}deg)`
            })
            console.log((len / amt) * (1 * 1000) * stagger)
        }, (len / amt) * (1 * 1000) * stagger)
        stagger++
        index += len / amt  
    }
    setTimeout(function () {
        document.querySelectorAll(`${selector}`).forEach(e => {
            e.style.transform = `translate(0px, 0px) rotate(0deg)`
        })
    }, len * 1000)
}

// document.querySelectorAll('.shakeOnClick').forEach(function (e) {
//     e.addEventListener('click', (e) => {
//     console.log(e.target)
//     shake(1, 5, 1, `.${e.target.className}`)
// })})
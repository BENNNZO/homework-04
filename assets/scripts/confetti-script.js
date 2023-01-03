export function confetti(intensity) {
    let quantity = 0
    switch (intensity) {
        case 1: quantity = 25; console.log('slow'); break
        case 2: quantity = 50; console.log('slow'); break
        case 3: quantity = 100; console.log('fast'); break
        case 4: quantity = 500; console.log('fast'); break
        default: quantity = 50; break
    }
    tsParticles.load("tsparticles-confetti", {
        "fullScreen": { "zIndex": 1 },
        "emitters": [{
            "position": { "x": 0, "y": 100 },
            "rate": { "quantity": quantity, 'delay': 0 },
            "life": { "duration": 0.2, "count": 1, },
            'move': { 'direction': 'top-right' }},
        {
            "position": { "x": 100, "y": 100 },
            "rate": { "quantity": quantity, 'delay': 0 },
            "life": { "duration": 0.2, "count": 1, },
            'move': { 'direction': 'top-left' }}],
        "particles": {
            "color": { "value": ["#F7BFB4", "#91F5AD", "#69DDFF", "#FBDE74"]},
            "move": {
                "decay": 0.05,
                "enable": true,
                "gravity": { "enable": true },
                "outModes": { "top": "none", "default": "destroy" },
                "speed": { "min": 10, "max": 100 }
            },
            "number": { 'value': 0 },
            "opacity": {
                "value": { 
                    'min': 0.7, 
                    'max': 1 
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "animation": {
                    "enable": true,
                    "speed": 30
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "animation": {
                    "enable": true,
                    "speed": 30
                }
            },
            "size": {
                "value": 10,
            },
            "wobble": {
                "distance": 50,
                "enable": true,
                "speed": {
                    "min": -7,
                    "max": 7
                }
            },
            "shape": {
                "type": [
                    "circle",
                    "square",
                ],
            }
        },
    })
}
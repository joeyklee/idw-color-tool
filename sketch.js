let bbox;
let dim;

let skin;
let eyes;
let hair;
let organs;

function setup() {
    createCanvas(600, 600).parent("canvas-container");
    colorMode(HSB)
    rectMode(CENTER);
    noStroke();

    bbox = {
        xmin: 0,
        xmax: width,
        ymin: 0,
        ymax: height
    };
    dim = width;


    skin = {
        pos: {
            x: width * 0.25,
            y: width * 0.25
        },
        color: {
            h: select("#skin-h"),
            s: select("#skin-s"),
            b: select("#skin-b")
        }

    };
    eyes = {
        pos: {
            x: width * 0.5,
            y: width * 0.5
        },
        color: {
            h: select("#eyes-h"),
            s: select("#eyes-s"),
            b: select("#eyes-b")
        }

    };
    hair = {
        pos: {
            x: width * 0.75,
            y: width * 0.5
        },
        color: {
            h: select("#hair-h"),
            s: select("#hair-s"),
            b: select("#hair-b")
        }

    };
    organs = {
        pos: {
            x: width * 0.75,
            y: width * 0.75
        },
        color: {
            h: select("#organs-h"),
            s: select("#organs-s"),
            b: select("#organs-b")
        }
    };

    skin.color.h.changed(updateVal)
    skin.color.s.changed(updateVal)
    skin.color.b.changed(updateVal)

    eyes.color.h.changed(updateVal)
    eyes.color.s.changed(updateVal)
    eyes.color.b.changed(updateVal)

    hair.color.h.changed(updateVal)
    hair.color.s.changed(updateVal)
    hair.color.b.changed(updateVal)

    organs.color.h.changed(updateVal)
    organs.color.s.changed(updateVal)
    organs.color.b.changed(updateVal)

    makePalette(bbox, dim, [skin, eyes, hair, organs], 2);
    noLoop();
}

// function draw(){
//     background(220);
// }

function updateVal(e) {
    console.log(this)
    console.log(e.currentTarget.value)

    makePalette(bbox, dim, [skin, eyes, hair, organs], 2);
}

function makePalette(bbox, dim, dataArray, decay) {




    let h_vals = dataArray.map(d => {
        let data = {
            x: d.pos.x,
            y: d.pos.y,
            val: d.color.h.value()
        }

        return data;
        
    })
    let h_idw = new IDW(bbox, dim, h_vals, 2, "h").calculateMatrix();



    let s_vals = dataArray.map(d => {
        let data = {
            x: d.pos.x,
            y: d.pos.y,
            val: d.color.s.value()
        }

        return data;
        
    })
    let s_idw = new IDW(bbox, dim, s_vals, 2, "s").calculateMatrix();


    let b_vals = dataArray.map(d => {
        let data = {
            x: d.pos.x,
            y: d.pos.y,
            val: d.color.b.value()
        }

        return data;
        
    })
    let b_idw = new IDW(bbox, dim, b_vals, 2, "b").calculateMatrix();



    for (let x = 0; x < 600; x++) {
        for (let y = 0; y < 600; y++) {
            noStroke();
            let c = color(round(h_idw[x][y]), round(s_idw[x][y]), round(b_idw[x][y]))
            fill(c);
            rect(x, y, 2, 2)
        }
    }

}
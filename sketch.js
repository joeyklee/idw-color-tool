let bbox;
let dim;

let node1;
let node2;
let node3;
let node4;

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


    node1 = {
        pos: {
            x: width * 0.25,
            y: width * 0.25
        },
        color: {
            h: select("#node-1-h"),
            s: select("#node-1-s"),
            b: select("#node-1-b")
        }

    };
    node2 = {
        pos: {
            x: width * 0.5,
            y: width * 0.5
        },
        color: {
            h: select("#node-2-h"),
            s: select("#node-2-s"),
            b: select("#node-2-b")
        }

    };
    node3 = {
        pos: {
            x: width * 0.75,
            y: width * 0.5
        },
        color: {
            h: select("#node-3-h"),
            s: select("#node-3-s"),
            b: select("#node-3-b")
        }

    };
    node4 = {
        pos: {
            x: width * 0.75,
            y: width * 0.75
        },
        color: {
            h: select("#node-4-h"),
            s: select("#node-4-s"),
            b: select("#node-4-b")
        }
    };

    node1.color.h.changed(updateVal)
    node1.color.s.changed(updateVal)
    node1.color.b.changed(updateVal)

    node2.color.h.changed(updateVal)
    node2.color.s.changed(updateVal)
    node2.color.b.changed(updateVal)

    node3.color.h.changed(updateVal)
    node3.color.s.changed(updateVal)
    node3.color.b.changed(updateVal)

    node4.color.h.changed(updateVal)
    node4.color.s.changed(updateVal)
    node4.color.b.changed(updateVal)

    makePalette(bbox, dim, [node1, node2, node3, node4], 2);
    noLoop();
}

// function draw(){
//     background(220);
// }

function updateVal(e) {
    console.log(this)
    console.log(e.currentTarget.value)

    makePalette(bbox, dim, [node1, node2, node3, node4], 2);
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

let myGradient;

function setup() {
  createCanvas(600, 600).parent("canvas-container");
  colorMode(HSB);
  rectMode(CENTER);
  noStroke();

  const bbox = {
    xmin: 0,
    xmax: width,
    ymin: 0,
    ymax: height,
  };
  const dim = width;

  const node1 = new ColorNode({
    x: width * 0.25,
    y: width * 0.25,
  });
  node1.attachColorSliders(
    select("#node-1-h"),
    select("#node-1-s"),
    select("#node-1-b")
  );

  const node2 = new ColorNode({
    x: width * 0.5,
    y: width * 0.5,
  });
  node2.attachColorSliders(
    select("#node-2-h"),
    select("#node-2-s"),
    select("#node-2-b")
  );

  const node3 = new ColorNode({
    x: width * 0.75,
    y: width * 0.5,
  });
  node3.attachColorSliders(
    select("#node-3-h"),
    select("#node-3-s"),
    select("#node-3-b")
  );

  const node4 = new ColorNode({
    x: width * 0.75,
    y: width * 0.75,
  });
  node4.attachColorSliders(
    select("#node-4-h"),
    select("#node-4-s"),
    select("#node-4-b")
  );

  myGradient = new IdwGradient(bbox, dim, [node1, node2, node3, node4], 2);
  myGradient.init();

  noLoop();
}

function draw() {
  myGradient.render();
}

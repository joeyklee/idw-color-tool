class ColorNode {
  constructor(pos, colorOptions) {
    this.pos = pos || { x: 0, y: 0 };
    this.color = colorOptions || { h: 0, s: 0, b: 0 };
    this.$h = null;
    this.$s = null;
    this.$b = null;
  }

  updateColor = (h, s, b) => {
    this.color = { h, s, b };
  };

  getColorValues = () => {
    return {
      h: this.$h.value(),
      s: this.$s.value(),
      b: this.$b.value(),
    };
  };

  attachColorSliders = ($h, $s, $b) => {
    this.$h = $h;
    this.$s = $s;
    this.$b = $b;
  };
}

class IdwGradient {
  constructor(bbox, dim, colorNodes, decayValue) {
    this.bbox = bbox || {
      xmin: 0,
      xmax: 100,
      ymin: 0,
      ymax: 100,
    };
    this.dim = dim || 100;
    this.colorNodes = colorNodes || [];
    this.decayValue = decayValue || 2;
  }

  init = () => {
    this.colorNodes.forEach((colorNode) => {
      this.handleColorChange(colorNode);
      colorNode.$h.changed(() => this.render());
      colorNode.$s.changed(() => this.render());
      colorNode.$b.changed(() => this.render());
    });
  };

  render = () => {
    this.makePalette();
  };

  handleColorChange = (colorNode) => {
    const { h, s, b } = colorNode.getColorValues();
    colorNode.updateColor(h, s, b);
  };

  updateVal(e) {
    console.log(e.currentTarget.value);
    this.makePalette();
  }

  getIdwVals = (colorNodes, key) => {
    return colorNodes.map((colorNode) => {
      this.handleColorChange(colorNode);
      return {
        x: colorNode.pos.x,
        y: colorNode.pos.y,
        val: colorNode.color[key],
      };
    });
  };

  makePalette = () => {
    const h_vals = this.getIdwVals(this.colorNodes, "h");
    const s_vals = this.getIdwVals(this.colorNodes, "s");
    const b_vals = this.getIdwVals(this.colorNodes, "b");

    const h_idw = new IDW(
      this.bbox,
      this.dim,
      h_vals,
      this.decayValue,
      "h"
    ).calculateMatrix();
    const s_idw = new IDW(
      this.bbox,
      this.dim,
      s_vals,
      this.decayValue,
      "s"
    ).calculateMatrix();
    const b_idw = new IDW(
      this.bbox,
      this.dim,
      b_vals,
      this.decayValue,
      "b"
    ).calculateMatrix();

    for (let x = 0; x < 600; x++) {
      for (let y = 0; y < 600; y++) {
        noStroke();
        const c = color(
          round(h_idw[x][y]),
          round(s_idw[x][y]),
          round(b_idw[x][y])
        );
        fill(c);
        rect(x, y, 2, 2);
      }
    }
  };
}

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

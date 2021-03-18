

/**
 * Class that handles the gradient rendering based
 * on colorNodes
 * @name IdwGradient
 * 
 */
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
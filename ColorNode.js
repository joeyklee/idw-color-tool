/**
 * Class that defines the properties of each node in the 
 * IDW gradient 
 * @name ColorNode
 */
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
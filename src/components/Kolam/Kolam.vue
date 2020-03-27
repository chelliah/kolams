
<template>
  <canvas :id="id" :width="canvasWidth" :height="canvasWidth"></canvas>
</template>
<script>
import Grid from "./Grid.js";
export default {
  props: {
    id: String,
    size: Number,
    inputVal: String
  },
  data() {
    return {
      computedVal: null,
      grid_size: null,
      canvas: null,
      ctx: null,
      grid: null,
      canvasWidth: 600
    };
  },
  methods: {
    setGrid() {
      let diagWidth = this.canvasWidth / (this.size + 1);
      let sideWidth = Math.sqrt((diagWidth * diagWidth) / 2);

      this.grid = new Grid(this.ctx, this.size, sideWidth, this.getInputVal());
      this.grid.draw();
    },
    setCanvas() {
      let canvas = document.getElementById(this.id);
      this.canvas = canvas;

      this.ctx = canvas.getContext("2d");
    },
    getInputVal() {
      console.log('hii', this.inputVal);
      if (!this.inputVal) {
        let inputVal = "";
        let numLetters = Math.pow((this.size - 1) / 2, 2);
        for (let i = 0; i < numLetters; i++) {
          inputVal += "f";
        }
        return inputVal;
      } else {
        return this.inputVal;
      }
    }
  },
  mounted() {
    this.setCanvas();
    this.setGrid();
  }
};
</script>
<style lang="css">
body,
html {
  margin: 0;
  padding: 0;
}

canvas {
  width: 600px;
  height: 600px;
}
</style>
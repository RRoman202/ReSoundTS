import React from "react";
import { makeAutoObservable, makeObservable } from "mobx";

class GenerateCanvas {
  count = 16;
  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 16;
    console.log(this.count);
  }
}
export default new GenerateCanvas();

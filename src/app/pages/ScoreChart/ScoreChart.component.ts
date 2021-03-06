import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ScoreChart',
  templateUrl: './ScoreChart.component.svg',
  styleUrls: ['./ScoreChart.component.scss']
})
export class ScoreChartComponent implements OnInit {

  line: string = "M 10 10 L 20 20 L 30 20 L 80 30"
  position: number[] = []
  data: number[] = []

  constructor() { }

  ngOnInit() {
    for (let i: number = 0; i < 400; i++) {
      this.position.push(i)
      this.data.push(0)
    }
    this.line = this.generateLine()
  }

  generateLine(): string {
    let out: string = "M 0 200"
    this.position.forEach((x, index) => {
      out = out + " L " + x + " " + (200 - this.data[index])
    })
    return out
  }

  public updateData(newData: number) {
    this.data.push(newData)
    this.data.shift()
    this.line = this.generateLine()
  }

}

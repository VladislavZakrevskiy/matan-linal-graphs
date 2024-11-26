import Konva from "konva";

export interface Point {
  x: number;
  y: number;
}

export class Drawer {
  stage: Konva.Stage;
  scale: number = 1;
  gridDistance: number = 1;
  private layer: Konva.Layer;
  private basisX: Point;
  private basisY: Point;
  private lastAxes: Konva.Line[] = [];
  private lastGrid: Konva.Line[] = [];
  private lastVectors: { data: [Point, Point]; vector: Konva.Arrow }[] = [];
  private lastPoints: { data: Point; point: Konva.Circle }[] = [];
  private lastFuncLines: { data: [Point, Point]; line: Konva.Line }[] = [];

  constructor(containerId: string, width: number, height: number) {
    this.stage = new Konva.Stage({
      container: containerId,
      width,
      height,
    });

    this.basisX = { x: 1, y: 0 };
    this.basisY = { x: 0, y: 1 };
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  set height(height: number) {
    this.stage.height(height);
  }

  set width(width: number) {
    this.stage.width(width);
  }

  set setBasisX(basisX: Point) {
    this.basisX = basisX;
  }

  set setBasisY(basisY: Point) {
    this.basisY = basisY;
  }

  private transformPoint(point: Point): Point {
    return {
      x: this.scale * (point.x * this.basisX.x + point.y * this.basisY.x),
      y: this.scale * (point.x * this.basisX.y + point.y * this.basisY.y),
    };
  }

  private transformPoints(points: Point[]): Point[] {
    return points.map((p) => this.transformPoint(p));
  }

  drawAxes(color: string = "black", strokeWidth: number = 2): Konva.Line[] {
    const width = this.stage.width();
    const height = this.stage.height();
    const origin = { x: width / 2, y: height / 2 };

    const xAxis = new Konva.Line({
      points: [this.transformPoint({ x: -width, y: 0 }), this.transformPoint({ x: width, y: 0 })].flatMap((p) => [
        p.x + origin.x,
        p.y + origin.y,
      ]),
      stroke: color,
      strokeWidth,
    });

    const yAxis = new Konva.Line({
      points: [this.transformPoint({ x: 0, y: height }), this.transformPoint({ x: 0, y: -height })].flatMap((p) => [
        p.x + origin.x,
        -p.y + origin.y,
      ]),
      stroke: color,
      strokeWidth,
    });

    this.layer.add(xAxis, yAxis);
    this.layer.draw();

    this.lastAxes = [xAxis, yAxis];

    return [xAxis, yAxis];
  }

  drawGrid(color: string = "lightgray", strokeWidth: number = 1): Konva.Line[] {
    const width = this.stage.width();
    const height = this.stage.height();
    const origin = { x: width / 2, y: height / 2 };

    const lines: Konva.Line[] = [];

    for (let x = 0; x <= width; x += this.gridDistance) {
      const linePoints = [
        { x, y: -height },
        { x, y: height },
      ];
      const transformedPoints = this.transformPoints(linePoints);
      const konvaLine = new Konva.Line({
        points: transformedPoints.flatMap((p) => [p.x + origin.x, -p.y + origin.y]),
        stroke: color,
        strokeWidth,
      });
      this.layer.add(konvaLine);
      lines.push(konvaLine);
    }

    for (let x = 0; x >= -width; x -= this.gridDistance) {
      const linePoints = [
        { x, y: -height },
        { x, y: height },
      ];
      const transformedPoints = this.transformPoints(linePoints);
      const konvaLine = new Konva.Line({
        points: transformedPoints.flatMap((p) => [p.x + origin.x, -p.y + origin.y]),
        stroke: color,
        strokeWidth,
      });
      this.layer.add(konvaLine);
      lines.push(konvaLine);
    }

    for (let y = 0; y >= -height; y -= this.gridDistance) {
      const linePoints = [
        { x: -width, y },
        { x: width, y },
      ];
      const transformedPoints = this.transformPoints(linePoints);
      const konvaLine = new Konva.Line({
        points: transformedPoints.flatMap((p) => [p.x + origin.x, -p.y + origin.y]),
        stroke: color,
        strokeWidth,
      });
      this.layer.add(konvaLine);
      lines.push(konvaLine);
    }

    for (let y = 0; y <= height; y += this.gridDistance) {
      const linePoints = [
        { x: -width, y },
        { x: width, y },
      ];
      const transformedPoints = this.transformPoints(linePoints);
      const konvaLine = new Konva.Line({
        points: transformedPoints.flatMap((p) => [p.x + origin.x, -p.y + origin.y]),
        stroke: color,
        strokeWidth,
      });
      this.layer.add(konvaLine);
      lines.push(konvaLine);
    }

    this.lastGrid = [...lines];

    this.layer.draw();
    return lines;
  }

  animateAxes(duration: number): void {
    const width = this.stage.width();
    const height = this.stage.height();
    const origin = { x: width / 2, y: height / 2 };
    const xTransformedPoints = [this.transformPoint({ x: -width / 2, y: 0 }), this.transformPoint({ x: width / 2, y: 0 })].flatMap((p) => [
      p.x + origin.x,
      p.y + origin.y,
    ]);

    const yTransformedPoints = [this.transformPoint({ x: 0, y: height / 2 }), this.transformPoint({ x: 0, y: -height / 2 })].flatMap(
      (p) => [p.x + origin.x, -p.y + origin.y]
    );

    this.lastAxes[0]?.to({
      points: xTransformedPoints,
      duration,
      onFinish: () => this.layer.draw(),
    });

    this.lastAxes[1]?.to({
      points: yTransformedPoints,
      duration,
      onFinish: () => this.layer.draw(),
    });
  }

  animateGrid(duration: number): void {
    const width = this.stage.width();
    const height = this.stage.height();
    const origin = { x: width / 2, y: height / 2 };
    const lines: number[][] = [];

    for (let x = 0; x <= width; x += this.gridDistance) {
      const linePoints = [
        { x, y: -height },
        { x, y: height },
      ];
      const transformedPoints = this.transformPoints(linePoints).flatMap((p) => [p.x + origin.x, -p.y + origin.y]);
      lines.push(transformedPoints);
    }

    for (let x = 0; x >= -width; x -= this.gridDistance) {
      const linePoints = [
        { x, y: -height },
        { x, y: height },
      ];
      const transformedPoints = this.transformPoints(linePoints).flatMap((p) => [p.x + origin.x, -p.y + origin.y]);
      lines.push(transformedPoints);
    }

    for (let y = 0; y >= -height; y -= this.gridDistance) {
      const linePoints = [
        { x: -width, y },
        { x: width, y },
      ];
      const transformedPoints = this.transformPoints(linePoints).flatMap((p) => [p.x + origin.x, -p.y + origin.y]);
      lines.push(transformedPoints);
    }

    for (let y = 0; y <= height; y += this.gridDistance) {
      const linePoints = [
        { x: -width, y },
        { x: width, y },
      ];
      const transformedPoints = this.transformPoints(linePoints).flatMap((p) => [p.x + origin.x, -p.y + origin.y]);
      lines.push(transformedPoints);
    }

    this.lastGrid.forEach((line, i) => {
      line.to({
        points: lines[i],
        duration,
        onFinish: () => this.layer.draw(),
      });
    });
  }

  drawPoint(point: Point, color: string = "black", radius: number = 5) {
    const transformedPoint = this.transformPoint(point);

    const circle = new Konva.Circle({
      x: transformedPoint.x + this.stage.width() / 2,
      y: this.stage.height() / 2 - transformedPoint.y,
      radius,
      fill: color,
    });

    this.layer.add(circle);
    this.layer.draw();

    this.lastPoints.push({ data: point, point: circle });

    return circle;
  }

  drawVector(
    start: { x: number; y: number },
    end: { x: number; y: number },
    color: string = "blue",
    strokeWidth: number = 2,
    headSize: number = 10
  ) {
    const transformedStart = this.transformPoint(start);
    const transformedEnd = this.transformPoint(end);

    const arrow = new Konva.Arrow({
      points: [
        transformedStart.x + this.stage.width() / 2,
        this.stage.height() / 2 - transformedStart.y,
        transformedEnd.x + this.stage.width() / 2,
        this.stage.height() / 2 - transformedEnd.y,
      ],
      pointerLength: headSize,
      pointerWidth: headSize / 2,
      fill: color,
      stroke: color,
      strokeWidth: strokeWidth,
    });

    this.lastVectors.push({ data: [start, end], vector: arrow });

    this.layer.add(arrow);
    this.layer.draw();

    return arrow;
  }

  drawLine(start: Point, end: Point, color: string, strokeWidth: number) {
    const transformedStart = this.transformPoint(start);
    const transformedEnd = this.transformPoint(end);

    const line = new Konva.Line({
      points: [
        transformedStart.x + this.stage.width() / 2,
        this.stage.height() / 2 - transformedStart.y,
        transformedEnd.x + this.stage.width() / 2,
        this.stage.height() / 2 - transformedEnd.y,
      ],
      stroke: color,
      strokeWidth: strokeWidth,
    });

    this.lastFuncLines.push({ data: [start, end], line });

    this.layer.add(line);
    this.layer.draw();

    return line;
  }

  drawPoints(points: Array<{ x: number; y: number }>, color: string = "black", radius: number = 5) {
    const circles = points.map((point) => this.drawPoint(point, color, radius));

    return circles;
  }

  animatePoints(duration: number) {
    this.lastPoints.forEach(({ data, point }) => {
      const transformedPoint = this.transformPoint(data);

      point.to({
        x: transformedPoint.x + this.stage.width() / 2,
        y: this.stage.height() / 2 - transformedPoint.y,
        duration,
        onFinish: () => this.layer.draw(),
        easing: Konva.Easings.Linear,
      });
    });
  }

  animateLines(duration: number) {
    this.lastFuncLines.forEach(({ data, line }) => {
      const transformedStart = this.transformPoint(data[0]);
      const transformedEnd = this.transformPoint(data[1]);

      line.to({
        points: [
          transformedStart.x + this.stage.width() / 2,
          this.stage.height() / 2 - transformedStart.y,
          transformedEnd.x + this.stage.width() / 2,
          this.stage.height() / 2 - transformedEnd.y,
        ],
        duration,
        onFinish: () => this.layer.draw(),
      });
    });
  }

  animateVectors(duration: number) {
    this.lastVectors.forEach(({ data, vector }) => {
      const transformedStart = this.transformPoint(data[0]);
      const transformedEnd = this.transformPoint(data[1]);

      vector.to({
        points: [
          transformedStart.x + this.stage.width() / 2,
          this.stage.height() / 2 - transformedStart.y,
          transformedEnd.x + this.stage.width() / 2,
          this.stage.height() / 2 - transformedEnd.y,
        ],
        duration,
        onFinish: () => this.layer.draw(),
      });
    });
  }

  clear(): void {
    this.lastVectors = [];
    this.lastPoints = [];
    this.lastFuncLines = [];
    this.layer.destroyChildren();
    this.layer.draw();
  }
}

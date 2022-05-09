import Math2 from '../Utils/math';

export default class LongPosition {
  constructor(comp, params = {}) {
    this.comp = comp;
    let [p1, p2, p3, p4] = this.comp.pins;
    p1.setDragDirection({ up: true, down: true });
    p3.setDragDirection({ up: true, down: true });
    p4.setDragDirection({ left: true, right: true });
    this.params = params;
    this.comp.isHovered = this.isHovered.bind(this);
    this.comp.drawTool = this.drawTool.bind(this);
  }

  drawTool(ctx) {
    let { pins } = this.comp;
    let [p1, p2, p3, p4] = pins;
    // p1 and p3 must follow p2 horizontally.
    p1.update(p2.t, null, true);
    p3.update(p2.t, null, true);

    // p4 must follow p2 vertically.
    p4.update(null, p2.$, true);

    // Setting the range so it doesn't collapse.
    p1.setRange({ $: { min: p2.$ } });
    p2.setRange({ t: { max: p4.t }, $: { min: p3.$, max: p1.$ } });
    p3.setRange({ $: { max: p2.$ } });
    p4.setRange({ t: { min: p2.t } });

    // Reinitialize these variables since it's been updated above.
    let pos1 = p1.getScreenPos();
    let pos2 = p2.getScreenPos();
    let pos3 = p3.getScreenPos();
    let pos4 = p4.getScreenPos();

    ctx.beginPath();
    this.paths = [
      new Path2D(),
      new Path2D()
    ]

    // Upper rectangle.
    ctx.fillStyle = this.comp.profitAreaBackground;
    this.paths[0].rect(pos1.x, pos1.y, pos4.x - pos1.x, pos2.y - pos1.y);
    ctx.fill(this.paths[0]);

    // Lower rectangle.
    ctx.fillStyle = this.comp.lossAreaBackground;
    this.paths[1].rect(pos2.x, pos2.y, pos4.x - pos2.x, pos3.y - pos2.y);
    ctx.fill(this.paths[1]);

    let targetText = `Target: ${Math2.round(p1.$, 5)}`;
    let centerX = (pos2.x + pos4.x) * 0.5;
    let stopText = `Stop: ${Math2.round(p3.$, 5)}`;
    let middleText = `Open P&L: ${Math2.round(p1.$ - p2.$, 5)}`;

    let { layout } = this.comp;

    // Does the trade get tagged in?
    let touchPoint = this.getTouchPoint();
    if (touchPoint) {
      touchPoint.x = layout.t2screen(touchPoint.t);
      touchPoint.y = layout.$2screen(touchPoint.$);

      // Get the exit point.
      let profitPoint = this.getLastPoint(touchPoint);
      profitPoint.x = layout.t2screen(profitPoint.t);
      profitPoint.y = layout.$2screen(profitPoint.$);

      // Highlight the profit/loss area.
      let profitPath = new Path2D();
      profitPath.rect(touchPoint.x, touchPoint.y, profitPoint.x - touchPoint.x, profitPoint.y - touchPoint.y);

      if (profitPoint.$ > touchPoint.$)
        ctx.fillStyle = this.comp.profitAreaBackground;
      else
        ctx.fillStyle = this.comp.lossAreaBackground;

      ctx.fill(profitPath);

      middleText = profitPoint.$ == p1.$ || profitPoint.$ == p3.$ ? 'Closed' : 'Open';
      middleText += ` P&L: ${Math2.round(profitPoint.$ - touchPoint.$, 5)}`;
    }

    if (this.isHovered) {
      this.fillText(ctx, targetText, centerX, pos1.y - 10);
      this.fillText(ctx, stopText, centerX, pos3.y + 15);
      this.fillText(ctx, middleText, centerX, pos2.y - 5);
      let riskRewardText = `R/R: ${Math2.round((p1.$ - p2.$)/(p2.$ - p3.$), 2)}`;
      this.fillText(ctx, riskRewardText, centerX, pos2.y + 10);
    }
  }

  getTouchPoint() {
    let p2 = this.comp.pins[1];
    let p4 = this.comp.pins[3];
    let data = this.comp.sub;
    for (var d of data) {
      if (d[0] >= p2.t && d[0] <= p4.t &&   // within x range
        d[2] >= p2.$ && d[3] <= p2.$)     // within y range
        return { t: d[0], $: p2.$ }
    }

    return null;
  }

  getLastPoint(touchPoint) {
    let [p1, p2, p3, p4] = this.comp.pins;
    let data = this.comp.sub;
    let lastPoint = null;
    for (var d of data) {
      // Break if already passed p4.
      if (d[0] > p4.t)
        break;

      lastPoint = d;

      // Skip anything that didn't touch.
      if (d[0] <= touchPoint.t) continue;

      // Taken profit
      if (d[2] >= p1.$) return { t: d[0], $: p1.$ };

      // Cut loss
      if (d[3] <= p3.$) return { t: d[0], $: p3.$ };
    }

    // Last point
    let lastPrice = lastPoint[4];
    if (lastPrice > p1.$) lastPrice = p1.$;
    if (lastPrice < p3.$) lastPrice = p3.$;
    return { t: lastPoint[0], $: lastPrice };
  }

  fillText(ctx, text, x, y) {
    // Draw text.
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(text, x, y);
  }

  isHovered() {
    let { paths } = this;
    let { ctx, cursor } = this.comp;
    if (!paths) return false;

    for (var p of paths)
      if (ctx.isPointInPath(p, cursor.x, cursor.y))
        return true;

    return false;
  }
}
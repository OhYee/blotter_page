export function getOffsetTop(e: HTMLElement): number {
  return e.offsetTop + (e.offsetParent ? getOffsetTop(e.offsetParent as any) : 0);
}

export function getOffsetLeft(e: HTMLElement): number {
  return e.offsetLeft + (e.offsetParent ? getOffsetLeft(e.offsetParent as any) : 0);
}

export function getInlineWidth(e: HTMLElement): number {
  if (e.offsetWidth != 0) return e.offsetWidth;
  const children = e.children;
  var sum = 0;
  for (var i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    sum += getInlineWidth(child);
  }
  return sum;
}

export default getOffsetTop;

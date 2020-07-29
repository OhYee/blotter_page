function getOffsetTop(e: HTMLElement): number {
  return e.offsetTop + (e.offsetParent ? getOffsetTop(e.offsetParent as any) : 0);
}

export default getOffsetTop;

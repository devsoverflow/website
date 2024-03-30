export function hover3d(node: HTMLElement, { duration = 1000, delay = 0, reverse = false, glow = true } = {}) {
  node.style.position = 'relative';

  let bounds = node.getBoundingClientRect();
  let glow_node = glow ? document.createElement('div') : undefined;
  if (glow_node) {
    glow_node.style.position = 'absolute';
    glow_node.style.top = '0';
    glow_node.style.left = '0';
    glow_node.style.width = '100%';
    glow_node.style.height = '100%';
    glow_node.style.backgroundImage = `var(--glow-gradient)`;
    glow_node.style.pointerEvents = 'none';
    glow_node.style.zIndex = '-1';
    node.prepend(glow_node);
  }

  function rotateToMouse(e: MouseEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    node.style.transform = `
    scale3d(1.1, 1.1, 1.1)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

    node.style.setProperty('--glow-gradient', `
    radial-gradient(
      circle at
      ${center.x + bounds.width / 2}px
      ${center.y + bounds.height / 2}px,
      hsla(0, 100%, 50%, 0.33),
      #00000000 75%
    )`);

    // if (glow_node) {
    //   glow_node.style.backgroundImage = `
    //   radial-gradient(
    //     circle at
    //     ${center.x + bounds.width / 2}px
    //     ${center.y + bounds.height / 2}px,
    //     #ffffff55,
    //     #0000000f
    //   )`;
    // }
  }

  function onMouseEnter() {
    bounds = node.getBoundingClientRect();
    node.addEventListener('mousemove', rotateToMouse);
  }

  function onMouseLeave() {
    node.removeEventListener('mousemove', rotateToMouse);
    node.style.transform = ``;
    node.style.background = '';
    node.style.setProperty('--glow-gradient', 'none');
  }

  node.addEventListener('mouseleave', onMouseLeave);
  node.addEventListener('mouseenter', onMouseEnter);

  return {
    destroy() {
      node.removeEventListener('mousemove', rotateToMouse);
      node.removeEventListener('mouseleave', onMouseLeave);
      node.removeEventListener('mouseleave', onMouseEnter);
      glow_node?.remove();
    }
  };
}

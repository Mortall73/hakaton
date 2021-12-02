export default (root) => {
  if (!root) throw new Error('No root element');
  const container = root;
  const gap = container.getAttribute('data-gap');
  const wrapper = root.querySelector('.horizontal-scroll__container');
  [...wrapper.children].forEach(child => {
    child.classList.add('js-scroll-block')
  });
  const blocks = wrapper.querySelectorAll('.js-scroll-block');
  const totalWidth = [...blocks].reduce((acc, block) => {
    return acc + block.clientWidth + Number(gap);
  }, 0);

  let delta = 0;

  container.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    delta += evt.deltaY;
  
    wrapper.style.transform = `translateX(${delta}px)`;
    container.classList.add('left-shadow');

    if (evt.deltaY > 0 && delta >= 0) {
      wrapper.style.transform = `translateX(${0}px)`;
      delta = 0;
      container.classList.remove('left-shadow');
    }

    if (evt.deltaY < 0 && (delta*-1) + wrapper.clientWidth >= totalWidth ) {
      wrapper.style.transform = `translateX(-${totalWidth - wrapper.clientWidth}px)`;
      delta = -(totalWidth - wrapper.clientWidth);
    }
  });
}
AOS.init({
    offset: 200,
    duration: 900,
    easing: 'ease-out',
    delay: 100,
    once: true,
    anchorPlacement: 'center-top',
});

window.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const anchorLinksArr = Array.prototype.slice.call(anchorLinks);
  
    anchorLinksArr.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.hash;
        const targetElement = document.querySelector(targetId);
        const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
        const totalScrollAmount = targetOffsetTop - 80;
        window.scrollTo({
          top: totalScrollAmount,
          behavior: "smooth"
        });
      });
    });
  });
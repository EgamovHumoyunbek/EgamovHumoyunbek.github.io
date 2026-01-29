// Oddiy parallax effekti (scroll bilan)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.layer--back').style.transform = `translateZ(-100px) scale(2) translateY(${scrollY * 0.1}px)`;
  document.querySelector('.layer--mid').style.transform = `translateZ(-50px) scale(1.5) translateY(${scrollY * 0.3}px)`;
  document.querySelector('.layer--front').style.transform = `translateZ(0) scale(1) translateY(${scrollY * 0.6}px)`;
});

// Hoverda 3D burilish (ixtiyoriy)
document.querySelectorAll('.btn-3d').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;
    btn.style.transform = `translateZ(40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateZ(20px)';
  });
});

(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const toggle = nav.querySelector('.nav__toggle');
  const groups = nav.querySelectorAll('.nav__group');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      groups.forEach((group) => closeGroup(group));
    }
  });

  function closeGroup(group) {
    group.classList.remove('is-open');
    group.querySelector('.nav__group-label').setAttribute('aria-expanded', 'false');
  }

  groups.forEach((group) => {
    const label = group.querySelector('.nav__group-label');
    label.addEventListener('click', () => {
      const isOpen = group.classList.toggle('is-open');
      label.setAttribute('aria-expanded', String(isOpen));
      groups.forEach((other) => {
        if (other !== group) closeGroup(other);
      });
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      groups.forEach((group) => closeGroup(group));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      groups.forEach((group) => closeGroup(group));
      toggle.focus();
    }
  });
})();

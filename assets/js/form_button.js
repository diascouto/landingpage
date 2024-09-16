// script.js
document.querySelectorAll('.checkbox input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
          document.querySelectorAll('.checkbox input[type="checkbox"]').forEach((box) => {
              if (box !== e.target) {
                  box.checked = false;
              }
          });
      }
  });
});

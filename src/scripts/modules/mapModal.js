import Uikit from "uikit";

export default (root) => {
  const modalId = root.getAttribute('data-id');
  const content = document.querySelector(`[data-modal-id="${modalId}"]`).innerHTML;

  root.addEventListener('click', () => {
    Uikit.modal(content).show();
  });

}
import UIkit from 'uikit';

export default (root) => {
  root.addEventListener('click', () => {
    const content = root.querySelector('.js-user-modal').innerHTML;
    console.log()
    UIkit.modal.dialog(content);
    // UIkit.modal(root.querySelector('.js-user-modal'), {}).show();
  });
};
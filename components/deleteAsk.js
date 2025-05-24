const deleteAsk = (deleteFunc, item) => {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  // Create popup container
  const delMessage = document.createElement('div');
  delMessage.className = 'del-msg';

  const cancleBtn = document.createElement('button');
  cancleBtn.className = 'can-btn';
  cancleBtn.textContent = 'Cancel';

  const delBtn = document.createElement('button');
  delBtn.className = 'del-btn';
  delBtn.textContent = 'Delete';

  delMessage.textContent = `Do you really want to delete this ${item} ?`;
  delMessage.appendChild(cancleBtn);
  delMessage.appendChild(delBtn);

  // Cancel button
  cancleBtn.addEventListener('click', () => {
    overlay.remove();
  });

  // Delete button
  delBtn.addEventListener('click', () => {
    deleteFunc();
    overlay.remove();
  });

  // Append popup to overlay and overlay to body
  overlay.appendChild(delMessage);
  document.body.appendChild(overlay);
};

export default deleteAsk;

const reloadOnce  = () => {
    window.onload = function () {
      if (!window.location.hash.includes('#reloaded')) {
        window.location.href += '#reloaded';
        window.location.reload();
      }
    };
}

export default reloadOnce
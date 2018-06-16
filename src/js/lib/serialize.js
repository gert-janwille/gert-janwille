/*eslint default-case: 0*/

export default form => {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }

  let i, j = [];
  const q = {};

  for (i = form.elements.length - 1;i >= 0;i = i - 1) {
    if (form.elements[i].name === '') {
      continue;
    }

  switch (form.elements[i].nodeName) {
    case 'INPUT':
      switch (form.elements[i].type) {
      case 'text':
      case 'email':
      case 'hidden':
      case 'password':
      case 'button':
      case 'reset':
      case 'number':
        q[form.elements[i].name] = form.elements[i].value;
        break;
      case 'file':
        q[form.elements[i].name] = form.elements[i].files[0];
        break;
      case 'checkbox':
      case 'radio':
        q[form.elements[i].id] = form.elements[i].checked;
        break;
      }
      break;
    case 'TEXTAREA':
      q[form.elements[i].name] = form.elements[i].value;
      break;
    case 'SELECT':
      switch (form.elements[i].type) {
      case 'select-one':
        q[form.elements[i].name] = form.elements[i].value;
        break;
      case 'select-multiple':
        for (j = form.elements[i].options.length - 1;j >= 0;j = j - 1) {
          if (form.elements[i].options[j].selected) {
            q[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
          }
        }
        break;
      }
      break;
    case 'BUTTON':
      switch (form.elements[i].type) {
      case 'reset':
      case 'submit':
      case 'button':
        q[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
        break;
      }
      break;
    }
  }

  return q;
};

import throttle from 'lodash.throttle';

const STATE_STORAGE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', throttle(saveForm, 500));
feedbackForm.addEventListener('submit', onFormSubmit);

retrieveForm(feedbackForm);

function saveForm(e) {
  const formRef = e.target.closest('form');
  const formState = {
    email: formRef.email.value,
    message: formRef.message.value,
  };
  localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(formState));
}

function onFormSubmit(e) {
  e.preventDefault();

  const formState = {
    email: e.currentTarget.email.value,
    message: e.currentTarget.message.value,
  };
  console.log(formState);

  e.currentTarget.reset();

  clearForm();
}

function retrieveForm(formRef) {
  if (!localStorage.getItem(STATE_STORAGE_KEY)) return;

  const { email, message } = JSON.parse(
    localStorage.getItem(STATE_STORAGE_KEY)
  );
  formRef.email.value = email;
  formRef.message.value = message;
}

function clearForm() {
  localStorage.removeItem(STATE_STORAGE_KEY);
}

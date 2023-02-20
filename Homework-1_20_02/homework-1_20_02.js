// ************************** Task **************************************
// Дан массив с пользователями.
// Сформировать карточки пользователей и отобразить их в браузере. Если пользователь online, прописать в карточке 'Status: online', если нет - 'Status: offline'
// Стилизовать карточки. Если пользователь в сети, у его карточки должен быть светло-голубой цвет заднего фона. Если не online - цвета нет.
// Добавить форму с тремя инпутами для сбора данных об имени, фамилии и возрасте пользователя. По умолчанию все добавляемые пользователи должны иметь свойство online со значением true
// При отправке формы отрисовывать карточку из собранных данных
// При обновлении страницы добавленные карточки не пропадают
// При клике на карточку менять статус (online) пользователя на противоположный

const users = [
  {
    id: 1,
    firstname: 'Ivan',
    lastname: 'Petrov',
    age: 17,
    online: true,
  },
  {
    id: 1,
    firstname: 'Ivan',
    lastname: 'Petrov',
    age: 17,
    online: true,
  },
  {
    id: 2,
    firstname: 'Irina',
    lastname: 'Ivanova',
    age: 37,
    online: false,
  },
  {
    id: 3,
    firstname: 'Olga',
    lastname: 'Sokolova',
    age: 29,
    online: false,
  },
  {
    id: 4,
    firstname: 'Boris',
    lastname: 'Ushanov',
    age: 43,
    online: true,
  },
];

const usersContainer = document.querySelector('.users_container');
const addUserForm = document.querySelector('.add_user_form');

const storedUsers = JSON.parse(localStorage.getItem('users')) ?? users;

// FIXME
addUserForm.addEventListener('submit', event => {
  event.preventDefault();

  const { name, lastname, age } = event.target;

  users.push({
    id: Date.now(),
    firstname: name.value,
    lastname: lastname.value,
    age: age.value,
    online: true,
  });
  localStorage.setItem('users', JSON.stringify(storedUsers));
  renderCards(storedUsers);
  name.value = '';
  lastname.value = '';
  age.value = '';
});

function renderCards(users) {
  usersContainer.innerHTML = '';
  users.forEach(({ firstname, lastname, age, online }) => {
    const cardElem = document.createElement('div');
    cardElem.className = 'card';
    cardElem.style.backgroundColor = online ? 'lightblue' : 'white';
    cardElem.addEventListener('click', () => {
      if (cardElem.style.backgroundColor == 'lightblue') {
        cardElem.style.backgroundColor = 'white';
        statusElem.innerText = 'Status: offline';
      } else {
        cardElem.style.backgroundColor = 'lightblue';
        statusElem.innerText = 'Status: online';
      }
    });

    const nameElem = document.createElement('p');
    nameElem.innerText = `Name: ${firstname}`;

    const lastnameElem = document.createElement('p');
    lastnameElem.innerText = `Lastname: ${lastname}`;

    const ageElem = document.createElement('p');
    ageElem.innerText = `Age: ${age}`;

    const statusElem = document.createElement('p');
    statusElem.innerText = `Status: ${online ? 'online' : 'offline'}`;

    cardElem.append(nameElem, lastnameElem, ageElem, statusElem);
    usersContainer.append(cardElem);
  });
}

renderCards(storedUsers);

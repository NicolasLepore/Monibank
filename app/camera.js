const startCameraBtn = document.querySelector('[data-video-botao]');
const cameraField = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const takeAPicture = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const msg = document.querySelector('[data-mensagem]');
const sendImageBtn = document.querySelector('[data-enviar]');

let imageURL = '';

startCameraBtn.addEventListener('click', async () => {
    const startVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    startCameraBtn.style.display = 'none';
    cameraField.style.display = 'block';

    video.srcObject = startVideo;
});

takeAPicture.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imageURL = canvas.toDataURL('image/jpeg');

    cameraField.style.display = 'none';
    msg.style.display = 'block';
})

sendImageBtn.addEventListener('click', () => {
    //console.log(imageURL);
    const receiveData = localStorage.getItem('User-Acc');
    const convertReturn = JSON.parse(receiveData);

    convertReturn.image = imageURL;

    localStorage.setItem('User-Acc', JSON.stringify(convertReturn));

    window.location.href = './abrir-conta-form-3.html';
})
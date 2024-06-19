
const blueBtn = document.querySelector('.blue');
const pinkBtn = document.querySelector('.pink');
const yellowBtn = document.querySelector('.yellow');
let umbrellaNode = document.getElementById('umbrella');
let loaderNode = document.getElementById('loader');
const uploadBtn = document.getElementById('upload-btn');

let loaderSrc = "./assests/svg/loader_icon.svg";
let uploadSrc = "./assests/svg/upload_icon.svg";

const ImageAndColourChange = [
    {   
        btn: blueBtn,
        bgColor: '#ccffe6',
        uploadBtnColor: '#0095e3',
        umbrellaImg: './assests/images/Blue umbrella.png',
    },
    {
        btn: yellowBtn,
        bgColor: '#ffff99',
        uploadBtnColor: 'yellow',
        umbrellaImg: './assests/images/Yello umbrella.png',
    },
    {
        btn: pinkBtn,
        bgColor: '#ffe6e6',
        uploadBtnColor: '#db3c91',
        umbrellaImg: './assests/images/Pink umbrella.png',
    }
];

for (let i = 0; i < ImageAndColourChange.length; i++) {
    const {btn, bgColor, uploadBtnColor, umbrellaImg} = ImageAndColourChange[i];
    btn.addEventListener('click', function() {
        if (umbrellaNode) umbrellaNode.classList.add('hide'); 
        if (loaderNode) loaderNode.classList.remove('hide');
        
        setTimeout(function() {
            if (loaderNode) loaderNode.classList.add('hide');
            if (umbrellaNode) umbrellaNode.classList.remove('hide');
            document.body.style.background = bgColor;
            uploadBtn.style.background = uploadBtnColor;
            document.querySelector('.umbrella-img').src = umbrellaImg;
        }, 4000);
    });
}

uploadBtn.querySelector('#file').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const fileSize = file.size;
        const fileName = file.name;
        console.log("File name:", fileName);
        console.log("File size:", fileSize);

        let validExtensions = /(\.png|\.jpg|\.jpeg)$/i;
        let fileSizeInMb = Math.round((fileSize / (1024 * 1024)));
        console.log("Actual Size in MB : ", fileSizeInMb);

        if (fileName.match(validExtensions)) {
            if (fileSizeInMb <= 5) {
                uploadFile(file);
            } else {
                alert("File size should be less than or equal to 5MB");
            }
        } else {
            alert("Invalid file type. Please upload .png, .jpg, .jpeg files only");
        }
    } else {
        console.log("No file selected.");
    }
});

function uploadFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        var previewContainer = document.getElementById('uploadImagePreview');
        if (previewContainer) {
            previewContainer.innerHTML = ''; // Clear any existing content
            previewContainer.appendChild(img);
        }
    };

    reader.readAsDataURL(file);

    if (umbrellaNode) {
        umbrellaNode.classList.add('hide');
        console.log("hideUmbrella");
    }
    if (loaderNode) {
        loaderNode.classList.remove('hide');
        document.getElementById('uploadIcon').classList.add('loaderIcon'); // Fixed typo here
        document.getElementById('uploadIcon').src = `${loaderSrc}`;
        document.getElementById('uploadText').innerHTML = `${file.name}`;
        console.log("fileName : ", file.name);
    }

    setTimeout(function() {
        if (loaderNode) {
            loaderNode.classList.add('hide');
            document.getElementById('uploadIcon').classList.remove('loaderIcon'); // Fixed typo here
        }
        if (umbrellaNode) {
            umbrellaNode.classList.remove('hide');
            document.getElementById('uploadIcon').src = `${uploadSrc}`;
        }
    }, 4000);
}


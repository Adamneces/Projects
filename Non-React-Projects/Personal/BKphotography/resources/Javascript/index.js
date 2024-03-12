const chevronUp = document.getElementById('up');
const chevronDown = document.getElementById('down');
const lensContainer = document.getElementById('lensTextContainer');

const categoryStyles = {
    1: [
      { gridArea: '1/1/10/5', backgroundImage: 'url(Photo/gallery1.jpg)'},
      { gridArea: '1/5/10/9', backgroundImage: 'url(Photo/gallery2.jpg)' },
      { gridArea: '10/1/21/6', backgroundImage: 'url(Photo/gallery3.jpg)' },
      { gridArea: '10/6/15/11', backgroundImage: 'url(Photo/gallery4.jpg)' },
      { gridArea: '15/6/21/12', backgroundImage: 'url(Photo/gallery5.jpg)' },
      { gridArea: '15/12/21/17', backgroundImage: 'url(Photo/gallery6.jpg)' },
      { gridArea: '10/11/15/17', backgroundImage: 'url(Photo/gallery7.jpg)' },
      { gridArea: '10/17/21/21', backgroundImage: 'url(Photo/gallery8.jpg)' },
      { gridArea: '1/9/10/17', backgroundImage: 'url(Photo/gallery9.jpg)' },
      { gridArea: '1/17/10/21', backgroundImage: 'url(Photo/gallery10.jpg)' }
    ],
    2: [
      { gridArea: '1/1/10/9', backgroundImage: 'url(Photo/gallery11.jpg)' },
      { gridArea: '10/8/21/14', backgroundImage: 'url(Photo/gallery12.jpg)' },
      { gridArea: '10/1/15/8', backgroundImage: 'url(Photo/gallery13.jpg)' },
      { gridArea: '15/1/21/8', backgroundImage: 'url(Photo/gallery14.jpg)' },
      { gridArea: '10/14/16/21', backgroundImage: 'url(Photo/gallery15.jpg)' },
      { gridArea: '16/14/21/21', backgroundImage: 'url(Photo/gallery16.jpg)' },
      { gridArea: '1/9/5/14', backgroundImage: 'url(Photo/gallery17.jpg)' },
      { gridArea: '5/9/10/14', backgroundImage: 'url(Photo/gallery18.jpg)' },
      { gridArea: '1/14/10/17', backgroundImage: 'url(Photo/gallery19.jpg)' },
      { gridArea: '1/17/10/21', backgroundImage: 'url(Photo/gallery20.jpg)'}
    ],
    3: [
        { gridArea: '1/1/12/6', backgroundImage: 'url(Photo/gallery21.jpg)' },
        { gridArea: '12/1/21/5', backgroundImage: 'url(Photo/gallery22.jpg)' },
        { gridArea: '12/5/21/10', backgroundImage: 'url(Photo/gallery23.jpg)' },
        { gridArea: '1/6/7/12', backgroundImage: 'url(Photo/gallery24.jpg)' },
        { gridArea: '7/6/12/12', backgroundImage: 'url(Photo/gallery25.jpg)' },
        { gridArea: '1/12/12/17', backgroundImage: 'url(Photo/gallery26.jpg)' },
        { gridArea: '1/17/12/21', backgroundImage: 'url(Photo/gallery27.jpg)' },
        { gridArea: '12/10/21/14', backgroundImage: 'url(Photo/gallery28.jpg)' },
        { gridArea: '12/14/21/17', backgroundImage: 'url(Photo/gallery29.jpg)' },
        { gridArea: '12/17/21/21', backgroundImage: 'url(Photo/gallery30.jpg)'}  
    ],
    4: [
        { gridArea: '1/1/7/8', backgroundImage: 'url(Photo/gallery31.jpg)' },
        { gridArea: '7/1/13/8', backgroundImage: 'url(Photo/gallery32.jpg)' },
        { gridArea: '13/1/21/8', backgroundImage: 'url(Photo/gallery33.jpg)' },
        { gridArea: '1/8/11/13', backgroundImage: 'url(Photo/gallery34.jpg)' },
        { gridArea: '11/8/16/13', backgroundImage: 'url(Photo/gallery35.jpg)' },
        { gridArea: '16/8/21/13', backgroundImage: 'url(Photo/gallery36.jpg)' },
        { gridArea: '12/13/21/17', backgroundImage: 'url(Photo/gallery37.jpg)' },
        { gridArea: '12/17/21/21', backgroundImage: 'url(Photo/gallery38.jpg)' },
        { gridArea: '1/13/7/21', backgroundImage: 'url(Photo/gallery39.jpg)' },
        { gridArea: '7/13/12/21', backgroundImage: 'url(Photo/gallery40.jpg)'}
    ],
    5: [
        { gridArea: '1/1/10/5', backgroundImage: 'url(Photo/gallery41.jpg)' },
        { gridArea: '10/1/21/6', backgroundImage: 'url(Photo/gallery42.jpg)' },
        { gridArea: '1/5/10/10', backgroundImage: 'url(Photo/gallery43.jpg)' },
        { gridArea: '10/6/16/12', backgroundImage: 'url(Photo/gallery44.jpg)' },
        { gridArea: '16/6/21/12', backgroundImage: 'url(Photo/gallery45.jpg)' },
        { gridArea: '1/10/6/15', backgroundImage: 'url(Photo/gallery46.jpg)' },
        { gridArea: '6/10/10/15', backgroundImage: 'url(Photo/gallery47.jpg)' },
        { gridArea: '1/15/10/21', backgroundImage: 'url(Photo/gallery48.jpg)' },
        { gridArea: '10/12/21/17', backgroundImage: 'url(Photo/gallery49.jpg)' },
        { gridArea: '10/17/21/21', backgroundImage: 'url(Photo/gallery50.jpg)'}
    ]
}

let rotation = 0;
chevronUp.addEventListener('click', () => {
    rotation += 45;
    if (rotation === 135){
        rotation = -45;
        lensContainer.style.transform = `rotate(${rotation}deg)`;
    }else{
        lensContainer.style.transform = `rotate(${rotation}deg)`;
    };
    console.log(rotation);
    updatePhotoContainers();
});

chevronDown.addEventListener('click', () => {
    rotation -= 45;
    if (rotation === -90){
        rotation = 90;
        lensContainer.style.transform = `rotate(${rotation}deg)`;
    }else{
        lensContainer.style.transform = `rotate(${rotation}deg)`;
    };
    console.log(rotation);
    updatePhotoContainers();
});

function updatePhotoContainers(){
    let selectedCategory;

    if(rotation === 90){
        selectedCategory = 1;
    }else if(rotation === 45){
        selectedCategory = 2;
    }else if(rotation === 0){
        selectedCategory = 3;
    }else if(rotation === -45){
        selectedCategory = 4;
    }else if(rotation === -90){
        selectedCategory = 5;
    }

    const photoContainers = document.querySelectorAll('.photoContainer');

    categoryStyles[selectedCategory].forEach((style, index) => {
        const photoContainer = photoContainers[index];
        photoContainer.style.gridArea = style.gridArea;
        photoContainer.style.backgroundImage = style.backgroundImage;
      });
    };
    // Reviews----------------------------------------------------------------------------------------------------------------
    const reviews = [
        {
            name: "Milda z Moravy",
            review: "Nejlepsí focenicko joooo",
            photo: "url(Photo/gallery8.jpg)"
        },
        {
            name: "Mára velká Kárá",
            review: "Pane boze super joo",
            photo: "url(Photo/gallery4.jpg)"
        },
        {
            name: "Bánka z Drána",
            review: "Paneboze neskutecny jo",
            photo: "url(Photo/gallery3.jpg)"
        },
        {
            name: "Jára smrdí Játra",
            review: "jako asi dobry no",
            photo: "url(Photo/gallery2.jpg)"
        },
        {
            name: "Jana bílá Vana",
            review: "Slunicko nam zarilo",
            photo: "url(Photo/gallery14.jpg)"
        },
        {
            name: "Tonda Jonda",
            review: "hezky hezky",
            photo: "url(Photo/gallery20.jpg)"
        }
    ];
    const reviewPhotoOne = document.getElementById('reviewPhotoOne');
    const reviewPhotoTwo = document.getElementById('reviewPhotoTwo');
    const nameOne = document.getElementById("nameOne");
    const nameTwo = document.getElementById("nameTwo");
    const reviewTextOne = document.getElementById("reviewTextOne");
    const reviewTextTwo = document.getElementById("reviewTextTwo");
    const dots = document.querySelectorAll(".dot");
    const firstDot = document.getElementById('firstReview');
    const secondDot = document.getElementById('secondReview');
    const thirdDot = document.getElementById('thirdReview');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            dot.classList.toggle('active');
    
            const reviewIndex = index * 2; // Each dot corresponds to two reviews
            const reviewOne = reviews[reviewIndex];
            const reviewTwo = reviews[reviewIndex + 1];
    
            reviewPhotoOne.style.backgroundImage = reviewOne.photo;
            nameOne.innerHTML = reviewOne.name;
            reviewTextOne.innerHTML = reviewOne.review;
    
            reviewPhotoTwo.style.backgroundImage = reviewTwo.photo;
            nameTwo.innerHTML = reviewTwo.name;
            reviewTextTwo.innerHTML = reviewTwo.review;
        });
    });


    const contactWindow = document.getElementById('contactWindow');
    const greyBody = document.getElementById('greyBody');
    const contactButtons = document.querySelectorAll('.contactButton');
    const contactForm = document.getElementById('CWcontact');
    const afterSendMessage = document.getElementById('afterSendMessage');
    const inputName = document.getElementById('inputName');
    const inputEmail = document.getElementById('inputEmail');
    const textarea = document.querySelector('#CWcontact textarea');
    const closeWindowButton = document.getElementById('closeWindowButton');
    const submitButton = document.getElementById('submit');

function showContact() {
    contactWindow.style.display = 'flex';
    greyBody.style.display = 'block';

    // Add event listeners to close the contact form
    document.addEventListener('mousedown', hideContactOnClickOutside);
    document.addEventListener('keydown', hideContactOnEscape);
    closeWindowButton.addEventListener('mousedown', closeContactForm);
}
function hideContactOnClickOutside(event) {
    if (!contactWindow.contains(event.target)) {
        closeContactForm();
    }
}
function hideContactOnEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeContactForm();
    }
}
function closeContactForm() {
    contactWindow.style.display = 'none';
    greyBody.style.display = 'none';
    // Reset the form to its initial state
    contactForm.reset();

    // Hide the afterSendMessage element and show the form elements
    afterSendMessage.style.display = 'none';
    closeWindowButton.style.display = 'none';
    inputName.style.display = 'block';
    inputEmail.style.display = 'block';
    textarea.style.display = 'block';
    submitButton.style.display = 'block';

    // Remove event listeners after hiding the form
    document.removeEventListener('mousedown', hideContactOnClickOutside);
    document.removeEventListener('keydown', hideContactOnEscape);
}
// Event listener for form submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting (for demonstration purposes)

    setTimeout(function () {
        // Display the "afterSendMessage" element and hide form elements
        afterSendMessage.style.display = 'block';
        closeWindowButton.style.display = 'block';
        inputName.style.display = 'none';
        inputEmail.style.display = 'none';
        textarea.style.display = 'none';
        submitButton.style.display = 'none';
    }, 1000); // Simulating a delay for demonstration
});

contactButtons.forEach((button) => {
    button.addEventListener('click', showContact);
});

//--------------------------------------------------------------------------------------
const emailContainer = document.getElementById("email");
const otherEmailContainer = document.querySelector('.secondMail');
const phoneContainer = document.getElementById('phone');
const otherPhoneContainer = document.querySelector('.secondPhone');

const emailAddress = "Baruba.klein@example.com";
const phoneNumber = '722 366 209';
const successMessage = document.getElementById("success-message");
const successMessagePhone = document.getElementById('success-message-phone');

emailContainer.addEventListener("click", copyEmail);
otherEmailContainer.addEventListener('click', copyEmail);
phoneContainer.addEventListener('click', copyPhone);
otherPhoneContainer.addEventListener('click', copyPhone);

function copyEmail() {
    const textArea = document.createElement("textarea");
    textArea.value = emailAddress;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        if (document.execCommand("copy")) {
            // Show the success message
            successMessage.style.opacity = 1;
            successMessage.classList.remove("hidden");

            setTimeout(() => {
                successMessage.style.opacity = 0;
            }, 800);
        } else {
            alert("Copying failed. Please copy the email address manually.");
        }
    } catch (err) {
        alert("Někde se stala chyba :-(");
    } finally {
        document.body.removeChild(textArea);
    }
};
function copyPhone() {
    const textArea = document.createElement("textarea");
    textArea.value = phoneNumber;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        if (document.execCommand("copy")) {
            // Show the success message
            successMessagePhone.style.opacity = 1;
            successMessagePhone.classList.remove("hidden");

            // Hide the success message after 0.5 seconds
            setTimeout(() => {
                successMessagePhone.style.opacity = 0;
            }, 800);
        } else {
            alert("Kopírování čísla selhalo, zkopírujte číslo manuálně: 722 377 890");
        }
    } catch (err) {
        alert("Někde se stala chyba :-(");
    } finally {
        document.body.removeChild(textArea);
    }
};

    

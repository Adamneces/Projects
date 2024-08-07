const navigation = document.querySelector('.navigation-fixed');
const section = document.querySelector('.heroSection');
const sectionOneOptions = {};

const observerOne = new IntersectionObserver(function(entries, observerOne) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            navigation.classList.add('navigation-scroll');
        }
        else{
            navigation.classList.remove('navigation-scroll');
        }
    })
}, sectionOneOptions); 

observerOne.observe(section);
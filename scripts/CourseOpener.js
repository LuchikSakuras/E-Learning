const rootSelector = '[data-js-courses]'

class CourseOpener {
    selectors = {
        root: rootSelector,
        link: '[data-js-courses-link]',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.linklElements = this.rootElement.querySelectorAll(this.selectors.link)
    
        this.bindEvents()
    }

    onlinkClick(index) {
        event.preventDefault();
        
        const linkElement = this.linklElements[index];
        const dataValue = linkElement.getAttribute('data-js-courses-link');
        const courseId = Number(dataValue);

        const newUrl = `/course.html?index=${courseId}`;
        window.location.href = newUrl;
    }

    bindEvents() {
        this.linklElements.forEach((linklElement, index) => {
            linklElement.addEventListener('click', () => this.onlinkClick(index))
        })
    }
}

class CourseOpenerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new CourseOpener(element)
        })
    }
}

export default CourseOpenerCollection 
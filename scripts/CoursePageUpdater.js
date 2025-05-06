import CourseItem from "./CourseItem.js"

const rootSelector = '[data-js-course]'

class CoursePageUpdater {
    selectors = {
        root: rootSelector,
        header: '[data-js-course-header]',
        headerTitle: '[data-js-course-header-title]',
        headerDescription: '[data-js-course-header-description]', 
        video: '[data-js-video-player-video]',
        program: '[data-js-course-program]',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.headerElement = this.rootElement.querySelector(this.selectors.header)
        this.headerTitleElement = this.headerElement.querySelector(this.selectors.headerTitle)
        this.headerDescriptionElement = this.headerElement.querySelector(this.selectors.headerDescription)
        this.videoElement = this.rootElement.querySelector(this.selectors.video)
        this.programElement = this.rootElement.querySelector(this.selectors.program)
        
        const urlParams = new URLSearchParams(window.location.search);
        this.index = urlParams.get('index');

        this.initPageData()
    }

    createLessonItem(step) {
        const lessonItem = document.createElement('li')
        lessonItem.classList.add('program-card__lessons-item', 'lesson-item')

        lessonItem.innerHTML = `
            <div class="lesson-item__info">
                <h4 class="lesson-item__title">${step.title}</h4>
                <div class="lesson-item__description">${step.lessonOrder}</div>
            </div>
            <div class="lesson-item__badge">
                <span class="icon icon--left icon--left-time">${step.time}</span>
            </div>
        `

        return lessonItem
    }

    createProgramCard(item) {
        const programCard = document.createElement('li')
        programCard.classList.add('program__item', 'program-card')

        programCard.innerHTML = `
            <h3 class="program-card__title">${item.title}</h3>
            <ul class="program-card__lessons"></ul>
        `
        const programCardLessons = programCard.querySelector('.program-card__lessons')
    
        item.steps.forEach(step => {
            const lessonItem = this.createLessonItem(step)
            programCardLessons.appendChild(lessonItem)
        })

        return programCard
    }

    updateProgram(program) {
        const fragment = document.createDocumentFragment()

        program.forEach(item => {
            const programCard = this.createProgramCard(item)
            fragment.appendChild(programCard)
        })

        this.programElement.appendChild(fragment)
    }

    updateVideo(videoUrl, posterUrl) {
        this.videoElement.setAttribute('src', videoUrl)
        this.videoElement.setAttribute('poster', posterUrl)
    }

    updateHeader(title, description) {
        this.headerTitleElement.textContent = title
        this.headerDescriptionElement.textContent = description
    }

    initPageData() {
        const courseData = CourseItem[this.index]

        if(courseData) {
            this.updateHeader(courseData.title, courseData.description)
            this.updateVideo(courseData.videoUrl, courseData.posterUrl)
            this.updateProgram(courseData.program)
        } else {
            console.error(`Course data not found for index: ${this.index}`)
        }
    }
}

class CoursePageUpdaterCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new CoursePageUpdater(element)
        })
    }
}

export default CoursePageUpdaterCollection 
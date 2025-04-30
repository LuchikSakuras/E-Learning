import BaseComponent from "./generic/BaseComponent.js";
import pxToRem from "./generic/pxToRem.js";

const rootSelector = '[data-js-slider]'

class Slider extends BaseComponent{
    selectors = {
        root: rootSelector,
        sliderContainer: '[data-js-slider-container]',
        slide: '[data-js-slider-slide]',
        buttonPrevious: '[data-js-slider-previous]',
        buttonNext: '[data-js-slider-next]',
        paginationButton: '[data-js-slider-pagination-button]'
    }

    stateClasses = {
        isActive: 'is-active',
        isNotActive: 'is-not-active'
    }

    constructor(rootElement) {
        super()

        this.rootElement = rootElement;
        this.sliderContainerElement = this.rootElement.querySelector(this.selectors.sliderContainer)
        this.buttonPreviousElement = this.rootElement.querySelector(this.selectors.buttonPrevious)
        this.buttonNextElement = this.rootElement.querySelector(this.selectors.buttonNext)

        this.slideElements = [...this.sliderContainerElement.querySelectorAll(this.selectors.slide)]
        this.paginationButtonElements = [...this.rootElement.querySelectorAll(this.selectors.paginationButton)]
        
        this.state = this.getProxyState({
            activePaginationButtonIndex: this.paginationButtonElements.findIndex(({ ariaCurrent }) => ariaCurrent),
        })
        this.limitPaginationButtonIndex = this.paginationButtonElements.length - 1

        this.bindEvenets()
    }

    updateUI() {
        const { activePaginationButtonIndex } = this.state

        this.paginationButtonElements.forEach((paginationButtonElement, index) => {
            const isActive = index ===activePaginationButtonIndex

            paginationButtonElement.classList.toggle(this.stateClasses.isActive, isActive)
            paginationButtonElement.ariaCurrent = isActive
        })

        this.updateSlidePosition()
    }

    updateSlidePosition() {
        const { activePaginationButtonIndex } = this.state;
        const slideWidth = this.slideElements[0].offsetWidth;
    
        this.sliderContainerElement.style.transform = `translateX(-${pxToRem(slideWidth * activePaginationButtonIndex)}rem)`;
    }

    updatePaginationButtons = (direction) => {
        const stateModifier = direction === 'next' ? 1 : -1;
        const newIndex = this.state.activePaginationButtonIndex + stateModifier;
    
        if (newIndex < 0 || newIndex > this.limitPaginationButtonIndex) {
            return;
        }
    
        this.state.activePaginationButtonIndex = newIndex;
    
        const isPreviousButtonNotActive = this.state.activePaginationButtonIndex === 0;
        const isNextButtonNotActive = this.state.activePaginationButtonIndex === this.limitPaginationButtonIndex;
    
        this.buttonPreviousElement.classList.toggle(this.stateClasses.isNotActive, isPreviousButtonNotActive);
        this.buttonNextElement.classList.toggle(this.stateClasses.isNotActive, isNextButtonNotActive);
    }
    
    onButtonPreviousClick = () => {
        this.updatePaginationButtons('previous');
    }
    
    onButtonNextClick = () => {
        this.updatePaginationButtons('next');
    }    

    onPaginationButtonClick(index) {
        this.state.activePaginationButtonIndex = index
    }

    bindEvenets() {
        this.buttonPreviousElement.addEventListener('click', this.onButtonPreviousClick);
        this.buttonNextElement.addEventListener('click', this.onButtonNextClick);

        this.paginationButtonElements.forEach((paginationButtonElement, index) => {
            paginationButtonElement.addEventListener('click', () => this.onPaginationButtonClick(index))
        })
    }
}

class SliderCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Slider(element)
        })
    }
}

export default SliderCollection
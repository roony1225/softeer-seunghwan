import { updateView } from '../updateView.js';
import { getCategories ,getTotalNews, getNewsByCategory } from '../../store/newsStore.js';

let currentPage = 0;
let currentData = [];
let list, prevBtn, nextBtn;
let isEventBound = false;

export function initListEvents({ viewId, prevBtnId, nextBtnId }){
    if (isEventBound) return;
    isEventBound = true;

    list = document.getElementById(viewId);
    prevBtn = document.getElementById(prevBtnId);
    nextBtn = document.getElementById(nextBtnId);

    currentData = getTotalNews();

    render();
}

// list탭을 열때마다 호출
export function showList() {
    if(!list) return;
    currentPage = 0;
    render();
}

function render() {
    updateView({
        type: "LIST-INIT",
        view: list,
        currentPage: currentPage,
        currentData: currentData
    });
}

// 페이지 넘길때마다 호출
export function handleListPrev() {
    if (currentPage === 0) return;
    currentPage--;
    update(currentPage);
}

export function handleListNext() {
    const maxPage = currentData.length - 1;
    if (currentPage >= maxPage) return;
    currentPage++;
    update(currentPage);
}



export function updatePage(page) {
    currentPage = page;
    update(currentPage);
}

function update(page) {
    updateListCategory(page);

    updateView({
        type: "LIST-UPDATE",
        view: list,
        currentPage: page,
        currentData: currentData,
        itemCount: 1
    });
}

function updateListCategory(page) {
    // 현재 활성화된 카테고리에서 active효과 삭제
    const prevCategory = document.querySelectorAll('.news-category.active');
    prevCategory.forEach(e => {
        e.classList.toggle('active');
        e.classList.toggle('selected-bold14');
        e.classList.toggle('available-medium14');

        let cate_count = e.querySelector('.cate-count');
        cate_count.remove();
    });

    let category = currentData[page].category;
    let category_page = pageByCategory(category);

    // 선택 카테고리 active효과 추가
    let cate = document.getElementById(`category-${category}`);
    cate.classList.toggle('available-medium14');
    cate.classList.toggle('active');
    cate.classList.toggle('selected-bold14');

    // 카테고리별 뉴스 개수 표시
    let news_data = getNewsByCategory(category);
    let count = document.createElement('div');
    count.className = `cate-count`;
    count.id = 'cate-count';
    count.innerHTML = `${category_page}/${news_data.length}`;
    cate.appendChild(count);

}

// 이 함수도 newsStore.js로 옮겨놓고 하면 좋을걸... 근데 함수 이름은 좀 수정해야겠다. 
function pageByCategory(category){
    let arr = getCategories();

    let category_page = currentPage + 1;
    for (const e of arr) {
        if (e === category) {
            break;
        }
        category_page -= getNewsByCategory(e).length;
    }
    return category_page;
}